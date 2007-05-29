#!/usr/bin/perl

use CGI;
use DBI;

use lib ('/home/httpd/html/glossa/pm/');
use Glossa;
use Spreadsheet::WriteExcel;
use Data::Dumper;
use IO::Zlib;
use strict;

select(STDOUT);
$|=1;

print "Content-type: text/html\n\n";

print "<html><head></head><body>";

my $base_corpus = CGI::param('base_corpus');
my $corpus = CGI::param('corpus');

unless ($base_corpus) { $base_corpus = $corpus }

my $cutoff = CGI::param('cutoff');

my $conf = Glossa::get_conf_file($corpus);
my %conf = %$conf;


# start waiting ticker
print "<div id='waiting'>searching </div>";
print "<script language=\"JavaScript\" src=\"", $conf{'htmlRoot'}, "/js/wait.js\"></script>";


my $time1 = time();


# relevance = 1 - ( 1 / 
# (log ( 2 + ( rel_freq_dom / rel_freq_reference) ) ) 
#);


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


my $dsn = "DBI:mysql:database=$conf{'db_name'};host=$conf{'db_host'}";
my $dbh = DBI->connect($dsn, $conf{'db_uname'}, $conf{'db_pwd'}, {RaiseError => 0}) || die $DBI::errstr;


my $tablename = uc($corpus) . "_" . uc($base_corpus) . "lexstat";

print "SELECT SUM(freq) from $tablename;";

my $sth = $dbh->prepare(qq{SELECT SUM(freq) from $tablename;});
$sth->execute  || die "Error fetching data: $DBI::errstr";
my ($freq_total) = $sth->fetchrow_array;

my $format = CGI::param('format');

my $include_form = CGI::param('include_form');
my $include_lemma = CGI::param('include_lemma');
my $include_pos = CGI::param('include_pos');

unless ($include_form or $include_lemma or $include_pos) {
    die("You must select either form, lemma or POS");
}

my $tablename = uc($corpus) . "_" . uc($base_corpus) . "lexstat";

my ($subcorpus,$sql_query_nl,$texts_allowed) = Glossa::create_tid_list(\%conf, \%in, $base_corpus);



