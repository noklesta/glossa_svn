#!/usr/bin/perl
# $Id$

use CGI;
use DBI;
use Data::Dumper;
use strict;
use lib("/home/httpd/html/glossa/pm");
use Glossa;

# variables $query_id and $corpus ends up on the command line; 
# must be checked for nastiness (like "taint")
my $query_id = CGI::param('query_id');
my $corpus=CGI::param('corpus');
my $attribute_type=CGI::param('atttype');

# for multiple-attribute display
my $multiple_attribute_display = 0;
if($attribute_type eq 'x'){$multiple_attribute_display = 2; $attribute_type = 0;}

unless ($query_id =~ m/^\d+_\d+$/) { die("illegal value") };
#unless ($corpus =~ m/^[\w|\d|_|-]+$/) { die("illegal value") };

my %in;

my $hits_name=CGI::param('name');

my $user = $ENV{'REMOTE_USER'}; 

#my $conf_file = "/export/res/lb/glossa/dat/" . $corpus . "/cgi.conf";
# removed the above, as the location of the cgi.conf file is now in path.conf
my %paths;
open(PATHS, "paths.conf");
while( <PATHS> ){
    /([^\s]+)\s(.+)/;
    $paths{ $1 } = $2;
}
my $conf_file = $paths{"conf"} . $corpus . "/cgi.conf";

my $conf=Glossa::get_conf_file($corpus, $conf_file);
my %conf = %$conf;

my $corpus_mode = $conf{'corpus_mode'};

my $speech_corpus = 0;

if($corpus_mode eq 'speech'){
    $speech_corpus = 1;
}
my $googletrans = <<STOP;
<script type="text/javascript" src="http://www.google.com/jsapi"></script>
<script type="text/javascript">

google.load("language", "1");

function translate(node, text) {
  google.language.detect(text, function(result) {
    if (!result.error && result.language) {
      google.language.translate(text, result.language, "en",
                                function(result) {
        if (result.translation) {
	    node.innerHTML = result.translation;
	    node.innerHTML += " <font size='-2'>(google)</font>"; //"&nbsp;<img src='http://tekstlab.uio.no/glossa/html/img/google-g-icon-16.png'>";
        }
        else{ node.innerHTML = 'No translation available' }
      });
    }
  });
}


function translate2(text) {
  google.language.detect(text, function(result) {
   if (!result.error && result.language) {
      google.language.translate(text, result.language, "en",
                                function(result) {
        if (result.translation) {
          return result.translation;
        }
	return "No translation available.";
      });
    }
  });
}
</script>
STOP

my $style = <<STYLE;
<style>
div.inspect{

	top: 0px;
	left:0px;
	padding: 5px;
	border: 0px solid #000;
	background: #ddd;
	width: 975px;
        height: 270px;
	display: none;
}
</style>
STYLE


my $multitags= Glossa::get_multitags_file($conf{'config_dir'}, $corpus);
my %multitags = %$multitags;

my $lang=Glossa::get_lang_file($conf{'config_dir'}, $conf{'lang'});
my %lang = %$lang;


print "Content-type: text/html; charset=$conf{'charset'}\n\n";
print "<html>\n<head><title>$lang{'query_title'}</title><link href=\"", $conf{'htmlRoot'}, "/html/tags.css\" rel=\"stylesheet\" type=\"text/css\"></link>";
print "<script language=\"JavaScript\" src=\"", $conf{'htmlRoot'}, "/js/showtag.js\"></script></head>\n<body>";
print "<script language=\"JavaScript\" src=\"", $conf{'htmlRoot'}, "/js/", $corpus, ".conf.js\"></script>";
print "\n$googletrans\n\n";
print $style, "\n</head>\n<body>\n";

print <<SCRIPT;
<script type="text/javascript">
function selectAll(Direction)  {
  var chBoxes=document.getElementsByName("delete");
  for(i=0;i<chBoxes.length;i++) {

    if (Direction) {
        chBoxes[i].checked=0;
    }
    else {
        chBoxes[i].checked=1;
    };

  }
}
</script>
SCRIPT


