#!/usr/bin/perl
# $Id$

use DBI;
use CGI;
use Data::Dumper;
use strict;

use lib("/home/httpd/html/glossa/pm");
use Glossa;

my $user = $ENV{'REMOTE_USER'};


##
## **  creates the javascript data structures for the widgets in        ** 
## **  the subcorpus creation menu; data taken from relational database **
## **  or text files                                                    **
##

print "Content-type: text/javascript\n\n";
print "var widgetContent = new Array();";

# get some form input
my $corpus = CGI::param('corpus');

my %paths;
open(PATHS, "paths.conf");
while( <PATHS> ){
    /([^\s]+)\s(.+)/;
    $paths{ $1 } = $2;
}
my $conf_file = $paths{"conf"} . $corpus . "/cgi.conf";

my $conf = Glossa::get_conf_file($corpus, $conf_file); #need to send path for meta.conf
my %conf = %$conf;

print "\n\ndisplayContent= new Array();\n";

while (my ($k, $v) = each %conf) {

    if ($k eq 'corpus_structures') {
	my @s = split(/ +/, $v);
	foreach my $s (@s) {
	    next if ($s eq 'text_id');
	    print "displayContent['$s']='$s';\n";
	}
    }

}

my $dsn = "DBI:mysql:database=$conf{'db_name'};host=$conf{'db_host'}";
my $dbh = DBI->connect($dsn, $conf{'db_uname'}, $conf{'db_pwd'}, {RaiseError => 1})          ||              die $DBI::errstr;


# FIXME
my %subcorpus;
my $subcorpus = CGI::param('subcorpus');
my $file = $conf{'config_dir'} . '/' . $corpus . '/subcorp/' . $user . "/" . $subcorpus . '.dat';
open (SUBCORPUS, "$file");
while (<SUBCORPUS>) {
    chomp;
    my @line = split(/\t/);
    my $mode = shift @line;
    my $cat = shift @line;

    $subcorpus{$cat}->{'THEMODE'}=$mode;

    foreach my $elt (@line) {
	$subcorpus{$cat}->{$elt}=1;
    }
}
close SUBCORPUS;

# read values to be created
my %conf_file;
my %conf_db;
my $file = $conf{'config_dir'} . '/' . $corpus . '/meta.conf';
open (CONF, "$file");
while (<CONF>) {

    chomp;
    my ($name, $type, $tablename, $colname, $constraint) = split(/\t/);

    next unless ($name =~ m/\w/);

    if ($type eq 'file') {
	$conf_file{$name}=[$tablename,$colname];
    }
    elsif ($type eq 'db') {
	$conf_db{$name}=[$tablename,$colname,$constraint];
    }

    my $s2 = $tablename . "." . $colname;
    next if ($name =~ m/-alle$/); # FIXME
    print "displayContent['$s2']='$name';\n";

}



foreach my $el (keys %conf_db) {


    my @content;
    my @uncontent;

    my $tablename = $conf_db{$el}->[0];
    my $colname = $conf_db{$el}->[1];
    my $constraint = $conf_db{$el}->[2];

    my $el2 = $el;
    $el2 =~ s/-alle$//;

    my $sth = $dbh->prepare(qq{ SELECT DISTINCT $colname FROM $tablename $constraint order by $colname;});
    $sth->execute  || die "Error fetching data: $DBI::errstr";
    while (my ($a, $b) = $sth->fetchrow_array) {
	
	if  ($b) {
	    $a = $a . ", " . $b;
	} 
	
	$a =~ s/\n//g; 
	$a =~ s/\r//g; 
	$a =~ s/\'/\\'/g;   # '

	my $c = $a;
 
	$c =~ s/^(.{40}).*/$1.../;

	next unless ($a);

	if ($subcorpus{$el}->{$a}) {
	    push @uncontent, "['$a', '$c']";
	}
	else {
	    push @content, "['$a', '$c']";	    
	}


    }

    my $mode = $subcorpus{$el}->{'THEMODE'};


    print "\n\nwidgetContent['$el']= new Array();\n";

    print "widgetContent['$el'].tablename='$tablename';\n";
    print "widgetContent['$el'].colname='$colname';\n";
    print "widgetContent['$el'].mode='$mode';\n";

    print "widgetContent['$el'].unselected=[\n";
    print join(", ", @uncontent);
    print "];\n";

    print "widgetContent['$el'].selected=[\n";
    print join(", ", @content);
    print "];\n";

}






foreach my $el (keys %conf_file) {


    my @content;
    my @uncontent;

    my $tablename = $conf_file{$el}->[0];
    my $colname = $conf_file{$el}->[1];

    my $file = $conf{'config_dir'} . '/' . $corpus . '/' . $el . '.dat';

    open (IN, $file);
    while (<IN>) {

	chomp;
	s/\'/\\'/g; #'

	my ($name, $value) = split(/\t+/);

#	$name =~ s/^\s.*//;
#	$name =~ s/\s.*$//;
#	$value =~ s/^\s.*//;
#	$value =~ s/\s.*$//;

	unless (($el eq 'auth-type') or ($el eq 'auth-gender') or ($el eq 'text-type') or ($el eq 'pro')  or ($el eq 'edu')  or ($el eq 'intendedu')  or ($el eq 'medu')  or ($el eq 'fedu')  or ($el eq 'sex')) {
	    $name = $value . ": " . $name;
	}

	next unless ($name and $value);


	if ($subcorpus{$el}->{$value}) {
	    push @uncontent, "['$value', '$name']";
	}
	else {
	    push @content, "['$value', '$name']";	    
	}
#	push @content, "['$value', '$name']";

    }

    my $mode = $subcorpus{$el}->{'THEMODE'};

    print "\n\nwidgetContent['$el']= new Array();\n";
    print "widgetContent['$el'].tablename='$tablename';\n";
    print "widgetContent['$el'].colname='$colname';\n";
    print "widgetContent['$el'].mode='$mode';\n";
    print "widgetContent['$el'].unselected=[\n";
    print join(", ", @uncontent);
    print "];\n";
    print "widgetContent['$el'].selected=[\n";
    print join(", ", @content);
    print "]\n";

}
