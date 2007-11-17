#!/usr/bin/env perl

use CGI;
use locale;
use LWP::Simple;

use locale;
use POSIX qw(locale_h);
setlocale(LC_ALL, "norwegian");

use lib("/home/httpd/html/glossa/pm");
use Glossa;

my $corpus=CGI::param('corpus');

my $conf=Glossa::get_conf_file($corpus);
my %conf = %$conf;



print "Content-type: text/html\n\n";


my $query_id = CGI::param('query_id');
my $query_id2 = $query_id."_";
my @files = <$conf{'tmp_dir'}/$query_id2*>;

open (LOGG, ">>$conf{'logfile'}");

my @data;

my $pri = CGI::param('primary');
my $sec = CGI::param('secondary');

foreach my $f (@files) {

    open (FILE, $f);

    $/="\n\n\n";
    while (<FILE>) {

	my $dat = $_;
	my $pri_dat;
	my $sec_dat;

	my @lines = split(/\n/, $_);
	my $source = shift @lines;
	my ($c, $t,$s,$left,$match,$right) = split(/\t/, $source);

	if ($pri eq "sent_id") {
	    $pri_dat=$s;
	}
	elsif ($pri eq "random") {
	    $pri_dat=rand();
	}
	else {
	    my $pos = CGI::param('pos1');
	    unless ($pos) { $pos = 1 }
	    my $list;
	    if ($pri eq "left") {
		$list=$left;
		$pos = - $pos;
	    }
	    elsif ($pri eq "match") {
		$list=$match;
		$pos = $pos-1;
	    }
	    elsif ($pri eq "right") {
		$list=$right;
		$pos = $pos-1;
	    }

	    my @to_sort;
	    my @list = split(/ /, $list);
	    if ($pri eq "match") {
		@to_sort = @list;
	    }
	    else {
		push @to_sort, $list[$pos];
	    }

	    my @to_sort2;
	    foreach my $token (@to_sort) {
		my ($form, $pos, $lexeme)=split(/\//,$token);
		
		if (CGI::param('form_in1')) { push @to_sort2, $form };
		if (CGI::param('pos_in1')) { push @to_sort2, $pos };
		if (CGI::param('lexeme_in1')) { push @to_sort2, $lexeme };
	    }
	    $pri_dat .= join("/", @to_sort2) . " ";	    
	    



            print LOGG $pri_dat, "\n";
	}

	if ($sec eq "sent_id") {
	    $sec_dat=$s;
	}
	else {
	    my $pos = CGI::param('pos2');
	    unless ($pos) { $pos = 1 }
	    my $list;
	    if ($sec eq "left") {
		$list=$left;
		$pos = - $pos;
	    }
	    elsif ($sec eq "match") {
		$list=$match;
		$pos = $pos-1;
	    }
	    elsif ($sec eq "right") {
		$list=$right;
		$pos = $pos-1;
	    }

	    my @to_sort;
	    my @list = split(/ /, $list);
	    if ($sec eq "match") {
		@to_sort = @list;
	    }
	    else {
		push @to_sort, $list[$pos];
	    }

	    my @to_sort2;
	    foreach my $token (@to_sort) {
		my ($form, $pos, $lexeme)=split(/\//,$token);
		
		if (CGI::param('form_in2')) { push @to_sort2, $form };
		if (CGI::param('pos_in2')) { push @to_sort2, $pos };
		if (CGI::param('lexeme_in2')) { push @to_sort2, $lexeme };
	    }
	    $sec_dat .= join("/", @to_sort2) . " ";	    
	    print "S: $sec_dat<br>";
	}

	unless (CGI::param('case')) { $pri_dat = lc($pri_dat); $sec_dat = lc($sec_dat) }

	push @data, [$pri_dat,$sec_dat,$dat];
	
    }
    close FILE;

}

my @data_sorted = sort { $a->[0] cmp $b->[0] || $a->[1] cmp $b->[1] } @data;

#@out = sort {
#    KEY1($a) cmp KEY1($b)
#             ||
#    KEY2($b) <=> KEY2($a)
#} @in;

my $i=2;
my $j=0;

my $filename = $conf{'tmp_dir'} . "/" . $query_id . "_1.dat";
open (OUT, ">$filename");

foreach my $e (@data_sorted) {

    $j++;

    print OUT $e->[2];
    if ($j==20) { 
	close OUT;
	my $filename = $conf{'tmp_dir'} . "/" . $query_id . "_" . $i . ".dat";
	open (OUT, ">$filename");
	$j=0;
	$i++;
    }

}


#print "";

print "<script language='javascript'>";
print "window.location='", $conf{'cgiRoot'}, "/show_page_dev.cgi?n=1&query_id=$query_id&corpus=", $corpus, "';";
print "</script>";



