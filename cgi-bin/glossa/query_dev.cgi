#!/usr/bin/perl

use CGI::Carp qw(fatalsToBrowser);
use strict;
use CGI;
use POSIX;
use Data::Dumper;
use DBI;
use WebCqp::Query_dev;
use File::Copy;

# if Glossa.pm is not installed in the system directories
# (you can use this, for example, if you are making changes, 
# or if you don't have access to the root account)          
use lib ('/home/httpd/html/glossa/pm/');

use Glossa;

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
my %cgi_hash;
my @prms = $cgi->param();
foreach my $p (@prms) {
    my @vals = $cgi->param($p);
    $cgi_hash{$p}=\@vals;
}
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

# main configuration file
my $conf_file = $ROOT . "/" . $CORPUS . "/cgi.conf";
my %conf;
open (CONF, $conf_file);
while (<CONF>) {
    chomp;
    next if (/^#/);
    s/\s*$//;
    my ($k,$v)=split(/\s*=\s*/);
    $conf{$k}=$v;
}
close CONF;

$conf{'base_corpus'}=$CORPUS;



# multitag file
my $file = $conf{'config_dir'} . "/" . $CORPUS . "/multitags.dat";
my %multitags;
open (M, $file);
while (<M>) {
    chomp;
    next if (/^#/);
    s/\s*$//;
    my ($a,$b,$c)=split(/\t/);
    next unless ($a and $b and $c);
    $multitags{$a}->{$b}=$c;
}
close M;

# language file
my $lang_file = $conf{'config_dir'} . "/lang/" . $conf{'lang'} . ".dat";
my %lang;
open (LANG, $lang_file);
while (<LANG>) {
    chomp;
    s/\s*$//;
    my ($k,$v)=split(/\s*=\s*/);
    $lang{$k}=$v;
}
close LANG;


## start the HTTP session and HTML file
print "Content-type: text/html; charset=$conf{'charset'}\n\n";
print "<html><head><title>$lang{'title'}</title><link href=\"", $conf{'htmlRoot'}, "/html/tags.css\" rel=\"stylesheet\" type=\"text/css\"></link></head><body>";


# FIXME: temporary message
if ($CORPUS eq 'test') {
    print "<script language=\"JavaScript\">stopWait()</script>";
    print "<strong><font color='red'>Sorry!<br><br>We don't currently have a completely free corpus 
that we can show results from. If you would like to know more about Glossa, and actually see how it displays results, please contact lars.nygaard\@iln.uio.no</strong><font color='grey'>'";
    die;
}


## for debugging
if ($debug) {
print "L: $conf_file<br>";
print "<pre>";
print Dumper %in;
print "</pre>";

}


# htgroup file; for corpora with restricted access (in addition to 
# the .htaccess restrictions). Space-separated list of allowed users.
if ($conf{'htgroup'}) {
    unless (-e $conf{'htgroup'}) { die("htgroup file specified, but not found ($conf{'htgroup'})"); }
    my %allowed_users;
    open (H, $conf{'htgroup'});
    while (<H>) {
	chomp;
	foreach my $u (split(/ +/, $_)) {
	    $allowed_users{$u}=1;
	}
    }
    unless ($allowed_users{$user}) {
	die("You do not have access to this corpus.");
    }
}


#if($test){
#    my @prms = $cgi->param();
#    foreach my $prm (@prms){
#	my @vals = $cgi->param($prm);
#	my $elts = @vals;
#	if($vals[0]){
#	    print "$prm ($elts): ";
#	    foreach my $val (@vals){ print "$val, " }
#	    print "<br />";
#	}
#    }
#}


## Set query id
# This id is used to identify the files resulting from a query, so 
# they can be processed by other functions (collocations, annotation etc.)
my $starttime=time();
my $rand = int(rand 100000);
$conf{'query_id'} = $starttime . "_" . $rand;

#print "ID: $conf{'query_id'}<br>";

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

	    # the attributes in the "word" submenu
	    if ($cat eq 'w') {
		if ($val eq 'lemma') {
		    $string_class = "lemma";
		}
		elsif ($val eq 'end') {
		    $string_string = ".*" . $string_string;
		}
		elsif ($val eq 'start') {
		    $string_string = $string_string . ".*";
		}
		elsif ($val eq 'middle') {
		    $string_string = ".*" . $string_string . ".*";
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

	# create the cqp fragment for the word/lemma string, if any
        # and place in the negated/non-negated list
	#unless ($string_string eq '') {
	#    my $string=$string_class . "=\"" . $string_string . "\"" . $string_case ;
	#    if ($string_neg) {
	#	push @neg, $string;
	#    }
	#    else {
	#	push @pos, $string;
	#    }
	#}
	
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

	    # the negative fragments must be prefixed by an "&" it there are
	    # any positive ones
	    if (@pos > 0) {
		$cqp_query .= " & ";
	    }

	    $cqp_query .= " !(" . join(" | ", @neg) . ")";
	}

	# end of the cqp fragment for the entire token
	$cqp_query .= "]";

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


# for debugging
#print $cqp_all, "\n";


##                                        ##
##             2. Build subcorpus         ##
##                                        ##

# Query the database for 
# - $subcorpus: boolean, whether there are subcorpus restrictions
# - $sql_query_nl: a natural language expression for the subcorpus restrictions
# - $list: a list of allowed text-ids
# The subcorpus information (allowed token spans) is stored by the module in a .dump file
# with the rest of the files pertaning to the query.
my ($subcorpus,$sql_query_nl,$list) = Glossa::create_tid_list(\%conf, \%in, $CORPUS, \%aligned_corpora, \%aligned_corpora_opt);

# print natural language version
if ($sql_query_nl) {
    print "$lang{'metaquery'}: $sql_query_nl<br>";
}



##                                        ##
##             3. Execute query           ##
##                                        ##



# print search expression
my $cqp_query_source2print = $cqp_all;
$cqp_query_source2print =~ s/</\&lt;/g;
$cqp_query_source2print =~ s/>/\&gt;/g;
my $top_text = "$lang{'query_string'}: <b>\"$cqp_query_source2print\"</b><br>";


# start waiting ticker
print "<div id='waiting'>searching </div>";
print "<script language=\"JavaScript\" src=\"", $conf{'htmlRoot'}, "/js/wait.js\"></script>";
print "<script language=\"JavaScript\" src=\"", $conf{'htmlRoot'}, "/js/", $CORPUS, ".conf.js\"></script>";


# initialize CWB
$WebCqp::Query::Registry = $conf{'cwb_registry'};

# get some CWB parameters
my $results_max=$in{'query'}->{'results'}->{'max'}->[0];
my $randomize=$in{'query'}->{'results'}->{'random'}->[0];

# initialize CWB query object
my $query = new WebCqp::Query "$base_corpus";

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
# (Note: cut2 is slightly slower than "cut" but insanaly faster than 
# importing all hits into perl, and then cutting the array size). 
if ($randomize and $results_max) {
    $query->reduce($results_max);
}
elsif ($results_max and !$aligned and !$randomize) { 
    $query->cut($results_max);
}
elsif ($results_max) { 
    $query->cut2($results_max);
}

# specify name of context ("s" is default)
# FIXME: should be in config file
my $sentence_context;
if ($CORPUS eq 'nota') {
    $sentence_context='who';
}
else {
    $sentence_context='s';
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
    my $dumpfile = $conf{'tmp_dir'} . "/" . $conf{'query_id'} . ".dump";
    $query->exec("undump QUERY < \"$dumpfile\";");
    $query->exec("QUERY;");
}



if (CGI::param('searchWithin') eq 'last') {
    my $dumpfile = $conf{'hits_files'} . "/" . $user . ".lastsearch";
    print "<font color=red>undump QUERY with target keyword < \"$dumpfile\";</font>";
    $query->exec("undump QUERY with target keyword < \"$dumpfile\";");
    $query->exec("QUERY;");
}

if ($debug) {
    print "8";
    print "<pre>";
    print Dumper $query;
    print "</pre>";
}

if ($debug) {
    print $cqp_all;
}

# finally, execute the query
my @result = $query->query("$cqp_all");    

if ($debug) {
    print "9";
}

    
# count number of hits
my $nr_result = @result;


##                                        ##
##             4. Print result            ##
##                                        ##


my %tags;
my $tag_i;


my $filename=$conf{'tmp_dir'} . "/" . $conf{'query_id'} . "_1.dat"; 
open (DATA, ">$filename");

my $top=$conf{'tmp_dir'} . "/" . $conf{'query_id'} . ".top";
open (TOP, ">$top");

my $conf=$conf{'tmp_dir'} . "/" . $conf{'query_id'} . ".conf"; 
open (CONF, ">>$conf");
print CONF "context_type=$context_type\n";
close CONF;

print "<script language=\"JavaScript\" src=\"", $conf{'htmlRoot'}, "/js/reslist.js\"></script>";
print "<script language=\"JavaScript\" src=\"", $conf{'htmlRoot'}, "/js/showtag.js\"></script></head>\n<body>";


my $actionurl = 
  "corpus=" . $in{'query'}->{'corpus'}->[0] 
  . "&query_id=" . $conf{'query_id'}
  . "&base_corpus=" . $in{'phrase'}->{0}->{'corpus'}->[0];
  ;

$top_text .= "$lang{'action'}: <select onChange=\"window.location.href=(this.options[this.selectedIndex].value)\"><option></option>";
$top_text .= "<option value='" . $conf{'cgiRoot'} . "/count_choose.cgi?$actionurl'>$lang{'count'}</option> ";
$top_text .= "<option value='" . $conf{'cgiRoot'} . "/download_choose.cgi?$actionurl'>$lang{'download'}</option> ";
$top_text .= "<option value='" . $conf{'cgiRoot'} . "/sort_choose.cgi?$actionurl'>$lang{'sort'}</option> ";
$top_text .= "<option value='" . $conf{'cgiRoot'} . "/coll_choose.cgi?$actionurl'>$lang{'collocations'}</option> ";
                                                                                               

if ($conf{'type'} eq 'multilingual') {
    $top_text .= "<option value='" . $conf{'cgiRoot'} . "/cooc_choose.cgi?$actionurl'>$lang{'co-occurence'}</option> ";
}

#$top_text .= "<option onClick='window.location.href=\"" . $conf{'cgiRoot'} . "/annotate_choose.cgi?$actionurl\"'>$lang{'annotate'}</option> ";
$top_text .= "<option value='" . $conf{'cgiRoot'} . "/annotate_choose.cgi?$actionurl'>$lang{'annotate'}</option> ";
$top_text .= "<option value='" . $conf{'cgiRoot'} . "/meta.cgi?$actionurl'>$lang{'metadata'}</option> ";
$top_text .= "<option value='" . $conf{'cgiRoot'} . "/meta-dist.cgi?$actionurl'>$lang{'meta-dist'}</option> ";
$top_text .= "<option value='" . $conf{'cgiRoot'} . "/show_page_dev.cgi?$actionurl&n=1&del=yes'>$lang{'delete'}</option> ";
$top_text .= "<option value='" . $conf{'cgiRoot'} . "/save_hits_choose.cgi?$actionurl'>$lang{'save_hits'}</option> ";

$top_text .="</select><br>";






print TOP $top_text;
print $top_text;

print "<span id=\"placeholder\"></span>";


my $results_page = $in{'query'}->{'results'}->{'page'}->[0];
my $link_structure = $conf{'link_structure'};
my $hits;

my $c; my $d_files=1;

print "<table border=\"0\">";


# loop through result set

my $source_line;
my $target_line;
my $alignmentp;
my $aligns=0;


# stop waiting ticker
print "<script language=\"JavaScript\">stopWait()</script>";

for (my $i = 0; $i < $nr_result; $i++) {

    
    $source_line="";
    $target_line="";
    $alignmentp=0;

    my $m;
    if ($randomize) { $m = splice (@result, rand @result, 1) }
    else { $m = $result[$i] }

    my %sts;

    foreach my $a (@sts) {

	# temporary fix for OMC ...
	next if (($CORPUS eq 'omc') and ($a eq 'text_id'));

	# the right way ...
	$sts{$a} = $m->{'data'}->{$a};

	# temporary fix for OMC ...
	if (($CORPUS eq 'omc') and ($a eq 's_id')) {
	    my $tmp = $m->{'data'}->{$a};
	    if ($tmp =~ m/([^\.]+)\.(.*)/) {
		$sts{'text_id'} = $1;
	    }
	}

	# temporary fix for NOTA
	if (($CORPUS eq 'nota') and ($a eq 'who_line_key')) {
	    $sts{'text_id'} = $m->{'data'}->{$a};
	}
	if (($CORPUS eq 'nota') and ($a eq 'who_line_key')) {
	    $sts{'s_id'} = $m->{'data'}->{$a};
	}

    }

    # get value to display from database
    if ($display_struct and !($sts{$display_struct})) {     # i.e. if the value to be displayed is not
                                                            # a cqp structural annotation
	$sts{$display_struct} = Glossa::get_metadata_feat($display_struct, $sts{'text_id'},\%conf);

    } 
    

    my @sts_strings;
    while (my ($key, $val) = each %sts) {
	push @sts_strings, $key . "=" . $val;
    }

    my $sts_string = join("||", @sts_strings);

    my $ord = $m->{'kwic'}->{'match'};
    my $res_r = $m->{'kwic'}->{'right'};
    my $res_l = $m->{'kwic'}->{'left'};


    next if ($results_max and ($hits >= $results_max));
    $hits++;

    $c++;
    if ($c == $results_page) {
	$d_files++;
	close DATA;
	my $filename=$conf{'tmp_dir'} . "/" . $conf{'query_id'} . "_" . $d_files . ".dat";
	open (DATA, ">$filename");
	$c=0;
    }


    print DATA $base_corpus, "\t", $sts{'s_id'}, "\t", $sts_string, "\t$res_l\t$ord\t$res_r\n";


    #
    #   alignment
    # 

    foreach my $a (keys %aligned_corpora, keys %aligned_corpora_opt) { #targets

	my $a = lc($a);
	my $al = $m->{$a};
	next if ($al =~ m/^\(no alignment/);
	
	my $lang = $a;
	
	# FIXME: should be correct in db
	$lang =~ s/omc3_//;

	# FIXME: should be general
	if ($CORPUS eq 'samno') {
	    if ($base_corpus eq 'SAMNO_SAMISK') {  $lang = "sa" }
	    if ($base_corpus eq 'SAMNO_NORSK') {  $lang = "no" }
	}

	my $t2;
	my $targets;
	
	if ($hits < $results_page) {
	    $target_line.=sprintf("<tr bgcolor=\"#ffffff\"><td>");
	}
	
	#	print $source_line;
	
	
	$target_line .= "<tr style='color:gray'><td>";


	my $table = $CORPUS;
	$table = uc($table) . "s_align";

	my $sth = $dbh->prepare(qq{ SELECT target FROM $table where source = '$sts{'s_id'}' and lang = '$lang';});

	my $target_tid;
	my @target_sids;

	$sth->execute  || die "Error fetching data: $DBI::errstr";
	while (my ($target) = $sth->fetchrow_array) {


	    $t2 = $target;
	    $t2 =~ s/\..*//g;
		
	    #		next unless ($texts_target{$t2});
	    
	    $targets .= "$target ";

	    $target_tid = $t2;
	    push @target_sids, $target;

	    if ($hits < $results_page) {
		
		$alignmentp=1;
		#                $target_line.=sprintf("<br />");
		# FIXME: generaliser
		$target_line.=sprintf("<font size=\"-2\"><a href=\"#\" onClick=\"window.open('$conf{'cgiRoot'}/show_context.cgi?s_id=$target&text_id=$t2&cs=3&corpus=$in{'query'}->{'corpus'}->[0]&subcorpus=$a',");
		$target_line.=sprintf("'mywindow','height=500,width=650,status,scrollbars,resizable');\">$target</a> </font>");
		    
		    
	    }
		
	}

	if ($hits < $results_page) {

	    $target_line .= "</td><td";
	    if ($context_type eq "chars") {
		$target_line .= " colspan=3";
	    }
	    $target_line .= ">";

	    print_tokens_target($al), "<br>";		

	    $target_line .= "</td></tr>";
	    
	}

	my $target_sids = join(" ", @target_sids);

	print DATA uc($a), "\t", $target_sids, "\t", $sts_string, "\t$al\n";
	
    }


    if ($hits < $results_page) {

	my $ex_url = "?corpus=" . $in{'query'}->{'corpus'}->[0] . "&line_key=" . $sts{'who_line_key'} . "&size=1&video=0&nested=0";

	my $sts_url = "?corpus=" . $in{'query'}->{'corpus'}->[0] . "&subcorpus=" . $base_corpus;
	while (my ($k,$v)=each %sts) {
	    $sts_url .= "&" . $k . "=" . $v;
	}

	$source_line=sprintf("<tr bgcolor=\"#ffffff\"><td colspan=\"2\" height=\"10\"></td></tr><tr><td><nobr>");
	$source_line.=sprintf("<font size=\"-2\"><a href=\"#\" onClick=\"window.open('$conf{'cgiRoot'}/show_context.cgi$sts_url&cs=3',");
	$source_line.=sprintf("'mywindow','height=500,width=650,status,scrollbars,resizable');\">$sts{'s_id'}</a> \n&nbsp;</font>");

	if ($CORPUS eq 'nota') {
	    $source_line.=sprintf("<font size=\"-2\"><a href=\"#\" onClick=\"window.open('http://omilia.uio.no/cgi-bin/nota/expand.pl$ex_url',");
	    $source_line.=sprintf("'mywindow','height=400,width=1000,status,scrollbars,resizable,screenX=0,screenY=5');\"><img style='border-style:none' src='http://omilia.uio.no/glossa/html/img/mov.gif'></a> \n&nbsp;</font>");

	}
	$source_line.="<i>" . $sts{$display_struct} . "</i>";
	$source_line.=sprintf("</nobr></td><td");
	if ($context_type eq "chars") { $source_line.=sprintf(" align=\"right\""); }
	$source_line.=sprintf(">");

	foreach my $a ($res_l, $res_r, $ord) {
            # temporary fixes (should be cleverer in corpus) ...
            $a =~ s/\'/$apostr/g; # '
            $a =~ s/\&amp;quot;/\&quot;/g;
	}


	print_tokens($res_l);
	if ($context_type eq "chars") {$source_line.=sprintf("</td><td>"); }
	$source_line.=sprintf("<b> &nbsp;");
	print_tokens($ord);
	$source_line.=sprintf(" &nbsp;</b>");
	if ($context_type eq "chars") { $source_line.=sprintf("</td><td>"); }
	print_tokens($res_r);
	$source_line.=sprintf("</td></tr>");





    }


    print $source_line;
    print $target_line;

    print DATA "\n\n";




    

    
}

print "</table>";

## to allow tags to be show at the bottom of the page
print "<br><br><br><br><br><br><br><br><br>";

while (my ($id, $tags) = each %tags) {
    print "<div id=\"$id\" class=\"tag\">$tags</div>";
}


# now that we know how many results there are, print 
# links to results pages on top of page

my $max;
if ($hits == $results_max) {
    $max=$lang{'max'};
}
#if($mand_align){$hits=$aligns;}
print "<script language=\"javascript\">showList($d_files,'$conf{'query_id'}',$hits,'$CORPUS','$max')</script>";

# print page header to file, so that it is accessible for 
# the other results pages
print TOP "$lang{'no_hits'}: <b>$hits</b> $max";
print TOP "<br>\n";
print TOP "$lang{'results_pages'}: ";
foreach my $i (1..$d_files) {
    my $id = "page_" . $i;
    print TOP " <a id=\"$id\" href=\"$conf{'cgiRoot'}/show_page_dev.cgi?n=$i&query_id=$conf{'query_id'}&corpus=$CORPUS\">$i</a> ";
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
print "copy: $dumpfile $dumpfile2";



sub print_tokens {

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
	    }
	    else {
		$token_atts .= "<b>" . $a . ": </b>" . $att_token . "<br>";		
	    }

	}

	$tag_i++;
	$source_line.=sprintf("<span onMouseOver=\"showTag(arguments[0], \'$tag_i\')\" onMouseOut=\"hideTag(\'$tag_i\')\">\n");
	$source_line.=sprintf("%s </span>",$token_string); 
	$tags{$tag_i}=$token_atts;

    }
    
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
	    next unless ($att_token);
	    if ($a =~ m/_/) {
		my $new_a = $multitags{$a}->{$att_token};
		$token_atts .= "<b>" . $new_a . ": </b>" . $att_token . "<br>";		
	    }
	    else {
		$token_atts .= "<b>" . $a . ": </b>" . $att_token . "<br>";		
	    }
	}

	$tag_i++;
	$target_line.=sprintf("<span onMouseOver=\"showTag(arguments[0], \'$tag_i\')\" onMouseOut=\"hideTag(\'$tag_i\')\">\n");
	$target_line.=sprintf("%s </span>",$token_string); 
	$tags{$tag_i}=$token_atts;

    }
    
}


