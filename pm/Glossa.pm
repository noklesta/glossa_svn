package Glossa;

use warnings;
use strict;
use Carp;
use CGI;
use base qw{ Exporter };
use Data::Dumper;
use DBI;

our $VERSION   = '0.1';
our @EXPORT_OK = qw{ get_conf_file print_token print_token_target create_tid_list get_metadata_feat };
 
sub get_conf_file {

    my $corpus = shift;
    my $conf_file = shift;

    my %conf;

    unless ($corpus) { $corpus = "test" }

    # read configuration file
    unless ($conf_file) {
	$conf_file = "/hf/omilia/site/glossa-0.7/dat/" . $corpus . "/cgi.conf";
    }


    open (CONF, $conf_file);
    while (<CONF>) {
	chomp;
	next if (/^#/);
	s/\s*$//;
	my ($k,$v)=split(/\s*=\s*/);
	$conf{$k}=$v;
    }
    close CONF;
    
    return \%conf;

}

sub create_cgi_hash2 {

    my $cgi_hash=shift;
    my %cgi_hash=%$cgi_hash;

    # put form information into a hash
    my %in;
    while (my ($prm,$vvv) = each %cgi_hash ) {

	my @vals = @$vvv;
	
	my @prm=split(/_/, $prm);
	
	# FIXME: do recursively, to allow arbitrary expansion
	if (@prm == 2) {
	    $in{$prm[0]}->{$prm[1]}=\@vals;	    
	}
	elsif (@prm == 3) {
	    $in{$prm[0]}->{$prm[1]}->{$prm[2]}=\@vals;	    
	}
	elsif (@prm == 4) {
	    
#	    print "0 $prm[0]<br>";
#	    print "1 $prm[1]<br>";
#	    print "2 $prm[2]<br>";
#	    print "3 $prm[3]<br>";
#	    print join(" ", @vals), "<br>";
#	    print "<br>";
	    $in{$prm[0]}->{$prm[1]}->{$prm[2]}->{$prm[3]}=\@vals;	    
	}

    }

    return (\%in);


}

sub create_cgi_hash {

    my $cgi=shift;
    
    my %in;

    my @prms = $cgi->param();
    foreach my $prm (@prms){
	
	my @vals = $cgi->param($prm);
	
	my @prm=split(/_/, $prm);
	
	# FIXME: do recursively, to allow arbitrary expansion
	if (@prm == 2) {
	    $in{$prm[0]}->{$prm[1]}=\@vals;	    
	}
	elsif (@prm == 3) {
	    $in{$prm[0]}->{$prm[1]}->{$prm[2]}=\@vals;	    
	}
	elsif (@prm == 4) {
	    $in{$prm[0]}->{$prm[1]}->{$prm[2]}->{$prm[3]}=\@vals;	    
	}
	
    }

    return (\%in);


}

sub get_metadata_feat {

    my ($feat, $tid, $conf) = @_;
    my %conf = %$conf;
    my $dsn = "DBI:mysql:database=$conf{'db_name'};host=$conf{'db_host'}";
    my $dbh = DBI->connect($dsn, $conf{'db_uname'}, $conf{'db_pwd'}, {RaiseError => 1});    

    my $feattable = $feat;
    $feattable =~ s/\..*//;
    $feat =~ s/.*\.//;

    my $sql = "SELECT $feat from $feattable where tid='$tid';";

#    print STDERR $sql;

    my $sth = $dbh->prepare($sql);
    $sth->execute  || die "Error fetching data: $DBI::errstr";
    my ($featval) = $sth->fetchrow_array;
#    next unless $featval;
    return $featval;


}

sub create_tid_list {


    my $conf = shift;                my %conf = %$conf;
    my $in = shift;                  my %in = %$in;
    my $CORPUS = shift;
    
    my $aligned_corpora = shift;
    my %aligned_corpora;
    if ($aligned_corpora) {
	%aligned_corpora = %$aligned_corpora;
    } 
    my %aligned_corpora_opt;
    my $aligned_corpora_opt = shift; 
    if ($aligned_corpora_opt) {
	%aligned_corpora_opt = %$aligned_corpora_opt;
    }

    my $base_corpus = shift;

    use DBI;

    # initialize MySQL
#my $dsn = "DBI:mysql:database=glossa;host=omilia.uio.no";

#my $dbh = DBI->connect($dsn, "glossa_reader", "tuba");

    my $dsn = "DBI:mysql:database=$conf{'db_name'};host=$conf{'db_host'}";
    my $dbh = DBI->connect($dsn, $conf{'db_uname'}, $conf{'db_pwd'}, {RaiseError => 1});


    my $cats=$in{'meta'}->{'values'};
    my @all_restr;
    my %tables;

    my $sql_query_nl;
    my $subcorpus_string;

    my %from_string;

    while (my ($cat,$vals) = each %$cats) {

	next unless ($vals->[0]);
	#print "C: $cat ", join(" ", @$vals), "<br>";
	
	my ($id, $sql) = split(/::/, $cat); 
	my ($tablename, $colname) = split(/\./, $sql);
	
	my @restr_pos;
	my @restr_neg;

	my $mode = $in{'meta'}->{'mode'}->{$id}->[0];

	$subcorpus_string .= $mode . "\t" . $id;

	# MODE: range
	if ($mode eq 'range') {
	    my $fr = $vals->[0];
	    my $to = $vals->[1];

	    unless ($fr eq '') {
		$tables{$tablename}=1;
		push @restr_neg, "$sql >= '$fr'";	    
		$sql_query_nl .= "$sql more than $fr; ";
	    }
	    unless ($to eq '') {
		$tables{$tablename}=1;
		push @restr_neg, "$sql <= '$to'";	   
		$sql_query_nl .= "$sql less than $to; "; 
	    }
	    $from_string{$tablename}=1;
	}



	# MODE: like / not like / check
	foreach my $val (@$vals) {
	    
	    $subcorpus_string .= "\t" . $val;

	    if ($mode eq 'LIKE') {
		$tables{$tablename}=1;
		my $val_restr = $sql . " " . $mode . " '" . $val . "'";
		push @restr_pos, $val_restr;
		$sql_query_nl .= "$sql is $val; ";
	    }
	    elsif ($mode eq 'NOT LIKE') {
		$tables{$tablename}=1;
		my $val_restr = $sql . " " . $mode . " '" . $val . "'";
		push @restr_neg, $val_restr;
		$sql_query_nl .= "$sql is not $val; ";
	    }
	    elsif ($mode eq 'check') {
		$tables{$tablename}=1;
		my $val_restr = $sql . " " . "=" . " '" . $val . "'";
		push @restr_pos, $val_restr;
		$sql_query_nl .= "$sql is $val; ";
	    }

	    $from_string{$tablename}=1;
	    
	}
	$subcorpus_string .= "\n";
	
	my $restr = "(";
	
	if (@restr_pos) {
	    my $restr_pos = "(" . join(" OR ", @restr_pos) . ")";
	    $restr .= $restr_pos;
	}
	if (@restr_neg) {
	    my $restr_neg = "(" . join(" AND ", @restr_neg) . ")";
	    if (@restr_pos) {
		$restr .= " AND ";
	    }
	    $restr .= $restr_neg;
	}
	
	$restr .= ")";
	next if ($restr eq "()");
	push @all_restr, $restr;


	
    }

    $CORPUS = uc($CORPUS);

    my $text_table_name = $CORPUS . "text";  
    my $author_table_name = $CORPUS . "author"; 
    my $class_table_name = $CORPUS . "class";    

    # language restrictions
    # FIXME: how to generalize this?

    my @lang_restr;
    foreach my $corpusname ((keys %aligned_corpora), (keys %aligned_corpora_opt), $base_corpus) {
	my ($a,$lang)= split(/_/, $corpusname);
	next unless (($a eq 'OMC3') or ($a eq 'OMC4'));
	if ($lang) {
	    $lang=lc($lang);
	    push @lang_restr, "$text_table_name.lang='$lang'";
	}
    }
    my $lang_restr;
    if (@lang_restr > 0) {
	$lang_restr = " (" . join(" OR ", @lang_restr) . ") ";
    } 
    
    my $select= " $text_table_name.tid,$text_table_name.startpos,$text_table_name.endpos";


    my $join;
    my $from = " $text_table_name";
    foreach my $table (keys %from_string) {
	next if ($table =~ m/text/);
	$select .= "," . $table . ".tid";
	$join .= " AND " . $table . ".tid = $text_table_name.tid";
	$from .= "," . $table;
    }
    

    
    my $sql_query;
    if ((@all_restr > 0) or (@lang_restr > 0)) {
	$sql_query = " WHERE " . join(" AND ", @all_restr);
    }
    
    if ($lang_restr) {
	if (@all_restr > 0) {
	    $sql_query .= " AND ";
	}
	$sql_query .= $lang_restr;
    } 
    if ($join) {
	$sql_query .= $join;
    }

    
    $sql_query = "SELECT $select FROM $from" . $sql_query . " order by $text_table_name.startpos;"; 
   

    my $dumpstring;
    my $dumplength;
    
    my %texts_allowed;

    #print "SQL: $sql_query<br>";
    my $sth = $dbh->prepare($sql_query);
    $sth->execute  || die "Error fetching data: $DBI::errstr";
    while (my ($tid,$s,$e) = $sth->fetchrow_array) {
	$texts_allowed{$tid}=1;
	unless (defined $s) { $s="" }
	unless (defined $e) { $e="" }
	$dumpstring .= $s . "\t" . $e . "\n";
	$dumplength++;
    }
    
    my $dumpfile = $conf{'tmp_dir'} . "/" . $conf{'query_id'} . ".dump";
    open (DUMP, ">$dumpfile");
    print DUMP $dumplength, "\n", $dumpstring;
    

    my $subcorpus; # indicate if a subcorpus is created
    if (@all_restr > 0) {
	$subcorpus=1;
    };

    my $conf_file=$conf{'tmp_dir'} . "/" . $conf{'query_id'} . ".conf"; 
    open (CONF, ">$conf_file");
    if ($sql_query) {
	print CONF "texts_allowed=", join(" ", keys %texts_allowed), "\n";
    }
    close CONF;


    return ($subcorpus,$sql_query_nl,\%texts_allowed, $subcorpus_string);
    
}




1;

__END__

=head1 NAME

Glossa

=head1 VERSION

Version 0.1


=head1 SYNOPSIS


=head1 FUNCTIONS

=head2 get_conf_file()

=head1 AUTHOR

Lars Nygaard, C<< <lars.nygaard@inl.uio.no> >>

=head1 BUGS

=head1 COPYRIGHT & LICENSE

Copyright 2006 Lars Nygaard, all rights reserved.

This program is free software; you can redistribute it and/or modify it
under the same terms as Perl itself.

=cut


