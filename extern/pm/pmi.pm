=head1 NAME

pmi.pm 

=head1 SYNOPSIS

Statistical library package to calculate Pointwise Mutual Information. 
This package should be used with statistic.pl and rank.pl.

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

Pointwise Mutual Information (pmi) is defined as the log of the devitation 
between the observed frequency of a bigram (n11) and the probability of  
that bigram if it were independent (m11). 

          np1 * n1p
   m11 =  ---------
            npp

 PMI =   log (n11/m11) 

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

package pmi;
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

# function to calculate the Phi Coefficient!

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

    #  Get the marginal values; no need to check
    #  if this is correct because this value was already
    #  checked and computed in measure2d::initalizeStatistic.
    #  getTotalBigrams simply reads an existing value.

    ($n1p, $np1, $n2p, $np2) = measure2d::getMarginalTotals();

    #  Now the calculations!
    my $temp = (($n11 / $np1) / $n1p) * $npp; 

    return(log($temp)/log(2));

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
    return "Pointwise Mutual Information";
}

1;

