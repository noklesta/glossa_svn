#!/usr/bin/perl
# $Id$

use CGI::Carp qw(fatalsToBrowser);
use strict;
use CGI;
use POSIX;
use Data::Dumper;
use DBI;
use File::Copy;
#use Text::Iconv;
use Encode;

require "use_glossa.pl";

# load main configuration file
my %glossa_conf = Glossa::get_glossa_conf();

##                                        ##
##             0. Initialization          ##
##                                        ##



## get cgi input

# All the input from the user (form data) is converted to a hash, which
# is sendt to the Glossa module for further processing, since some 
# of the information is stored as "_"-delimited names and values.
# It is returned as a new hash "%in" containing all the input
# as a hash of hashes, which can be called like this:
# $corpus = $in{'query'}->{'corpus'}->[0];

my $cgi = CGI->new;

# FIXME: this should be done in module

my $test = 0;

my $attribute_type = $cgi->param('atttype');

# for multiple-attribute display
my $multiple_attribute_display = 0;
if($attribute_type eq 'x'){$multiple_attribute_display = 2; $attribute_type = 0;}


my %cgi_hash;
my @prms = $cgi->param();
foreach my $p (@prms) {

    my @vals = $cgi->param($p);

    if($test){print $p."-".@vals."<br />";}

    $cgi_hash{$p}=\@vals;
}

# This functions converts the cgi input to a hash, based on underscores
# (_) in the parameter names. This is a bit unintuitive, and is a key point
# to grasp.
# FIXME: examples
my $in = Glossa::create_cgi_hash2(\%cgi_hash);
my %in = %$in;


my $debug = 0;

# get shorter name of some values that are used frequently
my $CORPUS = $in{'query'}->{'corpus'}->[0];
my $ROOT = $in{'query'}->{'root'}->[0];
my $user = $ENV{'REMOTE_USER'};



my $display_struct = CGI::param('structDisplay');


## read configuration files
# FIXME: should also be done in module
# FIXME: standard file format
my $conf = Glossa::get_conf_file($CORPUS, $glossa_conf{"conf"});
my %conf = %$conf;

my $corpus_mode = $conf{'corpus_mode'};
my $speech_corpus = 0;
if( $corpus_mode eq 'speech'){ $speech_corpus = 1 }

## postprocessing of configuration
my %atts_hide;
foreach my $a (split(/ +/, $conf{'corpus_attributes_hide'})) {
    $atts_hide{$a}=1;
}

my %atts_mult;
foreach my $a (split(/ +/, $conf{'corpus_attributes_multiple'})) {
    $atts_mult{$a}=1;
}

# multitags file
my $multitags= Glossa::get_multitags_file($conf{'config_dir'}, $CORPUS);
my %multitags = %$multitags;

# language locale file
my $lang = Glossa::get_lang_file($conf{'config_dir'}, $conf{'lang'});
my %lang = %$lang;

## start the HTTP session and HTML file
print "Content-type: text/html; charset=$conf{'charset'}\n\n";
print "<html><head><link rel=\"shortcut icon\" href=\"$conf{'favicon'}\" type=\"image/ico\" />\n<title>$lang{'query_title'}</title><link href=\"", $conf{'htmlRoot'}, "/html/tags.css\" rel=\"stylesheet\" type=\"text/css\"></link>\n<script language=\"JavaScript\">var language = \"" . $conf{'lang'} . "\";</script>";
my $googletrans = <<STOP;
<script type="text/javascript" src="http://www.google.com/jsapi"></script>
<script type="text/javascript">
google.load("language", "1");
function translate(node, text) {
  google.language.detect(text, function(result) {
    if (!result.error && result.language) {
      google.language.translate(text, result.language, "en",
                                function(result) {
        if (result.translation) {
	    node.innerHTML = result.translation;
	    node.innerHTML += " <font size='-2'>(google)</font>"; //"&nbsp;<img src='http://tekstlab.uio.no/glossa/html/img/google-g-icon-16.png'>";
        }
        else{ node.innerHTML = 'No translation available' }
      });
    }
  });
}
</script>
STOP
my $style = <<STYLE;
<style>
div.inspect{

	top: 0px;
	left:0px;
	padding: 5px;
	border: 0px solid #000;
	background: #fff;
	width: 1000px;
        height: 280px;
	display: none;
}
</style>
STYLE
print "\n$googletrans\n\n";
print "$style\n</head>\n<body>\n";

if($speech_corpus){
    print "  <div id=\"inspector\" class=\"inspect\">\n" .
	"    <iframe frameborder='0' width='100%' height='100%' id=\"movie_frame\"></iframe>\n" .
	"    <div style=\"position: relative; left: 980px; top: -290px; cursor: pointer\" onclick=\"document.getElementById('inspector').style.display='none';\">\n" .
	"      <img alt=\"[x]\" src=\"" . $conf{'htmlRoot'}  . "html/img/close.png\" />\n" . 
	"    </div>\n" .
	"  </div>\n<br />\n";
}

print "<div style='display:none' id='tagwidget' class='tag'></div>";

# FIXME: temporary message
#if ($CORPUS eq 'test') {
#    print "<script language=\"JavaScript\">stopWait()</script>";
#    print "<strong><font color='red'>Sorry!<br><br>We don't currently have a completely free corpus 
#that we can show results from. If you would like to know more about Glossa, and actually see how it displays results, please contact lars.nygaard\@iln.uio.no</strong><font color='grey'>'";
#    die;
#}
 
$debug = 0;

## for debugging
if ($debug) {
    # print "L: $conf_file<br>";
    print "<pre>";
    print Dumper %in;
    print "</pre>";
}
# more debugging
if($debug){
    my @prms = $cgi->param();
    foreach my $prm (@prms){
	my @vals = $cgi->param($prm);
	my $elts = @vals;
	if($vals[0]){
	    print "$prm ($elts): ";
	    foreach my $val (@vals){ print "$val, " }
	    print "<br />";
	}
    }
}


