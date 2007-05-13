print "<text id=\"1\">\n";

$s_ident = "<s id=\"1\">\n";

$s=1;

my $hastag;
my $istitle;
my $title;

while (<STDIN>) {
    chomp;


    if (/^<p type=title>/) {
#        print "1";
        $istitle=1;
    }
    elsif (/^<\\p>/) {
#        print "2";
        $istitle=0;
    }
    elsif ($istitle) {
#        print "3";
        if (/"<(\d+:\d+)>"/) {
            $title=$1;
        }
    }
    elsif (/^<p>/) {
#        print "4";
        print "</p>\n<p id=\"$title\">\n";
    }
    else {      

        if (/^"<(.*)>"$/) { 
            if ($s_ident) {
                print $s_ident;
                undef $s_ident;
            }
            print $1;
            $hastag=0;
        }
        if ((/^\t"(.*?)" (\S+)/) and !($hastag)) { 
            my $t = $2; 
            $t = lc($t); 
            print "\t$t\t$1\n"; 
            $hastag=1; 
        }
        if (/\<\<\</) { $s++; $s_ident = "<s id=\"$s\">\n"; }

    }

}
