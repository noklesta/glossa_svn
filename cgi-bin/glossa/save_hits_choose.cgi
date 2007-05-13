#!/usr/bin/perl

use CGI;
use File::Copy;
use strict;

use lib("/home/httpd/html/glossa/pm");
use Glossa;




select(STDOUT);
$|=1;

print "Content-type: text/html\n\n";

my $corpus=CGI::param('corpus');
my $query_id = CGI::param('query_id');
my $user = $ENV{'REMOTE_USER'}; 

my $conf = Glossa::get_conf_file($corpus);
my %conf = %$conf;



print "<br>";
print "<form action='", $conf{'cgiRoot'}, "/save_hits.cgi' method='GET'>";
print "<input type='hidden' name='corpus' value='$corpus' />";
print "<input type='hidden' name='query_id' value='$query_id' />";
print "<input name='name' /> name of results set<br><br>";
print "<input type='submit' />";
print "</form>";
print "<br><br><b>Previous names:</b><br>";


my $root = $conf{'config_dir'} . "/" . $corpus . "/hits/" . $user . "/";


my @files=<$root*.conf>;

foreach my $f (@files) {

    open(FILE, $f);
    while (<FILE>) {
	if (/^name=(.*)/) {
	    print "$1<br>";
	}
    }

}
