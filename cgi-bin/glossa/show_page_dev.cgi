#!/usr/bin/perl

use CGI;
use DBI;
use Data::Dumper;
use lib("/home/httpd/html/glossa/pm");
use Glossa;
use strict;


# variables $query_id and $corpus ends up on the command line; 
# must be checked for nastiness (like "taint")
my $query_id = CGI::param('query_id');
my $corpus=CGI::param('corpus');
unless ($query_id =~ m/^\d+_\d+$/) { die("illegal value") };
#unless ($corpus =~ m/^[\w|\d|_|-]+$/) { die("illegal value") };

my %in;

my $hits_name=CGI::param('name');

my $user = $ENV{'REMOTE_USER'}; 

my $conf=Glossa::get_conf_file($corpus);
my %conf = %$conf;


print "Content-type: text/html; charset=$conf{'charset'}\n\n";
print "<html>\n<head><title>Resultater</title><link href=\"", $conf{'htmlRoot'}, "/html/tags.css\" rel=\"stylesheet\" type=\"text/css\"></link>";
print "<script language=\"JavaScript\" src=\"", $conf{'htmlRoot'}, "/js/showtag.js\"></script></head>\n<body>";
print "<script language=\"JavaScript\" src=\"", $conf{'htmlRoot'}, "/js/", $corpus, ".conf.js\"></script>";


my $set_id = CGI::param('set');
my $annotation_in_conf_file;

my $context_type;
my $hlight;
my $conf= $conf{'tmp_dir'} . "/" . $query_id . ".conf"; 

# FIXME: this is a silly way of doing things
unless (-e $conf) {
  $conf{'tmp_dir'} = $conf{'config_dir'}  . "/" . $corpus . "/hits/"  . $user . "/";
}

if ($hits_name) {
  $conf{'tmp_dir'} = $conf{'config_dir'}  . "/" . $corpus . "/hits/"  . $user . "/";
}


$conf= $conf{'tmp_dir'} . "/" . $query_id . ".conf"; 



open (CONF, "$conf");
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





# read multitag file
my $file = $conf{'config_dir'} . "/" . $corpus . "/multitags.dat";
my %multitags;
open (M, $file);
while (<M>) {
    
    chomp;
    next if (/^\#/);
    s/\s*$//;
    my ($a,$b,$c)=split(/\t/);
    next unless ($a and $b and $c);
    $multitags{$a}->{$b}=$c;
}
close M;


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


print "<table border=0>";
 
$/="\n\n\n";

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

    print "</nobr></td><td";
    if ($context_type eq "chars") { print " align=\"right\"" }
    print ">";

    print_it($res_l);
    if ($context_type eq "chars") { print "</td><td>" }
    print "<b> &nbsp;";
    print_it($ord);
    print " &nbsp;</b>";
    if ($context_type eq "chars") { print "</td><td>" }
    print_it($res_r);


    print "</td></tr>";

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
	print_it($al);

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
sub print_it {

    my $in = shift;
    my @t = split (/ /, $in);

    foreach my $t (@t) {

	my (@atts_token) = split(/\//, $t);
	my $token_string = shift @atts_token;

	my $token_atts;

	foreach my $a (@atts) {
	    my $att_token = shift @atts_token;
	    next if ($att_token eq "_");
	    next if ($att_token eq "__UNDEF__");
	    next unless ($att_token);
	    if ($a =~ m/_/) {
		my $new_a = $multitags{$a}->{$att_token};
		$token_atts .= "<b>" . $new_a . ": </b>" . $att_token . "<br>";		
	    }
	    else {
		$token_atts .= "<b>" . $a . ": </b>" . $att_token . "<br>";		
	    }

	}

	$tag_i++;
	print "<span onMouseOver=\"showTag(arguments[0], \'$tag_i\')\" onMouseOut=\"hideTag(\'$tag_i\')\">\n";
       print $token_string, "</span>"; 
	$tags{$tag_i}=$token_atts;

    }
    
}
