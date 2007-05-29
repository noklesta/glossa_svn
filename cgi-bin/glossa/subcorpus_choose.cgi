#!/usr/bin/perl

use CGI;
use strict;
use lib("/home/httpd/html/glossa/pm");
use Glossa;

select(STDOUT);
$|=1;

print "Content-type: text/html\n\n";
print "<html><head></head><body>";


my $corpus = CGI::param('corpus');
my $conf=Glossa::get_conf_file($corpus);
my %conf = %$conf;

my $subcorp_dir = $conf{'subcorp_files'};

my $user = $ENV{'REMOTE_USER'};

$subcorp_dir = $subcorp_dir . "/" . $user;

my @files = <$subcorp_dir/*.dat>;

foreach my $f (@files) {
    $f =~ s/\.dat$//;
    $f =~ s/.*\///;
    print "<a href='", $conf{'htmlRoot'}, "/html/index_dev.php?corpus=$corpus&subcorpus=$f'>$f</a><br>";
}
