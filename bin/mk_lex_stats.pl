use DBI;

#my $dsn = "DBI:mysql:database=cwb_glossa;host=localhost";
my $dsn = "DBI:mysql:database=CE_omc;host=localhost";
my $dbh = DBI->connect($dsn, "cwb", "", {RaiseError => 0}) ||
        die $DBI::errstr;


my @morph_n;

my $c = $ARGV[0];

if ($c eq "ILN_LEKS") {
    @morph_n = ('pos', 'type', 'grad_dia', 'tid_bestemthet', 'modus_kasus', 'person_type2', 'tall', 'kjonn');
}
elsif ($c =~ m/^OMC3_/) {
    @morph_n = ('pos', 'type', 'degr_dia', 'tense_defin', 'mood_case', 'person_type2', 'number', 'gender');
}
elsif ($c eq "TEST") {
    @morph_n = ('extra', 'pos', 'degr', 'dia', 'tense_defin', 'case_', 'mood', 'person_type2', 'number', 'gender', 'func');
}

#    @morph_n = ('degr', 'dia', 'tense_defin', 'case', 'mood', 'person_type2', 'number', 'gender', 'func');


while (<STDIN>) {

    chomp;
    next if (/^\s*\</);
    my ($form, $lemma, @morph) = split(/\t/);

    $lemma =~ s/\\/\\\\/g;
    $lemma =~ s/\'/\\'/g;
    $lemma =~ s/\"/\\"/g; # "
    $lemma =~ s/;/\\;/g;

    $form =~ s/\\/\\\\/g;
    $form =~ s/\'/\\'/g;
    $form =~ s/\"/\\"/g; # "
    $form =~ s/;/\\;/g;

    unless ($morph[0] eq 'p') {
	$form = lc($form);
    }

    $table = $c . "_" . $c . "lexstat";

    my $sql = "INSERT INTO $table SET form = '$form', lemma = '$lemma' ";

    foreach my $m_n (@morph_n) {
	my $m_v = shift @morph;
	$sql .= ", ". $m_n . "=" . "'$m_v' ";
    }

    $sql .= " ON DUPLICATE KEY UPDATE freq=freq+1;";
    $dbh->do($sql);


#    print; print "\n";
#    print "LEMMA: $lemma_sql\n";
#    print "LEMMA_ID: $lemma_id_sql\n";
#    print "FORM: $form_sql\n";
#    print "\n\n\n";

}
