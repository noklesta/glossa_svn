#!/usr/bin/perl

use CGI;
use DBI;
use lib ('/home/httpd/html/glossa/pm/');
use Glossa;
use Data::Dumper;
use strict;

select(STDOUT);
$|=1;

print "Content-type: text/html\n\n";
print "<html><head></head><body>";






my $cgi = CGI->new;
# FIXME: this should be done in module
my %cgi_hash;
my @prms = $cgi->param();
foreach my $p (@prms) {
    my @vals = $cgi->param($p);
    $cgi_hash{$p}=\@vals;
}


my $in = Glossa::create_cgi_hash2(\%cgi_hash);
my %in = %$in;



my $CORPUS = $in{'query'}->{'corpus'}->[0];
#my $base_corpus = $in{'phrase'}->{'0'}->{'corpus'}->[0];


my $conf = Glossa::get_conf_file($CORPUS);
my %conf = %$conf;


my $dsn = "DBI:mysql:database=$conf{'db_name'};host=$conf{'db_host'}";
my $dbh = DBI->connect($dsn, $conf{'db_uname'}, $conf{'db_pwd'}, {RaiseError => 1})          ||              die $DBI::errstr;


my $format = CGI::param('format');


my ($subcorpus,$sql_query_nl,$texts_allowed) = Glossa::create_tid_list(\%conf, \%in, $CORPUS);


my $text_table = uc($CORPUS) . "text";
my $author_table = uc($CORPUS) . "author";
my $class_table = uc($CORPUS) . "class";

my %texts_allowed = %$texts_allowed;
my @tids = keys %texts_allowed;

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


print "<div id='origs'></div>";

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


my @tids_sorted = sort @tids;


# for OMC ...
my $origs;

my $s=1;
foreach my $tid (@tids_sorted) {



    my $sql_query = "SELECT $text_select FROM $text_table WHERE tid = '$tid';";

    my $sth = $dbh->prepare($sql_query);
    $sth->execute  || die "Error fetching data: $DBI::errstr";

    my @r = $sth->fetchrow_array;

    # for OMC ..
    if ($r[13] eq 'n') {
	$origs++;
    }

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

print "<script language='javascript'>";
print "document.getElementById('origs').innerHTML=$origs;";
print "</script>";