if($speech_corpus){

print "  <div id=\"inspector\" class=\"inspect\">\n" .
      "    <iframe frameborder='0' width='100%' height='100%' id=\"movie_frame\"></iframe>\n" .
      "    <div style=\"position: relative; left: 960px; top: -15px; cursor: pointer\" onclick=\"document.getElementById('inspector').style.display='none';\">\n" .
      "      <img alt=\"[x]\" src=\"" . $conf{'htmlRoot'}  . "html/img/close.png\" />\n" . 
      "    </div>\n" .
      "  </div>\n<br />\n";

}


my $set_id = CGI::param('set');
my $annotation_in_conf_file;

my $context_type;
my $hlight;
my $query_hits_conf_file = $conf{'tmp_dir'} . $query_id . ".conf";

# FIXME: this is a silly way of doing things
unless (-e $query_hits_conf_file) {
  $conf{'tmp_dir'} = $conf{'hits_files'} . $user . "/";
}

if ($hits_name) {
  $conf{'tmp_dir'} = $conf{'hits_files'}  . $user . "/";
  $query_hits_conf_file= $conf{'tmp_dir'} . "/" . $query_id . ".conf"; 
}

open (CONF, "$query_hits_conf_file");
while (<CONF>) {
    chomp;
    if (/^context_type=(.*)/) { $context_type=$1 }
    if (/^hlight=(.*)/) { $hlight=$1 }
    if (/^name=(.*)/) { $hits_name=$1 }
    if (/^annotation_set=(.*)/) { 
	unless ($set_id) {
	    $set_id=$1;
	    $annotation_in_conf_file=1; # if the annotation set isn't specified here, it will be set later
	                                # (or it will be overridden if it differs from the CGI input)
	}
    }
}
close CONF;




my $annotation_select;



my $dsn = "DBI:mysql:database=$conf{'db_name'};host=$conf{'db_host'}";
my $dbh = DBI->connect($dsn, $conf{'db_uname'}, $conf{'db_pwd'}, {RaiseError => 1});

my $atts = $conf{'corpus_attributes'};
my @atts = split(/ +/, $atts);
shift @atts; # use without "word"

my %tags;


select(STDOUT);
$|=1;




my $corpus_string;
if ($corpus) { $corpus_string = "&corpus=" . $corpus }



my $n = CGI::param('n');
my $del = CGI::param('del');



my $sets_table = uc($corpus) . "annotation_sets";
my $values_table = uc($corpus) . "annotation_values";

my @values;
my $default;


if ($set_id) {
    my $sth = $dbh->prepare(qq{ SELECT default_value FROM $sets_table where id = '$set_id';});
    $sth->execute  || die "Error fetching data: $DBI::errstr";
    ($default) = $sth->fetchrow_array;

    # get values
    my $sth = $dbh->prepare(qq{ SELECT id, value_name FROM $values_table where set_id = '$set_id';});
    $sth->execute  || die "Error fetching data: $DBI::errstr";
    while (my ($id, $name) = $sth->fetchrow_array) {
	push @values, [$id, $name];
 
    }

    unless ($annotation_in_conf_file) {
	print "appending to $conf<br>";
	open (CONF, ">>$conf");
	print CONF "\n", "annotation_set=", $set_id, "\n";
    }

}





#if ($hits_name) {
#    my $data_files = $conf{'config_dir'} . "/" . $corpus . "/hits/"  . $user . "/" . $query_id . "*";	
#    `cp $data_files $conf{'tmp_dir'}`;
#}

my $top= $conf{'tmp_dir'} . "/" . $query_id . ".top"; 


