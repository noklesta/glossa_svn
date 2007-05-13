use strict;

my %stats;
my $tid;

while (<STDIN>) {

    chomp;
    if (/^<\/text>/) {
	printstats();
    }
    elsif (/^<text id=[\"|'](.*)[\"|']>/) {
	$tid=$1;
    }

    next if (/^\s*\</);
    my ($form, $lemma, $e, $pos) = split(/\t/);

    my $tmp = $lemma . "__" . $pos;
    $stats{$tmp}++;


}

sub printstats {


    open(STATS, ">stats/$tid.dat");
    while (my ($k,$v)=each %stats) {
	my ($l,$p)=split(/__/,$k);
	print STATS $l, "\t", $p,"\t", $v, "\n";
    }

    undef %stats;

    close STATS;

    `gzip stats/$tid.dat`;

}
