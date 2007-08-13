#!/usr/bin/perl

use CGI;
use DBI;
use lib("/home/httpd/html/glossa/pm");
use Glossa;
use strict;


my $corpus = CGI::param('corpus');
my $set = CGI::param('set');



my $conf=Glossa::get_conf_file($corpus);
my %conf = %$conf;

my $dsn = "DBI:mysql:database=$conf{'db_name'};host=$conf{'db_host'}";
my $dbh = DBI->connect($dsn, $conf{'db_uname'}, $conf{'db_pwd'}, {RaiseError => 1});

print "Content-type: text/html\n\n";
print "<html><head></head><body>";

my @names = CGI::param;

my $annotations_table = uc($corpus) . "annotations";

foreach my $name (@names) {
    
    unless (($name eq "set") or ($name eq "query_id") or ($name eq "corpus")) { 
	my $value = CGI::param($name);
	print "$name <b>$value</b><br>";
	$dbh->do(qq{ insert into $annotations_table set s_id = '$name', value_id = '$value', set_id = '$set'; });
    }


}



print "</body></html>";
