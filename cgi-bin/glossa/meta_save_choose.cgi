#!/usr/bin/perl
# $Id$

use CGI;
use DBI;
use Data::Dumper;
use strict;

require "use_glossa.pl";

my %glossa_conf = Glossa::get_glossa_conf();

select(STDOUT);
$|=1;

print "Content-type: text/html; charset=$conf{'charset'}\n\n";
print "<html><head></head><body>";

my $cgi = CGI->new;
# FIXME: this should be done in module
my %cgi_hash;
my @prms = $cgi->param();
foreach my $p (@prms) {
    my @vals = $cgi->param($p);
    $cgi_hash{$p}=\@vals;
}


my $in = Glossa::create_cgi_hash2(\%cgi_hash);
my %in = %$in;


my $corpus = $in{'query'}->{'corpus'}->[0];
my $base_corpus = $in{'phrase'}->{'0'}->{'corpus'}->[0];

my $conf = Glossa::get_conf_file($corpus, $glossa_conf{'conf'});
my %conf = %$conf;

my $lang=Glossa::get_lang_file($glossa_conf{'conf'}, $conf{'lang'});
my %lang = %$lang;

my $dsn = "DBI:mysql:database=$conf{'db_name'};host=$conf{'db_host'}";
my $dbh = DBI->connect($dsn, $conf{'db_uname'}, $conf{'db_pwd'}, {RaiseError => 0}) || die $DBI::errstr;

my $format = CGI::param('format');


my $tablename = $base_corpus . "_lexstat";


my ($subcorpus,$sql_query_nl,$texts_allowed,$subcorpus_string) = Glossa::create_tid_list(\%conf, \%in, $corpus);

if ($subcorpus_string) {

    print "<pre>";
    print $subcorpus_string;
    print "</pre>";
    
    # save string
    my $fname = "/tmp/meta_" . int(rand 100000) . ".dat";

    open (TMP, ">$fname");
    print TMP $subcorpus_string;
    close TMP;

    # print form

    print "<form action='", $conf{'cgiRoot'}, "/meta_save.cgi' method='get'>\n";
    print "<input type='text' name='subcorpus_name'></input>\n";
    print "<input type='hidden' name='subcorpus_id' value='$fname'></input>\n";
    print "<input type='hidden' name='corpus' value='$corpus'></input>\n";
    print "<input type='submit'>$lang{'meta_save_submit_button'}</input>\n";
    print "</form>";

    

}
else {
    print "<b>$lang{'meta_save_no_selection'}</b>";
}

