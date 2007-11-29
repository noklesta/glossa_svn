#!/usr/bin/perl

use CGI;
use lib("/home/httpd/html/glossa/pm");
use Glossa;

print "Content-type: text/html\n\n";

my $corpus = CGI::param('corpus');
my $base_corpus = CGI::param('base_corpus');

my $conf = Glossa::get_conf_file($corpus);
my %conf = %$conf;


my $query_id = CGI::param('query_id');

print "<html><head></head><body>";
print "<form action=\"", $conf{'cgiRoot'}, "/count.cgi\" method=\"get\">";
print "<input type=\"hidden\" name=\"query_id\" value=\"$query_id\">";
print "<input type=\"hidden\" name=\"corpus\" value=\"$corpus\">";

print "<input type=\"checkbox\" name=\"case\" checked></input> Case sensitive<br>";
print "<input type=\"checkbox\" name=\"head\" checked></input> Create headings<br>";

print "<br><b>Include:</b><br>";
print "<input type=\"checkbox\" name=\"form\" checked></input> Word form<br>";
print "<input type=\"checkbox\" name=\"lexeme\"></input> Lexeme<br>";
print "<input type=\"checkbox\" name=\"pos\"></input> POS tag<br>";

print "<br>Max number of results: <input type=\"text\" name=\"cutoff\" size=\"4\"></input><br>"; 

print "<br>Output format:<br> <select name=\"format\"><option value=\"html\" selected>HTML</option><option value=\"tsv\">Tab separated values</option><option value=\"csv\">Comma separated values</option><option value=\"xls\">Excel spreadsheet</option><option value=\"bars\">Histogram</option><option value=\"hbars\">Histogram (horisontal)</option><option value=\"pie\">Pie chart</option></select><br><br><input type=\"submit\"></input><br>";
print "</form>";
print "</body></html>";
