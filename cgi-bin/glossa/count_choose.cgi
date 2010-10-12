#!/usr/bin/perl
# $Id$

use CGI;
require "use_glossa.pl";

my %glossa_conf = Glossa::get_glossa_conf();

my $corpus = CGI::param('corpus');
my $base_corpus = CGI::param('base_corpus');

my $conf = Glossa::get_conf_file($corpus, $glossa_conf{'conf'});
my %conf = %$conf;

# language locale file
my $lang = Glossa::get_lang_file($glossa_conf{'conf'}, $conf{'lang'});
my %lang = %$lang;

my $query_id = CGI::param('query_id');

print "Content-type: text/html; charset=$conf{'charset'}\n\n";
print "<html><head></head><body>";
print "<form action=\"", $conf{'cgiRoot'}, "/count.cgi\" method=\"get\">";
print "<input type=\"hidden\" name=\"query_id\" value=\"$query_id\">";
print "<input type=\"hidden\" name=\"corpus\" value=\"$corpus\">";

print "<input type=\"checkbox\" name=\"case\" checked></input> $lang{'count_casesensitive'}<br>";
print "<input type=\"checkbox\" name=\"head\" checked></input> $lang{'count_create_headings'}<br>";

print "<br><b>$lang{'count_include'}</b><br>";
print "<input type=\"checkbox\" name=\"form\" checked></input> $lang{'count_wordform'}<br>";
print "<input type=\"checkbox\" name=\"lexeme\"></input> $lang{'count_lexeme'}<br>";
print "<input type=\"checkbox\" name=\"pos\"></input> $lang{'count_postag'}<br>";

print "<br>$lang{'count_maxresults'} <input type=\"text\" name=\"cutoff\" size=\"4\"></input><br>"; 

print "<br>$lang{'count_output_format'}<br> <select name=\"format\"><option value=\"html\" selected>$lang{'count_output_format_html'}</option><option value=\"tsv\">$lang{'count_output_format_tsv'}</option><option value=\"csv\">$lang{'count_output_format_csv'}</option><option value=\"xls\">$lang{'count_output_format_excel'}</option><option value=\"bars\">$lang{'count_output_format_histogram'}</option><option value=\"hbars\">$lang{'count_output_format_histogram_hor'}</option><option value=\"pie\">$lang{'count_output_format_pie'}</option></select><br><br><input type=\"submit\">$lang{'count_submit_button'}</input><br>";
print "</form>";
print "</body></html>";
