use strict;

while (<STDIN>) {
    if (/^\</) {
	# i.e. xml tag
	print;
    }
    else {
	my ($w) = split(/\t/);
	$w =~ s/\'/\\'/g;
	print "<w form='$w' />\n";
    }
}
