#!/usr/bin/perl

use CGI;
use DBI;

use Encode;
use WebCqp::Query_dev;
use lib("/home/httpd/html/glossa/pm");
use Glossa;
use Data::Dumper;

# meta
#  - tid
#  - felt i text, felt i author, felt i topic


my $s = CGI::param('s_id');
my $text = CGI::param('text_id');
my $context_size = CGI::param('cs');
my $corpus = CGI::param('corpus');
my $base_corpus=CGI::param('subcorpus');


my $conf=Glossa::get_conf_file($corpus);
my %conf = %$conf;

my $dsn = "DBI:mysql:database=$conf{'db_name'};host=$conf{'db_host'}";
my $dbh = DBI->connect($dsn, $conf{'db_uname'}, $conf{'db_pwd'}, {RaiseError => 1});


print "Content-type: text/html; charset=$conf{'charset'}\n\n";
print "<html><head></head><body>";



if ($context_size > 10) { $context_size = 10 }

print "<form action=\"", $conf{'cgiRoot'}, "/show_context.cgi\">";
print "context size: ";
print "<input type=\"text\" name=\"cs\" value=\"$context_size\" size=\"3\"></input> ";
print "<input type=\"hidden\" name=\"s_id\" value=\"$s\"></input>";
print "<input type=\"hidden\" name=\"corpus\" value=\"$corpus\"></input>";
print "<input type=\"hidden\" name=\"subcorpus\" value=\"$base_corpus\"></input>";
print "<input type=\"hidden\" name=\"text_id\" value=\"$text\"></input>";
print "<input type=\"submit\" value=\"change\"></input>";
print "<table cellpadding=20><tr><td width=\"300\" valign=\"top\">";



my $match;
my $match_id;

# FIXME


$base_corpus = uc($base_corpus);


my $text_table = uc($corpus) . "text";
my $author_table = uc($corpus) . "author";
my $class_table = uc($corpus) . "class";


$WebCqp::Query::Registry = $conf{'cwb_registry'};


my $query = new WebCqp::Query "$base_corpus";

$context_size++;

my $context_att = "s";

my $cqp = "<" . $context_att . "_id='" . $s . "'> [] expand to " . $context_att . ";";
if (($corpus eq 'nota') or ($corpus eq 'upus') or ($corpus eq 'taus')) {
    $context_att = "who";
    $s = CGI::param('who_line_key');
    $cqp = "<who_line_key='" . $s . "'> [] expand to " . $context_att . ";";

}

#    my $cqp2 = $cqp;
#    $cqp2 =~ s/\</{/g;
#    $cqp2 =~ s/\>/}/g;
#    print "<br>", $cqp2, "<br>";

$context_size = $context_size . " " . $context_att;

#print "CS: $context_size<br>";

$query->context($context_size, $context_size);
#$query->context("0 text", "0 text");



my ($result,$size) = $query->query("$cqp");

my @result = @$result;

$m = $result[0];

my $ord = $m->{'kwic'}->{'match'};
my $res_r = $m->{'kwic'}->{'right'};
my $res_l = $m->{'kwic'}->{'left'};
my $pos = $m->{'cpos'};

my $sql_query = "SELECT startpos,endpos FROM $text_table WHERE $text_table.tid='$text';";
#print $sql_query, "<br>";
my $sth = $dbh->prepare($sql_query);
$sth->execute  || die "Error fetching data: $DBI::errstr";
my ($startpos,$endpos) = $sth->fetchrow_array;

if ($startpos and $endpos) {
    my @ord = split(/ /, $ord);
    my @res_r = split(/ /, $res_r);
    my @res_l = split(/ /, $res_l);

    if (($pos - @res_l) < $startpos) {
	
	my $remove = @res_l - ($pos - $startpos);
	splice(@res_l, 0,$remove);
	$res_l = join(" ", @res_l);
	
    }
    if (($pos + @ord + @res_r) > $endpos) {
	
	my $context = $endpos - ($pos + @ord);
	splice(@res_r, $context);
	$res_r = join(" ", @res_r);
	
    }
}

print $res_l;
print "<br><br><I> $ord </I><br><br>";

print "<div style=\"word-wrap: break-word\">";
print $res_r;

print "</div></td><td>";


##########################################################################









my @meta_text = split(/ /, $conf{'meta_text'});
my @meta_text_print = @meta_text;
foreach my $m (@meta_text) {
    $m = $text_table . "." . $m;
}
my $text_select = join(", ", @meta_text);

my $sql_query = "SELECT $text_select FROM $text_table WHERE $text_table.tid='$text';";
#print $sql_query, "<br>";
my $sth = $dbh->prepare($sql_query);
$sth->execute  || die "Error fetching data: $DBI::errstr";
my @r = $sth->fetchrow_array;

for (my $i=0;$i<@r;$i++)  {
    print "$meta_text_print[$i]: <b>", $r[$i], "</b><br>";
}



my @meta_class = split(/ /, $conf{'meta_class'});
my @meta_class_print = @meta_class;
foreach my $m (@meta_class) {
    $m = $class_table . "." . $m;
}
my $class_select = join(", ", @meta_class);

my $sql_query = "SELECT $class_select FROM $class_table WHERE $class_table.tid='$text';";
my $sth = $dbh->prepare($sql_query);
$sth->execute  || die "Error fetching data: $DBI::errstr";
while (my @r = $sth->fetchrow_array) {
    for (my $i=0;$i<@r;$i++)  {
	print "$meta_class_print[$i]: <b>", $r[$i], "</b><br>";
    }
    
}



print "</td></tr></table></body></html>";



