#!/usr/bin/perl

use CGI;
use strict;
use File::Copy;
use lib("/home/httpd/html/glossa/pm");
use Glossa;

select(STDOUT);
$|=1;

print "Content-type: text/html\n\n";
print "<html><head></head><body>";


my $cgi = CGI->new;
my $corpus = CGI::param('corpus');
my $file = CGI::param('subcorpus_id');
my $name = CGI::param('subcorpus_name');

my $conf = Glossa::get_conf_file($corpus);
my %conf = %$conf;

my $new_file_name = $conf{'config_dir'} . "/" . $corpus . "/subcorp/" . $name . ".dat";

copy($file, $new_file_name) or die "File - $new_file_name - cannot be copied.";

print "Subcorpus is saved. Click <a href='' onclick='javascript:self.close()'>here</a> to close window.";
