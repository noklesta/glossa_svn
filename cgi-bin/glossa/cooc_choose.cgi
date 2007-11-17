#!/usr/bin/env perl

use CGI;
use lib("/home/httpd/html/glossa/pm");
use Glossa;

print "Content-type: text/html\n\n";

my $corpus = CGI::param('corpus');

my $conf = Glossa::get_conf_file($corpus);
my %conf = %$conf;





print "<html><head></head><body>";
print "<form action=\"", $conf{'cgiRoot'}, "/cooc.cgi\" method=\"get\">";

my $query_id = CGI::param('query_id');
print "<br><input type=\"hidden\" name=\"query_id\" value=\"$query_id\">";

print "<input type=\"checkbox\" name=\"case\">Case sensitive</input><br><br>";

print "<b>Co-occuring tokens:</b><br>";
print "<input type=\"checkbox\" name=\"form\" checked></input> Word form ";
print "<input type=\"checkbox\" name=\"lexeme\"></input> Lexeme ";
print "<input type=\"checkbox\" name=\"pos\"></input> POS tag";


print "<br><br><b>Statistical measure:</b><br>";
print "<select name=\"measure\">";
print "<option value=\"freq\">Frequency</option>";
print "<option value=\"dice\" selected>Dice Coefficient</option>";
print "<option value=\"leftFisher\">Fishers exact test - left sided</option>";
print "<option value=\"rightFisher\">Fishers exact test - right sided</option>";
print "<option value=\"ll\">Log-likelihood ratio</option>";
print "<option value=\"tmi\">Mutual Information</option>";
print "<option value=\"pmi\">Pointwise Mutual Information</option>";
print "<option value=\"odds\">Odds Ratio</option>";
print "<option value=\"phi\">Phi Coefficient</option>";
print "<option value=\"tscore\">T-score</option>";
print "<option value=\"x2\">Pearson\'s Chi Squared Test</option>";
print "</select>";


print "<br><br><b>Cutoff:</b><br>";
print "Maximum number of results: <input type=\"text\" name=\"cut_max\" value=\"1000\" size=\"4\"></input> <br>";
print "Minimum association value: <input type=\"text\" name=\"cut_min\" size=\"3\"></input> <br>";
print "Minimum no of occurences: <input type=\"text\" name=\"cut_occ\" size=\"3\"></input> <br><br>";

print "<b>Filters (space separated):</b><br>";
print "<select name=\"filter1_part\">";
print "<option value=\"pos\">Part of speech</option>";
print "<option value=\"form\">Word</option>";
print "<option value=\"lemma\">Lemma</option>";
print "</select>";
print "<select name=\"filter1_bool\">";
print "<option value=\"neg\">Exclude</option>";
print "<option value=\"pos\">Contains</option>";
print "</select>";
print "<input name=\"filter1_value\" size=\"20\"><br>";

print "<select name=\"filter2_part\">";
print "<option value=\"pos\">Part of speech</option>";
print "<option value=\"form\">Word</option>";
print "<option value=\"lemma\">Lemma</option>";
print "</select>";
print "<select name=\"filter2_bool\">";
print "<option value=\"neg\">Exclude</option>";
print "<option value=\"pos\">Contains</option>";
print "</select>";
print "<input name=\"filter2_value\" size=\"20\"><br>";

print "<select name=\"filter3_part\">";
print "<option value=\"pos\">Part of speech</option>";
print "<option value=\"form\">Word</option>";
print "<option value=\"lemma\">Lemma</option>";
print "</select>";
print "<select name=\"filter3_bool\">";
print "<option value=\"neg\">Exclude</option>";
print "<option value=\"pos\">Contains</option>";
print "</select>";
print "<input name=\"filter3_value\" size=\"20\"><br><br>";

print "<input type=\"reset\"></input> <input type=\"submit\"></input><br>";
print "</form>";
print "</body></html>";
