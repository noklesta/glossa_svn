#!/usr/bin/perl
# $Id$

use CGI;
use strict;
use lib("/home/httpd/html/glossa/pm/");
use Glossa;

select(STDOUT);
$|=1;

my $corpus=CGI::param('corpus');
my $user = $ENV{'REMOTE_USER'}; 
 
my $conf = Glossa::get_conf_file($corpus);
my %conf = %$conf;

my $lang=Glossa::get_lang_file($conf{'config_dir'}, $conf{'lang'});
my %lang = %$lang;

print "Content-type: text/html; charset=$conf{'charset'}\n\n";

print "<script language=\"JavaScript\" src=\"", $conf{'htmlRoot'}, "/js/misc.js\"></script>";

# fixme! - I agree this is stupid/ljo
my $hits_dir = $conf{'hits_files'} . $user . "/";



my @confs = <$hits_dir/*.conf>;

my $action = CGI::param('action');

if ($action eq 'delete') {

    my $for_deletion = CGI::param('for_deletion');


    print "$lang{'get_hits_deleting'} $for_deletion<br>";
    # fixme! - flytta till Glossa.pm och refaktorisera
    foreach $conf (@confs) {
	open (CONF, $conf);
	while (<CONF>) {
	    chomp;
	    my ($key,$val) = split(/\s*=\s*/, $_);
	    if (($key eq "name") and ($val eq $for_deletion)) {
		my $query_id = $conf;
		$query_id =~ s/\.conf//;
		`rm $query_id*`;	    
	    }
	}
    }
}

if ($action eq 'rename') {

    my $newname = CGI::param('newname');
    my $for_renaming = CGI::param('for_renaming');    

    print "$lang{'get_hits_renaming'} $for_renaming $lang{'get_hits_to'} $newname<br>";

    # fixme! - Flytta till Glossa.pm och refaktorisera
    foreach my $conf (@confs) {

	my $rename;
	
	my $newconf = $conf . ".new";
	open (NEWCONF, ">$newconf");
	
	open (CONF, $conf);
	while (<CONF>) {
	    chomp;
	    my ($key,$val) = split(/\s*=\s*/, $_);
	    if (($key eq "name") and ($val eq $for_renaming)) {
		$val = $newname;
		$rename = 1;
	    }
	    print NEWCONF $key, " = ", $val, "\n";
	}
	if ($rename) {
	    `mv $newconf $conf`;
	}

    }

}

if ($action eq 'join') {

    my %sets;

    my $join_to = CGI::param('join_to');
    my @join = CGI::param('join_name');    

    print "$lang{'get_hits_joining'} ";
    print join("|",@join);
    print " $lang{'get_hits_to'} $join_to<br>";

    foreach my $conf (@confs) {
	
	open (CONF, $conf);
	while (<CONF>) {
	    chomp;
	    my ($key,$val) = split(/\s*=\s*/, $_);
	    if ($key eq "name") {
		my $query_id = $conf;
		$query_id =~ s/\.conf//;
		$sets{$val}=$query_id;
	    }
	}

    }

    my @origfiles = <$sets{$join_to}*.dat>;
    my $query_id = $sets{$join_to};
    my $query_id_short = $query_id;
    $query_id_short =~ s/.*\///;
    my $no = @origfiles;
    
    open (TOP, ">>$query_id.top");

    foreach my $join_name (@join) {

	my @files = <$sets{$join_name}*.dat>;
	foreach my $file (@files) {
	    $no++;
	    my $newfilename = $query_id . "_" . $no . ".dat";
	    print "cp $file $newfilename<br>";
	    `cp $file $newfilename`;
	    print TOP "<a id='page_8' href='$conf{'cgiRoot'}/show_page_dev.cgi?n=", $no, "&query_id=", $query_id_short, "&corpus=$corpus'>", $no, "</a>";
	}
    }

}

my @confs = <$hits_dir/*.conf>;


print "<form action='$conf{'cgiRoot'}/get_hits.cgi' method='GET'><table border=1>";
print "<td>$lang{'get_hits_name'}</th><th>$lang{'get_hits_delete'}</th><th>$lang{'get_hits_rename'}</th><th>$lang{'get_hits_add'}</th>";

print "<input type='hidden' value='join' name='action'></input>";
print "<input type='hidden' value='$corpus' name='corpus'></input>";

my @names;

foreach my $conf (@confs) {

    my $query_id = $conf;
    $query_id =~ s/\.conf$//;
    $query_id =~ s/.*\///;

    open (CONF, $conf);
    while (<CONF>) {
	chomp;
        my ($key,$val) = split(/\s*=\s*/, $_);
	if ($key eq "name") {
	    push @names, $val;
	    print "<tr><td><a href='", $conf{'cgiRoot'}, "/show_page_dev.cgi?query_id=$query_id&name=$val&corpus=$corpus&n=1'>$val</a></td>";
	    print "<td><a href='", $conf{'cgiRoot'}, "/get_hits.cgi?action=delete&for_deletion=$val&corpus=$corpus'>*</a></td>";
	    print "<td><a id='renameA' href='", $conf{'cgiRoot'}, "/get_hits.cgi?action=rename&for_renaming=$val&corpus=$corpus' onClick='getNewName()'>*</a></td>";
	    print "<td><input type='checkbox' name='join_name' value='$val'></input></td></tr>";
	}
    }
    close CONF;

}

print "</table>"; 

print "<br>$lang{'get_hits_add_selected_to'} <select name='join_to'>";
print "<option>$lang{'get_hits_not_selected'}</option>";    
foreach my $name (@names) {
    print "<option value='$name'>$name</option>";
}
print "</select> ";

print "<input type='submit' value='$lang{'get_hits_join_results'}'></input>";

print "</form>";
print "</body></html>";
