#!/usr/bin/perl

use strict;
use locale;
use POSIX qw(locale_h);
setlocale(LC_ALL, "norwegian");


# generate javascript menu
# use: create_manu_item.pl <corpusname> <javascript_function> <language:en|no> < menu-file > javascript-file

my %strings;



my $name=shift;
my $subname=shift;

if ($name eq 'NOTA') {
    $subname="reloadMenuNota";
}
elsif ($name eq 'ILN_LEKS') {
    $subname="reloadBokmal";
}
elsif ($name eq 'SAMI') {
    $subname="reloadMenuSami";
}
elsif ($name eq 'OMC3_NO') {
    $subname="reloadMenuOmc2_no";
}
elsif ($name eq 'OMC3_EN') {
    $subname="reloadMenuOmc2_en";
}
elsif ($name eq 'OMC3_FR') {
    $subname="reloadMenuOmc2_fr";
}
elsif ($name eq 'OMC3_DE') {
    $subname="reloadMenuOmc2_de";
}
elsif ($name eq 'OMC3_PO') {
    $subname="reloadMenuOmc2_po";
}
elsif ($name eq 'OMC3_NL') {
    $subname="reloadMenuOmc2_nl";
}

unless ($name and $subname) {
    die("You must specify both corpus name and JavaScrip function name.\n");
}

if (($name eq 'NOTA') or ($name eq 'ILN_LEKS')) {
    $strings{'options'}='valg';
    $strings{'choose'}='velg';
    $strings{'exclude'}='utelukk';
}
else {
    $strings{'options'}='options';
    $strings{'choose'}='choose';
    $strings{'exclude'}='exclude';    
}

my $lang = shift;
if ($lang eq 'no') {
    $strings{'options'}='valg';
    $strings{'choose'}='velg';
    $strings{'exclude'}='utelukk';
}
elsif ($lang eq 'en') {
    $strings{'options'}='options';
    $strings{'choose'}='choose';
    $strings{'exclude'}='exclude';    
}





print "var Menu;\n";
print "function $subname", "() {\n";
print "Menu['", $name, "'] = new Hash(     1, new Hash(\n";
print "        'contents', '<nobr>&nbsp;$strings{'options'} &#187;&nbsp;</nobr>',\n";


my @list;
my $key;
my $keycounter;


# because no ending comma on the first item
my $firstitem=1;
my $printbreak;
my $subprintbreak;

while (<STDIN>) {

    chomp;
    next if (/^\%/);
    if (/\#\s*(\S+)\t+(.+)/) {

	unless ($firstitem) {
	    print ",\n";
	}
	$firstitem=0;


	
	my $key = $1;
	my $name = $2;

	$keycounter++;


	if ($printbreak) {
	    print "	  $keycounter, new Hash(\n";
	    print "         'contents', '<br>'\n";
	    print "         ),\n";
	    $keycounter++;
	    $printbreak=0;
	}
	
	# print opening
	print "  	$keycounter, new Hash(\n";
       print "       'contents', '$name &#187;&nbsp;',\n";

	# print list
	my $itemcounter;
	my $list_len = @list;


	my $sort=0;
	# this is all a silly hack, but it's self-contained
	if ($sort) {
	    my @list_t;
	    foreach my $item (@list) {
		my @l=split(/\t+/, $item);
		push @list_t, \@l;
	    }
	    my @list_t2 = sort { $a->[1] cmp $b->[1] } @list_t;
	    undef @list;
	    foreach my $item (@list_t2) {
		my $items = join("\t", @$item);
		push @list, $items;
	    }
	}



	foreach my $item (@list) {
	    $itemcounter++;
	    
	    if ($item =~ m/^<(\w+)>$/) {
		my $h = $1;
		$h=uc($h);
		print "	  $itemcounter, new Hash(\n";
		print "         'contents', '<br><center><b>$h</b></center>'\n";
		print "         ),\n";
	    }
	    else {

		my ($id, $name,$category) = split(/\t+/, $item);
		
		if ($category) {
		    $key=$category;
		}

		print "	    $itemcounter, new Hash(\n";
		print "         'contents', '$name',\n";
		print "	      'type', 'js',\n";
		print "	      'uri', \"addOpt('$key','$id','$name')\"\n";
		unless ($key eq 'w') {
		    print ",\n       1, new Hash(\n";
		    print "            'contents', '$strings{'choose'}',\n";
		    print "	         'type', 'js',\n";
		    print "	         'uri', \"addOpt('$key','$id','$name')\"\n";
		    print "	      ),\n";
		    print "	      2, new Hash(\n";
		    print "            'contents', '$strings{'exclude'}',\n";
		    print "	         'type', 'js',\n";
		    print "	         'uri', \"addOpt('$key','!$id','!$name')\"\n";
		    print "	      )\n";
		}
		if ($itemcounter == $list_len) {
		    print "	   )\n";
		}
		else {
		    print "	   ),\n";		
		}

	    }


	}
	undef @list;	

	# print closing
	print ")";
	


    }
    elsif (/^<break>$/) {
	$printbreak=1;
    }
    elsif (/^<(\w+)>$/) {
	push @list, "<$1>";
    }
    elsif (/(.+)/) {
	push @list, $1;
    }

}

print " ));\n}"
