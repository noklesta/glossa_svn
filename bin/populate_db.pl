#!/usr/bin/perl

use strict;
use Unicode::MapUTF8 qw(to_utf8 from_utf8 utf8_supported_charset);
use DBI;

my $dsn = "DBI:mysql:database=CE_logon;host=omilia.uio.no";
my $dbh = DBI->connect($dsn, "larsnyg", "afu", {RaiseError => 0}) || die $DBI::errstr;

$dbh->do("delete from s;");
$dbh->do("delete from s_align;");
$dbh->do("delete from texts;");
$dbh->do("delete from lex_stats_LOGON_D;");
$dbh->do("delete from lex_stats_LOGON_C;");
$dbh->do("delete from lex_stats_LOGON_B;");
$dbh->do("delete from lex_stats_LOGON_A;");

# for lex_stats tables:
# CREATE UNIQUE INDEX comp ON lex_stats_LOGON_D (wf,lemma,tag);

open (CN, "/hom/larsnyg/par/omc2/bin/no.conv");
open (CE, "/hom/larsnyg/par/omc2/bin/en.conv");

my %cn;
my %ce;

while (<CN>) {
    chomp;
    my ($en,$to)=split;
    $cn{$to}=$en;
}
while (<CE>) {
    chomp;
    my ($en,$to)=split;
    $ce{$to}=$en;
}



#
#           ***   tab       ->   lex_stats,   s,    texts    ***
#

for my $c ('a','b','c','d') {

    my %conv_table;
    if ($c eq 'a') { %conv_table = %cn }
    else { %conv_table = %ce }

    my $corpus_name = "LOGON_" . uc($c);
    my $lex_table_name = "lex_stats_" . $corpus_name;



    my @files = (<~/logon/logon2/training/*/$c/*.tagged>);

    foreach my $f (@files) {
        $/="\n\n";

        my $t_id = $f;
        $t_id =~ s/.*\///;
        $t_id =~ s/\.tagged//;

        open (F, $f);

        my $tokens;

        while (<F>) {

            my $other  = from_utf8({ -string => $_, -charset => 'ISO-8859-1' });
            $_ = $other;

            s/^\n+//;
            s/\"/'/g; #'
            s/<unknown>/_UNKNOWN_/g; #'
                
            my @lines = split(/\n/);
            my $id = shift @lines;
            $id =~ s/ \|//; $id =~ s/\[//; $id =~ s/\]//;

            my @tokens;

            foreach my $l (@lines) {

                $tokens++;

                if ($l =~ m/<p>/) { }
                else {

                    s/subst prop/subst_prop/;

                    $l =~ s/<//g;
                    $l =~ s/>//g;
                    my ($wf,$t,$le)=split(/\t/, $l);

                    foreach my $k (keys %conv_table) {
                        $t =~ s/^$k/$conv_table{$k}/;
                    }

                    $wf =~ s/([\"|\'|\;|\#])/\\$1/g;
                    $le =~ s/([\"|\'|\;|\#])/\\$1/g;

                    push @tokens, $wf;
#                    push @tokens, $wf . "/" . $t . "/" . $le;

                    $dbh->do("insert into $lex_table_name set freq=1, wf = '$wf', lemma = '$le', tag = '$t' on duplicate key update freq=freq+1;");

                    
                }

            }

            my $sent = join(" ", @tokens); 
            $dbh->do(qq{insert into s set t_id = '$corpus_name', s = '$id', content='$sent';});

        }

        $dbh->do("insert into texts set title = '$t_id', tokens = $tokens, lang = '$corpus_name';");

        close F;

    }

}


#
#  ***     alg       ->   align
#

$/="\n";

foreach my $c ('b','c','d') {

    my $corpus_name = "LOGON_" . uc($c);

    my @files = (<~/logon/logon2/training/*/$c/*.alg>);

    foreach my $f (@files) {

        my $t_id = $f;
        $t_id =~ s/.*\///;
        $t_id =~ s/\.alg//;

        open (F, $f);

        while (<F>) {
            chomp;
            
            s/(\d+)/$t_id-$1/g;

            my ($a,$b) = split(/\t/);

            my @a = split(/,/, $a);
            my @b = split(/,/, $b);

            foreach my $a (@a) {
                foreach my $b (@b) {
                    $dbh->do("insert into s_align set source = '$a', target = '$b', lang = '$corpus_name';");
                }

            }


        }
    }

}


