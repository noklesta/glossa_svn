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


my $sets_table = uc($corpus) . "annotation_sets";

# update from CGI values
my $newname = CGI::param('newname');
if ($newname) {
    $dbh->do(qq{ insert into $sets_table set name = '$newname'; });
}

## add value
## drop value

## set value as default



print "<html><head></head><body>";

print "<form action=\"", $conf{'cgiRoot'}, "/annotation_sets.cgi\" method=\"get\">";


print "name: <input name=\"newname\" type=\"text\"></input> <input type=\"submit\" value=\"Create set\"></input> <br>";
print "<input type='hidden' name='corpus' value='$corpus'></input>";

print "</form>";

print "<form action=\"", $conf{'cgiRoot'}, "/edit_set.cgi\" method=\"get\">";
print "<input type='hidden' name='corpus' value='$corpus'></input>";
print "<select name=\"set\">";

# get sets
my $sth = $dbh->prepare(qq{ SELECT id, name FROM $sets_table;});
$sth->execute  || die "Error fetching data: $DBI::errstr";
while (my ($id, $name) = $sth->fetchrow_array) {
    print "<option value=\"$id\">$name</option>";
}
print "</select>";

print " <input type=\"submit\" value=\"Edit set\"></input><br>";
print "</form>";


print "</body></html>";