open (TOP, "$top");
while (<TOP>) {

    # FIXME
    if ($set_id) {
	$_ =~ s/(\">\d+<\/a>)/\&set=$set_id$1/g;
    }
    print;
}

print "<script language=\"JavaScript\" src=\"", $conf{'htmlRoot'}, "/js/reslist.js\"></script>";
print "<script language=\"javascript\">boldPage($n)</script>";

if ($set_id and $del) {
    die("Both annotation and deletion chosen. Aborting.")
}

if ($set_id) {
    print "<form action=\"", $conf{'cgiRoot'}, "/save_annotations.cgi\">";
    print "<input type=\"hidden\" name=\"set\" value=\"$set_id\">";
    print "<input type=\"hidden\" name=\"query_id\" value=\"$query_id\">";
    print "<input type=\"hidden\" name=\"corpus\" value=\"$corpus\"></input>";
    print "<br><input type=\"submit\" value=\"Save annotations\"></input>";
}

if ($del) {
    print "<form action=\"", $conf{'cgiRoot'}, "/delete_hits.cgi\">";
    print "<input type=\"hidden\" name=\"query_id\" value=\"$query_id\">";
    print "<input type=\"hidden\" name=\"corpus\" value=\"$corpus\">";
    print "<input type=\"hidden\" name=\"n\" value=\"$n\">";
    print "<input type=\"hidden\" name=\"corpus\" value=\"$corpus\"></input>";
    print "<br><input type=\"submit\" value=\"Delete selection\"></input>";
}



my $filename= $conf{'tmp_dir'} . "/" . $query_id . "_" . $n . ".dat"; 


open (DATA, "$filename");




my %tags;


print "<table border='0'>";
 
$/="\n\n\n";

my %video_stars;

if ($speech_corpus){

    my $sth = $dbh->prepare( "SELECT tid FROM " . uc ( $corpus ) . "author where video = 'Y';");
    
    $sth->execute  ||  print TEMP "Error fetching data: $DBI::errstr";
    
    while (my ($v) = $sth->fetchrow_array) {

	$video_stars{$v} = 1;
	
    }

}

while (<DATA>) {

    my @lines = split(/\n/, $_);

    my $source = shift @lines;

    my ($corp, $s_id, $sts_string, $res_l, $ord, $res_r) = split(/\t/, $source);

    my $sts_url = "?" . $corpus_string . "&subcorpus=" . $corp . "&cs=3";

    my @sts = split(/\|\|/, $sts_string);
    my %sts;
    foreach my $sts (@sts) {
	my ($k,$v) = split(/=/, $sts);
	$sts{$k}=$v;
	$sts_url .= "&" . $k . "=" . $v;

    }
    my $t_id = $sts{'text_id'};


    if ($set_id) {

	print "<tr colspan=2><td colspan=2>";

	my $annotation_table = uc($corpus) . "annotations";

	my $sth = $dbh->prepare(qq{ SELECT value_id FROM $annotation_table where s_id = '$s_id' and set_id = '$set_id';});
	$sth->execute  || die "Error fetching data: $DBI::errstr";
	my ($stored_value) = $sth->fetchrow_array;

	print "<input type='hidden' name='annotationcpos_", $s_id, "' value='", $sts{'cpos'}, "'></input>";

	if ($set_id eq "__FREE__") {
	    print "<input name='annotation_", $s_id, "' value='", $stored_value, "'></input>";
	}
	else {

	    print "<select name=\"annotation_", "$s_id\"><option value=\"\"></option>"; 
	    foreach my $val (@values) {
		# print $val->[0], " ::: ", $val->[1], "<br>";
		print "<option value=\"$val->[0]\"";
		if ($val->[0] == $stored_value) { print " selected" }
		elsif (($val->[0] == $default) and !($stored_value)) { print " selected" }
		print ">$val->[1]</option>";
	    }
	    print "</select>";
	    
	}

	print "</td></tr>";

    }

    print "<tr><td height=\"30\"><nobr>";

    if ($del) {
	print "<input type='checkbox' name='delete' value='$s_id' />";
    }
    my $identifier = $s_id;

    if($speech_corpus){$identifier = $sts{text_id};}
    if($speech_corpus){
	my $CORPUS = $corpus;
	print ("<font size=\"-2\">\n<a href=\"#\" onClick=\"window.open('$conf{'htmlRoot'}/html/profile.php?tid=$identifier&corpus=$CORPUS',");
	print ("'mywindow','height=480,width=600,status,scrollbars,resizable');\"><img src='$conf{'htmlRoot'}/html/img/i.gif' alt='i' / border='0'></a> \n&nbsp;</font>\n");
    }
    else
    {
	print "<font size=\"-2\"><a href=\"#\" onClick=\"window.open('", $conf{'cgiRoot'}, "/show_context.cgi$sts_url',";
	print "'mywindow','height=500,width=650,status,scrollbars,resizable');\">$identifier</a> \n&nbsp;</font>";
    }
    if($speech_corpus){
	my $ex_url = "?corpus=" . $corpus . "&line_key=" . $sts{'who_line_key'} . "&size=1&nested=0";
	my $source_line;
	if( $video_stars{ $identifier } ){
	    $source_line.=sprintf("<font size=\"-2\">\n<a href=\"#\" onClick=\"document.getElementById('inspector').style.display='block';document.getElementById('movie_frame').src = '" . $conf{'htmlRoot'}  . "html/expand.php$ex_url&video=1';\">\n");
	    $source_line.=sprintf("<img style='border-style:none' src='" . $conf{'htmlRoot'} . "html/img/mov.gif'>\n</a> \n&nbsp;</font>");
	}
	$source_line.=sprintf("<font size=\"-2\">\n<a href=\"#\" onClick=\"document.getElementById('inspector').style.display='block';document.getElementById('movie_frame').src = '" . $conf{'htmlRoot'}  . "html/expand.php$ex_url&video=0';\">\n");
	$source_line.=sprintf("<img style='border-style:none' src='" . $conf{'htmlRoot'} . "html/img/sound.gif'>\n</a> \n&nbsp;</font>");
	$source_line.="<strong>" . $sts{"text_id"} . "</strong>";
	print $source_line;
    }
=end
    print "<font size=\"-2\"><a href=\"#\" onClick=\"window.open('", $conf{'cgiRoot'}, "/show_context.cgi$sts_url',";
    print "'mywindow','height=500,width=650,status,scrollbars,resizable');\">$s_id</a> \n&nbsp;</font>";


    if ($corpus eq 'nota' || $corpus eq 'upus') {
	my $ex_url = "?corpus=" . $in{'query'}->{'corpus'}->[0] . "&line_key=" . $sts{'who_line_key'} . "&size=1&nested=0";
	if($corpus eq 'upus'){ $ex_url .= "&db=upus&table=segments";  }
	my $source_line.=sprintf("<font size=\"-2\"><a href=\"#\" onClick=\"window.open('http://omilia.uio.no/cgi-bin/glossa/expand.pl$ex_url&video=0',");
	$source_line.=sprintf("'mywindow','height=400,width=1000,status,scrollbars,resizable,screenX=0,screenY=5');\"><img style='border-style:none' src='http://omilia.uio.no/glossa/html/img/mov.gif'></a> \n&nbsp;</font>");
	$source_line.=sprintf("<font size=\"-2\"><a href=\"#\" onClick=\"window.open('http://omilia.uio.no/cgi-bin/glossa/expand.pl$ex_url&video=audio',");
	$source_line.=sprintf("'mywindow','height=400,width=1000,status,scrollbars,resizable,screenX=0,screenY=5');\"><img style='border-style:none' src='http://omilia.uio.no/glossa/html/img/sound.gif'></a> \n&nbsp;</font>");
	print $source_line;

#	print "<font size=\"-2\"><a href=\"#\" onClick=\"window.open('http://omilia.uio.no/cgi-bin/nota/expand.pl$ex_url',";
#	print "'mywindow','height=400,width=1000,status,scrollbars,resizable,screenX=0,screenY=5');\"><img style='border-style:none' src='http://omilia.uio.no/CE2/img/mov.gif'></a> \n&nbsp;</font>";

    }
=cut
    print "</nobr></td><td";
    if ($context_type eq "chars") { print " align=\"right\"" }
    print ">";

    print_it($res_l, $attribute_type);
    if ($context_type eq "chars") { print "</td><td>" }
    print "<b> &nbsp;";
    print_it($ord, $attribute_type);
    print " &nbsp;</b>";
    if ($context_type eq "chars") { print "</td><td>" }
    print_it($res_r, $attribute_type);


    print "</td></tr>";
    if($multiple_attribute_display){
	print "<tr><td></td><td";
	if ($context_type eq "chars") { print " align=\"right\"" }
	print ">";

	print_it($res_l, 2);
	if ($context_type eq "chars") { print "</td><td>" }
	print "<b> &nbsp;";
	print_it($ord, 2);
	print " &nbsp;</b>";
	if ($context_type eq "chars") { print "</td><td>" }
	print_it($res_r, 2);
	print "</td></tr><tr><td></td><td><br /></td></tr>";###
    }
    if($speech_corpus){
	my $orig = get_first($res_l) . "<b>" . get_first($ord) . "</b>" . get_first($res_r);
	$orig =~ s/"/_/g;
	my $source_line .= "<tr><td></td><td colspan='3'>";
	$source_line .= "<div><span onclick=\"translate(this.parentNode, '$orig');\" style='font-size:small;cursor:pointer;'>[translate]</span></div>";
	$source_line.=sprintf("</td></tr>");
	$source_line .= "<tr><td></td><td></td></tr>";
	print $source_line;
    }

    foreach my $l (@lines) {

	print "<tr><td>";

	my ($corp, $targets, $sts_string, $al) = split(/\t/, $l);

	my $sts_url = "?" . $corpus_string . "&subcorpus=" . $corp . "&cs=3";

	my @sts = split(/\|\|/, $sts_string);
	my %sts;
	foreach my $sts (@sts) {
	    my ($k,$v) = split(/=/, $sts);
	    $sts{$k}=$v;
	    next if ($k eq 's_id');
	    $sts_url .= "&" . $k . "=" . $v;
	}
	my $t_id = $sts{'text_id'};

	my @targets = split(/ /, $targets);

	$sts_url .= "&s_id=" . $targets[0];

	foreach my $target (@targets) {

	    print "<font size=\"-2\"><a href=\"#\" onClick=\"window.open('", $conf{'cgiRoot'}, "/show_context.cgi$sts_url',";
	    print "'mywindow','height=500,width=650,status,scrollbars,resizable');\">$targets</a> \n&nbsp; </font>";
	    
	}

	print "</td>";

	print "<td";
	if ($context_type eq "chars") { print " colspan=\"3\"" }
	print ">";

	print "<font color=\"gray\">";
	print_it($al, $attribute_type);

	print "<\/font>";
	print "</td></tr>";

    }

}

while (my ($id, $tags) = each %tags) {
    print "<div id=\"$id\" class=\"tag\">$tags</div>";
}

                                        
print "<script language='javascript'>clearCheckBoxes()</script>";
print "</form></table>"; 

## to allow tags to be show at the bottom of the page
print "<br><br><br><br><br><br><br><br><br>";

print "</body></html>";


my $tag_i;

sub get_first{

    my $line = shift;
    $line =~ s/\/[^ ]+//g;
    return $line;

}

# fixme! - samma som print_tokens i query_dev.cgi ska flyttas till Glossa.pm
sub print_it {

    my $in = shift;
    my $atts_index = shift;
    my @t = split (/ /, $in);

    my $alert = 0;

    foreach my $t (@t) {

	my (@atts_token) = split(/\//, $t);

	my $token_string = $atts_token[$atts_index];

	if($token_string eq '__UNDEF__'){ $alert = 1; $token_string = "<span style='color: #444; font-style: italic;'>" . $atts_token[0] . "</span>"; }

	shift @atts_token;

	my $token_atts;

	foreach my $a (@atts) {
	    my $att_token = shift @atts_token;
	    next if ($att_token eq "_");
	    next if ($att_token eq "__UNDEF__");
	    next unless ($att_token);
	    if ($a =~ m/_/) {
		my $new_a = $multitags{$a}->{$att_token};
		$token_atts .= "<b>" . $new_a . ": </b>" . $att_token . "<br>";		
	    } else {
		$token_atts .= "<b>" . $a . ": </b>" . $att_token . "<br>";		
	    }

	}

	$tag_i++;
	print "<span onMouseOver=\"showTag(arguments[0], \'$tag_i\')\" onMouseOut=\"hideTag(\'$tag_i\')\">\n";
       print $token_string, "</span>"; 
	$tags{$tag_i}=$token_atts;

    }
    
}
