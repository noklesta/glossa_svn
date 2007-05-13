print "<text id=\"1\">\n";
print "<s id=\"1\">\n";
$s=1;
while (<STDIN>) {

    chomp;
    if (s/<s>/<s id="$s">\n/) {
        print;
        $s++;
    }
    else {
        print; print "\t\t\n";
    }

}
