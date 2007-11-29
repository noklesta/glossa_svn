#!/usr/bin/perl

use CGI;
use File::Copy;
use strict;
use lib("/home/httpd/html/glossa/pm/");
use Glossa;
use Data::Dumper;

select(STDOUT);
$|=1;

print "Content-type: text/html\n\n";

my $corpus=CGI::param('corpus');
my $query_id = CGI::param('query_id');
my $user = $ENV{'REMOTE_USER'}; 

my $name = CGI::param('name');
 
my $conf = Glossa::get_conf_file($corpus);
my %conf = %$conf;

#print "<pre>";
#print Dumper %conf;

#print "CORPUS: $corpus<br>";
#print "QI: $query_id<br>";
#print "NAME: $name<br>";

unless ($query_id) {
    die("no query id");
}

my $orig = $conf{'tmp_dir'} . "/" . $query_id; 
my $new = $conf{'config_dir'} . "/" . $corpus . "/hits/" . $user . "/";

my $new = $conf{'config_dir'} . "/" . $corpus . "/hits/" . $user . "/";
unless (-e $new) {
    mkdir($new);
}


# change .conf: add name
my $c = $orig . ".conf";
open (CONF, ">>$c");
print CONF "\nname=", $name, "\n";
close CONF;

my @files=<$orig*>;

my $warning;

foreach my $f (@files) {

    my $n = $f;
    $n =~ s|.*/||;
    $n = $new . $n;

    my $ok = copy($f,$n);
    unless ($ok) {
	print "WARNING: could not copy $f to $n<br>";
	$warning = 1;
    }
}


unless ($warning) {
    print "The results have been saved. Hit the 'back' button on your browser to return to your results.";
}
