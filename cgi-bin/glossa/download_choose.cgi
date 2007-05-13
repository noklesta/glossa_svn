#!/usr/bin/perl

use CGI;
use lib("/home/httpd/html/glossa/pm");
use Glossa;

print "Content-type: text/html\n\n";

my $corpus = CGI::param('corpus');

my $conf = Glossa::get_conf_file($corpus);
my %conf = %$conf;


my $query_id = CGI::param('query_id');

print "<html><head></head><body>";
print "<form action=\"", $conf{'cgiRoot'}, "/download.cgi\" method=\"get\">";
print "<input type=\"hidden\" name=\"query_id\" value=\"$query_id\">";

print "<input type=\"checkbox\" name=\"head\" checked></input> Create headings<br>";

print "<table cellspacing=\"20\"><tr><td valign=\"top\">";

print "<b>Token data (all):</b><br>";
print "<input type=\"checkbox\" name=\"form\" checked></input> Word form<br>";
print "<input type=\"checkbox\" name=\"lexeme\"></input> Lexeme<br>";
print "<input type=\"checkbox\" name=\"pos\"></input> POS tag<br>";

print "<b>Token data (match):</b><br>";
print "<input type=\"checkbox\" name=\"mform\" checked></input> Word form<br>";
print "<input type=\"checkbox\" name=\"mlexeme\"></input> Lexeme<br>";
print "<input type=\"checkbox\" name=\"mpos\"></input> POS tag<br>";

print "</td><td valign=\"top\">";

print "<b>Metadata:</b><br>";
print "<input type=\"checkbox\" name=\"text_id\"></input> Text id<br>";
print "<input type=\"checkbox\" name=\"sent_id\" checked></input> Sentence id<br>";
print "<input type=\"checkbox\" name=\"author\"></input> Author<br>";
print "<input type=\"checkbox\" name=\"language\"></input> Language<br>";
print "<input type=\"checkbox\" name=\"date\"></input> Publication date<br>";

print "</tr><tr><td valign=\"top\">";
print "<b><font size=\"+1\"><I>Alignments:</I></font></b><br>";
print "<input type=\"checkbox\" name=\"align\" checked></input> Include aligmnents";

print "</tr><tr><td valign=\"top\">";
print "<b>Token data (aligment):</b><br>";
print "<input type=\"checkbox\" name=\"aform\" checked></input> Word form<br>";
print "<input type=\"checkbox\" name=\"alexeme\"></input> Lexeme<br>";
print "<input type=\"checkbox\" name=\"apos\"></input> POS tag<br>";

print "</td><td valign=\"top\">";
print "<b>Metadata (alignment):</b><br>";
print "<input type=\"checkbox\" name=\"atext_id\"></input> Text id<br>";
print "<input type=\"checkbox\" name=\"asent_id\" checked></input> Sentence id<br>";
print "<input type=\"checkbox\" name=\"aauthor\"></input> Author<br>";
print "<input type=\"checkbox\" name=\"alanguage\"></input> Language<br>";
print "<input type=\"checkbox\" name=\"adate\"></input> Publication date<br>";

print "</td></tr></table>";

print "Format: <select name=\"format\"><option value=\"tsv\">Tab separated values</option><option value=\"csv\">Comma separated values</option><option value=\"xls\">Excel spreadsheet</option><option value=\"html\">HTML</option></select><br>";
print "<input type=\"submit\"></input>";
print "</form>";
print "</body></html>";
