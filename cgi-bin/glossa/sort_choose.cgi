#!/usr/bin/perl
# $Id$

use CGI;
use lib("/home/httpd/html/glossa/pm");
use Glossa;

my $query_id = CGI::param('query_id');
my $corpus=CGI::param('corpus');

my $conf = Glossa::get_conf_file($corpus);
my %conf = %$conf;

# language locale file
my $lang = Glossa::get_lang_file($conf{'config_dir'}, $conf{'lang'});
my %lang = %$lang;

print "Content-type: text/html; charset=$conf{'charset'}\n\n";
print "<html><head></head><body>";
print "<form action=\"", $conf{'cgiRoot'}, "/sort.cgi\" method=\"get\">";
print "<input type=\"hidden\" name=\"query_id\" value=\"$query_id\"></input>";
print "<input type=\"hidden\" name=\"corpus\" value=\"$corpus\"></input>";

print "<input type=\"checkbox\" name=\"case\">$lang{'sort_casesensitive'}</input><br><br>";

print "<b>$lang{'sort_sort_by'}</b><br>";
print "<select name=\"primary\">";
print " <option value=\"left\">$lang{'sort_by_lc'}</option>";
print " <option value=\"match\" selected>$lang{'sort_by_hit'}</option>";
print " <option value=\"right\">$lang{'sort_by_rc'}</option>";
print " <option value=\"sent_id\">$lang{'sort_by_sid'}</option>";
print " <option value=\"random\">$lang{'sort_randomize'}</option>";
print "</select>";
print "<br><input type=\"text\" name=\"pos1\" size=\"2\"></input>$lang{'sort_position_from_hit'}<br>";
print "$lang{'sort_features'}<br>";
print "<input type=\"checkbox\" name=\"form_in1\" checked>$lang{'sort_wordform'}</input> ";
print "<input type=\"checkbox\" name=\"pos_in1\">$lang{'sort_postag'}</input> ";
print "<input type=\"checkbox\" name=\"lexeme_in1\">$lang{'sort_lexeme'}</input> <br>";

print "<br><b>$lang{'sort_secondary_by'}</b><br>";
print "<select name=\"secondary\">";
print " <option value=\"\" selected>$lang{'sort_not_selected'}</option>";
print " <option value=\"left\">$lang{'sort_by_lc'}</option>";
print " <option value=\"match\">$lang{'sort_by_hit'}</option>";
print " <option value=\"right\">$lang{'sort_by_rc'}</option>";
print " <option value=\"sent_id\">$lang{'sort_by_sid'}</option>";
print "</select>";
print "<br><input type=\"pos2\" size=\"2\"></input> $lang{'sort_position_from_hit'}<br>";
print "$lang{'sort_features'}<br>";
print "<input type=\"checkbox\" name=\"form_in2\">$lang{'sort_wordform'}</input> ";
print "<input type=\"checkbox\" name=\"pos_in2\">$lang{'sort_postag'}</input> ";
print "<input type=\"checkbox\" name=\"lexeme_in2\">$lang{'sort_lexeme'}</input> <br>";

print "<br><input type=\"reset\">$lang{'sort_reset_button'}</input>";
print " <input type=\"submit\">$lang{'sort_submit_button'}</input><br>";
print "</form>";
print "</body></html>";
