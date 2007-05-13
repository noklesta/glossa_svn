use strict;
use DBI;

my $dsn = "DBI:mysql:database=cwb_glossa;host=localhost";
my $dbh = DBI->connect($dsn, "cwb", "", {RaiseError => 0}) ||
        die $DBI::errstr;



my $tid;
my $wordcount;

while (<STDIN>) {

    chomp;
    if (/^<\/text>/) {
	update_wordcount();
	$wordcount=0;
    }
    elsif (/^<text id=[\"|\'](.*)[\"|\']>/) {
	$tid=$1;
    }

    next if (/^\s*\</);

    $wordcount++;



}

sub update_wordcount {

    $dbh->do("update TESTtext set wordcount = '$wordcount' where tid = '$tid';");

}
