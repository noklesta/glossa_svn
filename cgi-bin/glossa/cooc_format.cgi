#!/usr/bin/env perl

use CGI;
use Spreadsheet::WriteExcel;
use GD::Graph::bars;
use GD::Graph::hbars;
use GD::Graph::pie;
use Data::Dumper;
use strict;
use lib("/home/httpd/html/glossa/pm");
use Glossa;

print "Content-type: text/html\n\n";

print "<html><head></head><body>";

# variable $query_id ends up on the command line; 
# must be checked for nastiness (like "taint")
my $query_id = CGI::param('query_id');
unless ($query_id =~ m/^\d+_\d+$/) { die("illegal value") };


my $format = CGI::param('format');
my $stat = CGI::param('stat');
my $lib = CGI::param('lib');
my $cut_max = CGI::param('cut_max');
my $cut_min = CGI::param('cut_min');
my $cut_occ = CGI::param('cut_occ');

my $corpus = CGI::param('corpus');
my $conf = Glossa::get_conf_file($corpus);
my %conf = %$conf;

my $excel = $conf{'dat_files'} . "/" . $query_id . "_" . $lib . "_" . $format . ".xls";
if (-s $excel) { `rm $excel` }
my $workbook;
if ($format eq "xls") { 
    $workbook = Spreadsheet::WriteExcel->new($excel);
}




open (STAT, $stat);

my %results;

my $i=0;
while (<STAT>) {

    my @ngram;
    my $rank;
    my $a_measure;
    my $no_ngram;
    if (/(.*?) (.*)/) { 
	my ($token, $lang, $rank) = split(/<>/, $1);

	my @values = split (/ /, $2);
	if ($lib eq "freq") {
	    $no_ngram = $rank;
	    $rank = " ";
	}
	else {
	    $a_measure = $values[0];
	    $no_ngram = $values[1];	    
	}

	next if (($cut_occ) and ($no_ngram < $cut_occ));
	next if (($cut_min) and ($a_measure < $cut_min));
	next if (($cut_max) and ($i > $cut_max));

	my $ary = $results{$lang};
	push @$ary,[$token,$no_ngram,$a_measure];
	$results{$lang}=$ary;
    }
    
    $i++;

}


foreach my $k (keys %results) {

    my $out = $query_id . "_" . $lib . "_" . $k . ".". $format;
    if (($format eq "bars") or ($format eq "hbars")) { $out .= ".png" }

    my $out2 = $conf{'dat_files'} . "/" . $out;
    if (-s $out2) { `rm $out2` }
    
    my $results = $results{$k};

    open(OUT, ">$out2");


    if ($format eq "tsv") { 
	foreach my $r_ary (@$results) {
	    print OUT join("\t", @$r_ary), "\n";
	}
    }
    elsif ($format eq "csv") { 
	foreach my $r_ary (@$results) {
	    foreach my $a (@$r_ary) { $a = "\"" . $a . "\"" }
	    print OUT join(",", @$r_ary), "\n";
	}
    }
    elsif ($format eq "xls") {
	my $worksheet = $workbook->add_worksheet($k);
	
	my $i=0;
	foreach my $r_ary (@$results) {
	    my ($token,$no_ngram,$a_measure) = @$r_ary;
	    $worksheet->write($i,0,$token);
	    $worksheet->write($i,1,$no_ngram);
	    $worksheet->write($i,2,$a_measure);
	    $i++;
	}

    }
    if (($format eq "bars") or ($format eq "hbars")) {

	my @x; my @y;
	my $max_y=0;
	my $max_length_x;
	my $no_labels = @$results;

	foreach my $r_ary (@$results) {
	    push @y, $r_ary->[1];
	    if ($r_ary->[1] > $max_y) { $max_y = $r_ary->[1] }
	    $r_ary->[0] =~ s/\t(.*)/ $1 **/;
	    push @x, $r_ary->[0];
	    if (length($r_ary->[0]) > $max_length_x) { $max_length_x = length($r_ary->[0]) }	
	}

	my $div;
	if ($max_y > 1) { $div = 10 }
	elsif ($max_y > 100) { $div = 100 }
	elsif ($max_y > 1000) { $div = 1000 }
	elsif ($max_y > 10000) { $div = 10000 }
	elsif ($max_y > 100000) { $div = 100000 }
	else { $div = 1 }

	my $dec = $max_y / $div;
	my $max_y2 = int($dec + 1);
	$max_y2 = $max_y * $div;
	unless ($div = 1) { $max_y = $max_y2 }

	my $graph_width = ($max_length_x * 12) * $no_labels; 
	
	if ($graph_width < 150) { $graph_width = 150 }

	my $vertical;
	if ($graph_width > 800) {
	    $vertical = 1;
	    $graph_width = $no_labels * 20;
	}

	my $graph;
	if ($format eq "bars") {
	    $graph = GD::Graph::bars->new($graph_width, 400);
	    $graph->set( 
			 x_label           => 'String',
			 y_label           => 'Occurences',
			 x_labels_vertical => $vertical,
			 title             => 'OMC Lexical Statistics'
			 ) or die $graph->error;
	    
	}
	if ($format eq "hbars") {
	    my $graph_heigth = $no_labels * 15;
	    if ($graph_heigth < 100) { $graph_heigth = 100 }
	    $vertical=0;
	    $graph = GD::Graph::hbars->new(750, $graph_heigth);
	    $graph->set( 
			 x_label           => 'String',
			 y_label           => 'Occurences',
			 x_labels_vertical => $vertical,
			 title             => 'OMC Lexical Statistics'
			 ) or die $graph->error;
	    
	}

	my @data = (\@x, \@y);
	my $l = @x;
	if ($l<2) { @data = (["_"],[0]) }
	
	my $gd = $graph->plot(\@data) or die $graph->error;
	
	binmode OUT;
	print OUT $gd->png;
	close OUT;

    }


    if (($format eq "bars") or ($format eq "pie") or ($format eq "hbars")) {    
	print "<img src=\"", $conf{'download_url'}, "/";
	print $out, "\">", $out, "</a><br>";
    }
    elsif (($format eq "tsv") or ($format eq "csv")) {
	print "<a href=\"", $conf{'download_url'}, "/";
	print $out, "\">", $out, "</a><br>";
    }

    close OUT;

}

if ($format eq "xls") {
    $excel =~ s|$conf{'dat_files'}\/*||;
    print "<a href=\"", $conf{'download_url'}, "/";
    print $excel, "\">", $excel, "</a><br>";
}






	


print "</body></html>";
