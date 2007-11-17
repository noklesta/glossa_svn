#!/usr/bin/env perl

my @langs1 = ("en","fr", "de","nl","no","po");


foreach my $l1 (@langs1) {

    foreach my $l2 (@langs1) {

	next if ($l1 eq $l2);

	my $alg = "/hf/omilia/site/corpora/omc/alg/$l1$l2.alg2";
	next unless (-e $alg);
	print STDERR $alg, "\n";

	`/usr/local/bin/cwb-align-encode -D -C $alg`;

    }

}