# group file; for corpora with restricted access (in addition to 
# the .htaccess restrictions). Space-separated list of allowed users.
if ($conf{'groupfile'}) {
    unless (-e $conf{'groupfile'}) { die("group file specified, but not found ($conf{'groupfile'})"); }
    my %allowed_users;
    open (H, $conf{'groupfile'});
    while (<H>) {
	next if (/^\s*#/);
	next if (/^\s*\n/);
	chomp;
	foreach my $u (split(/ +/, $_)) {
	    $allowed_users{$u}=1;
	}
    }
    unless ($allowed_users{$user}) {
	die("$lang{'query_no_access'}");
    }
}


# set up charset conversion

#my $iconv;
#my $iconvr;
#if ($conf{'charsetfrom'}) {
#    $iconv= Text::Iconv->new($conf{'charsetfrom'}, $conf{'charset'});
#    $iconvr= Text::Iconv->new($conf{'charset'}, $conf{'charsetfrom'});
#} 

## open log file
open (LOG, ">>$conf{'logfile'}");


## turn off buffering; just a trick to display stuff more quickly
select(STDOUT);
$|=1;


## initialize MySQL session
my $dsn = "DBI:mysql:database=$conf{'db_name'};host=$conf{'db_host'}";
my $dbh = DBI->connect($dsn, $conf{'db_uname'}, $conf{'db_pwd'}, {RaiseError => 1});


## define some entities
my $apostr = chr(0x60);





##                                        ##
##             1. Build query             ##
##                                        ##

# hashes for storing sub-queries
my %corpora;                           
my %aligned_corpora;                   
my %aligned_corpora_opt;               # "opt" = optional

my $base_corpus;                       # name of base corpus (i.e. non-aligned)
my $aligned;                           # boolean: indicate if there are restrictions on aligned corpora
my $phrases=$in{'phrase'}->{'number'}; # the number of phrases (i.e. "rows" in the interface)

my @token_freq;


## Loop through all the phrases
# This is a key step, where the form data is converted to fragments 
# in the CQP query language. The fragments are then put in the hashes for 
# corpora, aligned_corpora or aligned_corpora_opt



foreach my $row (@$phrases) {



    # get the name of the *first* corpus, this is defined as the "base corpus" 
    my $corpus = $in{'phrase'}->{$row}->{'corpus'}->[0];
    if ($row == 0) {
	$base_corpus=$corpus;
    }

    # for storing the cqp expression for the entire row (FIXME: aka. "phrase)
    my $cqp_query_row;

    # loop through each token in the row
    my $i=1;
    while (my $token=$in{'token'}->{$row}->{$i}) {

	# for storing the cqp expression for the token
	my $cqp_query;



	my $string_neg;                             # is it negated?
	my $string_class="word";                    # the default; can be changed to "lemma"
	my $string_case = " \%c";                   # the default: case insensitive
	my $string_string=$token->{'string'}->[0];  # the word sting

	if ($conf{'charsetfrom'}) {
#	    $string_string = $iconvr->convert($string_string);
	    Encode::from_to($string_string, $conf{'charset'}, $conf{'charsetfrom'});
	} 

	# escape special character unless the user wants to use
       # regular expressions
	unless ($in{'query'}->{'regex'}) {
	    $string_string =~ s/([\.|\?|\+|\*|\|\'|\"])/\\$1/g;
	}

	
	my $occurrence_restr;                       # store occurrence restrictions

	# loop through token attributes (POS, case etc.)
	my %atts;	
	my $atts = $token->{'atts'};
	foreach my $att (@$atts) {
	    my ($cat,$val)=split(/_/, $att);

	    # FIXME: a hack, since "_" was stupidly chosen as a delimiter 
	    $cat =~ s/~/_/g;
	    $val =~ s/~/_/g;

	    $val =~ s/ /_/g; # for multi-word-expressions

	    if ($conf{'charsetfrom'}) {
#		$val = $iconvr->convert($val);
		Encode::from_to($val, $conf{'charset'}, $conf{'charsetfrom'});
	    } 

	    # the attributes in the "word" submenu
	    if ($cat eq 'w') {
		if ($val eq 'lemma') {
		    $string_class = "lemma";
		}
		if ($val eq 'phon') {
		    $string_class = "phon";
		}
		elsif ($val eq 'lex') {
		    $string_class = "lex";
		}
		elsif ($val eq 'end') {
		    $string_string = ".*" . $string_string;
		}
		elsif ($val eq 'start') {
		    $string_string = $string_string . ".*";
		}
		elsif ($val eq 'middle') {
		    $string_string = ".+" . $string_string . ".+";
		}
		elsif ($val eq 'case') {
		    $string_case = "";
		}
		elsif ($val eq 'neg') {
		    $string_neg = 1;
		}
	    }
	    # the attributes in the "occurence" submenu
	    elsif ($cat eq 'occ') {
		$occurrence_restr=$val;
	    }
	    elsif ($val =~ s/^!//) { 	    # if the feature is negated
		$atts{'neg'}->{$cat} .= "|" . $cat . "=\"" . $val. "\"";
	    }
	    else {                              # if it's *not* negated
		# normal treatment to all others:
		$atts{'pos'}->{$cat} .= "|" . $cat . "=\"" . $val . "\"";
	    }

	}



	my @pos;  # list of non-negated cqp fragments
	my @neg;  # list of negated cqp fragments

	
	unless ($string_string eq '') {
	    if ($string_neg) {
		$atts{'neg'}->{$string_class} .= "|" . $string_class . "=\"" . $string_string . "\"" . $string_case;
	    }
	    else {
		$atts{'pos'}->{$string_class} .= "|" . $string_class . "=\"" . $string_string . "\"" . $string_case;
	    }
	}

	# start of the cqp fragment for the entire token
	$cqp_query .= "[";

	# loop through the non-negated attributes, put them in the proper list 
	my $pos = $atts{'pos'};
	if ($pos) {
	    my %pos = %$pos;
	    while (my ($cat,$vals) = each %pos) {
		my @vals = split(/\|/, $vals);
		shift @vals;
		my $pos = "(" . join(" | ", @vals) . ")";
		push @pos, $pos;
	    }
	}

	# concatenate the list of non-negated fragments to the token fragment
	if (@pos > 0) {
	   $cqp_query .= "(" . join(" & ", @pos) . ")";
	}

	# loop through the negated attributes, put them in the proper list 
	my $neg = $atts{'neg'};
	if ($neg) {
	    my %neg = %$neg;
	    while (my ($cat,$vals) = each %neg) {
		my @vals = split(/\|/, $vals);
		shift @vals;
		my $neg = "(" . join(" | ", @vals) . ")";
		push @neg, $neg;
	    }
	}

	# concatenate the list of negated fragments to the token fragment
	if (@neg > 0) {

	    # the negative fragments must be prefixed by an "&" if there are
	    # any positive ones
	    if (@pos > 0) {
		$cqp_query .= " & ";
	    }

	    $cqp_query .= " !(" . join(" | ", @neg) . ")";
	}

	# end of the cqp fragment for the entire token
	$cqp_query .= "]";

	push @token_freq, Glossa::get_token_freq($cqp_query,\%conf,$CORPUS);
	

	# add occurence restrictions
	$cqp_query .= $occurrence_restr;

       # for each token, there follows an "interval"
	# (i.e. how many unspecified tokens may follow)
	
	my $min = $token->{'intmin'}->[0];
	my $max = $token->{'intmax'}->[0];

	if ($min or $max) { 
	    unless ($min) { $min = 0 }  # the default is 0
	    # create cqp fragment and add to cqp expression for the token
	    $cqp_query = " []{" . $min . "," . $max . "} " . $cqp_query; 
	}
	
	# add expression for the token to expression for the row
	$cqp_query_row .= $cqp_query;
	
	$i++; # next token
	
    }
    
    
    # if fullQuery is used the previous step is not relevant:
    if ($in{'fullQuery'}) {
	$cqp_query_row = $in{'fullQuery'}->{$row}->{'string'}->[0];
    }
	
	
    # if the row is associated with the base corpus, put it in the %corpora
    # hash
    if ($corpus eq $base_corpus) {
	$corpora{$corpus}->{$cqp_query_row}=1;
    }
    # else, put it in either the %aligned_corpora or the %aligned_corpora_opt hash
    else {

	# all aligned cqp expressions are paranthesised
	$cqp_query_row = " (" . $cqp_query_row;

	# check for negation
	if ($in{'phrase'}->{$row}->{'mode'}->[0] eq 'exclude') {
	    $cqp_query_row = " !" . $cqp_query_row;
	}

	# check for optionality
	my $optalign = $in{'phrase'}->{$row}->{'optalign'}->[0]; # optionality of the row
	if ($optalign eq 'on') {
		$aligned_corpora_opt{$corpus}=1; # we only add the name of the corpus,
                                                 # since restriction does not make
		                                 # sense for optional alignment
	}
	else {
	      
	    # Non-optional alignments can be connected with either AND or OR.
            # Therefore, this section is sligthly more complex than the other ones
	    
	    # get previous expressions for rows with the same corpus name
	    my $previous_hash = $aligned_corpora{$corpus};
	    my $previous = (keys %$previous_hash)[0];
	    
	    # check the connection type (AND or OR)
	    my $connect_bool = $in{'phrase'}->{$row}->{'connectBool'}->[0];

	    if (($connect_bool eq 'and') and $previous) { 
		# non-default: join explicitly and delete previous
		my $cqp_query_both = $previous . ") :" . $corpus . " " . $cqp_query_row;
		$aligned_corpora{$corpus}->{$cqp_query_both}=1;
		delete $aligned_corpora{$corpus}->{$previous};
	    }
	    else { # use the default connection
		$aligned_corpora{$corpus}->{$cqp_query_row}=1;
	    }
	    $aligned=1; # only the non-optinal alignment sets this, since
                        # the purpose is to do optimalizations based on
                        # the viability of early query restrictions
	}
    }
    

}


# the full cqp expression for the base corpus
my $base_queries = $corpora{$base_corpus};

# stop if the query is empty
if ($$base_queries{'[]'}) {
    die("Empty queries are not allowed.\n");
}


# start the full cqp expression ($cqp_all), by
# joining rows pertaining to the base corpus
# (note: a cqp limitation forces this to always be 
# joined by "OR" (i.e. "|"); in the future AND queries
# should perhaps be hacked together by subqueries). 
my $cqp_all = "(" . join(") | (", (keys %$base_queries)) . ") ";


# add cqp expressions for aligned corpora
while (my ($k,$v) = each %aligned_corpora) {
    $cqp_all .= ":" . $k . "" . join(") | (", (keys %$v)) . ") "
}

# end it
    $cqp_all .= ";";

$debug = 0;
if ($debug) {
    print "CQP: ", $cqp_all, "\n";
}






##                                        ##
##             2. Build subcorpus         ##
##                                        ##

# Query the database for 
# - $subcorpus: boolean, whether there are subcorpus restrictions
# - $sql_query_nl: a natural language expression for the subcorpus restrictions
# - $list: a list of allowed text-ids
# The subcorpus information (allowed token spans) is stored by the module in a .dump file
# with the rest of the files pertaining to the query.
my ($subcorpus,$sql_query_nl,$list) = Glossa::create_tid_list(\%conf, \%in, $CORPUS, \%aligned_corpora, \%aligned_corpora_opt, $base_corpus);

my %list = %$list;
my %video_stars;
if ($speech_corpus){
    my $sth = $dbh->prepare( "SELECT tid FROM " . uc ( $CORPUS ) . "author where video = 'Y';");
    $sth->execute  ||  print TEMP "Error fetching data: $DBI::errstr";
    while (my ($v) = $sth->fetchrow_array) {
	$video_stars{ucfirst $v} = 1;
    }
}
my @infs = keys %list;
my $infs = @infs;


# print natural language version
if ($sql_query_nl) {
    print "$lang{'query_metaquery'}: $sql_query_nl<br>";
}




##                                        ##
##             3. Execute query           ##
##                                        ##



# print search expression
my $cqp_query_source2print = $cqp_all;
if ($conf{'charsetfrom'}) {
#    $cqp_query_source2print = $iconv->convert($cqp_query_source2print);
    Encode::from_to($cqp_query_source2print, $conf{'charsetfrom'}, $conf{'charset'});
} 
$cqp_query_source2print =~ s/</\&lt;/g;
$cqp_query_source2print =~ s/>/\&gt;/g;
my $top_text = "$lang{'query_string'}: <b>\"$cqp_query_source2print\"</b><br>";


# start waiting ticker
print "<div id='waiting'>$lang{'query_searching'}</div>";
print "<script language=\"JavaScript\" src=\"", $conf{'htmlRoot'}, "/js/language.js\"></script>";
print "<script language=\"JavaScript\" src=\"", $conf{'htmlRoot'}, "/js/wait.js\"></script>";
print "<script language=\"JavaScript\" src=\"", $conf{'htmlRoot'}, "/js/", $CORPUS, ".conf.js\"></script>";


# initialize CWB
$Query_dev::Registry = $conf{'cwb_registry'};

# get some CWB parameters
my $results_max=$in{'query'}->{'results'}->{'max'}->[0];
my $randomize=$in{'query'}->{'results'}->{'random'}->[0];
my $fastcut=$in{'query'}->{'results'}->{'fastcut'}->[0];

# initialize CWB query object
my $query = new Query_dev "$base_corpus";

# print errors
$query->on_error(sub{grep {print "<2>$_</h2>\n"} @_});

# specify aligned corpora
$query->alignments(keys %aligned_corpora, keys %aligned_corpora_opt); 

# get structural attributes
my $sts = $conf{'corpus_structures'};
my @sts = split(/ +/, $sts);
$query->structures(@sts);  # specify str-attrib. to print

# get positional attributes
my $atts = $conf{'corpus_attributes'};
my @atts = split(/ +/, $atts);
$query->attributes(@atts); # specify pos-attrib. to print
shift @atts; # it is used later, without "word" attribute (always first)


# There are three ways of reducing the number of hits. We use the 
# standard "cut" and "reduce" cqp functions (first hits or random hits) 
# if there are no restrictions due to alignment). Because of the  "cut 
# applies too early"-bug in CWB, however, the patched version of 
# the perl cqp interface has a "cut2" function that is used instead.
# (Note: cut2 is slightly slower than "cut" but insanly faster than 
# importing all hits into perl, and then cutting the array size). 
if ($randomize and $results_max) {
    $query->reduce($results_max);
}
elsif ($results_max and !$aligned and !$randomize and $fastcut) { 
    $query->cut($results_max);
}
elsif ($results_max) { 
    $query->cut2($results_max);
}

# specify name of context ("s" is default)
# FIXME: should be in config file
my $sentence_context;
if ($speech_corpus) {
    $sentence_context='who';
}
else {
    $sentence_context= 's';
}

if ($debug) {
    print "7";
}

## specify context size

# get type and size from user 
my $context_type= $in{'query'}->{'context'}->{'type'}->[0];
my $context_left= $in{'query'}->{'context'}->{'left'}->[0];
my $context_right=$in{'query'}->{'context'}->{'right'}->[0];

# one sentence is default
if ($context_type eq "chars") {                   # FIXME: should be 'words'
    $context_left = $context_left . " word";
    $context_right = $context_right . " word";
    $query->context($context_left, $context_right);
}
elsif ($context_type eq "sentences") { 
    $context_left++; $context_right++;
    $context_left = $context_left . " " . $sentence_context;
    $context_right = $context_right . " " . $sentence_context;
    $query->context($context_left, $context_right);
}
else { $query->context('1 s', '1 s'); }

# execute cqp command to restrict to subcorpus
if ($subcorpus) {
    my $dumpfile = $conf{'tmp_dir'} . "" . $conf{'query_id'} . ".dump";
#    print "DUMPFILE: $dumpfile<br>";

    $query->exec("undump QUERY < \"$dumpfile\";");
    $query->exec("QUERY;");
}


# the search-within-search feature. CQPs 'undump' function is used
# to create a subcorpus, based on the previous search (defined by a
# file created by the 'dump' function.
if (CGI::param('searchWithin') eq 'last') {
    my $dumpfile = $conf{'hits_files'} . "/" . $user . ".lastsearch";
    print "<font color=red>undump QUERY with target keyword < \"$dumpfile\";</font>";
    $query->exec("undump QUERY with target keyword < \"$dumpfile\";");
    $query->exec("QUERY;");
}

$debug = 0;
if ($debug) {
    print "8";
    print "<pre>";
    print Dumper $query;
    print "</pre>";
}



# finally, execute the query
my ($result,$size) = $query->query("$cqp_all", $glossa_conf{'cwb_ver'});

my @result;
if ($result) {
@result = @$result;
} 
else {    
#added...
    my $str;

    while ( $cqp_query_source2print =~ s/\(([\w]+)\=//  ){

	next unless $1 !~ /word/;
	$str .= $1 . ", ";

    }
    $str =~ s/, $//; 
    my $more = "";

    if($str){ $more = $lang{'missing_tag'} . " " . $str . "."; }

    print "<b> $lang{'zero_hits'} $more</b><br><br>";
# ...to here

#    print "<b>-- no hits --</b><br><br>";
}

if (@token_freq > 1) {
    print @token_freq;
    print "<br>";
}



if ($debug) {
    print "9";
}

    
# count number of hits
my $nr_result = @result;



##                                        ##
##             4. Print result            ##
##                                        ##

# For storing all uniqe tag combinations. Will later be used to 
# create "divs" that floats over words, displaying grammatical information. 
my %tags;
my $tag_i;

# The first data file. The DATA filehandle will later be replaced, if there
# are a sufficient number of hits.
my $filename=$conf{'tmp_dir'} . "/" . $conf{'query_id'} . "_1.dat"; 
open (DATA, ">$filename");

# A file for storing a html snippet about the search (search string, links to results
# pages etc.)
my $top=$conf{'tmp_dir'} . "/" . $conf{'query_id'} . ".top";
open (TOP, ">$top");

# Some meta-information, used by other scripts.
my $conf=$conf{'tmp_dir'} . "/" . $conf{'query_id'} . ".conf"; 
open (CONF, ">>$conf");
print CONF "context_type=$context_type\n";
close CONF;


# Javascript programs used in displaying results.
print "<script language=\"JavaScript\" src=\"", $conf{'htmlRoot'}, "/js/reslist.js\"></script>";
print "<script language=\"JavaScript\" src=\"", $conf{'htmlRoot'}, "/js/showtag.js\"></script></head>\n<body>";
my $googletrans = <<STOP;
<script type="text/javascript" src="http://www.google.com/jsapi"></script>
<script type="text/javascript">
google.load("language", "1");
function translate(node, text) {
  google.language.detect(text, function(result) {
    if (!result.error && result.language) {
      google.language.translate(text, result.language, "en",
                                function(result) {
        if (result.translation) {
	    node.innerHTML = result.translation;
	    node.innerHTML += " <font size='-2'>(google)</font>"; //"&nbsp;<img src='http://tekstlab.uio.no/glossa/html/img/google-g-icon-16.png'>";
        }
        else{ node.innerHTML = 'No translation available' }
      });
    }
  });
}
</script>
STOP


## links to subsidiary scripts

# The basic part of each URL
my $actionurl = 
  "corpus=" . $in{'query'}->{'corpus'}->[0] 
  . "&query_id=" . $conf{'query_id'}
  . "&base_corpus=" . $in{'phrase'}->{0}->{'corpus'}->[0];
  ;

# Create a select widget. The onchange event redirects to the selected url. (The onclick event sets 
# the selected value to 0, ensureing that even when selecting the same action twice 
# the "onchange" event will still fire.) 
$top_text .= "$lang{'query_action'}: <select id='actionselect' onClick=\"this.options.selectedIndex=0\" onChange=\"window.location.href=(this.options[this.selectedIndex].value)\"><option>$lang{'query_not_selected'}</option>";
$top_text .= "<option value='" . $conf{'cgiRoot'} . "/count_choose.cgi?$actionurl'>$lang{'query_count'}</option> ";
$top_text .= "<option value='" . $conf{'cgiRoot'} . "/download_choose.cgi?$actionurl'>$lang{'query_download'}</option> ";
$top_text .= "<option value='" . $conf{'cgiRoot'} . "/sort_choose.cgi?$actionurl'>$lang{'query_sort'}</option> ";
$top_text .= "<option value='" . $conf{'cgiRoot'} . "/coll_choose.cgi?$actionurl'>$lang{'query_collocations'}</option> ";
                                                                                               
# only relevant for multilingual corpora
if ($conf{'type'} eq 'multilingual') {
    $top_text .= "<option value='" . $conf{'cgiRoot'} . "/cooc_choose.cgi?$actionurl'>$lang{'query_co-occurrence'}</option> ";
}


$top_text .= "<option value='" . $conf{'cgiRoot'} . "/annotate_choose.cgi?$actionurl'>$lang{'query_annotate'}</option> ";
$top_text .= "<option value='" . $conf{'cgiRoot'} . "/meta.cgi?$actionurl'>$lang{'query_metadata'}</option> ";
$top_text .= "<option value='" . $conf{'cgiRoot'} . "/meta-dist.cgi?$actionurl'>$lang{'query_meta-dist'}</option> ";
$top_text .= "<option value='" . $conf{'cgiRoot'} . "/show_page_dev.cgi?$actionurl&n=1&del=yes'>$lang{'query_delete'}</option> ";
$top_text .= "<option value='" . $conf{'cgiRoot'} . "/save_hits_choose.cgi?$actionurl'>$lang{'query_save_hits'}</option> ";

$top_text .="</select><br>";







# The top text is now finished; print it to STDOUT and to file.
print TOP $top_text;
print $top_text;

# this span will later be used to hold the links to the results pages.
# (We do not yet know how many there will be. We cannot use the number of
# results, since some results may be discarded.
# FIXME: is this still true?
# )
print "<span id=\"placeholder\"></span>";


my $results_page = $in{'query'}->{'results'}->{'page'}->[0];
my $link_structure = $conf{'link_structure'};
my $hits = 0;

my $c; my $d_files=1;

print "<table border=\"0\">";



my $delayedprint_all;

my $source_line;
my $target_line;
my $alignmentp;
my $aligns=0;


# stop waiting ticker
print "<script language=\"JavaScript\">stopWait()</script>";


# loop through result set

for (my $i = 0; $i < $nr_result; $i++) {





    ##########################################
    #
    # 4.1: Structural annotation
    #
    ##########################################

    
    $source_line="";
    $target_line="";
    $alignmentp=0;

    my $m;
    # if $results_max they are already randomized
    if (($randomize) and !($results_max)) { $m = splice (@result, rand @result, 1) }
    else { $m = $result[$i] }
    #print LOG $m->{'kwic'}->{'match'} . "\n";



    # For structural annotations.
    my %sts;

    # Loop through the annotations specified in the configuration file,
    # make some corpus-specific changes, and add them to a hash.
    foreach my $a (@sts) {

	# temporary fix for OMC ...
	next if (($CORPUS eq 'omc') and ($a eq 'text_id'));
	next if (($CORPUS eq 'omc4') and ($a eq 'text_id'));
	next if (($CORPUS eq 'upus') and ($a eq 'text_id'));
	next if (($CORPUS eq 'upus') and ($a eq 's_id'));
	next if (($CORPUS eq 'upus2') and ($a eq 'text_id'));
	next if (($CORPUS eq 'upus2') and ($a eq 's_id'));

	# the right way ...
	$sts{$a} = $m->{'data'}->{$a};

	$sts{$a} = $m->{'data'}->{$a};
	# temporary fix for OMC ...
	if (($CORPUS eq 'omc' or $CORPUS eq 'omc4') and ($a eq 's_id')) {
	    my $tmp = $m->{'data'}->{$a};
	    if ($tmp =~ m/([^\.]+)\.(.*)/) {
		$sts{'text_id'} = $1;
	    }
	}

	# temporary fix for NOTA
	if ($speech_corpus and ($a eq 'who_name')) {
	    $sts{'text_id'} = $m->{'data'}->{$a};
	}
	if ($speech_corpus and ($a eq 'who_line_key')) {
	    $sts{'s_id'} = $m->{'data'}->{$a};
	}

    }

    #corpus position
    $sts{'cpos'}=$m->{'cpos'};

    # get value to display from database
    if ($display_struct and !($sts{$display_struct})) {     # i.e. if the value to be displayed is not
                                                            # a cqp structural annotation
	$sts{$display_struct} = Glossa::get_metadata_feat($display_struct, $sts{'text_id'},\%conf);

    } 
    

    # structural annotations as a string (to be used later).
    my @sts_strings;
    while (my ($key, $val) = each %sts) {
	push @sts_strings, $key . "=" . $val;
    }

    my $sts_string = join("||", @sts_strings);



    ##########################################
    #
    # 4.2: Base concordance. part 11.
    #
    ##########################################

    # get the matching phrase from cqp
    my $ord = $m->{'kwic'}->{'match'};

    # get the right and left context from cqp
    my $res_r = $m->{'kwic'}->{'right'};
    my $res_l = $m->{'kwic'}->{'left'};


    # FIXME: is this still necessary?
    next if ($results_max and ($hits >= $results_max));
    $hits++;


    # Keep track of number of results in this page/datafile.
    # Change page/datafile if necessary.
    $c++;
    if ($c == $results_page) {
	$d_files++;
	close DATA;
	my $filename=$conf{'tmp_dir'} . "/" . $conf{'query_id'} . "_" . $d_files . ".dat";
	open (DATA, ">$filename");
	$c=0;
    }

    # convert the charset of the matches and context
    if ($conf{'charsetfrom'}) {
	foreach my $textstring ($res_l,$ord,$res_r) {
#	    $textstring = $iconv->convert($textstring);
	    Encode::from_to($textstring, $conf{'charsetfrom'}, $conf{'charset'});
	}
    } 

    # print to the data file
    print DATA $base_corpus, "\t", $sts{'s_id'}, "\t", $sts_string, "\t$res_l\t$ord\t$res_r\n";


    ##########################################
    #
    # 4.3. Alignment
    #
    ##########################################


    # Loop through the possible target corpora, retrieve alignement (if any).
    foreach my $a (keys %aligned_corpora, keys %aligned_corpora_opt) { 

	# Name always lowercased for CQP
	my $a = lc($a);

	# Get aligned region
	my $al = $m->{$a};
	next if ($al =~ m/^\(no alignment/);

	# Convert charset of aligned region.
	# FIXME: charset should possibly be specified by corpus, not by
	# project. (But: Future versions of CQP is supposed to support 
	# unicode ...
	if ($conf{'charsetfrom'}) {
#	    $al = $iconv->convert($al);
	    Encode::from_to($al, $conf{'charsetfrom'}, $conf{'charset'});
	} 


	# Start the alignment output.
	if ($hits < $results_page) {
	    $target_line.="<tr bgcolor=\"#ffffff\"><td>";  # Aligned regions are gray.
	}
	$target_line .= "<tr style='color:gray'><td>";


	#
	##  Retrieve the id of the aligned region, based on the id of the matched region.
	#   (Unfortunately CQP does not offer this function; thus this hack.)

	# the name of the corpus, as a basis for the language name.
	# FIXME: this is just silly.
	my $lang = $a;
	
	# FIXME: should be correct in db
	$lang =~ s/omc3_//;
	$lang =~ s/omc4_//;
	$lang =~ s/run_//;

	# FIXME: should be general
	if ($CORPUS eq 'samno') {
	    if ($base_corpus eq 'SAMNO_SAMISK') {  $lang = "sme" }
	    if ($base_corpus eq 'SAMNO_NORSK') {  $lang = "nob" }
	}


	# The name of the MySQL table.
	my $table = $CORPUS;
	$table = uc($table) . "s_align";


	# Id's for the aligned region.
	my $target_tid; # the text id
	my @target_sids; # one or more sentence ids

	my $t2;
	my $targets;

	# Run the query.
	my $sth = $dbh->prepare(qq{ SELECT target FROM $table where source = '$sts{'s_id'}' and lang = '$lang';});
	$sth->execute  || die "Error fetching data: $DBI::errstr";

	#Loop through the results.
	while (my ($target) = $sth->fetchrow_array) {

	    $t2 = $target;
	    $t2 =~ s/\..*//g;
		
	    #		next unless ($texts_target{$t2});
	    
	    $targets .= "$target ";

	    $target_tid = $t2;
	    push @target_sids, $target;

	    if ($hits < $results_page) {
		
		$alignmentp=1;

		# Print links for context/metadata for the aligned regions.
		# FIXME: generaliser
		$target_line.="<font size=\"-2\"><a href=\"#\" onClick=\"window.open('$conf{'cgiRoot'}/show_context.cgi?s_id=$target&text_id=$t2&cs=3&corpus=$in{'query'}->{'corpus'}->[0]&subcorpus=$a',";
		$target_line.="'mywindow','height=500,width=650,status,scrollbars,resizable');\">$target</a> </font>";
		    
		    
	    }
		
	}


	# Print the aligned regions.
	if ($hits < $results_page) {

	    $target_line .= "</td><td";
	    if ($context_type eq "chars") {
		$target_line .= " colspan=3";
	    }
	    $target_line .= ">";

	    # Output of the aligned regions. handling tags etc.
	    # (does not actually print, but adds to the "$target_line" variable,
	    # which will be printed later).
	    my ($print) = print_tokens_target($al, $attribute_type), "<br>";

	    $target_line .= "</td></tr>";
	    
	}

	my $target_sids = join(" ", @target_sids);

	# Print to data file.
	print DATA uc($a), "\t", $target_sids, "\t", $sts_string, "\t$al\n";
	
    } # end of alignment.



    ##########################################
    #
    # 4.4. Base concordance, part 2.
    #
    ##########################################

    if ($hits < $results_page) {

	my $ex_url = "?corpus=" . $in{'query'}->{'corpus'}->[0] . "&line_key=" . $sts{'who_line_key'} . "&size=1&nested=0";

	my $sts_url = "?corpus=" . $in{'query'}->{'corpus'}->[0] . "&subcorpus=" . $base_corpus;
	while (my ($k,$v)=each %sts) {
	    $sts_url .= "&" . $k . "=" . $v;
	}
	my $identifier = $sts{'s_id'};
	if($speech_corpus){$identifier = $sts{text_id};}
	$source_line=sprintf("<tr bgcolor=\"#ffffff\">\n<td colspan=\"2\" height=\"10\">\n</td>\n</tr>\n<tr>\n<td>\n<nobr>\n");
	if($speech_corpus){
	    $source_line.=sprintf("<font size=\"-2\">\n<a href=\"#\" onClick=\"window.open('$conf{'htmlRoot'}/html/profile.php?tid=$identifier&corpus=$CORPUS',");
	    $source_line.=sprintf("'mywindow','height=300,width=600,status,scrollbars,resizable');\"><img src='$conf{'htmlRoot'}/html/img/i.gif' alt='i' / border='0'></a> \n&nbsp;</font>\n");
	}

	else
	{
	    $source_line.=sprintf("<font size=\"-2\">\n<a href=\"#\" onClick=\"window.open('$conf{'cgiRoot'}/show_context.cgi$sts_url&cs=3',");
	    $source_line.=sprintf("'mywindow','height=500,width=650,status,scrollbars,resizable');\">$identifier</a> \n&nbsp;</font>\n");
	}


	if ($speech_corpus) {
	    if($video_stars{ucfirst $identifier}){
		$source_line.=sprintf("<font size=\"-2\">\n<a href=\"#\" onClick=\"document.getElementById('inspector').style.display='block';document.getElementById('movie_frame').src = '" . $conf{'htmlRoot'} . "html/expand.php$ex_url&video=1';\">\n");
		$source_line.=sprintf("<img style='border-style:none' src='$conf{'htmlRoot'}html/img/mov.gif'>\n</a> \n&nbsp;</font>");
	    }
		$source_line.=sprintf("<font size=\"-2\">\n<a href=\"#\" onClick=\"document.getElementById('inspector').style.display='block';document.getElementById('movie_frame').src = '" . $conf{'htmlRoot'} ."html/expand.php$ex_url&video=0';\">\n");
	    $source_line.=sprintf("<img style='border-style:none' src='$conf{'htmlRoot'}html/img/sound.gif'>\n</a> \n&nbsp;</font>");

	    $source_line.="<strong>" . $sts{"text_id"} . "</strong>&nbsp;";


	}
	if(!($speech_corpus and ($display_struct =~ /text\.tid/))){
	    $source_line.="<i>" . $sts{$display_struct} . "</i>";
	}
	$source_line.=sprintf("</nobr>\n</td>\n<td");
	if ($context_type eq "chars") { $source_line.=sprintf(" align=\"right\""); }
	$source_line.=sprintf(">\n");

	foreach my $a ($res_l, $res_r, $ord) {
            # temporary fixes (should be cleverer in corpus) ...
            $a =~ s/'/$apostr/g; #'
             $a =~ s/\&amp;quot;/\&quot;/g;
	}

	
	$source_line .= print_tokens($res_l, $attribute_type);
	if ($context_type eq "chars") {$source_line.=sprintf("</td><td>"); }
	$source_line.=sprintf("<b> &nbsp;");
	$source_line .= print_tokens($ord, $attribute_type);
	$source_line.=sprintf(" &nbsp;</b>");
	if ($context_type eq "chars") { $source_line.=sprintf("</td><td>"); }
	$source_line .= print_tokens($res_r, $attribute_type);
	$source_line.=sprintf("</td></tr>");


	if($multiple_attribute_display){
	    $source_line .= "<tr><td></td><td>";
	    $source_line .= print_tokens($res_l, 2);
	    if ($context_type eq "chars") {$source_line.=sprintf("</td><td>"); }
	    $source_line.=sprintf("<b> &nbsp;");
	    $source_line .= print_tokens($ord, 2);
	    $source_line.=sprintf(" &nbsp;</b>");
	    if ($context_type eq "chars") { $source_line.=sprintf("</td><td>"); }
	    $source_line .= print_tokens($res_r, 2);
	    $source_line.=sprintf("</td></tr>");

	    $source_line .= "<tr><td></td><td></td></tr>";
	}

	if($speech_corpus){
	    my $orig = get_first($res_l) . "<b>" . get_first($ord) . "</b>" . get_first($res_r);
	    $orig =~ s/"/_/g;
	    $source_line .= "<tr><td></td><td>";
	    $source_line .= "<div><span onclick=\"translate(this.parentNode, '$orig');\" style='font-size:small;cursor:pointer;'>[translate]</span></div>";
	    $source_line.=sprintf("</td></tr>");
	    $source_line .= "<tr><td></td><td></td></tr>";
	}


    }
=start

    if ($hits < $results_page) {

	my $ex_url = "?corpus=" . $in{'query'}->{'corpus'}->[0] . "&line_key=" . $sts{'who_line_key'} . "&size=1&nested=0";

	my $sts_url = "?corpus=" . $in{'query'}->{'corpus'}->[0] . "&subcorpus=" . $base_corpus;
	while (my ($k,$v)=each %sts) {
	    $sts_url .= "&" . $k . "=" . $v;
	}

	$source_line="<tr bgcolor=\"#ffffff\"><td colspan=\"2\" height=\"10\"></td></tr><tr><td><nobr>";
	$source_line.="<font size=\"-2\"><a href=\"#\" onClick=\"window.open('$conf{'cgiRoot'}/show_context.cgi$sts_url&cs=3',";
	$source_line.="'mywindow','height=500,width=650,status,scrollbars,resizable');\">$sts{'s_id'}</a> \n&nbsp;</font>";

	if($CORPUS eq 'upus'){ $ex_url .= "&db=upus&table=segments";  }

	if ($CORPUS eq 'nota' or $CORPUS eq 'upus') {
	    $source_line.="<font size=\"-2\"><a href=\"#\" onClick=\"window.open('http://omilia.uio.no/cgi-bin/glossa/expand.pl$ex_url&video=0',";
	    $source_line.="'mywindow','height=400,width=1000,status,scrollbars,resizable,screenX=0,screenY=5');\"><img style='border-style:none' src='$conf{'htmlRoot'}/html/img/mov.gif'></a> \n&nbsp;</font>";
	    $source_line.="<font size=\"-2\"><a href=\"#\" onClick=\"window.open('http://omilia.uio.no/cgi-bin/glossa/expand.pl$ex_url&video=audio',";
	    $source_line.="'mywindow','height=400,width=1000,status,scrollbars,resizable,screenX=0,screenY=5');\"><img style='border-style:none' src='$conf{'htmlRoot'}/html/img/sound.gif'></a> \n&nbsp;</font>";

	}
	$source_line.="<i>" . $sts{$display_struct} . "</i>";
	$source_line.="</nobr></td><td";
	if ($context_type eq "chars") { $source_line.=" align=\"right\""; }
	$source_line.=">";

	foreach my $a ($res_l, $res_r, $ord) {
            # temporary fixes (should be cleverer in corpus) ...
            $a =~ s/'/$apostr/g; # '
	    $a =~ s/\&amp;quot;/\&quot;/g;
	}


	my ($print) = print_tokens($res_l, $attribute_type);
 	$source_line .= $print;
	if ($context_type eq "chars") {$source_line.="</td><td>"; }
 	$source_line .= "<b> &nbsp;";

	my ($print,$delayedprint) = print_tokens($ord, $attribute_type);
 	$source_line .= $print;
	$delayedprint_all .= $delayedprint;

 	$source_line .= " &nbsp;</b>";
 	if ($context_type eq "chars") { $source_line.="</td><td>"; }
	my ($print) = print_tokens($res_r, $attribute_type);
	$source_line .= $print;
 	$source_line .= "</td></tr>";





    }

=cut
    print $source_line;
    print $target_line;

    print DATA "\n\n";




    

    
}


print "</table>";

print $delayedprint_all;

    ##########################################
    #
    # 5. Cleanup.
    #
    ##########################################


## to allow tags to be show at the bottom of the page
print "<br><br><br><br><br><br><br><br><br>";

# For each unique tag, create a div that can be "floated" 
# over the appropriate tokens.
while (my ($id, $tags) = each %tags) {
    print "\n<div id=\"$id\" class=\"tag\">$tags</div>";
}


# now that we know how many results there are, print 
# links to results pages on top of page

my $max;
if ($hits == $results_max) {
    $max= " $lang{'query_hits_of'} " . $size;
}

my $res_count = "$lang{'query_no_hits'}: ";
$res_count .= "<b>$hits</b> $max<br>$lang{'query_results_pages'}: ";
# The javscript function (in reslist.js) to display the links to the 
# results pages (in the "placeholder" span).

if($multiple_attribute_display){$attribute_type = 'x'}

#print "<script language=\"javascript\">showList($d_files,\'$conf{'query_id'}\',$hits,'$CORPUS','$max', '$res_count');</script>";
print "<script language=\"javascript\">showList($d_files,\'$conf{'query_id'}\',$hits,'$CORPUS','$max', '$res_count', '$attribute_type')</script>\n";

# print page header to file, so that it is accessible for 
# the other results pages
print TOP $res_count;
foreach my $i (1..$d_files) {
    my $id = "page_" . $i;
    print TOP " <a id=\"$id\" href=\"$conf{'cgiRoot'}/show_page_dev.cgi?n=$i&query_id=$conf{'query_id'}&corpus=$CORPUS&atttype=$attribute_type\">$i</a> ";
}
print "</body></html>\n";



## create searchdump

# Dump the positions of the query result (start and end positions of the matching phrase 
# i.e. *not* the context.
#   This file is used for the "search-within-results" function.
#   Note that this dump is different from the subcorpus dump file.
# "cqp> undump A with target keyword < '/tmp/1179238682_77981.searchdump';"

# execute cqp command to restrict to subcorpus
my $dumpfile = $conf{'tmp_dir'} . "/" . $conf{'query_id'} . ".searchdump";
$query->exec("dump Last > '$dumpfile';");

# add number of lines (required for cqp's 'undump' function, used for importing the dump data)
my @lines;
open (DUMP, "$dumpfile");
while (<DUMP>) {
    push @lines, $_;
}
close DUMP;
open (DUMP, ">$dumpfile");
my $len = @lines;
print DUMP $len, "\n";
print DUMP @lines;
close DUMP;

# copy to position for "last query"
my $dumpfile2 = $conf{'hits_files'} . "/" . $user . ".lastsearch";
copy($dumpfile, $dumpfile2);

sub get_first{

    my $line = shift;
    $line =~ s/\/[^ ]+//g;
    return $line;

}
sub print_tokens {
    
    my $in = shift;
    my $atts_index = shift;
    my @t = split (/ /, $in);
    my $string  ="";
    foreach my $t (@t) {

	my (@atts_token) = split(/\//, $t);

	my $token_string = $atts_token[$atts_index];
	if($token_string eq '__UNDEF__'){ $token_string = "<span style='color: #444; font-style: italic;'>" . $atts_token[0] . "</span>"; }
	shift @atts_token;

	my $token_atts;

	foreach my $a (@atts) {

	    my $att_token = shift @atts_token;
	    next if ($att_token eq "_");
	    next if ($att_token eq "__UNDEF__");
	    next unless ($att_token);
	    if ($a =~ m/_/) {

		my $new_a = $multitags{$a}->{$att_token};
#		print $a, "::", $att_token, "->", $new_a, "<br>";
		$token_atts .= "<b>_" . $new_a . "_: </b>" . $att_token . "<br>";		
	    }
	    else {
		$token_atts .= "<b>" . $a . ": </b>" . $att_token . "<br>";		
	    }

	}

	$tag_i++;
	$string .= sprintf("<span onMouseOver=\"showTag(arguments[0], \'$tag_i\')\" onMouseOut=\"hideTag(\'$tag_i\')\">\n");
	$string .= sprintf("%s </span>",$token_string); 
	$tags{$tag_i}=$token_atts;
	## pling pling
#	print TEMP "token_atts: $token_atts\n"
    }
    return $string;
    
}

sub print_tokens_target {

    my $in = shift;
    my @t = split (/ /, $in);

    foreach my $t (@t) {

	my (@atts_token) = split(/\//, $t);
	my $token_string = shift @atts_token;

	my $token_atts;

	foreach my $a (@atts) {
	    my $att_token = shift @atts_token;
	    next if ($att_token eq "_");
	    next if ($att_token eq "__UNDEF__");
	    next unless ($att_token);
	    if ($a =~ m/_/) {

		my $new_a = $multitags{$a}->{$att_token};

		$token_atts .= "<b>" . $new_a . ": </b>" . $att_token . "<br>";		
	    } else {
		$token_atts .= "<b>" . $a . ": </b>" . $att_token . "<br>";		
	    }
	}

	$tag_i++;
	$target_line.=sprintf("<span onMouseOver=\"showTag(arguments[0], \'$tag_i\')\" onMouseOut=\"hideTag(\'$tag_i\')\">\n");
	$target_line.=sprintf("%s </span>",$token_string); 
	$tags{$tag_i}=$token_atts;

    }
}






