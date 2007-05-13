#!/usr/bin/perl

use CGI::Carp qw(fatalsToBrowser);
use strict;
use CGI;
use POSIX;
use Data::Dumper;
use DBI;
use WebCqp::Query_dev;

          
use lib ('/home/httpd/html/glossa/pm/');
use Glossa;

##                                        ##
##             0. Initialization          ##
##                                        ##






# get cgi input
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




my $CORPUS = $in{'query'}->{'corpus'}->[0];
my $ROOT = $in{'query'}->{'root'}->[0];




# read configuration file
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


# read multitag file
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

# read language file
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


print "Content-type: text/html; charset=$conf{'charset'}\n\n";


my $test=0;

if($test){
    my @prms = $cgi->param();
    foreach my $prm (@prms){
	my @vals = $cgi->param($prm);
	my $elts = @vals;
	if($vals[0]){
	    print "$prm ($elts): ";
	    foreach my $val (@vals){
		print "$val, ";
	    }
	    print "<br />";
	}
    }
}


print "<html><head><title>$lang{'title'}</title><link href=\"", $conf{'htmlRoot'}, "/html/tags.css\" rel=\"stylesheet\" type=\"text/css\"></link></head><body>";


#print "L: $conf_file<br>";

#print "<pre>";
#print Dumper %in;
#print "</pre>";



# set query id
my $starttime=time();
my $rand = int(rand 100000);
$conf{'query_id'} = $starttime . "_" . $rand;

# open log file
open (LOG, ">>$conf{'logfile'}");

# turn off buffering
select(STDOUT);
$|=1;



# initialize MySQL
my $dsn = "DBI:mysql:database=$conf{'db_name'};host=$conf{'db_host'}";
my $dbh = DBI->connect($dsn, $conf{'db_uname'}, $conf{'db_pwd'}, {RaiseError => 1});




my $apostr = chr(0x60);







##                                        ##
##             1. Build query             ##
##                                        ##

my %corpora;
my %aligned_corpora;
my %aligned_corpora_opt;
my $base_corpus;
my $aligned;                # indicate if there are restrictions on aligned corpora

my $phrases=$in{'phrase'}->{'number'};

