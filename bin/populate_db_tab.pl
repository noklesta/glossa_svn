use DBI;
use Unicode::MapUTF8 qw(to_utf8 from_utf8 utf8_supported_charset);

my $db=shift;
unless ($db) { die("please specify DB\n") }

my $dsn = "DBI:mysql:database=$db;host=omilia.uio.no";
my $dbh = DBI->connect($dsn, "larsnyg", "afu", {RaiseError => 0}) || die $DBI::errstr;

$dbh->do("delete from s;");
$dbh->do("delete from lex_stats;");

my $content;
my $s; 
my $t_id;

while (<STDIN>) {
    chomp;

    if (/^<s id=\"(\S+)\">$/) {

        # commit previous
        if ($content) {
            $dbh->do(qq{insert into s set t_id = '$t_id', s = '$s', content='$content';});
            $content="";
        }

        my $s_id = $1;
        $s=$s_id;
        my $tmp;
        ($tmp,$t_id)=split(/\./,$s_id);

    }
    elsif (/^<.*>$/) { }
    else {
        s/([\"|\'|\;|\#])/\\$1/g;

        my ($wf,$t,$le)=split(/\t/, $_);        
        $dbh->do("insert into lex_stats set freq=1, wf = '$wf', lemma = '$le', tag = '$t' on duplicate key update freq=freq+1;");

        s/\t.*//;
        $content.=$_ . " ";

    }

}
