#!/usr/bin/perl
# $Id$

use CGI;

use lib("/home/httpd/html/glossa/pm");
use Glossa;

my $query_id = CGI::param('query_id');
my $db_name = CGI::param('db_name');
my $corpus = CGI::param('corpus');
my $base_corpus = CGI::param('base_corpus');

my $ngram = CGI::param('ngram');

my $conf = Glossa::get_conf_file($corpus);
my %conf = %$conf;

# language locale file
my $lang = Glossa::get_lang_file($conf{'config_dir'}, $conf{'lang'});
my %lang = %$lang;


print "Content-type: text/html; charset=$conf{'charset'}\n\n";

print "<html><head><title>$lang{'coll_choose_title'}</title></head><body>";

print "<form action=\"", $conf{'cgiRoot'}, "/coll2.cgi\" method=\"get\">";

print "<input type=\"hidden\" name=\"query_id\" value=\"$query_id\">";
print "<input type=\"hidden\" name=\"corpus\" value=\"$corpus\">";
print "<input type=\"hidden\" name=\"base_corpus\" value=\"$base_corpus\">";

print "<table cellpadding=\"15\"><tr><td>";
print "<input type=\"checkbox\" name=\"case\">$lang{'coll_choose_casesensitive'}</input><br>";
print "<input type=\"checkbox\" name=\"globalstats\">$lang{'coll_choose_global_stats'}</input>";
#print "<b>$lang{'coll_choose_casesensitive_colon'}</b><br>";
#print "<input type=\"radio\" name=\"case\" value=\"never\" checked></input> $lang{'coll_choose_never'}<br>";
#print "<input type=\"radio\" name=\"case\" value=\"always\"></input> $lang{'coll_choose_always'}<br>";
#print "<input type=\"radio\" name=\"case\" value=\"proper\"></input> $lang{'coll_choose_on_proper_names'}<br>";

print "</td><td valign=\"top\">";
print "<b>$lang{'coll_choose_collocates'}</b><br>";
print "<input type=\"checkbox\" name=\"form\" checked></input>$lang{'coll_choose_wordform'} ";
print "<input type=\"checkbox\" name=\"lexeme\"></input>$lang{'coll_choose_lexeme'} ";
print "<input type=\"checkbox\" name=\"pos\"></input>$lang{'coll_choose_postag'} ";

print "</td></tr></table>";

print "&nbsp;&nbsp;&nbsp;&nbsp;<b>$lang{'coll_choose_context'}</b>";
print "<table cellpadding=\"15\"><tr><td>";

print "<input type=\"radio\" name=\"ngram\" value=\"2\" checked></input>$lang{'coll_choose_bigram'}<br>";

print "$lang{'coll_choose_statistical_measure'}<br>";
print "<select name=\"measure_bi\">";
print "<option value=\"freq\">$lang{'coll_choose_freq'}</option>";
print "<option value=\"dice\" selected>$lang{'coll_choose_dice'}</option>";
print "<option value=\"leftFisher\">$lang{'coll_choose_leftfisher'}</option>";
print "<option value=\"rightFisher\">$lang{'coll_choose_rightfisher'}</option>";
print "<option value=\"ll\">$lang{'coll_choose_llratio'}</option>";
print "<option value=\"tmi\">$lang{'coll_choose_tmi'}</option>";
print "<option value=\"pmi\">$lang{'coll_choose_pmi'}</option>";
print "<option value=\"odds\">$lang{'coll_choose_odds'}</option>";
print "<option value=\"phi\">$lang{'coll_choose_phi'}</option>";
print "<option value=\"tscore\">$lang{'coll_choose_tscore'}</option>";
print "<option value=\"x2\">$lang{'coll_choose_x2'}</option>";
print "</select>";

print "<br>$lang{'coll_choose_window_size'} ";
print "<input type=\"text\" name=\"window\" value=\"2\" size=\"2\"></input>";

print "</td><td valign=\"top\">";
print "<input type=\"radio\" name=\"ngram\" value=\"3\"></input>$lang{'coll_choose_trigram'} <br>";

print "$lang{'coll_choose_statistical_measure'}<br>";

print "<select name=\"measure_tri\">";
print "<option value=\"freq\">$lang{'coll_choose_freq'}</option>";
print "<option value=\"ll3\" selected>$lang{'coll_choose_llratio'}</option>";
print "</select>";

print "</td></tr></table>";

print "<table cellpadding=\"10\"><tr><td>";

print "<b>$lang{'coll_choose_cutoff'}</b><br>";
print "$lang{'coll_choose_cut_max'}<input type=\"text\" name=\"cut_max\" value=\"1000\" size=\"4\"></input> <br>";
print "$lang{'coll_choose_cut_min'} <input type=\"text\" name=\"cut_min\" size=\"3\"></input> <br>";
print "$lang{'coll_choose_cut_occur'} <input type=\"text\" name=\"cut_occ\" size=\"3\"></input> <br><br>";

print "</td><td valign=\"top\">";

#print "<b>$lang{'coll_choose_collo_filter'}</b><br>";
#print "<input type=\"text\" size=\"7\"></input>";

print "</td></tr></table>";

print "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<input type=\"reset\" value=\"$lang{'coll_choose_reset_button'}\"></input> <input type=\"submit\" value=\"$lang{'coll_choose_submit_button'}\"></input><br>";
print "</form>";
print "</body></html>";
