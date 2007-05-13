#!/usr/bin/perl

use CGI;
use strict;
use lib("/home/httpd/html/glossa/pm/");
use Glossa;

select(STDOUT);
$|=1;

print "Content-type: text/html\n\n";

my $corpus=CGI::param('corpus');
my $user = $ENV{'REMOTE_USER'}; 
 
my $conf = Glossa::get_conf_file($corpus);
my %conf = %$conf;

my $hits_dir = $conf{'config_dir'} . "/" . $corpus . "/hits/" . $user . "/";

my @confs = <$hits_dir/*.conf>;

foreach my $conf (@confs) {

    my $query_id = $conf;
    $query_id =~ s/\.conf$//;
    $query_id =~ s/.*\///;

    open (CONF, $conf);
    while (<CONF>) {
        my ($key,$val) = split(/\s*=\s*/, $_);
	if ($key eq "name") {
	    print "<a href='", $conf{'cgiRoot'}, "/show_page_dev.cgi?query_id=$query_id&name=$val&corpus=$corpus&n=1'>$val</a><br>";
	}
    }

}

