my $c;
while (<STDIN>) {

    if (/^\<s(.*)/) {
	my $id = $1;
	if ($c > 300) {
	    print $c, "$id\n";
	}
	$c=0;
    }
    else {
	$c++;
    }
    

}
