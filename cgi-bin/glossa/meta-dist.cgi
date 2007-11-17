#!/usr/bin/env perl

print "Content-type: text/html\n\n";

use CGI::Carp qw(fatalsToBrowser);
use strict;
use CGI;
use DBI;
use Data::Dumper;
use lib("/home/httpd/html/glossa/pm");
use Glossa;

# get cgi input
my $cgi = CGI->new;
my $corpus = CGI::param('corpus');
my $query_id = CGI::param('query_id');


my $conf = Glossa::get_conf_file($corpus);
my %conf = %$conf;




my $query_id2 = $query_id."_";
my @files = <$conf{tmp_dir}/$query_id2*>;

my $outputfile = $conf{tmp_dir} . "/" . $query_id . ".metadist";
open (OUTFILE, ">$outputfile");

my %count;
my %tids;

$/="\n\n\n";
foreach my $f (@files) {

    open (FILE, $f);

    while (<FILE>) {

	my @lines = split(/\n/, $_);
	my $source = shift @lines;
	my ($c,$s_id,$sts_string,$left,$match,$right) = split(/\t/, $source);

	my @sts = split(/\|\|/, $sts_string);
	my %sts;
	foreach my $sts (@sts) {
	    my ($k,$v) = split(/=/, $sts);
	    $sts{$k}=$v;
	}

	my $t_id = $sts{'text_id'};

	$count{$t_id}++;
	$tids{$t_id}=1;


    }

}
$/="\n";

#print "<pre>";
#print Dumper %count;
#print "</pre>";



my @tids;
# read query configuration fil
my $conf=$conf{'tmp_dir'} . "/" . $query_id . ".conf"; 
open (CONF, "$conf");
while (<CONF>) {
    chomp;
    if (/^texts_allowed=(.*)/) { 

	@tids = split(" ", $1);
    }
}
close CONF;



# turn off buffering
select(STDOUT);
$|=1;

# initialize MySQL
my $dsn = "DBI:mysql:database=$conf{'db_name'};host=$conf{'db_host'}";  
my $dbh = DBI->connect($dsn, $conf{'db_uname'}, $conf{'db_pwd'}, {RaiseError => 1});


my $text_table = uc($corpus) . "text";
my $author_table = uc($corpus) . "author";
my $class_table = uc($corpus) . "class";





my @meta_text = split(/ /, $conf{'meta_text'});
foreach my $m (@meta_text) {
    $m = $text_table . "." . $m;
}
my $text_select = join(", ", @meta_text);


my @meta_class = split(/ /, $conf{'meta_class'});
foreach my $m (@meta_class) {
    $m = $class_table . "." . $m;
}
my $class_select = join(", ", @meta_class);

my @meta_author = split(/ /, $conf{'meta_author'});
foreach my $m (@meta_author) {
    $m = $author_table . "." . $m;
}
my $author_select = join(", ", @meta_author);




my %stats;



foreach my $tid (keys %tids) {

    my $count = $count{$tid};

    my $sql_query = "SELECT $text_select FROM $text_table WHERE tid = '$tid';";



    my $sth = $dbh->prepare($sql_query);
    $sth->execute  || die "Error fetching data: $DBI::errstr";

    my @r = $sth->fetchrow_array;
	
    foreach my $a (@meta_text) {
	my $tmp = shift @r;
	$stats{$a}->{$tmp} += $count;
    }

    
    if ($class_select) {


	# FIXME: at det er den første kommer an på cgi.conf
	my $sql = "SELECT $class_select from $class_table where $class_table.tid='$tid';";

	my $sth2 = $dbh->prepare($sql);
	$sth2->execute  || die "Error fetching data: $DBI::errstr";
	
	while (my (@r2) = $sth2->fetchrow_array) { 
	    foreach my $a (@meta_class) {
		my $tmp = shift @r2;
		$stats{$a}->{$tmp} += $count;
	    }	    
	}

	
    }

    if ($author_select) {


	# FIXME: at det er den første kommer an på cgi.conf
	my $sql = "SELECT $author_select from $author_table where $author_table.tid='$tid';";
	
	my $sth2 = $dbh->prepare($sql);
	$sth2->execute  || die "Error fetching data: $DBI::errstr";
	
	while (my (@r2) = $sth2->fetchrow_array) { 
	    foreach my $a (@meta_author) {
		my $tmp = shift @r2;
		$stats{$a}->{$tmp} += $count;
	    }	    
	}

	
    }    

    
}


#print "<pre>";
#print Dumper %stats;
#print "</pre>";

while (my ($k,$v) = each %stats) {

    
    # map
    if ($k eq 'text.pubplace') {
#	print " <a href='http://omilia.uio.no/omc/dat/$query_id.svg'>(kart)</a>";
    }

    my %s = %$v;

    my @res;
    my @map;

    while (my ($k2,$v2) = each %s) {

	my $ratio;
	my $total;

	# map
	if ($k eq 'text.pubplace') {
	    push @map, $k2;
	}

	    
	$k2 =~ s/\\/\\\\/g;
	$k2 =~ s/\"/\\"/g; # "
	$k2 =~ s/\'/\\'/g; # '	    

  	my $sql;
 	if ($k =~ m/text\./) {
	    $sql = "select sum(wordcount) from $text_table where $k = '$k2';";
	}
	elsif ($k =~ m/class\./) {
	    $sql = "select sum($text_table.wordcount) from $text_table,$class_table where $k = '$k2' and $class_table.tid=$text_table.tid;";
	}
	elsif ($k =~ m/author\./) {
	    $sql = "select sum($text_table.wordcount) from $text_table,$author_table where $k = '$k2' and $author_table.tid=$text_table.tid;";
	}
	else {
	    print "K $k<br>";
	    die ("invalid option");
	}
#	print $sql, "<br>";

	my $sth = $dbh->prepare($sql);
	$sth->execute  || die "Error fetching data: $DBI::errstr";
	
	($total) = $sth->fetchrow_array;
	
	next unless ($total > 1);
	
	$ratio = $v2 / ($total / 1000);
	$ratio= sprintf("%.3f",$ratio);


	push @res, [$k2, $v2, $ratio, $total];


    }

    # map
    if ($k eq 'text.pubplace') {
	print_map(\@map);
    }

    my @res_sorted = sort {$b->[2] <=> $a->[2]} @res;

    my $array_length = @res;


    print OUTFILE $k, "\t", $array_length, "\n";
    print "<b>$k</b> (", $array_length, " entries)<br>";

    print "<table border=1>";
    foreach my $r (@res_sorted) {
	print OUTFILE $r->[0], "\t", $r->[1], "\t", $r->[2], "\t", $r->[3], "\n";
	print "<tr><td>", $r->[0], "</td><td>", $r->[1], "</td><td>", $r->[2], "</td><td>", $r->[3], "</td></tr>";
    }
    print "</table>";
    print "<br>";

    print OUTFILE "\n";


}

sub print_map {

    # This function is not written yet ...

    my $map = shift;
    my @map = @$map;


}

