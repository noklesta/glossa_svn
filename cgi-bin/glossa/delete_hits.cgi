#!/usr/bin/env perl

use CGI;
use File::Copy;
use strict;
use lib("/home/httpd/html/glossa/pm");
use Glossa;

select(STDOUT);
$|=1;

print "Content-type: text/html\n\n";

my $corpus=CGI::param('corpus');
my $conf = Glossa::get_conf_file($corpus);
my %conf = %$conf;

my $n = CGI::param('n');
my $query_id = CGI::param('query_id');

my @params = CGI::param('delete');

my %to_delete;
foreach my $p (@params) {
    $to_delete{$p}=1;
}

 

my $filename= $conf{'tmp_dir'} . "/" . $query_id . "_" . $n . ".dat"; 
open (DATA, "$filename");

my $filename_n=$conf{'tmp_dir'} . "/"  . $query_id . "_" . $n . ".tmp"; 
open (NEW, ">$filename_n");

$/="\n\n\n";

while (<DATA>) {

    my @lines = split(/\n/, $_);

    my $source = shift @lines;

    my ($corp, $s_id, $sts_string, $res_l, $ord, $res_r) = split(/\t/, $source);

    unless ($to_delete{$s_id}) {
	print NEW $_;
    }

}

close DATA;
close NEW;


copy($filename_n,$filename);



print "Please select:<br>";
 print "<a href='", $conf{'cgiRoot'}, "/show_page_dev.cgi?corpus=$corpus&n=$n&query_id=$query_id'>Finished deleting</a><br>";

 print "<a href='", $conf{'cgiRoot'}, "/show_page_dev.cgi?corpus=$corpus&n=$n&query_id=$query_id&del=yes'>Delete more hits on same page</a><br>";

my $m = $n+1;
my $filenamem=$conf{'tmp_dir'} . "/"  . $query_id . "_" . $m . ".dat"; 
if (-e $filenamem) {
 print "<a href='", $conf{'cgiRoot'}, "/show_page_dev.cgi?corpus=$corpus&n=$m&query_id=$query_id&del=yes'>Delete hits on next page</a><br>";
}
