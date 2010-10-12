#!/usr/bin/perl

use CGI;
use Spreadsheet::WriteExcel;
use GD;
use GD::Graph::bars;
use GD::Graph::hbars;
use GD::Graph::pie;
use GD::Text;
use Data::Dumper;
use Encode;

require "use_glossa.pl";

my %glossa_conf = Glossa::get_glossa_conf();

my $conf = Glossa::get_conf_file($corpus, $glossa_conf{'conf'});
my %conf = %$conf;

# language locale file
my $lang = Glossa::get_lang_file($glossa_conf{'conf'}, $conf{'lang'});
my %lang = %$lang;

print "Content-type: text/html; charset=$conf{'charset'}\n\n";
print "<html><head><title>$lang{'coll2_title'}</title></head><body>";

# variable "$query_id" ends up on the command line; 
# must be checked for nastiness (like "taint")

my $query_id = CGI::param('query_id');

unless ($query_id =~ m/^\d+_\d+$/) { die("illegal value") };

my $corpus = CGI::param('corpus');
my $conf = Glossa::get_conf_file($corpus);
my $ngram = CGI::param('ngram');

my $format = CGI::param('format');
my $stat = CGI::param('stat');
my $ngrams = CGI::param('ngrams');
my $lib = CGI::param('lib');
my $cut_max = CGI::param('cut_max');
my $cut_min = CGI::param('cut_min');
my $cut_occ = CGI::param('cut_occ');

my $workbook_left;
my $workbook_center;
my $workbook_right;
my $worksheet_left;
my $worksheet_center;
my $worksheet_right;
my $graph_left;
my $graph_center;
my $graph_right;

foreach my $pos ("left", "center", "right") {

    next if (($pos eq "center") and !($ngrams == 3));

    my $out = $query_id . "_" . $lib . "_" . $pos . "_." . $format;
    if ($format eq "bars") { $out =~ s/\.bars$/_\.png/ }
    if ($format eq "pie") { $out =~ s/\.pie$/_\.png/ }
    if ($format eq "hbars") { $out =~ s/\.hbars$/_\.png/ }

    $out2 = $conf{'dat_files'} . "/" . $out;
    if (-s $out2) { `rm $out2` }

    if (($format eq "bars") or ($format eq "pie") or ($format eq "hbars")) {
#	print "<img src=\"http://omilia.uio.no/omc/";
#	print $out, "\"><br>";
    }
    else {
	print "<a href=\"", $conf{'download_url'}, "/";
	print $out, "\">", $out, "</a><br>";
    }

    if ($pos eq "center") {
	if ($format eq "xls") { 
	    $workbook_center = Spreadsheet::WriteExcel->new($out2);
	    $worksheet_center = $workbook_center->add_worksheet();
	}
	open (CENTER, ">$out2");
    }
    if ($pos eq "left") {
	if ($format eq "xls2") { 
	    $workbook_left = Spreadsheet::WriteExcel->new($out2);
	    $worksheet_left = $workbook_left->add_worksheet();
	}
	open (LEFT, ">$out2");
    }
    if ($pos eq "right") {
	if ($format eq "xls") { 
	    $workbook_right = Spreadsheet::WriteExcel->new($out2);
	    $worksheet_right = $workbook_right->add_worksheet();
	}
	open (RIGHT, ">$out2");
    }

}

my @right;
my @left;
my @center;

open (STAT, $stat);

my $i;


while (<STAT>) {

    my @ngram;
    my $ngram;
    my $rank;
    my $a_measure;
    my $no_ngram;
    if (/(.*?) (.*)/) { 
	
	my $ngr = $1;
	@ngram = split(/<>/, $ngr);
	$rank = pop @ngram;

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
	next if (($ngram eq "2") and ($a_measure < $cut_min) and ($cut_min));
	next if (($cut_max) and ($i > $cut_max));
	$i++;

	if ($ngrams == 3) {
	    if ($ngram[0] eq "XX") { 
		my $query_id = $ngram[1] . "\t" . $ngram[2];
		push @right, [$query_id, $a_measure, $rank, $no_ngram];
	    }
	    elsif ($ngram[1] eq "XX") { 
		my $query_id = $ngram[0] . "\t" . $ngram[2];
		push @center, [$query_id, $a_measure, $rank, $no_ngram];
	    }
	    elsif ($ngram[2] eq "XX") { 
		my $query_id = $ngram[0] . "\t" . $ngram[1];
		push @left, [$query_id, $a_measure, $rank, $no_ngram];
	    }

	}
	else {
	    if ($ngram[0] eq "XX") { 
		push @right, [$ngram[1], $a_measure, $rank, $no_ngram];
	    }
	    elsif ($ngram[1] eq "XX") { 
		push @left, [$ngram[0], $a_measure, $rank, $no_ngram];
	    }
	}
     
    }

}

