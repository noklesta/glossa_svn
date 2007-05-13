use DBI;
use XML::Twig;

my $db=shift;
unless ($db) { die("please specify DB\n") }

my $xml=shift;
unless ($xml) { die("please specify XML file\n") }


my $dsn = "DBI:mysql:database=$db;host=omilia.uio.no";
my $dbh = DBI->connect($dsn, "larsnyg", "afu", {RaiseError => 0}) || die $DBI::errstr;

$dbh->do("delete from metadata;");

my $t= XML::Twig->new();
$t->parsefile($xml);

my $r=$t->root;
my @t=$r->children('text');

foreach my $text (@t) {

    my $id = $text->att('id');
    $id =~ s/^0+//;

    foreach my $att ('title','author','genre') {
        my $val = $text->att($att);
        $val =~ s/([\"|\'|\;|\#])/\\$1/g;
        $dbh->do("insert into metadata set category = '$att', text= '$id', value='$val';");
    }

    foreach my $cat ('subject','publisher','dateOriginal','dateDigital','identifier','citation','source','relation','hasPart','isPartOf') {

        my @cat_elts = $text->children($cat);
        foreach my $cat_elt (@cat_elts) {
            my $val = $cat_elt->text;
            $val =~ s/([\"|\'|\;|\#])/\\$1/g;
            $dbh->do("insert into metadata set category = '$cat', text= '$id', value='$val';");
        } 
    }

}
