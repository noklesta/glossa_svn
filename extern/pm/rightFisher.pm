
=head1 NAME

rightFisher.pm	

=head1 SYNOPSIS

Statistical library package to calculate the Fisher's exact test 
(right-sided). This package should be used with statistic.pl and rank.pl

=head1 DESCRIPTION

A right sided test is calculated by adding the probabilities of all
the possible two by two contingency tables formed by fixing the
marginal totals and changing the value of n11 to greater than or
equal to the given value. A right sided Fisher's Exact Test tells us
how likely it is to randomly sample a table where n11 is greater
than observed. In other words, it tells us how likely it is to sample
an observation where the two words are more dependent than currently
observed.

=head1 AUTHORS

Ted Pedersen <tpederse@d.umn.edu>

Satanjeev Banerjee <banerjee@cs.cmu.edu>

Bridget Thomson McInnes <bthomson@d.umn.edu>

=head1 BUGS

This measure currently only defined for bigram data stored in 2x2 
contingency table. 

=head1 SEE ALSO

Mailing List: http://groups.yahoo.com/ngram

=head1 COPYRIGHT

Copyright 2000-2004 by Ted Pedersen and Satanjeev Banerjee

This program is free software; you can redistribute it and/or
modify it under the terms of the GNU General Public License
as published by the Free Software Foundation; either version 2
of the License, or (at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with this program; if not, write to the Free Software
Foundation, Inc., 59 Temple Place - Suite 330, Boston, MA  02111-1307, USA.

=cut

package	rightFisher;
use Config;
use File::Spec;

#  Make sure that measure2d.pm is available in the PATH. First
#  we check in the directory you are running from, and then we
#  look through the system path. If the module is not found anywhere
#  then abort. 

my $module = "measure2d.pm"; my $modulename = "measure2d.pm";
my $path_sep = $Config::Config{path_sep};

if( !( -f $modulename ) ) {
    my $found = 0;
    #  Check each of the PATHS to see if the module is there
    foreach (split(/$path_sep/, $ENV{PATH})) {
 	$module = File::Spec->catfile($_, $modulename);
	if ( -f $module ) { $found = 1; last; }
    }
    if ( ! $found ) {
        $module = "/home/httpd/html/glossa/pm/" . $modulename;
        if ( -f $module ) { $found = 1 }
    }
    # if still not found anywhere, quit!
    if ( ! $found ) { print "Could not find $modulename.\n"; exit; }
}

# Include the module into the current package.    

require $module;
require	Exporter;

@ISA = qw ( Exporter );
@EXPORT = qw (initializeStatistic getStatisticName calculateStatistic errorCode errorString);

# function to set up various variables before the actual computation
# starts. also to check if we are being given bigrams, and if our
# frequency combinations are enough to do the computation
sub initializeStatistic
{
    measure2d::initializeStatistic(@_);
}


# function to calculate the left fisher value!
sub calculateStatistic
{
    #  The parameters passed into calculateStatistic
    #  need to be passed into getObservedValues for it 
    #  to calculate the Observed values. If there is a 
    #  problem with the observed values, this function 
    #  will return, causing the measure to abort its 
    #  computations and return with a zero code.
    
    if( !( ($n11, $n12, $n21, $n22) = measure2d::getObservedValues(@_) ) ) {
	return(0);
    }
    
    #  Get the total number of bigrams; no need to check 
    #  if this is correct because this value was already 
    #  checked and computed in measure2d::initalizeStatistic.
    #  getTotalBigrams simply reads an existing value. 

    my $npp = measure2d::getTotalBigrams();

    
    #  Get the marginal values
    ($n1p, $np1, $n2p, $np2) = measure2d::getMarginalTotals();
    
    # we shall have two	arrays one for the numerator and one for the
    # denominator. the arrays will contain the factorial upper limits. we
    # shall be arrange these two arrays	in descending order. while doing the
    # actual calculation, we shall take	a numerator/denominator	pair, and
    # go from the lower	value to the higher value, in effect doing a
    # "cancellation" of	sorts.

    # first create the numerator
    my @numerator = sort { $b <=> $a } ($n1p, $np1, $n2p, $np2);

    # now to the real calculation!!!
    my $probability = 0;
    my $i;
    my $j;

    # we shall calculate for n11 = 0. thereafter we shall just multiply	and
    # divide the result	for 0 with correct numbers to obtain result for	i,
    # i>0, i<=n11!! :o)

    #  Set the final limit to the least of the marginal totals
    #  n1p or np1 because that is the maximum number of times
    #  the bigram would be seen

    $final_Limit = ($n1p < $np1) ? $n1p : $np1;

    my @denominator = sort { $b	<=> $a } ($npp,	$n22, $n12, $n21, $n11);

    # now that we have our two arrays all nicely sorted	and in place,
    # lets do the calculations!

    my @dLimits	= ();
    my @nLimits	= ();
    my $dIndex = 0;
    my $nIndex = 0;

    for	( $j = 0; $j < 4; $j ++	)
    {
	if ( $numerator[$j] > $denominator[$j] )
	{
	    $nLimits[$nIndex] =	$denominator[$j] + 1;
	    $nLimits[$nIndex+1]	= $numerator[$j];
	    $nIndex += 2;
	}

	elsif (	$denominator[$j] > $numerator[$j] )
	{
	    $dLimits[$dIndex] =	$numerator[$j] + 1;
	    $dLimits[$dIndex+1]	= $denominator[$j];
	    $dIndex += 2;
	}
    }
    $dLimits[$dIndex] =	1;
    $dLimits[$dIndex+1]	= $denominator[4];

    my $product	= 1;
    while ( defined ( $nLimits[0] ) )
    {
	while (	( $product < 10000 ) &&	( defined ( $nLimits[0]	) ) )
	{
	    $product *=	$nLimits[0];
	    $nLimits[0]++;
	    if ( $nLimits[0] > $nLimits[1] )
	    {
		shift @nLimits;
		shift @nLimits;
	    }
	}

	while (	$product > 1 )
	{
	    $product /=	$dLimits[0];
	    $dLimits[0]++;
	    if ( $dLimits[0] > $dLimits[1] )
	    {
		shift @dLimits;
		shift @dLimits;
	    }
	}
    }

    while ( defined ( $dLimits[0] ) )
    {
	$product /= $dLimits[0];
	$dLimits[0]++;
	if ( $dLimits[0] > $dLimits[1] )
	{
	    shift @dLimits;
	    shift @dLimits;
	}
    }

    # $product now has the hypergeometric probability for n11 = 0. add it to
    # the cumulative probability

    # Actually we are now adding the hypergeometric probability for the
    # original n11 - Bridget Thomson McInnes 15 October 2003
    $probability += $product;

    # now for the rest of n11's	!!

    # Now we add the hypergeometric probability for the possible
    # n11 values greater than the original n11 up until the
    # final limit. 
    for	( $i = $n11+1; $i <= $final_Limit; $i++ )
    {
	$product *= $n12;
	$n22++;
	if ($n22 <= 0) { next; }
	$product /= $n22;
	$product *= $n21;
	$n12--;
	$n21--;
	$product /= $i;

	# thats	our new	probability for	n11 = i! :o)) cool eh? ;o))
	# add it to the	main probability! :o))

	$probability +=	$product; # !! :o)

    }

    # thats abt	it!
    return $probability;
}

# function to return the error code of the last operation and reset
# error code. useful if the error can be recovered from!
sub errorCode 
{ 
    return measure2d::errorCode();
}

# function to return the error message of the last operation and reset
# the message string. useful if error can be recovered from!
sub errorString
{
    return measure2d::errorString();
}

# function to return the name of this statistic
sub getStatisticName
{
    return "Right Fisher";
}

1;
