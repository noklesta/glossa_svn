#!/usr/bin/perl

use CGI;
use DBI;

require "use_glossa.pl";

# load main configuration file
my %glossa_conf = Glossa::get_glossa_conf();

my $corpus=CGI::param('corpus');
my $conf = Glossa::get_conf_file($corpus, $glossa_conf{'conf'});
my %conf = %$conf;

my $dsn = "DBI:mysql:database=$conf{'db_name'};host=$conf{'db_host'}";
$dbh = DBI->connect($dsn, $conf{'db_uname'}, $conf{'db_pwd'}, {RaiseError => 1})          ||              die $DBI::errstr;


print "Content-type: text/html\n\n";


# update from CGI values
my $set_id = CGI::param('set');
my $action = CGI::param('action');

my $sets_table = uc($corpus) . "annotation_sets";
my $values_table = uc($corpus) . "annotation_values";


if ($action eq 'add') {
    my $newname = CGI::param('newname');
    if ($newname) {
	$dbh->do(qq{ insert into $values_table set value_name = '$newname', set_id = '$set_id'; });
    }
}
elsif ($action eq 'drop') {

    my $value = CGI::param('value');
    if ($value) {
	$dbh->do(qq{ delete from $values_table where id = '$value'; });
    }

}
elsif ($action eq 'default') {

    my $value = CGI::param('value');
    if ($value) {
	$dbh->do(qq{ update $sets_table set default_value = '$value' where id = '$set_id'; });
    }

}

# get name
# get values

## add value
## drop value

## set value as default



print "<html><head></head><body>";

print "<script language=\"JavaScript\" src=\"", $conf{'htmlRoot'}, "/js/misc.js\"></script>";


print "<table><tr><td valign=top>";

print "<form action=\"", $conf{'cgiRoot'}, "/edit_set.cgi\" method=\"get\">";
print "<input type=\"hidden\" value=\"$set_id\" name=\"set\"></input>";
print "<input id='actionWidget' type=\"hidden\" name=\"action\"></input>";
print "<input type='hidden' name='corpus' value='$corpus'></input>";

print "<br>name: <input name=\"newname\" type=\"text\"></input> <input type=\"button\" value=\"Add value\" onclick=\"submitFormSets('add')\"></input> <br><br><br>";

print "<hr><br>";

print "Manage existing values:<br><br>";

print "Choose value: <select name=\"value\">";
print "<option value=\"\"></option>";
# get values
my $sth = $dbh->prepare(qq{ SELECT id, value_name FROM $values_table where set_id = '$set_id';});
$sth->execute  || die "Error fetching data: $DBI::errstr";
while (my ($id, $name) = $sth->fetchrow_array) {
    print "<option value=\"$id\">$name</option>";
}
print "</select><br>";


print "<br><input type=\"button\" value=\"Delete this value\" onclick=\"submitFormSets('delete')\"></input><br>";

my $sth = $dbh->prepare(qq{ SELECT default_value FROM $sets_table where id = '$set_id';});
$sth->execute  || die "Error fetching data: $DBI::errstr";
my ($default) = $sth->fetchrow_array;

my $sth = $dbh->prepare(qq{ SELECT value_name FROM $values_table where id = '$default';});
$sth->execute  || die "Error fetching data: $DBI::errstr";
my ($default) = $sth->fetchrow_array;




print "<br><input type=\"button\" value=\"Set this as default value\" onclick=\"submitFormSets('default')\"></input><br>";

print "<br>(default value is: '$default')";

print "</form>";


print "<td width=50>&nbsp;</td>";

print "<td valign='top' width=200 style='background-color:#efefef;border-width:1px;border-style:solid;border-color:#afaeae'>";

print "<b>Help:</b><br>";
print "<p>On this page, you may either <b>create</b> or <b>manage</b> annotation values. <p>To create one, type the name of the value you would like to create into the text field called 'name' and press 'Add value'.";
print "<p> To delete a value, choose it from the drop-down menu, and press 'Delete this value'. You can also set a value as a default; this means that it is preselected for all concordance lines, and it may save some time in annotation to set the most common value as a default.";

print "</td></tr></table>";




print "</body></html>";
