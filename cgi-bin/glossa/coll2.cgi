#!/usr/bin/perl

use CGI;
use DBI;
use lib("/home/httpd/html/glossa/pm");
use Glossa;
use Spreadsheet::WriteExcel;
use Data::Dumper;



select(STDOUT);
$|=1;

print "Content-type: text/html; charset=$conf{'charset'}\n\n";
print "<html><head></head><body>";

$ENV{'PATH'} = "/usr/etc/yp:/etc/yp:/local/sbin:/bin:/usr/bin:/usr/ucb:/etc:/usr/etc:/sbin:/usr/sbin:/usr/kerberos/bin:/usr/local/bin:/bin:/usr/bin:/usr/X11R6/bin:/local/X11R6/bin:/usr/bin/X11:/usr/ccs/bin:/local/bin:/local/etc/bin:/usr/bsd:/local/etc:/local/gnu/bin:/site/share/perl5/5.8.8/Text/NSP/Measures/2D/Dice:/site/share/perl5/5.8.8/Text/NSP/Measures/2D:/site/share/perl5/5.8.8/Text/NSP/Measures:/site/share/perl5/5.8.8/Text/NSP:/site/share/perl5/5.8.8/Text:/site/share/perl5/5.8.8";

#print "<pre>";
#print Dumper $ENV{'PATH'};
#print "</pre>";

my $case = CGI::param('case');
my $query_id = CGI::param('query_id');
my $base_corpus = CGI::param('base_corpus');

my $user = $ENV{'REMOTE_USER'}; 

my $corpus = CGI::param('corpus');
my $globalstats = CGI::param('globalstats');

my $conf = Glossa::get_conf_file($corpus);


# FIXME: this is a silly way of doing things
my $conf= $conf{'tmp_dir'} . "/" . $query_id . ".conf"; 
unless (-e $conf) {
  $conf{'tmp_dir'} = $conf{'config_dir'}  . "/" . $corpus . "/hits/"  . $user . "/";
}
$conf= $conf{'tmp_dir'} . "/" . $query_id . ".conf"; 



# variables "$query_id", "$window", and "$ngram" ends up on the command line; 
# must be checked for nastiness (like "taint")

my $ngram = CGI::param('ngram');
my $window = CGI::param('window');
my $lib = CGI::param('measure_bi');
my $lib3 = CGI::param('measure_tri');

unless ($query_id =~ m/^\d+_\d+$/) { die("illegal value") };
unless ($window =~ m/^\d+$/) { die("illegal value") };
unless ($ngram =~ m/^\d+$/) { die("illegal value") };
unless ($lib =~ m/^\w+\d*$/) { die("illegal value") };
unless ($lib3 =~ m/^\w+\d*$/) { die("illegal value") };



my $opts_n = "--ngram " . $ngram;



my $opts_w = "--window " . $window;
if ($ngram eq "3") { 
    $opts_w = "";
    $lib = $lib3;
}


my %conf = %$conf;



my $dsn = "DBI:mysql:database=$conf{'db_name'};host=$conf{'db_host'}";
my $dbh = DBI->connect($dsn, $conf{'db_uname'}, $conf{'db_pwd'}, {RaiseError => 1});



print "<form action=\"", $conf{'cgiRoot'}, "/coll_format.cgi\" method=\"GET\">";
print "<input type=\"hidden\" name=\"query_id\" value=\"$query_id\"></input>";
print "Change format to: <select name=\"format\"><option value=\"\">&nbsp;</option><option value=\"tsv\">Tab separated values</option><option value=\"csv\">Comma separated values</option><option value=\"xls\">Excel spreadsheet</option><option value=\"bars\">Histogram</option><option value=\"hbars\">Histogram (horisontal)</option></select>&nbsp;&nbsp;&nbsp;<input type=\"submit\"></input><br><br>";




my $format = CGI::param('format');
my $out = $query_id . "." . $format;


$string = $query_id."_";
my @files = <$conf{'tmp_dir'}/$string*.dat>;

#print "F: $conf{'tmp_dir'}/$string<br>";


my $output = "$conf{'tmp_dir'}/" . $string. ".tocnt";
open (OUTPUT, ">$output");

