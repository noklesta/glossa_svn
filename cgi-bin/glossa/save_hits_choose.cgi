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



print "<table><tr><td valign='top'><br>";
print "<form action='", $conf{'cgiRoot'}, "/save_hits.cgi' method='GET'>";
print "<input type='hidden' name='corpus' value='$corpus' />";
print "<input type='hidden' name='query_id' value='$query_id' />";
print "<input name='name' /> name of results set<br><br>";
print "<input type='submit' value='Save results'/>";
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


print "<td width=50>&nbsp;</td>";

print "<td valign='top' width=200 style='background-color:#efefef;border-width:1px;border-style:solid;border-color:#afaeae'>";

print "<b>Help:</b><br>";
print "<p>To save a set of results, you must give them a name; so it can be retrieved easily later.";

print "</td></tr></table>";
