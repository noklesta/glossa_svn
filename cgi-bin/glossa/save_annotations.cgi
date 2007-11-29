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
    

    my $value = CGI::param($name);

    if ($name =~ s/^annotation_//) {
	print "$name <b>$value</b><br>";
	update_db($value,'value_id',$name);
    }

    if ($name =~ s/^annotationcpos_//) {
	print "cpos: <b>$value</b><br>";
	update_db($value,'start',$name);
    }


}

print "</body></html>";

sub update_db {

    my ($val,$col,$s_id)=@_;

    my $sth = $dbh->prepare("SELECT id FROM $annotations_table where s_id = '$s_id' and set_id = '$set';");
    $sth->execute  || die "Error fetching data: $DBI::errstr";
    my ($id) = $sth->fetchrow_array;
    

    if ($id) {
	$dbh->do("update $annotations_table set $col = '$val' where id = '$id';");
    }
    else {
	$dbh->do("insert into $annotations_table set $col = '$val', s_id = '$s_id', set_id = '$set';");	
    }
    

			    


}