foreach my $row (@$phrases) {

    my $corpus = $in{'phrase'}->{$row}->{'corpus'}->[0];
    if ($row == 0) {
	$base_corpus=$corpus;
    }

    my $cqp_query_row;

    my $i=1;
    while (my $token=$in{'token'}->{$row}->{$i}) {

	my $cqp_query;

	my %atts;

	my $string_neg;
	my $string_class="word";
	my $string_case = " \%c";
	my $string_string=$token->{'string'}->[0];

	unless ($in{'query'}->{'regex'}) {
	    $string_string =~ s/([\.|\?|\+|\*|\|\'|\"])/\\$1/g;
	}

	

	my $occurrence_restr;

	my $atts = $token->{'atts'};
	foreach my $att (@$atts) {
	    my ($cat,$val)=split(/_/, $att);

	    $cat =~ s/~/_/g;
	    $val =~ s/~/_/g;

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
	    elsif ($cat eq 'occ') {
		$occurrence_restr=$val;
	    }
	    elsif ($val =~ s/^!//) {
		$atts{'neg'}->{$cat} .= "|" . $cat . "=\"" . $val. "\"";
	    }
	    else {
		$atts{'pos'}->{$cat} .= "|" . $cat . "=\"" . $val . "\"";
	    }
	}

	my @pos;
	my @neg;

	unless ($string_string eq '') {
	    my $string=$string_class . "=\"" . $string_string . "\"" . $string_case ;
	    if ($string_neg) {
		push @neg, $string;
	    }
	    else {
		push @pos, $string;
	    }
	}

	$cqp_query .= "[";

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
	if (@pos > 0) {
	   $cqp_query .= "(" . join(" & ", @pos) . ")";
	}


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
	if (@neg > 0) {

	    # ?????????????????
	    if (@pos > 0) {
		$cqp_query .= " & ";
	    }

	    $cqp_query .= " !(" . join(" | ", @neg) . ")";
	}

	$cqp_query .= "]";

	# occurence
	$cqp_query .= $occurrence_restr;

        # interval
	my $min = $token->{'intmin'}->[0];
	my $max = $token->{'intmax'}->[0];

	if ($min or $max) { 
	    unless ($min) { $min = 0 }
	    $cqp_query = " []{" . $min . "," . $max . "} " . $cqp_query;
	}

	$cqp_query_row .= $cqp_query;
	
	$i++;

    }


    if ($corpus eq $base_corpus) {
	$corpora{$corpus}->{$cqp_query_row}=1;
    }
    else {
	my $optalign = $in{'phrase'}->{$row}->{'optalign'}->[0];

	$cqp_query_row = " (" . $cqp_query_row;

	if ($in{'phrase'}->{$row}->{'mode'}->[0] eq 'exclude') {
	    $cqp_query_row = " !" . $cqp_query_row;
	}

	if ($optalign eq 'on') {
		$aligned_corpora_opt{$corpus}=1;
	}
	else {
	      
	    my $previous_hash = $aligned_corpora{$corpus};
	    my $previous = (keys %$previous_hash)[0];
	    
	    my $connect_bool = $in{'phrase'}->{$row}->{'connectBool'}->[0];
	    
	    if (($connect_bool eq 'and') and $previous) {
		my $cqp_query_both = $previous . ") :" . $corpus . " " . $cqp_query_row;
		$aligned_corpora{$corpus}->{$cqp_query_both}=1;
		delete $aligned_corpora{$corpus}->{$previous};
	    }
	    else {
		$aligned_corpora{$corpus}->{$cqp_query_row}=1;
	    }
	    $aligned=1;
	}
    }
    

}


my $base_queries = $corpora{$base_corpus};

# stop if the query is empty
if ($$base_queries{'[]'}) {
    die("Empty queries are not allowed.\n");
}



my $cqp_all = "(" . join(") | (", (keys %$base_queries)) . ") ";



while (my ($k,$v) = each %aligned_corpora) {
    $cqp_all .= ":" . $k . "" . join(") | (", (keys %$v)) . ") "
}

$cqp_all .= ";";

#print $cqp_all, "\n";


##                                        ##
##             2. Build subcorpus         ##
##                                        ##

my ($subcorpus,$sql_query_nl,$list) = Glossa::create_tid_list(\%conf, \%in, $base_corpus, \%aligned_corpora, \%aligned_corpora_opt);


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




my $results_max=$in{'query'}->{'results'}->{'max'}->[0];
my $randomize=$in{'query'}->{'results'}->{'random'}->[0];



my $query = new WebCqp::Query "$base_corpus";
$query->on_error(sub{grep {print "<2>$_</h2>\n"} @_});



$query->alignments(keys %aligned_corpora, keys %aligned_corpora_opt); 

my $sts = $conf{'corpus_structures'};
my @sts = split(/ +/, $sts);
$query->structures(@sts);


my $atts = $conf{'corpus_attributes'};
my @atts = split(/ +/, $atts);
$query->attributes(@atts);
shift @atts; # it is used later, without "word" attribute


if ($randomize and $results_max) {
    $query->reduce($results_max);
}
elsif ($results_max and !$aligned and !$randomize) { # because of "cut applies too early"-bug
    $query->cut($results_max);
}
elsif ($results_max) { # because of "cut applies too early"-bug in CWB
    $query->cut2($results_max);
}


my $sentence_context;
if ($CORPUS eq 'nota') {
    $sentence_context='who';
}
else {
    $sentence_context='s';
}

my $context_type=$in{'query'}->{'context'}->{'type'}->[0];

my $context_left=$in{'query'}->{'context'}->{'left'}->[0];
my $context_right=$in{'query'}->{'context'}->{'right'}->[0];

if ($context_type eq "chars") { 
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

if ($subcorpus) {
    my $dumpfile = $conf{'tmp_dir'} . "/" . $conf{'query_id'} . ".dump";
    $query->exec("undump QUERY < \"$dumpfile\";");
    $query->exec("QUERY;");
}


my @result = $query->query("$cqp_all");    
    

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
	
	my $t2;
	my $targets;
	
	if ($hits < $results_page) {
	    $target_line.=sprintf("<tr bgcolor=\"#ffffff\"><td>");
	}
	
	#	print $source_line;
	
	
	$target_line .= "<tr style='color:gray'><td>";

	
	my $sth = $dbh->prepare(qq{ SELECT target FROM s_align where source = '$sts{'s_id'}' and lang = '$lang';});

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
	    $source_line.=sprintf("'mywindow','height=400,width=1000,status,scrollbars,resizable,screenX=0,screenY=5');\"><img style='border-style:none' src='http://omilia.uio.no/CE2/img/mov.gif'></a> \n&nbsp;</font>");

	}
	
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


