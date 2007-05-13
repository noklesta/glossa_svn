#!/usr/bin/perl

use CGI;
use DBI;
use lib("/home/httpd/html/glossa/pm");
use Glossa;


my $corpus_name = CGI::param('corpus_name');



my $conf=get_conf_file($corpus_name);
my %conf = %$conf;

my $dsn = "DBI:mysql:database=$conf{'db_name'};host=$conf{'db_host'}";
my $dbh = DBI->connect($dsn, $conf{'db_uname'}, $conf{'db_pwd'}, {RaiseError => 1});

print "Content-type: text/html\n\n";
print "<html><head></head><body>";

my @names = CGI::param;

foreach my $name (@names) {
    
    unless (($name eq "set") or ($name eq "string")) { 
	my $value = CGI::param($name);
	print "$name <b>$value</b><br>";
	$dbh->do(qq{ insert into annotations set sentence_id = '$name', value_id = '$value'; });
    }


}



print "</body></html>";
