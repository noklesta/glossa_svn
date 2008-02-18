#!/usr/bin/perl

use strict;
use warnings;
use locale;
use POSIX qw(locale_h);
setlocale(LC_ALL, "norwegian");

use Getopt::Long;


my $names;
my $lang;
my $result = GetOptions ("names=s" => \$names,    # numeric
                        "language=s"   => \$lang);  # flag

# generate javascript menu
# use: create_manu_item.pl --names=<corpusname1>,<corpusname2>  (--language=en|no) menu-file1 menu-file2 > javascript-file

my %strings;


my @names = split(/,/, $names);


if ($lang eq 'no') {
    $strings{'options'}='valg';
    $strings{'choose'}='velg';
    $strings{'exclude'}='utelukk';
}
else {
    $strings{'options'}='options';
    $strings{'choose'}='choose';
    $strings{'exclude'}='exclude';    
}



print "var Menu;\n";
print "function reloadMenu() {\n";

foreach my $menufile (@ARGV) {

    my $menuname = shift @names;


    print "Menu['", $menuname, "'] = new Hash(     1, new Hash(\n";
    print "        'contents', '<nobr>&nbsp;$strings{'options'} &#187;&nbsp;</nobr>',\n";


    my @list;
    my $key;
    my $keycounter;


    # because no ending comma on the first item
    my $firstitem=1;
    my $printbreak;
    my $subprintbreak;

    open (MENU, $menufile);

    while (<MENU>) {

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
		    
		    my ($id, $name, $category) = split(/\t+/, $item);
		    
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
    close MENU;
    
    print " ));\n\n";
    
}

print "}";
