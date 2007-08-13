#!/usr/bin/perl

use CGI;
use DBI;
use lib ('/home/httpd/html/glossa/pm/');
use Glossa;

my $query_id = CGI::param('query_id');
my $corpus = CGI::param('corpus');



my $conf = Glossa::get_conf_file($corpus);
my %conf = %$conf;

my $dsn = "DBI:mysql:database=$conf{'db_name'};host=$conf{'db_host'}";
$dbh = DBI->connect($dsn, $conf{'db_uname'}, $conf{'db_pwd'}, {RaiseError => 0}) || die $DBI::errstr;

print "Content-type: text/html\n\n";


print "<html><head></head><body>";

print "select annotation set:<br>";
print "<form action=\"", $conf{'cgiRoot'}, "/show_page_dev.cgi\" method=\"get\">";

print "<input type=\"hidden\" name=\"query_id\" value=\"$query_id\"></input>";


print "<input type=\"hidden\" name=\"n\" value=\"1\"></input>";
print "<select name=\"set\">";

my $sets_table = uc($corpus) . "annotation_sets";

# get sets
my $sth = $dbh->prepare(qq{ SELECT id, name FROM $sets_table;});
$sth->execute  || die "Error fetching data: $DBI::errstr";
while (my ($id, $name) = $sth->fetchrow_array) {
    print "<option value=\"$id\">$name</option>";
}
print "</select>";

print "<br><input type=\"submit\" value=\"Annotate!\"></input><br>";
print "</form>";

print "<br><a href=\"", $conf{'cgiRoot'}, "/annotation_sets.cgi?corpus=$corpus\">Manage sets</a>";

print "</body></html>";
