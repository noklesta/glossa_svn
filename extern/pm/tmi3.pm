
=head1 NAME

tmi3.pm 

=head1 SYNOPSIS

Statistical library package to calculate the true mutual information 
for trigrams. This package should be used with statistic.pl and rank.pl.

=head1 DESCRIPTION

Note that the true mutual information value is distinct from pointwise  
mutual information (pmi.pm). True mutual information is equivalent to
the log-likelihood ratio (ll3.pm). They only differ by a scaling factor.

=head1 AUTHORS

Ted Pedersen <tpederse@d.umn.edu>

Satanjeev Banerjee <banerjee@cs.cmu.edu>

Amruta Purandare <pura0010@d.umn.edu> 

Bridget Thomson McInnes <bthomson@d.umn.edu>

=head1 BUGS

This measure currently only defined for trigram data stored in 3x3x3 
contingency table. 

=head1 SEE ALSO

Mailing List: http://groups.yahoo.com/ngram

=head1 COPYRIGHT

Copyright 2000-2004 by Ted Pedersen and Satanjeev Banerjee and Amruta Purandare 

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

# this module was originally written by Satanjeev Banerjee
# for bigrams and was updated by Amruta Purandare for trigrams

package tmi3;
use Config;
use File::Spec;

#  Make sure that measure3d.pm is available in the PATH. First
#  we check in the directory you are running from, and then we
#  look through the system path. If the module is not found anywhere
#  then abort. 

my $module = "measure3d.pm"; my $modulename = "measure3d.pm";
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
    measure3d::initializeStatistic(@_);
}

# function to calculate the tmi3 value!
sub calculateStatistic
{
    #  The parameters passed into calculateStatistic
    #  need to be passed into getObservedValues for it 
    #  to calculate the Observed values. If there is a 
    #  problem with the observed values, this function 
    #  will return, causing the measure to abort its 
    #  computations and return with a zero code.

    if( !( ($n111, $n112, $n211, $n212, $n121, $n122, $n221, $n222) = measure3d::getObservedValues(@_) ) ) {
	return(0);
    }

    #  Check the expected values to ensure that they are not 
    #  equal to zero. Also, the quotient of the observed and 
    #  expected value should not be less than zero. If there 
    #  is a problem with the expected values, this function
    #  will return, causing the measure to abort and return
    #  with a zero code.

    if( !( ($m111, $m112, $m121, $m122, $m211, $m212, $m221, $m222) = measure3d::getExpectedValues() ) ) {
	return(0);
    }
    
    #  Get the total number of bigrams; no need to check 
    #  if this is correct because this value was already 
    #  checked and computed in measuredd::initalizeStatistic.
    #  getTotalTrigrams simply reads an existing value. 
    
    my $nppp = measure3d::getTotalTrigrams();

    #  Now for the calculations!!
    $tmi3 = 0;

    # dont want ($n111 / $m111) to be 0 or less! flag error if so!
    if ( $n111 ) { $tmi3 += $n111/$nppp * log ( $n111 / $m111 ) / log 2; }
    if ( $n112 ) { $tmi3 += $n112/$nppp * log ( $n112 / $m112 ) / log 2; }
    if ( $n121 ) { $tmi3 += $n121/$nppp * log ( $n121 / $m121 ) / log 2; }
    if ( $n122 ) { $tmi3 += $n122/$nppp * log ( $n122 / $m122 ) / log 2; }
    if ( $n211 ) { $tmi3 += $n211/$nppp * log ( $n211 / $m211 ) / log 2; }
    if ( $n212 ) { $tmi3 += $n212/$nppp * log ( $n212 / $m212 ) / log 2; }
    if ( $n221 ) { $tmi3 += $n221/$nppp * log ( $n221 / $m221 ) / log 2; }
    if ( $n222 ) { $tmi3 += $n222/$nppp * log ( $n222 / $m222 ) / log 2; }

    return ($tmi3);
}

# function to return the error code of the last operation and reset
# error code. useful if the error can be recovered from!
sub errorCode 
{ 
    return measure3d::errorCode();
}

# function to return the error message of the last operation and reset
# the message string. useful if error can be recovered from!
sub errorString
{
    return measure3d::errorString();
}

# function to return the name of this statistic
sub getStatisticName
{
    return "True Mututal Information 3";
}

1;

