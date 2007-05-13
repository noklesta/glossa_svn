use strict;
use DBI;
use Getopt::Long qw(:config bundling);

my ($data, $mode, $table);
GetOptions ("tag=s"   => \$data,
	    "mode=s"    => \$verbose,
	    "table=s" => \$table;
	   );

unless ($data and $mode and $table) {
    die("you must specify tag, mode and table\n"); 
}


my $dsn = "DBI:mysql:database=glossa;host=omilia.uio.no";
my $dbh = DBI->connect($dsn, "larsnyg", "afu", {RaiseError => 0}) ||
        die $DBI::errstr;



my $tid;
my $start;
my $end;
my $current=-1;


while (<STDIN>) {

    chomp;
    if (/^<\/$tag>/) {
	$end=$current;
	printpos();
    }
    elsif (/^<$tag id=[\"|\'](.*)[\"|\']>/) {
	$tid=$1;
	$start = $current+1;
    }

    if (/^\<\<\</) {     # this can be a token
	$current++;
    }
    next if (/^\s*\</);
    my ($form, $lemma, $pos) = split(/\t/);

    $current++;



}

sub printpos {

    if ($mode eq 'db') {
	$dbh->do("update $table set startpos = '$start', endpos='$end' where tid = '$tid';");
    }
    elsif ($mode eq 'file') {
	print "$tid\t$start\t$end\n";
    }

}
