use strict;
use warnings;

unless (@ARGV == 5) {
    print_usage();
}

my @alg;

my ($tab1, $tab2, $name1, $name2, $ces) = @ARGV;

# read tabs
my %pos1 = get_pos($tab1);
my %pos2 = get_pos($tab2);

# read ces

open (CES, $ces) or die("could not open ces file: $ces\n");

while (<CES>) {

    chomp;

    if(/\<link/) {

	s/.*xtargets=\'//;
	s/\' \/>//;



	my ($from, $to) = split(/;/);
	my @from = split(/ /, $from);
	my @to = split(/ /, $to);

 	my $first_from = $from[0];
 	my $last_from = $from[-1];

 	my $first_to = $to[0];
 	my $last_to = $to[-1];

	my $start_from = $pos1{$first_from}->[0];
	my $stop_from  = $pos1{$last_from}->[1];

	my $start_to   = $pos2{$first_to}->[0];
	my $stop_to    = $pos2{$last_to}->[1];

#	print "FIRST_FROM: $first_from\n";
#	print "LAST_FROM: $last_from\n";
#	print "FIRST_TO: $first_to\n";
#	print "LAST_TO: $last_to\n";

#	print "START_FROM: $start_from\n";
#	print "STOP_FROM: $stop_from\n";
#	print "START_TO: $start_to\n";
#	print "STOP_TO: $stop_to\n";

#	print "\n\n\n";

	my $len_from = @from;
	my $len_to = @to;
	my $len = $len_from . ":" . $len_to;

	next unless ($start_from and $stop_from and $start_to and $stop_to);


	push @alg, [$start_from, $stop_from, $start_to, $stop_to, $len];

    }

}

#my @alg_sorted = sort { $a->[0] <=> $b->[0] } @alg;

print "$name1\ts\t$name2\ts\n";

foreach my $a (@alg) {

    my @a = @$a;
    print join("\t", @a), "\n";

}

# sort

sub get_pos {

    my $sid;
    my $start=-1;
    my $current=-1;

    my %pos;

    my $file = shift;

    open (FILE, $file) or die("Could not open file: $file\n");

    while (<FILE>) {



	chomp;
	if (/^<\/s>/) {
	    $pos{$sid}=[$start,$current];

#	    print STDERR "POS: $sid\t$start\t$current";

	}
	elsif (/^<s id=[\"|\'](.*)[\"|\']>/) {
	    $sid=$1;
	    $start = $current+1;
	}

	if (/^\<\<\</) {     # this can be a token
	    $current++;
	}
	next if (/^\s*\</);

#	print STDERR; print STDERR "\n";
	
	$current++;
	       	
    }

    return %pos;

}

sub print_usage {

    print "input: tab1 + tab2 + name1 + name2 + ces_align\n";
    print "output: cwb-alg\n"; 
    print "assumes '<s id=' and '</s>'\n";

}



