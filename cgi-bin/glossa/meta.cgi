#!/usr/bin/perl

print "Content-type: text/html\n\n";

use CGI::Carp qw(fatalsToBrowser);
use strict;
use CGI;
use DBI;

require "use_glossa.pl";

my %glossa_conf = Glossa::get_glossa_conf();

# get cgi input
my $cgi = CGI->new;
my $corpus = CGI::param('corpus');
my $query_id = CGI::param('query_id');


my $conf = Glossa::get_conf_file($corpus, $glossa_conf{'conf'});
my %conf = %$conf;



my @tids;
# read query configuration fil
my $conf= $conf{'tmp_dir'} . "/" . $query_id . ".conf"; 
open (CONF, "$conf");
while (<CONF>) {
    chomp;
    if (/^texts_allowed=(.*)/) { 
	@tids = split(" ", $1);
    }
}
close CONF;

# turn off buffering
select(STDOUT);
$|=1;

# initialize MySQL
my $dsn = "DBI:mysql:database=$conf{'db_name'};host=$conf{'db_host'}";  
my $dbh = DBI->connect($dsn, $conf{'db_uname'}, $conf{'db_pwd'}, {RaiseError => 1});

my $text_table = uc($corpus) . "text";
my $author_table = uc($corpus) . "author";
my $class_table = uc($corpus) . "class";


my @meta_class = split(/ /, $conf{'meta_class'});
foreach my $m (@meta_class) {
    $m = $class_table . "." . $m;
}
my $class_select = join(", ", @meta_class);

my @meta_author = split(/ /, $conf{'meta_author'});
foreach my $m (@meta_author) {
    $m = $author_table . "." . $m;
}
my $author_select = join(", ", @meta_author);


print "<hr><table style='border-width:1px;border-style:outset;border-color:#afaeae;padding:0px;margin:0px'>";
print "<tr>";
my @meta_text = split(/ /, $conf{'meta_text'});
foreach my $m (@meta_text) {
    print "<td><b>", $m, "</b></td>";
    $m = $text_table . "." . $m;
}
my $text_select = join(", ", @meta_text);

if ($class_select) {
    print "<td><b>class</b></td>";
}
if ($author_select) {
    print "<td><b>author</b></td>";
}


print "<tr>";

my $s=1;
foreach my $tid (@tids) {

    my $sql_query = "SELECT $text_select FROM $text_table WHERE tid = '$tid';";

    my $sth = $dbh->prepare($sql_query);
    $sth->execute  || die "Error fetching data: $DBI::errstr";

    my @r = $sth->fetchrow_array;
	
    print "<tr"; 
    if ($s) {
	print " style='background-color:#eaeaea'";
	$s=0;
    }
    else {
	$s=1;
    }
    print "><td>";
    print join("</td><td>", @r);
    print "</td>";
    
    if ($class_select) {
	# FIXME: at det er den første kommer an på cgi.conf
	my $sql = "SELECT $class_select from $class_table where $class_table.tid='$r[0]';";
	
	my $sth2 = $dbh->prepare($sql);
	$sth2->execute  || die "Error fetching data: $DBI::errstr";
	
	print "<td>";
	my @res;
	while (my ($r2) = $sth2->fetchrow_array) { push @res, $r2 }
	print join("<hr>", @res);
	print "</td>";
	
    }

    if ($author_select) {
	# FIXME: at det er den første kommer an på cgi.conf
	my $sql = "SELECT $author_select from $author_table where $author_table.tid='$r[0]';";
	
	my $sth2 = $dbh->prepare($sql);
	$sth2->execute  || die "Error fetching data: $DBI::errstr";
	
	print "<td>";
	my @res;
	while (my (@r2) = $sth2->fetchrow_array) { my $tmp = join(" ", @r2); push @res, $tmp; }
	print join("<hr>", @res);
	print "</td>";
	
    }    

    print "<tr>";
    
}



print "</table>";
print "<hr>";


