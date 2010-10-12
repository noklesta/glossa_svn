#!/usr/bin/perl

use CGI;
use Spreadsheet::WriteExcel;
use strict;
use DBI;

require "use_glossa.pl";

my %glossa_conf = Glossa::get_glossa_conf();

my $case = CGI::param('case');


# variables $query_id and $lib ends up on the command line; 
# must be checked for nastiness (like "taint")
my $query_id = CGI::param('query_id');
my $lib = CGI::param('measure');

unless ($query_id =~ m/^\d+_\d+$/) { die("illegal value") };
unless ($lib =~ m/^\w+\d*$/) { die("illegal value") };



my $corpus_name = CGI::param('corpus_name');
my $user = $ENV{'REMOTE_USER'}; 


my $conf = Glossa::get_conf_file($corpus_name, $glossa_conf{'conf'});
my %conf = %$conf;

# FIXME: this is a silly way of doing things
my $conf= $conf{'tmp_dir'} . "/" . $query_id . ".conf"; 
unless (-e $conf) {
  $conf{'tmp_dir'} = $conf{'config_dir'}  . "/" . $corpus_name . "/hits/"  . $user . "/";
}


print "Content-type: text/html; charset=$conf{'charset'}\n\n";
print "<html><head></head><body>";


my $dsn = "DBI:mysql:database=$conf{'db_name'};host=$conf{'db_host'}";
my $dbh = DBI->connect($dsn, $conf{'db_uname'}, $conf{'db_pwd'}, {RaiseError => 1});


print "<form action=\"", $conf{'cgiRoot'}, "/cooc_format.cgi\" method=\"GET\">";
print "<input type=\"hidden\" name=\"query_id\" value=\"$query_id\"></input>";
print "Change format to: <select name=\"format\"><option value=\"\">&nbsp;</option><option value=\"tsv\">Tab separated values</option><option value=\"csv\">Comma separated values</option><option value=\"xls\">Excel spreadsheet</option><option value=\"bars\">Histogram</option><option value=\"hbars\">Histogram (horisontal)</option></select>&nbsp;&nbsp;&nbsp;<input type=\"submit\"></input><br><br>";

my %filters;
foreach my $i (1..3) {

    my $value_id="filter" . $i . "_value";
    my $value=CGI::param($value_id);
    next unless ($value);

    my $part_id="filter" . $i . "_part";
    my $part=CGI::param($part_id);

    my $bool_id="filter" . $i . "_bool";
    my $bool=CGI::param($bool_id);

    $filters{$part}->{$bool}=$value;

}



my $format = CGI::param('format');
my $out = $query_id . "." . $format;

my $output = $conf{'tmp_dir'} . "/" . $query_id. ".tocnt.cooc";
open (OUTPUT, ">$output");

$query_id = $query_id."_";
my @files = <$conf{'tmp_dir'}/$query_id*>;



foreach my $f (@files) {

    open (FILE, $f);

    my $i=0;

    $/="\n\n\n";
    while (<FILE>) {

	my @n;

	my @lines = split(/\n/, $_);

	my $source = shift @lines;

	foreach my $target (@lines) {

	    # aligned sentence
	    my ($c, $s_id, $sts_string, $txt) = split(/\t/, $target);

	    my @tokens = split(/ /, $txt);
	    foreach my $t (@tokens) {
		my ($token, $pos, $lexeme)=split(/\//,$t);

		my $filter_result;
		unless ($case) { $token = lc($token) }; 
		$filter_result = apply_filter('form',$token);

		next if ($filter_result eq "fail");
		$filter_result = apply_filter('pos',$pos);

		next if ($filter_result eq "fail");
		$filter_result = apply_filter('lemma',$lexeme);

		next if ($filter_result eq "fail");

		my @tmp;

		if (CGI::param('form')) { push @tmp, $token }
		if (CGI::param('pos')) { push @tmp, $pos }
		if (CGI::param('lexeme')) { push @tmp, $lexeme }

		my $match2 .= join("/", @tmp) . " ";
		print OUTPUT $match2, " $c\n";

	    }
	}


    }
    close FILE;

}


close OUTPUT;

my $cnt = $output;
$cnt =~ s/tocnt/cnt/;





`rm -f $cnt`;
`count.pl --newLine --token $conf{'config_dir'}/token.regexp $cnt $output`;

$/="\n";


my $stat = $cnt;
$stat .= ".stat";

`rm -f $stat`;

if ($lib eq "freq") {
    `cp $cnt $stat`;
}
else {
    `statistic.pl $lib $stat $cnt`;
}


my $cut_max = CGI::param('cut_max');
my $cut_min = CGI::param('cut_min');
my $cut_occ = CGI::param('cut_occ');

print "<input type=\"hidden\" name=\"stat\" value=\"$stat\"></input>";
print "<input type=\"hidden\" name=\"lib\" value=\"$lib\"></input>";
print "<input type=\"hidden\" name=\"cut_max\" value=\"$cut_max\"></input>";
print "<input type=\"hidden\" name=\"cut_min\" value=\"$cut_min\"></input>";
print "<input type=\"hidden\" name=\"cut_occ\" value=\"$cut_occ\"></input>";

open (STAT, $stat);

my %results;

my $i=0;
while (<STAT>) {

    my @ngram;
    my $rank;
    my $a_measure;
    my $no_ngram;
    if (/(.*?) (.*)/) { 
	my ($token, $lang, $rank) = split(/<>/, $1);

	my @values = split (/ /, $2);
	if ($lib eq "freq") {
	    $no_ngram = $rank;
	    $rank = " ";
	}
	else {
	    $a_measure = $values[0];
	    $no_ngram = $values[1];	    
	}

	next if (($cut_occ) and ($no_ngram < $cut_occ));
	next if (($cut_min) and ($a_measure < $cut_min));
	next if (($cut_max) and ($i > $cut_max));
	
	$results{$lang}.="<tr><td>$token</td><td>$no_ngram</td><td>$a_measure</td></tr>";

    }

    $i++;

}

print "<table border=1><tr>";
foreach my $k (keys %results) {

    print "<td valign=\"top\"><table border=1>";
    print $results{$k};
    print "</table></td>";

}
print "</tr></table>";

print "</form>";
print "</body></html>";


sub apply_filter{

    my $type=shift;
    my $value=shift;

    my $res="fail";

    my $pos_filters=$filters{$type}->{'pos'};
    if ($pos_filters) {
	my @regexes = split(" ", $pos_filters);
	foreach my $regex (@regexes) {
	    if ($value=~m/^$regex$/) { $res="pass" }
	}
    }
    else { $res="pass" }

    if ($res eq "fail") { return($res) }

    my $neg_filters=$filters{$type}->{'neg'};
    if ($neg_filters) {
	my @regexes = split(" ", $neg_filters);
	foreach my $regex (@regexes) {
	    if ($value=~m/^$regex$/) { $res="fail" }
	}
    }
    else { $res="pass" }

    return($res);

}
