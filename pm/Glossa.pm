package Glossa;
# $Id$

use warnings;
use strict;
use Carp;
use CGI;
use base qw{ Exporter };
use Data::Dumper;
use DBI;

our $VERSION   = '0.2';
# fixme! - flytta hit print_tokens och print_tokens_target (print_it)
our @EXPORT_OK = qw{ get_conf_file get_multitags_file get_lang_file print_tokens print_tokens_target create_tid_list get_metadata_feat };

my $multiple = 0;

sub get_conf_file {

    my $corpus = shift;
    my $config_dat_file = shift;

    my %conf;

    unless ($corpus) { $corpus = "test" }

    # read configuration file
    unless ($config_dat_file) {
	$config_dat_file = "/etc/glossa/dat/" . $corpus . "/cgi.conf";
    }


    open (CONF, $config_dat_file);

    open (CHECK, ">>/hf/foni/home/joeljp/check.txt");
    print CHECK "[$config_dat_file]\n--------------------------------------\n";
    close(CHECK);
    while (<CONF>) {
	chomp;
	next if (/^#/ || /^$/);
	s/\s*$//;
	my ($k,$v)=split(/\s*=\s*/);
	$conf{$k}=$v;
#	print CHECK "$k\t->\t$v\n";
    }
    close CONF;
    if (defined($conf{'bounds_type'}) and $conf{'bounds_type'} eq 'multiple') {	$multiple++ }

#    close (CHECK);
    ## Set query id
    # This id is used to identify the files resulting from a query, so 
    # they can be processed by other functions (collocations, annotation etc.)
    my $starttime = time();
    my $rand = int(rand 100000);
    $conf{'query_id'} = $starttime . "_" . $rand;

    #print "ID: $conf{'query_id'}<br>";

    return \%conf;

}

sub get_lang_file {
    # language locale file
    my $config_dir = shift;
    my $lang_locale = shift;

    my $lang_file = $config_dir . "/lang/" . $lang_locale . ".dat";

    # read configuration file
    unless ($lang_file) {
	$lang_file = "/etc/glossa/lang/eng.dat";
    }

    my %lang;
    open (LANG, $lang_file);
    while (<LANG>) {
	chomp;
	next if (/^#/ || /^$/);
	s/\s*$//;
	my ($k,$v) = split(/\s*=\s*/);
	$lang{$k} = $v;
    }
    close LANG;
    
    return \%lang;
}

sub get_multitags_file {
    # multitag file
    my $config_dir = shift;
    my $corpus = shift;

    my $multitags_file = $config_dir . "/" . $corpus . "/multitags.dat";
    my %multitags;
    open (M, $multitags_file);
    while (<M>) {
	chomp;
	next if (/^#/ || /^$/);
	s/\s*$//;
	my ($a,$b,$c)=split(/\t/);
	next unless ($a and $b and $c);
	$multitags{$a}->{$b}=$c;
    }
    close M;

    return \%multitags;
}

sub create_cgi_hash0 {
    #FIXED (joel 20071221) uses hash_string to recursively build perl code, then evals it.. or so we thought:-/
    my $cgi_hash=shift;
    my %cgi_hash=%$cgi_hash;
    my %in = ();
    while (my ($prm,$vvv) = each %cgi_hash ) {

        my @vals = @$vvv;

        my @prms=split(/_/, $prm);
        my $hash_string = "\$in".hash_string(\@prms, $vvv);
        eval $hash_string;
    }
    return (\%in);
}

sub hash_string {
    my $array = shift;
    my $val = shift;
    my @arr = @$array;
    my $car;
    my @cdr;

    ($car, @cdr) = @arr;

    my $string = "{$car}";

    if(!@cdr){ return "$string = \\\@vals;"; }

    else{ return $string."->".hash_string(\@cdr, $val);  }

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
	    $in{$prm[0]}->{$prm[1]}->{$prm[2]}->{$prm[3]}=\@vals;
	}
    }
    return (\%in);
}

sub create_cgi_hash3 {

    my $cgi_hash=shift;
    my %cgi_hash=%$cgi_hash;

    # put form information into a hash
    my %in;
    while (my ($prm,$vvv) = each %cgi_hash ) {

	my @vals = @$vvv;
	
	my @prm=split(/_/, $prm);

	my $strip;
	my @rest;

	($strip, @rest) = @prm;
	$in{$prm[0]}=%{hash_tree(\@rest, $vvv)};

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
    $base_corpus = "" if (!defined $base_corpus);


    # initialize MySQL
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

   # LN: Her bør vi tenke oss om. Trenger vi lang_restr for de alignede
   # korpusene?
#    foreach my $corpusname ((keys %aligned_corpora), (keys %aligned_corpora_opt), $base_corpus) {
    foreach my $corpusname ($base_corpus) {
	my ($a,$lang) = split(/_/, $corpusname);
	next unless ((defined $a) and (($a eq 'OMC3') or ($a eq 'OMC4')));
	if ($lang) {
	    $lang=lc($lang);
	    push @lang_restr, "$text_table_name.lang='$lang'";
	}
    }


    if ($base_corpus eq 'SAMNO_SAMISK') {  
	push @lang_restr, "$text_table_name.lang='sme'";
    }
    if ($base_corpus eq 'SAMNO_NORSK') {  
	push @lang_restr, "$text_table_name.lang='nob'";
    }


    my $lang_restr;
    if (@lang_restr > 0) {
	$lang_restr = " (" . join(" OR ", @lang_restr) . ") ";
    } 
    
    my $select= " $text_table_name.tid,$text_table_name.startpos,$text_table_name.endpos";

    # for UPUS, NOTA etc.
    #if ($conf{'bounds_type'} eq 'multiple') {
    # [AN 08.12.07]
    if ($multiple) {
        $select= " $text_table_name.tid,$text_table_name.bounds";
    }


    my $join;
    my $from = " $text_table_name";
    foreach my $table (keys %from_string) {
	next if ($table =~ m/text/);
	$select .= "," . $table . ".tid";
	$join .= " AND " . $table . ".tid = $text_table_name.tid";
	$from .= "," . $table;
    }
    

    
    my $sql_query = "";
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

    
    $sql_query = "SELECT distinct $select FROM $from" . $sql_query . " order by $text_table_name."; 


    my $order_by_column = "startpos";

    # introduce Speech Corpus variable to handle all these exceptions..


    if ($multiple) {
	$order_by_column = "bounds";
	#$sql_query .= " order by $text_table_name.startpos;" ;
    }

    $sql_query .= $order_by_column.";" ;

=start
    open (CHECK, ">/hf/foni/home/joeljp/check.txt");
    foreach my $key (keys %conf){
	print CHECK $key . " - " . $conf{$key} . "\n";

    }
    print CHECK "$CORPUS - $sql_query";
    close (CHECK);
=cut

    my $dumpstring;
    my @dumpstring_ary;
    my $dumplength;
    

    my %texts_allowed;

#    print "SQL::: $sql_query<br>";
    my $sth = $dbh->prepare($sql_query);
    $sth->execute  || die "Error fetching data: $DBI::errstr";
    while (my ($tid,$s,$e) = $sth->fetchrow_array) {
	$texts_allowed{$tid}=1;

	# for UPUS, NOTA etc.
	#if ($conf{'bounds_type'} eq 'multiple') {
	# [AN 08.12.07]
	if ($multiple) {
	    
	    my @bounds = split(/\t/, $s);
	    foreach my $b (@bounds) {
		$b =~ s/-/\t/;
		push @dumpstring_ary, $b;
		$dumplength++;
	    }
	}
	else {
	    unless (defined $s) { $s="" }
	    unless (defined $e) { $e="" }
	    $dumpstring .= $s . "\t" . $e . "\n";
	    $dumplength++;	    
	}

    }

    # for UPUS, NOTA etc.
    #if ($conf{'bounds_type'} eq 'multiple') {
    # [AN 08.07]
    if ($multiple) {
#	my @dumpstring_ary_sorted = sort { $a <=> $b } @dumpstring_ary;
	$dumpstring = join("\n", @dumpstring_ary);
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


sub get_token_freq {

    my $sql = shift;
    my $sql_orig = $sql;
    
    my $conf = shift;
    my %conf = %$conf;
    my $CORPUS = shift;

    my $dsn = "DBI:mysql:database=$conf{'db_name'};host=$conf{'db_host'}";
    my $dbh = DBI->connect($dsn, $conf{'db_uname'}, $conf{'db_pwd'}, {RaiseError => 1});

    # FIXME
    return unless ($CORPUS eq 'bokmal');



    $sql =~ s/\.\*/%/g;
    $sql =~ s/word=/form=/g;
    $sql =~ s/ & / and /g;
    $sql =~ s/ \| / or /g;   
    $sql =~ s/\[//g;
    $sql =~ s/\]//g;
    $sql =~ s/ \%c//g;

    # FIXME
    $sql =~ s/ordkl=/pos=/g;

    $sql = "select freq from BOKMAL_BOKMALlexstat where " . $sql . ";";

    my $total = 0;
    my $sth = $dbh->prepare($sql);
    $sth->execute  || die "Error fetching data: $DBI::errstr";
    while (my ($freq) = $sth->fetchrow_array) {
	$total += $freq;
    }
    $sql_orig =~ s/^\[//;
    $sql_orig =~ s/^\(//g;
    $sql_orig =~ s/\]$//;
    $sql_orig =~ s/\)$//g;
    $sql_orig =~ s/ \%c//g;
    return "<b>$sql_orig</b> occurs <B>$total</b> in the corpus<br>";

}


1;

__END__

=head1 NAME

Glossa

=head1 VERSION

Version 0.2


=head1 SYNOPSIS


=head1 FUNCTIONS

=head2 get_conf_file()

=head2 get_multitags_file()

=head2 get_lang_file()

=head1 AUTHOR

Lars Nygaard, C<< <lars.nygaard@inl.uio.no> >>
Anders Noklestad, C<< <anders.noklestad@iln.uio.no> >>
Leif-Jöran Olsson, C<< <leif-joran.olsson@svenska.gu.se> >>

=head1 BUGS

=head1 COPYRIGHT & LICENSE

Copyright 2006-2009 Glossa partners.

This program is free software; you can redistribute it and/or modify it
under the same terms as Perl itself.

=cut