if ($subcorpus) {

    my %stats;
    my %stats_all;
    my %texts_allowed = %$texts_allowed;

    my @ids = keys %texts_allowed;

    die if (@ids == 0);
    
    my $tokens;
    my $tokens_all;
    
    foreach my $id (@ids) {
	
	my $f = $conf{'config_dir'} . "/" . $corpus . "/stats/" . $id . ".dat.gz";
	
#	print $f, "<br>";

	if (-e $f) {
	    my $fh = new IO::Zlib;
	    $fh->open($f, "rb");
	    while (<$fh>) {
		chomp;
		my ($l,$p,$f)=split(/\t/);
		my $tmp = $l . "__" . $p;
		
		$stats{$tmp} += $f;
		$tokens += $f;
		
	    }
	    $fh->close;
	}
	
    }

    print "TOKENS (selection): $tokens<br>";
    $freq_total = $freq_total - $tokens;
    print "TOKENS (reference): $freq_total<br>";    

    my @res;
    while (my ($k,$v) = each %stats) {
	
	my ($l,$p) = split(/__/,$k);
	
	$l =~ s/\\/\\\\/g;
	$l =~ s/\'/\\'/g; # '
	$l =~ s/\"/\\"/g; # "

	my $tablename = uc($corpus) . "_" . uc($base_corpus) . "lexstat";

 	#    print "SELECT SUM(freq) from ILN_LEKS_lexstat where lemma = '$l' and pos='$p';", "<br>"; 
  	my $sth = $dbh->prepare(qq{SELECT SUM(freq) from $tablename where lemma = '$l' and pos='$p';});
 	$sth->execute  || die "Error fetching data: $DBI::errstr";
	my ($f_all) = $sth->fetchrow_array;
	
	$f_all = $f_all - $v;

	my $rel_freq_reference = $f_all / $freq_total;
	my $rel_freq_selection = $v / $tokens;

	my $diff = $rel_freq_selection / ($rel_freq_reference + 0.0001);

	

#	$expected = sprintf("%d",$expected);
#	my $diff = $expected - $f_all;
	
	push @res, [$k,$v,$f_all,$rel_freq_selection, $rel_freq_reference,$diff];
	
    }
    
    my @res_sorted = sort { $b->[5] <=> $a->[5]} @res;
    

    if (@res_sorted > $cutoff) {
	$#res_sorted = $cutoff;
    }
    
    my $time2 = time();
    print "sort took ", $time2 - $time1, "<br>";
    
    # stop waiting ticker
    print "<script language=\"JavaScript\">stopWait()</script>";
    
    
    if ($format eq 'html') {
	
	print "<table border=1>";
	print "<tr><td><b>#</b></td>";
	print "<td><b>word</b></td>";
	print "<td><b>freq</b></td>";
	print "<td><b>glob freq</b></td>";
	print "<td><b>relS</b></td>";
	print "<td><b>relR</b></td>";
	print "<td><b>diff</b></td>";
	
	print "</tr>";
	
	my $i;
	
	foreach my $r (@res_sorted) {
	    $i++;
	    print "<tr><td>";
	    print $i;
	    print "</td><td>";
	    print $r->[0];
	    print "</td><td>";
	    print $r->[1];
	    print "</td><td>";
	    print $r->[2];
	    print "</td><td>";
	    print $r->[3];
	    print "</td><td>";
	    print $r->[4];
	    print "</td><td>";
	    print $r->[5];
	    print "</td></tr>";
	    
	    
	}
	print "</table>";
	
    }

}
else {
    
    my $sql = "SELECT freq";
    if ($include_form) { $sql .= ",form" }
    if ($include_lemma) { $sql .= ",lemma" }
    if ($include_pos) { $sql .= ",pos" }
    
    $sql .= " FROM $tablename ";
    
    
    my $pos = CGI::param('pos');
    

    
    if ($pos) {
	$sql .= " WHERE pos='$pos' ";
    }
    
    my $cutoff = CGI::param('cutoff');
    
    my $cutoff_freq = CGI::param('cutoff_freq');
    
    if ($cutoff_freq =~ m/^\d+$/) {
	if ($pos) {
	    $sql .= " and ";
	}
	else {
	    $sql .= " WHERE ";
	}
	$sql .= " freq > $cutoff_freq ";
    }
    
    $sql .= ";";
    
    #print $sql, "<br>";


    my %stats;
    
    my $sth = $dbh->prepare(qq{$sql});
    $sth->execute  || die "Error fetching data: $DBI::errstr";
    while (my (@res) = $sth->fetchrow_array) {
	
	my $freq = shift @res;
	my $a = join("__", @res);
	$stats{$a} += $freq;
	
    }
    
    #my $time2 = time();
    #print "db took ", $time2 - $time1, "<br>";
    
    

    my @newres;
    
    my %st;
    
    TOKEN: while (my ($k,$v) = each %stats) {
	
	my $freq = $v;

	# primitive heap algorithm: if there are more than cutoff
	# with frequencies over 1000, throw away entries with lower
	# frequencies, etc.
	# cuts sorting time in half
	if ($freq < 11) {
	    $st{'10-1'}++;
	    if ($st{'100-11'} > $cutoff) { next TOKEN }
	    if ($st{'1000-101'} > $cutoff) { next TOKEN }
	    if ($st{'10000-1001'} > $cutoff) { next TOKEN }
	    if ($st{'top'} > $cutoff) { next TOKEN }
	    push @newres, [$freq, $k];
	}
	elsif ($freq < 101) {
	    $st{'100-11'}++;
	    if ($st{'1000-101'} > $cutoff) { next TOKEN }
	    if ($st{'10000-1001'} > $cutoff) { next TOKEN }
	    if ($st{'top'} > $cutoff) { next TOKEN }
	    push @newres, [$freq, $k];
	}
	elsif ($freq < 1001) {
	    $st{'1000-101'}++;
	    if ($st{'10000-1001'} > $cutoff) { next TOKEN }
	    if ($st{'top'} > $cutoff) { next TOKEN }
	    push @newres, [$freq, $k];
	}
	elsif ($freq < 10001) {
	    $st{'10000-1001'}++;
	    if ($st{'top'} > $cutoff) { next TOKEN }
	    push @newres, [$freq, $k];
	}
	else {
	    $st{'top'}++;
	    push @newres, [$freq, $k];
	}

    }

    my @newres_sorted = sort { $b->[0] <=> $a->[0]} @newres;
    

    if (@newres_sorted > $cutoff) {
	$#newres_sorted = $cutoff;
    }
    
    #my $time3 = time();
    #print "sort took ", $time3 - $time2, "<br>";
    
    # stop waiting ticker
    print "<script language=\"JavaScript\">stopWait()</script>";
    
    if ($format eq 'html') {

	print "<table border=1>";
	print "<tr><td><b>#</b></td>";
	print "<td><b>frequency</b></td>";
	if ($include_form) { print "<td><b>form</b></td>" }
	if ($include_lemma) { print "<td><b>lemma</b></td>" }
	if ($include_pos) { print "<td><b>POS</b></td>" }
	print "</tr>";
	
	my $i;
	foreach my $r (@newres_sorted) {
	    
	    $i++;
	    
	    print "<tr><td>";
	    print $i;
	    print "</td><td>";
	    print $r->[0];
	    print "</td><td>";
	    $r->[1] =~ s/__/<\/td><td>/g;
	    print $r->[1];
	    print "</td></tr>";
	    
	    
	}
	print "</table>";

    }

}


