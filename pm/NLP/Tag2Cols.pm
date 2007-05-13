#!/usr/bin/perl

package NLP::Tag2Cols;
use strict;
use vars qw(@ISA @EXPORT @EXPORT_OK %EXPORT_TAGS $VERSION);
use Data::Dumper;

use Exporter;
$VERSION = 1.00;
@ISA = qw(Exporter);

@EXPORT    = qw( convert_long init_table convert_short_simple convert_short init_table_simple debug_table );
@EXPORT_OK = qw();       # Symbols to export on request

my %table;
my @keys;

sub init_table {


    my $file = shift;

    my @list;

    open(TABLE, $file);
    while (<TABLE>) {
	chomp;
	s/\s*$//;
	if (/^\#\s*(\S*)/) {
	    my $key = $1;
	    push @keys, $key;
	    foreach my $item (@list) {
		$table{$item->[0]}->{$key}=$item->[1];
	    }
	    undef @list;	
	}
	elsif (/(\S+)\t+(\S+).*/) {
	    push @list, [$1,$2];
	}
    }

}

sub init_table_simple {

    my $file = shift;

    open(TABLE, $file);
    while (<TABLE>) {
	chomp;
	s/\s*$//;
	if (/(\S+)/) {
		$table{$1}=$2;
	}
    }

}

sub debug_table {


}

sub convert_long {

    my $string = shift;

    my @tags = split(/ /, $string);
    
    my %keys_in_string;

    foreach my $tag (@tags) {

	my $h = $table{$tag}; 
	while (my ($key, $name) = each %$h) {
	    my $is_tag=$keys_in_string{$key};
	    if ($is_tag) {
		#print STDERR "WARNING: duplication:$tag // $is_tag ($string)\n";
	    }
	    $keys_in_string{$key}=$name;
	}

	unless ($h) {
	    #print STDERR "WARNING: unfound: $tag\n";
	}


    }

    my $return;
    foreach my $key (@keys) {
	$return .= "\t" . $keys_in_string{$key};
    }

    return $return;


}

sub convert_short_simple {

    my $string = shift;
    if ($table{$string}) {
	return $table{$string};
    }
    else {
	#print STDERR "NOT FOUND: $string\n";
	return "";
    }

}

sub convert_short {

    my $string = shift;
    
    my %keys_in_string;

    my $h = $table{$string}; 
    while (my ($key, $name) = each %$h) {
	$keys_in_string{$key}=$name;
    }
    
    unless ($h) {
	#print STDERR "WARNING: unfound: $string\n";
    }
    
    my $return;
    foreach my $key (@keys) {
	$return .= "\t" . $keys_in_string{$key};
    }

    return $return;

}


1;
