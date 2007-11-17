#!/usr/bin/env perl

use strict;

my $c = shift;
my $tab = shift;

unless ($c and $tab) { die('you must specify tab file and corpus name (upper case)') }

my $dat_dir = "/hf/omilia/site/corpora/cwb_data/" . $c;

print "removing old files ...\n";
`rm -f $dat_dir/*`;

print "encoding ...\n";

if ($c =~ m/^TEST$/) {

 `/usr/local/bin/cwb-encode -xsB -f $tab -d $dat_dir -s -U "_" -D -P lex -P extra -P pos -P degr -P dia -P tense_defin -P case -P mood -P person_type2 -P number -P gender -P func -S s:O+id -S text:O+id -S sect:0+id`;

}
if ($c =~ m/^OMC3_/) {
  #pos type degr+dia tense+defin mood+case person+type2 number gender
 `/usr/local/bin/cwb-encode -xsB -f $tab -d $dat_dir -s -D -P lemma -P pos -P type -P degr_dia -P tense_defin -P mood_case -P person_type2 -P number -P gender -S s:O+id -S text:O+id`;
}
elsif ($c =~ m/^ILN_LEKS$/) {
 `/usr/local/bin/cwb-encode -xsB -f $tab -d $dat_dir -s -D -P lemma -P ordkl -P type -P grad_dia -P tid_bestemthet -P modus_kasus -P person_type2 -P tall -P kjonn -S s:O+id -S text:O+id`;
}
elsif ($c =~ m/^BOKMAL$/) {
 `/usr/local/bin/cwb-encode -xsB -f $tab -d $dat_dir -s -D -P lemma -P ordkl -P type -P grad_dia -P tid_bestemthet -P modus_kasus -P person_type2 -P tall -P kjonn -S s:O+id -S text:O+id`;
}
elsif ($c =~ m/^SAMNO_NORSK$/) {
 `/usr/local/bin/cwb-encode -xsB -f $tab -d $dat_dir -s -D -P lemma -P pos -P type -P grad_dia -P tense_defin -P case_mood -P person_type2 -P number -P gender -P polarity -P syntax -S s:O+id -S text:O+id`;
}
elsif ($c =~ m/^SAMNO_SAMISK$/) {
 `/usr/local/bin/cwb-encode -xsB -f $tab -d $dat_dir -s -D -P lemma -P pos -P type -P grad_dia -P tense_defin -P case_mood -P person_type2 -P number -P gender -P polarity -P syntax -S s:O+id -S text:O+id`;
}
elsif ($c =~ m/^NOTA2$/) {
 `/usr/local/bin/cwb-encode -xsB -f $tab -d $dat_dir -s -D -P lemma -P pos -P sex -P num -P type -P defn -P temp -P pers -P case -P degr -P descr -P pron -P id -S sync:O+time+end -S turn:O+endtime+speaker+starttime -S who:O+nb+name+line_key -S episode:O+circumstance -S trans`;
}
elsif ($c =~ m/^BUL$/) {
# pos type ref grade dia val tense aspect defin mood case person type2 number gender poss_gender
 `/usr/local/bin/cwb-encode -xsB -f $tab -d $dat_dir -s -D -P lemma -P pos -P type -P ref -P grade -P dia -P val -P tense -P aspect -P defin -P mood -P case -P person -P type2 -P nuber -P gender -P poss_grade -S text:O+id -S s:O+id`;
}
#else {
# `/usr/local/bin/cwb-encode -f $tab -d $dat_dir -s -D -P POS -P lemma -V s -V text`;
#}

print "running makeall ...\n";
`/usr/local/bin/cwb-makeall -V $c`;

unless ($c eq 'BUL') { # the corpus is to large, and we run out of address space on omilia

    print "compressing ...\n";
    `/usr/local/bin/cwb-huffcode -T -A $c`;
    `/usr/local/bin/cwb-compress-rdx -T -A $c`;
    
    print "deleting uncompressed files ...\n";
    `rm $dat_dir/*.corpus`;
    `rm $dat_dir/*.rev`;
    `rm $dat_dir/*.rdx`;
    
}