if ($format eq "tsv") { 
    foreach my $e (@left) {
	my $a = shift @$e;
	print LEFT $a, "\t", join("\t", @$e), "\n";
    }
    foreach my $e (@right) {
	my $a = shift @$e;
	print RIGHT $a, "\t", join("\t", @$e), "\n";
    }
    if ($ngrams == 3) {
	foreach my $e (@center) {
	    my $a = shift @$e;
	    print CENTER $a, "\t", join("\t", @$e), "\n";
	}
    }
}
if ($format eq "csv") { 
    foreach my $e (@left) {
	my $a = shift @$e;
	print LEFT "\"", $a, "\",\"", join("\",\"", @$e), "\"\n";
    }
    foreach my $e (@right) {
	my $a = shift @$e;
	print RIGHT "\"", $a, "\",\"", join("\",\"", @$e), "\"\n";
    }
    if ($ngrams == 3) {
	foreach my $e (@center) {
	    my $a = shift @$e;
	    $a =~ s/\t/\",\"/;
	    print CENTER "\"", $a, "\",\"", join("\",\"", @$e), "\"\n";
	}
    }
}
elsif ($format eq "xls") {

    my $j=0;
    foreach my $e (@left) {
	my $a = shift @$e;
	$worksheet_left->write($j,0,$a);
	my $k=1;
	foreach my $b (@$e) {
	    $worksheet_left->write($j,$k,$b);
	    $k++;
	}
	$j++;
    }

    my $j=0;
    foreach my $e (@right) {
	my $a = shift @$e;
	$worksheet_right->write($j,0,$a);
	my $k=1;
	foreach my $b (@$e) {
	    $worksheet_right->write($j,$k,$b);
	    $k++;
	}
	$j++;
    }

    if ($ngrams == 3) {
	my $j=0;
	foreach my $e (@center) {
	    my $a = shift @$e;
	    my ($c, $d) = split(/\t/, $a);
	    $worksheet_center->write($j,0,$c);
	    $worksheet_center->write($j,1,$d);
	    my $k=2;
	    foreach my $b (@$e) {
		$worksheet_center->write($j,$k,$b);
		$k++;
	    }
	    $j++;
	}
    }

}

