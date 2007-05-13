
=head1 NAME

tmi.pm 

=head1 SYNOPSIS

Statistical library module to calculate the true mutual information 
value. This module should be used with statistic.pl and rank.pl. 

=head1 DESCRIPTION

We call this true mutual information to distinguish it from pointwise 
mutual information (pmi). 

Note that the true mutual information value is distinct from pointwise  
mutual information (pmi.pm). True mutual information is equivalent to
the log-likelihood ratio (ll.pm). They only differ by a scaling factor.

=cut

# This module is based on Satanjeev Banerjee's ll.pm (log likelihood)
# module. Amruta Purandare originally ported tmi.pm from ll.pm, and then
# it was further updated by Bridget McInnes to use the measured2.pm
# module. 

package tmi;
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
@EXPORT = qw (initializeStatistic getStatisticName calculateStatistic 
	      errorCode errorString);

# Call to function to set up various variables before the actual   
# computation starts. Checks to see if input is bigrams, and if we 
# have the proper frequency combinations to carry out the desired 
# computation. 

sub initializeStatistic
{
    measure2d::initializeStatistic(@_);
}

# Function to calculate the tmi value!

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
       
    #  Check the expected values to ensure that they are not 
    #  equal to zero. Also, the quotient of the observed and 
    #  expected value should not be less than zero. If there 
    #  is a problem with the expected values, this function
    #  will return, causing the measure to abort and return
    #  with a zero code.
    
    if( !( ($m11, $m12, $m21, $m22) = measure2d::getExpectedValues() ) ) {
	return(0);
    }
        
    #  Get the total number of bigrams; no need to check 
    #  if this is correct because this value was already 
    #  checked and computed in measure2d::initalizeStatistic.
    #  getTotalBigrams simply reads an existing value. 

    my $npp = measure2d::getTotalBigrams();

    #  Now for the actual calculation of true mututal information!

    $tmi = 0;

    if ( $n11 ) { $tmi += $n11/$npp * log ( $n11 / $m11 ) /log 2;  }
    if ( $n12 ) { $tmi += $n12/$npp * log ( $n12 / $m12 ) / log 2; }
    if ( $n21 ) { $tmi += $n21/$npp * log ( $n21 / $m21 ) / log 2; }
    if ( $n22 ) { $tmi+= $n22/$npp * log ( $n22 / $m22 )/log 2;    }

    #  Return the value of the statistic!

    return ( $tmi);
}

# Function to return the error code of the last operation and reset
# error code. Useful if the error can be recovered from!

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

# Function to return the name of this statistic. Useful for generating
# descriptive error messages. 

sub getStatisticName
{
    return "True Mutual Information";
}

1;

=head1 AUTHORS

Ted Pedersen <tpederse@d.umn.edu>

Satanjeev Banerjee <banerjee@cs.cmu.edu>

Amruta Purandare <pura0010@d.umn.edu> 

Bridget McInnes <bthomson@d.umn.edu> 

=head1 BUGS

This measure currently only defined for bigram data stored in 2x2 
contingency table. 

=head1 SEE ALSO

Home Page   : http://www.d.umn.edu/~tpederse/nsp.html

Mailing List: http://groups.yahoo.com/ngram

=head1 COPYRIGHT

Copyright 2000-2004 by Ted Pedersen and Satanjeev Banerjee and Amruta 
Purandare and Bridget McInnes

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


