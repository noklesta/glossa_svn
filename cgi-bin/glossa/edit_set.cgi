#!/usr/bin/perl

use CGI;
use DBI;
use lib("/home/httpd/html/glossa/pm");
use Glossa;

my $corpus=CGI::param('corpus');
my $conf = Glossa::get_conf_file($corpus);
my %conf = %$conf;

my $dsn = "DBI:mysql:database=$conf{'db_name'};host=$conf{'db_host'}";
$dbh = DBI->connect($dsn, $conf{'db_uname'}, $conf{'db_pwd'}, {RaiseError => 1})          ||              die $DBI::errstr;


print "Content-type: text/html\n\n";


# update from CGI values
my $set_id = CGI::param('set');
my $action = CGI::param('action');

print "SET: $set_id<br>";
print "ACTION: $action<br>";

if ($action eq 'add') {
    my $newname = CGI::param('newname');
    if ($newname) {
	$dbh->do(qq{ insert into annotation_values set value_name = '$newname', set_id = '$set_id'; });
    }
}
elsif ($action eq 'drop') {

    my $value = CGI::param('value');
    if ($value) {
	$dbh->do(qq{ delete from annotation_values where id = '$value'; });
    }

}
elsif ($action eq 'default') {

    my $value = CGI::param('value');
    if ($value) {
	$dbh->do(qq{ update annotation_sets set default_value = '$value' where id = '$set_id'; });
    }

}

# get name
# get values

## add value
## drop value

## set value as default



print "<html><head></head><body>";
print "<script language=\"javascript\" src=\"", $conf{'htmlRoot'}, "/js/submit.js\"></script>";
print "<form action=\"", $conf{'cgiRoot'}, "/edit_set.cgi\" method=\"get\">";
print "<input type=\"hidden\" value=\"$set_id\" name=\"set\"></input>";
print "<input type=\"hidden\" name=\"action\"></input>";

print "<br><input type=\"button\" value=\"Add value\" onclick=\"submitForm('add')\"></input> name: <input name=\"newname\" type=\"text\"></input><br><br><br>";

print "Value: <select name=\"value\">";
print "<option value=\"\"></option>";
# get values
my $sth = $dbh->prepare(qq{ SELECT id, value_name FROM annotation_values where set_id = '$set_id';});
$sth->execute  || die "Error fetching data: $DBI::errstr";
while (my ($id, $name) = $sth->fetchrow_array) {
    print "<option value=\"$id\">$name</option>";
}
print "</select><br>";


print "<br><input type=\"button\" value=\"Drop value\" onclick=\"submitForm('delete')\"></input><br>";

my $sth = $dbh->prepare(qq{ SELECT default_value FROM annotation_sets where id = '$set_id';});
$sth->execute  || die "Error fetching data: $DBI::errstr";
my ($default) = $sth->fetchrow_array;

my $sth = $dbh->prepare(qq{ SELECT value_name FROM annotation_values where id = '$default';});
$sth->execute  || die "Error fetching data: $DBI::errstr";
my ($default) = $sth->fetchrow_array;

print "<br>Default value is: <b>$default</b>";


print "<br><input type=\"button\" value=\"Set new default\" onclick=\"submitForm('default')\"></input><br>";


print "</form>";






print "</body></html>";