elsif (($format eq "bars") or ($format eq "hbars")) {

    my $fontname = $conf{'htmlRoot'} . "/dat/l.ttf";
    my $gd_text = GD::Text->new() or die GD::Text::error();
    $gd_text->set_font($fontname, 18) or die $gd_text->error;
#    $gd_text->set_font(gdLucidaUnicode);
#    $gd_text->set_font(GD::Font::LucidaUnicode);
#    GD::Text->font_path("/var/www/html/CE");

    

    my @x; my @y;
    my $max_y=0;
    my $max_length_x;
    my $no_labels = @left;
    foreach my $e (@left) {
	push @y, $e->[1];
	if ($e->[1] > $max_y) { $max_y = $e->[1] }
	$e->[0] =~ s/\t(.*)/ $1 **/;
        decode_utf8($e->[0]);
	push @x, $e->[0];
	if (length($e->[0]) > $max_length_x) { $max_length_x = length($e->[0]) }	
    }

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
        $graph->set_x_axis_font($fontname, 8) or die $graph->error;
	$graph->set( 
		     x_label           => 'String',
		     y_label           => 'Occurences',
#		     y_max_value           => 1,
		     x_labels_vertical => $vertical,
		     title             => 'OMC Lexical Statistics'
		     ) or die $graph->error;

    }
    if ($format eq "hbars") {
	$graph_heigth = $no_labels * 15;
	if ($graph_heigth < 100) { $graph_heigth = 100 }
	$vertical=0;
	$graph = GD::Graph::hbars->new(750, $graph_heigth);
        $graph->set_x_axis_font($fontname, 8) or die $graph->error;
	$graph->set( 
		     x_label           => 'String',
		     y_label           => 'Occurences',
#		     y_max_value           => $max_y,
		     x_labels_vertical => $vertical,
		     title             => 'OMC Lexical Statistics'
		     ) or die $graph->error;

    }

    my @data = (\@x, \@y);
    my $l = @x;
    if ($l<2) { @data = (["_"],[0]) }

    my $gd = $graph->plot(\@data) or die $graph->error;

    binmode LEFT;
    print LEFT $gd->png;
    close LEFT;


    my @x; my @y;
    my $max_y=0;
    my $max_length_x;
    my $no_labels = @right;
    foreach my $e (@right) {
	push @y, $e->[1];
	if ($e->[1] > $max_y) { $max_y = $e->[1] }
	$e->[0]=~ s/(.*)\t/** $1 /;
	push @x, $e->[0];
	if (length($e->[0]) > $max_length_x) { $max_length_x = length($e->[0]) }	
    }

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
#		     y_max_value           => 1,
		     x_labels_vertical => $vertical,
		     title             => 'OMC Lexical Statistics'
		     ) or die $graph->error;

    }
    if ($format eq "hbars") {
	$graph_heigth = $no_labels * 15;
	if ($graph_heigth < 100) { $graph_heigth = 100 }
	$vertical=0;
	$graph = GD::Graph::hbars->new(750, $graph_heigth);
	$graph->set( 
		     x_label           => 'String',
		     y_label           => 'Occurences',
#		     y_max_value           => 1,
		     x_labels_vertical => $vertical,
		     title             => 'OMC Lexical Statistics'
		     ) or die $graph->error;

    }

    my @data = (\@x, \@y);
    my $l = @x;
    if ($l<2) { @data = (["_"],[0]) }


    my $gd = $graph->plot(\@data) or die $graph->error;

    binmode RIGHT;
    print RIGHT $gd->png;
    close RIGHT;


    if ($ngrams == 3) {
    
	my @x; my @y;
	my $max_y=0;
	my $max_length_x;
	my $no_labels = @center;
	foreach my $e (@center) {
	    push @y, $e->[1];
	    if ($e->[1] > $max_y) { $max_y = $e->[1] }
	    $e->[0]=~ s/\t/ ** /;
	    push @x, $e->[0];
	    if (length($e->[0]) > $max_length_x) { $max_length_x = length($e->[0]) }	
	}

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
#			 y_max_value           => $max_y,
			 x_labels_vertical => $vertical,
			 title             => 'OMC Lexical Statistics'
			 ) or die $graph->error;

	}
	if ($format eq "hbars") {
	    $graph_heigth = $no_labels * 15;
	    if ($graph_heigth < 100) { $graph_heigth = 100 }
	    $vertical=0;
	    $graph = GD::Graph::hbars->new(750, $graph_heigth);
	    $graph->set( 
			 x_label           => 'String',
			 y_label           => 'Occurences',
#			 y_max_value           => $max_y,
			 x_labels_vertical => $vertical,
			 title             => 'OMC Lexical Statistics'
			 ) or die $graph->error;

	}
	
	my @data = (\@x, \@y);
	my $l = @x;
	if ($l<2) { @data = (["_"],[0]) }


	my $gd = $graph->plot(\@data) or die $graph->error;

	binmode CENTER;
	print CENTER $gd->png;
	close CENTER;

    }
	
}


foreach my $pos ("left", "center", "right") {

    next if (($pos eq "center") and !($ngrams == 3));

    my $out = $query_id . "_" . $lib . "_" . $pos . "_." . $format;
    if ($format eq "bars") { $out =~ s/\.bars$/_\.png/ }
    if ($format eq "pie") { $out =~ s/\.pie$/_\.png/ }
    if ($format eq "hbars") { $out =~ s/\.hbars$/_\.png/ }

    if (($format eq "bars") or ($format eq "pie") or ($format eq "hbars")) {
	print "<a href=\"", $conf{'download_url'}, "/";
	print $out, "\"><br>";
    }

    
}

print "</body></html>";
