
=head1 NAME

odds.pm 

=head1 SYNOPSIS

Statistical library package to calculate the Odds Ratio. This
package should be used with statistic.pl and rank.pl.

=head1 DESCRIPTION

Assume that the frequency count data associated with a bigram 
<word1><word2> is stored in a 2x2 contingency table:

          word2   ~word2
  word1    n11      n12 | n1p
 ~word1    n21      n22 | n2p
           --------------
           np1      np2   npp

where n11 is the number of times <word1><word2> occur together, and
n12 is the number of times <word1> occurs with some word other than
word2, and n1p is the number of times in total that word1 occurs as
the first word in a bigram. 

The odds ratio computes the ratio of the number of times that
the words in a bigram occur together (or not at all) to the
number of times the words occur individually. It is the cross
product of the diagonal and the off-diagonal. 

Thus, ODDS RATIO = n11*n22/n21*n12

if n21 and/or n12 is 0, then each zero value is "smoothed" to one to  
avoid a zero in the denominator. 

=head1 AUTHORS

Ted Pedersen <tpederse@d.umn.edu>

Bridget Thomson McInnes <bthomson@d.umn.edu>

=head1 BUGS

This measure currently only defined for bigram data stored in 2x2 
contingency table. 

=head1 SEE ALSO

Mailing List: http://groups.yahoo.com/ngram

=head1 COPYRIGHT

Copyright 2000-2004 by Ted Pedersen

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

package odds;
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

require Exporter;
@ISA = qw ( Exporter );
@EXPORT = qw (initializeStatistic getStatisticName calculateStatistic errorCode errorString);

# function to set up various variables before the actual computation
# starts. also to check if we are being given bigrams, and if our
# frequency combinations are enough to do the computation

sub initializeStatistic
{
    measure2d::initializeStatistic(@_);
}

# function to calculate the odds ratio!

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
    
    # zero handling to avoid zero denominator

    if ($n21 == 0) { 
	$n21 = 1;
    }
    if ($n12 == 0) { 
	$n12 = 1;
    }

    #  Now the calculation
    $term1 = $n11*$n22;
    $term2 = $n21*$n12;

    $odds = $term1/$term2; 

    #  return the statistic
    return ($odds);
}


# function to return the error code of the last operation and reset
# error code. useful if the error can be recovered from!

sub errorCode 
{ 
    return measure2d::errorCode(); 
}

# Function to return the error message of the last operation and reset
# the message string. Useful if error can be recovered from!

sub errorString
{
    return measure2d::errorString();
}

# function to return the name of this statistic
sub getStatisticName
{
    return "Odds Ratio";
}

1;

