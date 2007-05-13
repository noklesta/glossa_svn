#!/usr/bin/perl

use CGI;
use DBI;
use Data::Dumper;
use lib("/home/httpd/html/glossa/pm");
use Glossa;


# variables $query_id and $corpus ends up on the command line; 
# must be checked for nastiness (like "taint")
my $query_id = CGI::param('query_id');
my $corpus=CGI::param('corpus');
unless ($query_id =~ m/^\d+_\d+$/) { die("illegal value") };
unless ($corpus =~ m/^[\w|\d|_|-]+$/) { die("illegal value") };


my $hits_name=CGI::param('name');

my $user = $ENV{'REMOTE_USER'}; 

my $conf=Glossa::get_conf_file($corpus);
my %conf = %$conf;

my $dsn = "DBI:mysql:database=$conf{'db_name'};host=$conf{'db_host'}";
my $dbh = DBI->connect($dsn, $conf{'db_uname'}, $conf{'db_pwd'}, {RaiseError => 1});


if ($corpus eq 'sami') {
    print "Content-type: text/html; charset=ISO-8859-10\n\n";
}
else {
    print "Content-type: text/html; charset=ISO-8859-1\n\n";
}



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

my $set_id = CGI::param('set');
my $annotation_select;


my $annotate = 0;
if ($annotate) {
    my $sth = $dbh->prepare(qq{ SELECT default_value FROM annotation_sets where id = '$set_id';});
    $sth->execute  || die "Error fetching data: $DBI::errstr";
    my ($default) = $sth->fetchrow_array;

    

    my @values;
    # get values
    my $sth = $dbh->prepare(qq{ SELECT id, value_name FROM annotation_values where set_id = '$set_id';});
    $sth->execute  || die "Error fetching data: $DBI::errstr";
    while (my ($id, $name) = $sth->fetchrow_array) {
	push @values, [$id, $name]; 
    }
}


print "<html>\n<head><title>Resultater</title><link href=\"", $conf{'htmlRoot'}, "/html/tags.css\" rel=\"stylesheet\" type=\"text/css\"></link>";
print "<script language=\"JavaScript\" src=\"", $conf{'htmlRoot'}, "/js/showtag.js\"></script></head>\n<body>";
print "<script language=\"JavaScript\" src=\"", $conf{'htmlRoot'}, "/js/", $corpus, ".conf.js\"></script>";



if ($hits_name) {
    my $data_files = $conf{'config_dir'} . "/" . $corpus . "/hits/"  . $user . "/" . $query_id . "*";	
    `cp $data_files $conf{'tmp_dir'}`;

}

my $top= $conf{'tmp_dir'} . "/" . $query_id . ".top"; 
open (TOP, "$top");
while (<TOP>) {

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
    print "<br><input type=\"submit\" value=\"Save annotations\"></input>";
}

if ($del) {
    print "<form action=\"", $conf{'cgiRoot'}, "/delete_hits.cgi\">";
    print "<input type=\"hidden\" name=\"query_id\" value=\"$query_id\">";
    print "<input type=\"hidden\" name=\"corpus\" value=\"$corpus\">";
    print "<input type=\"hidden\" name=\"n\" value=\"$n\">";
    print "<br><input type=\"submit\" value=\"Delete selection\"></input>";
}

my $filename= $conf{'tmp_dir'} . "/" . $query_id . "_" . $n . ".dat"; 

open (DATA, "$filename");


my $context_type;
my $hlight;
my $conf= $conf{'tmp_dir'} . "/" . $query_id . ".conf"; 
open (CONF, "$conf");
while (<CONF>) {
    chomp;
    if (/^context_type=(.*)/) { $context_type=$1 }
    if (/^hlight=(.*)/) { $hlight=$1 }
}


my %tags;


print "<table>";
 
$/="\n\n\n";

while (<DATA>) {

    my @lines = split(/\n/, $_);

    my $source = shift @lines;

    my ($corp, $s_id, $sts_string, $res_l, $ord, $res_r) = split(/\t/, $source);

    my @sts = split(/\|\|/, $sts_string);
    my %sts;
    foreach my $sts (@sts) {
	my ($k,$v) = split(/=/, $sts);
	$sts{$k}=$v;
    }
    $t_id = $sts{'text_id'};

    print "<tr><td><br>";
    if ($set_id) {

	my $sth = $dbh->prepare(qq{ SELECT value_id FROM annotations where sentence_id = '$s_id';});
	$sth->execute  || die "Error fetching data: $DBI::errstr";
	my ($stored_value) = $sth->fetchrow_array;

	print "<select name=\"$s_id\"><option value=\"\"></option>"; 
	foreach my $val (@values) {
	    print "<option value=\"$val->[0]\"";
	    if ($val->[0] == $stored_value) { print " selected" }
	    elsif (($val->[0] == $default) and !($stored_value)) { print " selected" }
	    print ">$val->[1]</option>";
	}
	print "</select>";

    }
    print "</td></tr><tr><td><nobr>";

    if ($del) {
	print "<input type='checkbox' name='delete' value='$s_id' />";
    }

    print "<font size=\"-2\"><a href=\"#\" onClick=\"window.open('", $conf{'cgiRoot'}, "/show_context.cgi?text_id=$t_id&s_id=$s_id&cs=3$corpus_string&subcorpus=$corp',";
    print "'mywindow','height=500,width=650,status,scrollbars,resizable');\">$t_id</a> \n&nbsp;</font>";


    if ($corpus eq 'nota') {
	my $ex_url = "?corpus=" . $in{'query'}->{'corpus'}->[0] . "&line_key=" . $sts{'who_line_key'} . "&size=1&video=0&nested=0";
	print "<font size=\"-2\"><a href=\"#\" onClick=\"window.open('http://omilia.uio.no/cgi-bin/nota/expand.pl$ex_url',";
	print "'mywindow','height=400,width=1000,status,scrollbars,resizable,screenX=0,screenY=5');\"><img style='border-style:none' src='http://omilia.uio.no/CE2/img/mov.gif'></a> \n&nbsp;</font>";

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

	my @sts = split(/\|\|/, $sts_string);
	my %sts;
	foreach my $sts (@sts) {
	    my ($k,$v) = split(/=/, $sts);
	    $sts{$k}=$v;
	}
	my $t_id = $sts{'text_id'};

	my @targets = split(/ /, $targets);

	foreach my $target (@targets) {

	    print "<font size=\"-2\"><a href=\"#\" onClick=\"window.open('", $conf{'htmlRoot'}, "/show_context.cgi?text_id=$t_id&s_id=$target&cs=3&$corpus_string&subcorpus=$corp',";
	    print "'mywindow','height=500,width=650,status,scrollbars,resizable');\">$text</a> \n&nbsp; </font>";
	    
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