foreach my $f (@files) {

#    print $f, "<br>";

    open (FILE, $f);

    my $i=0;

    $/="\n\n\n";
    while (<FILE>) {


	my @n;

	my @lines = split(/\n/, $_);

	my $source = shift @lines;

	my ($c,$s_id,$sts_string,$left,$match,$right) = split(/\t/, $source);

	my @left = split(/ /, $left);
	my @right = split(/ /, $right);


	my $tmp1 = pop @left;
	my $tmp2 = pop @left;
	my $tmp3 = pop @left;	

	my @left2;
	my @right2;
	if ($ngram == 3) {
	    @left2 = ($tmp2, $tmp1);

	    @right2;
	    foreach my $ii (0..1) {
		my $tmp = shift @right;
		push @right2, $tmp; 
	    }
	}
	elsif ($ngram == 2) {
	    @left2 = ($tmp1);
	    @right2 = (shift @right);
	}


	foreach $t (@left2) {
	    my ($token, $lexeme, $pos)=split(/\//,$t);
	    my @tmp;
	    if (CGI::param('form')) { unless ($case) { $token = lc($token) }; push @tmp, $token };
	    if (CGI::param('lexeme')) { push @tmp, $lexeme };
	    if (CGI::param('pos')) { push @tmp, $pos };
	    my $match2 .= join("/", @tmp) . " ";
	    print OUTPUT $match2, " ";
	}
	print OUTPUT "XX ";
	foreach $t (@right2) {
	    my @tmp;
	    my ($token, $lexeme, $pos)=split(/\//,$t);
	    if (CGI::param('form')) { unless ($case) { $token = lc($token) };  push @tmp, $token };
	    if (CGI::param('lexeme')) { push @tmp, $lexeme };
	    if (CGI::param('pos')) { push @tmp, $pos };
	    my $match2 .= join("/", @tmp) . " ";
	    print OUTPUT $match2, " ";
	}
	print OUTPUT "\n";

    }
    close FILE;

}


close OUTPUT;

my $cnt = $output;
$cnt =~ s/tocnt$/cnt/;



`rm -f $cnt`;

`count.pl --newLine --token $conf{'config_dir'}/token.regexp $opts_n $opts_w $cnt $output`;


$/="\n";

if ($globalstats and ($ngram == 2)) {

    my $cnt2 = $cnt;
    $cnt2 .= "2";
    open (CNT2, ">$cnt2");
    open (CNT, $cnt);
    my $first_line = <CNT>;
    print CNT2 "2000000\n";
    while (<CNT>) {
	if ((/XX/) or !(/ /)) { 
	    
	    # use global statistics
	    if (/^(\S+)<>(\S+)<>(\d+) (\d+) (\d+)\s*$/) {
		my ($one,$two,$ngram_count,$one_count,$two_count)=($1,$2,$3,$4,$5);
		$one_count = replace_count($one,$one_count);
		$two_count = replace_count($two,$two_count);
		print CNT2 $one, "<>", $two, "<>",$ngram_count, " ", $one_count, " ", $two_count, "\n";
	    }
	    else {
		print CNT2;
	    }
	}
    }

    `cp $cnt2 $cnt`;

}

my $stat = $cnt;
$stat .= ".stat";

`rm -f $stat`;

if ($lib eq "freq") {
    `cp $cnt $stat`;
}
else {

#    my $r = `statistic.pl $opts_n $lib $stat $cnt`;
#    print "$r";
    system("statistic.pl $opts_n $lib $stat $cnt");
#    print "statistic.pl $opts_n $lib $stat $cnt<br>";

}

print "<table border=1>";
if ($ngram eq "2") {
    print "<tr><td><b>Left context</td><td><b>Right context</td></tr><tr>";
}
else {
    print "<tr><td><b>Left context</td><td><b>Middle context</td><td><b>Right context</td></tr><tr>";
}
print " <tr><td valign=\"top\">";
print "<table><tr><td><b>ngram</b></td><td><b>rank</b></td><td><b>AM</b></td><td><b>occ</b></td></tr>";

my $cut_max = CGI::param('cut_max');
my $cut_min = CGI::param('cut_min');
my $cut_occ = CGI::param('cut_occ');

print "<input type=\"hidden\" name=\"stat\" value=\"$stat\"></input>";
print "<input type=\"hidden\" name=\"ngrams\" value=\"$ngram\"></input>";
print "<input type=\"hidden\" name=\"lib\" value=\"$lib\"></input>";
print "<input type=\"hidden\" name=\"cut_max\" value=\"$cut_max\"></input>";
print "<input type=\"hidden\" name=\"cut_min\" value=\"$cut_min\"></input>";
print "<input type=\"hidden\" name=\"cut_occ\" value=\"$cut_occ\"></input>";

#print "FILE: $stat<br>";

open (STAT, $stat);
my $right;
my $middle;
my $i=0;
while (<STAT>) {

    my @ngram;
    my $rank;
    my $a_measure;
    my $no_ngram;
    if (/(.*?) (.*)/) { 
	@ngram = split(/<>/, $1);
	foreach my $ng (@ngram) { $ng =~ s/XX/\*\*/ }

	$rank = pop @ngram;
	my @values = split (/ /, $2);
	if ($lib eq "freq") {
	    $no_ngram = $rank;
	    $rank = " ";
	}
	else {
	    $a_measure = $values[0];
	    $no_ngram = $values[1];	    
	}

    }

    next if (($cut_occ) and ($no_ngram < $cut_occ));
    next if (($ngram eq "2") and ($a_measure < $cut_min) and ($cut_min));
    next if (($cut_max) and ($i > $cut_max));
    $i++;

    if ($ngram eq "2") {
	if ($ngram[1] eq "**") {
	    print "<tr><td>", join(" ", @ngram), "</td><td>", $rank, "</td><td>", $a_measure, "</td><td>", $no_ngram, "</td></tr>";
	}
	elsif ($rank) {
	    $right .= "<tr><td>" . join(" ", @ngram) . "</td><td>" . $rank . "</td><td>" . $a_measure . "</td><td>" . $no_ngram . "</td></tr>";
	}
    }
    else {
	if ($ngram[2] eq "**") {
	    print "<tr><td>", join(" ", @ngram), "</td><td>", $rank, "</td><td>", $a_measure, "</td><td>", $no_ngram, "</td></tr>";
	}
	elsif ($ngram[1] eq "**") {
	    $middle .= "<tr><td>" . join(" ", @ngram) . "</td><td>" . $rank . "</td><td>" . $a_measure . "</td><td>" . $no_ngram . "</td></tr>";
	}
	elsif ($rank) {
	    $right .= "<tr><td>" . join(" ", @ngram) . "</td><td>" . $rank . "</td><td>" . $a_measure . "</td><td>" . $no_ngram . "</td></tr>";
	}

    }

}

if ($ngram eq "2") {

    print "</table>";
    print "<td valign=\"top\">";
    print "<table><tr><td><b>ngram</b></td><td><b>rank</b></td><td><b>AM</b></td><td><b>occ</b></td></tr>";
    print $right;
    print "</table>";
    print "</td></tr></table>";

}
else {

    print "</table>";
    print "<td valign=\"top\"><table><tr><td><b>ngram</b></td><td><b>rank</b></td><td><b>AM</b></td><td><b>occ</b></td></tr>";
    print $middle;
    print "</table>";
    print "<td valign=\"top\">";
    print "<table><tr><td><b>ngram</b></td><td><b>rank</b></td><td><b>AM</b></td><td><b>occ</b></td></tr>";
    print $right;
    print "</table>";
    print "</td></tr></table>";

}

print "</form>";
print "</body></html>";



sub replace_count {

    my $tablename = uc($corpus) . "_" . uc($base_corpus) . "lexstat";

    my ($w,$cc)=@_;

    if ($w eq 'XX') { return $cc }
    else {

        my $count;

        my $sql;
        my ($a,$b,$c)=split(/\//,$w);

        my @cond;

	 $a =~ s/\"/\\"/g;
	 $a =~ s/\'/\\'/g;

	 $b =~ s/\"/\\"/g;
	 $b =~ s/\'/\\'/g;

        if (CGI::param('form')) { push @cond, "form = \'$a\'" }     

        if ((CGI::param('pos')) and (CGI::param('form'))) { push @cond, "pos = \'$b\'" }     
        if ((CGI::param('pos')) and !(CGI::param('form'))) { push @cond, "pos = \'$a\'" }
     

        if ((CGI::param('lexeme')) and !(CGI::param('form')) and !(CGI::param('pos'))) { push @cond, "lemma = \'$a\'" }
        elsif ((CGI::param('lexeme')) and (!(CGI::param('form')) or !(CGI::param('pos')))) { push @cond, "lemma = \'$b\'" }
        elsif ((CGI::param('lexeme')) and (CGI::param('form')) and (CGI::param('pos'))) { push @cond, "lemma = \'$c\'" }

        my $sql = "SELECT SUM(freq) FROM $tablename WHERE ";
        $sql .= join(" and ", (@cond));
        $sql .= ";";

        my $sth = $dbh->prepare(qq{$sql});
        $sth->execute  || die "Error fetching data: $DBI::errstr";
        my ($count) = $sth->fetchrow_array;

	if ($cc < $count) {
	    return $count;
	}
	else {
	    return $cc;
	}


    }

}
