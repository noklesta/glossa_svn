
=head1 NAME

measure3d.pm 

=head1 SYNOPSIS

This module can be used as a foundation for building 3-dimensional 
measures of association that can then be used by statistic.pl. In 
particular this module provides functions that give convenient access to  
3-d (i.e., trigram) frequency counts as created by count.pl, as well as  
some degree of error handling that verifies the data.  

To be used in a measure module that is to be used by statistic.pl, the  
functions provided in this module must be embedded within other functions  
that adhere to the standards and naming convention described in  
Docs/NewStats.txt and is briefly summarized below.

=head1 DESCRIPTION

The functions in this module retrieve observed bigram frequency counts and  
marginal totals, and also compute expected values. They also provide 
support for error checking of the output produced by count.pl. These 
functions are used in all the trigram (3d) measure modules (e.g., 
ll3.pm, tmi3.pm, etc.) provided in NSP. If you are writing your own   
3d measure, you can use these functions as well. 

With bigram or 3d measures we use a 3x3 contingency table to store the  
frequency counts associated with each word in the bigram, as well as the  
number of times the bigram occurs. The notation we employ is as follows:

Marginal Frequencies:
    
 n1pp = the number of bigrams where the first word is word1.
 np1p = the number of bigrams where the second word is word2.
 npp1 = the number of bigrams where the third word is word3
 n2pp = the number of bigrams where the first word is not word1. 
 np2p = the number of bigrams where the second word is not word2.
 npp2 = the number of bigrams where the third word is not word3.

Observed Frequencies:

 n111 = number of times word1, word2 and word3 occur together in
        their respective positions, joint frequency.
 n112 = number of times word1 and word2 occur in their respective
        positions but word3 does not.
 n211 = number of times word2 and word3 occur in their respective
        positions but word1 does not.
 n212 = number of times word2 occurs in in its respective position
        but word1 and word2 do not.
 n121 = number of times word1 and word3 occur in their respective 
        positions but word2 does not.
 n122 = number of times word1 occurs in its respective position
        but word2 and word3 do not.
 n221 = number of times word3 occurs in its respective position
        but word1 and word2 do not.
 n222 = number of time neither word1, word2 or word3 occur in their
        respective positions.

Expected Frequencies:

 m111 = expected number of times word1, word2 and word3 occur together in
        their respective positions.
 m112 = expected number of times word1 and word2 occur in their respective
        positions but word3 does not.
 m211 = expected number of times word2 and word3 occur in their respective
        positions but word1 does not.
 m212 = expected number of times word2 occurs in in its respective position
        but word1 and word2 do not.
 m121 = expected number of times word1 and word3 occur in their respective 
        positions but word2 does not.
 m122 = expected number of times word1 occurs in its respective position
        but word2 and word3 do not.
 m221 = expected number of times word3 occurs in its respective position
        but word1 and word2 do not.
 m222 = expected number of time neither word1, word2 or word3 occur in their
        respective positions.

=head2 Functions Included in measure2d:

=over 4

=item 1 

The intializeStatistic function performs initialization before 
the actual computation of measures of association begin. It also 
verifies that the input consists of trigrams, and that it has all 
the frequency combinations needed to do the computations. The
frequency combinations that are required for this module are 
$n111, $n1pp, $np1p, $npp1, $n11p, $np11, and $n1p1.

initializeStatistic() is passed the following input parameters:

     1) The ngram size. For 3d (trigram) measures this will be 3. 
     2) The total number of trigrams in the corpus (nppp).
     3) The number of frequency combinations. 
     4) A 3-d array containing the frequency combinations.

Each row  of the array in 4) represents a single frequency combination.  
On a given row, the first element denotes the number of indices on this  
row, say 'n'. This is followed by the 'n' values that correspond to the 
indices included in the frequency combination. (For more details on   
frequency combinations, see README.pod). To use this module, the joint
frequency, n11,  as well as the marginal frequencies, n1p and np1, are
required in order to calculate the expected values.

This function does not return any values. If an error occurs, it can be 
detected by statistic.pl using the errorCode and errorString functions 
described below.   

=item 2

The getObservedValues function takes as input an array containing the 
frequency values for a trigram as found by count.pl. This will include 
seven values: n111, n1pp, np1p, npp1, n11p, np11, and n1p1. The size 
of this array is guaranteed to be exactly the same as the third parameter 
passed to the function initializeStatistic() function above. 

The getObservedValues function verifies that the marginal frequencies 
n1pp, np1p, npp1, n11p, np11, and n1p1 are consistent with the value 
of the joint frequency of the trigram, n111. If they are not consistent, 
it sets an error code and error message, and the function returns.

If the marginals are valid, it computes the observed values for the   
remaining cells in the 3d table ( n112, n211, n212, n121, n122, n221, 
n222 ) based on these marginal totals and the joint frequency and 
returns an array containing these total in the order above.

=item 3

The function calculateExpectedValues() calculates the expected 
values of the cells in the contingency table based on the marginal 
frequencies and the total sample size. The expected values are estimated 
based on the assumption that the two words in the trigram are independent.

The function returns these values in an array ordered as follows: m111, 
m112, m121, m122, m211, m212, m221, m222.

=item 4

The function getMarginalValues will return the marginal frequencies in the
order of n1pp, np1p, npp1, n11p, np11, n1p1, n2pp, np2p, npp2.

=item 5

The function getTotalTrigrams() returns the total number of trigrams in the 
corpus (nppp).

=item 6

The function errorCode() returns 0 if the last operation was successful.
It will return an integer starting with 1 if the last operation failed. 
This indicates that statistic.pl should abort. It will return an integer 
starting with 2 to indicate a warning should be issued. This does not 
cause cause statistic.pl to abort. However, a warning after 
calculateStatistic() will cause the trigram which generated that warning to 
be ignored by statistic.pl.

=item 7

The function errorString() returns the text of an error message. 

=back

=head2 Writing your own statistic module

Any measure module being used by statistic.pl must follow this  
convention. In order to make it easier to build 3d measures, we provide 
a 3d specific functions that can be embedded within the measure module in 
order to carry out common operations in calculating the values of such 
measures. 

=over 4

=item 1 

The filename should have an extension of .pm. Usually the name of 
the file should be Statistic.pm, where "Statistic" is the name of the
particular statistic you are writing.

=item 2 

Let us say you have named your file Statistic.pm. The first line of the
file should declare that its a package of the same name as the filename.
Thus the first line of the file Statistic.pm should be...

   package Statistic;

=item 3

To use the measure3d.pm module you need to include it in your 
Statistic.pm module. 

A small code snippet to ensure that it is included is as follows:

 #  Check to see if the statistic.pm module can see the
 #  measure3d.pm module ... if not see if it can be found.

 use Config;
 use File::Spec;
 
 my $path_sep = $Config::Config{path_sep};

 my $module = "measure3d.pm"; my $modulename = "measure3d.pm";
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

 # IMPORTANT : now include the module into the current package    
 require $module;

=item 4 

You need to implement at least two functions in your package

   i)   initializeStatistic()
   ii)  calculateStatistic()


Function initializeStatistic() is passed the a set of parameters 
that include the trigram size which is 3, the total number of 
trigrams in the corpus, the number of frequency combinations 
and an array containing the frequency combinations. More detail 
of these parameters are described above in the description of 
the measure3d::initializeStatistic function.

These paramters can be passed directly into the measure3d.pm
module's function measure3d::intializeStatistic. For example: 

 sub initializeStatistic {
 
     measure3d::initializeStatistic(@_);
 
 }

where @_ contains the input parameters.

This function is called before any calls to the function
calculateStatistic() and can be used by the statistic library 
to set up any values that may be required for the calculations
later. This function is not expected to return anything. If an 
error occurs, it can be reported through the mechanisms described 
below. 

The other mandatory function is calculateStatistic(). This is
passed an array containing the frequency values for an ngram as
found in the input n-gram file. 

Function calculateStatistic() is expected to return a (possibly
floating) value as the value of the statistical measure calculated
using the frequency values passed to it. 

There exists two main functions in the module measure3d.pm in order
to help calculate the trigram statistic. 

   1.  measure3d::getObservedValues(@frequencies)
   2.  measure3d::getExpectedValues();

The function measure3d::getObservedValues will return the list of
observed values from the given trigram. If it does not then there
existed an error in the calculation of these values and zero should
be returned. An example of how this can be used is as follows:
  
if( !( ($n111, $n112, $n211, $n212, $n121, $n122, $n221, $n222) = measure3d::getObservedValues(@_) ) ) {
	return(0);
}

where @_ is the parameters sent to calculateStatistic from statistic.pl.
A more detailed description of this function can be seen above.

The function measure3d::getExpectedValues will return the list of
expected values from the given trigram. If it does not then there 
existed an error in the calculation of these values and zero should
be returned. An example of how this can be used is as follows:

if( !( ($m111, $m112, $m121, $m122, $m211, $m212, $m221, $m222) = measure3d::getExpectedValues() ) ) {
	return(0);
}

When a library is loaded, statistic.pl checks for initializeStatistc
and calcualteStatistic functions: if they are not implemented, then 
an error is reported and the program quits. 

=item 5 

Program statistic.pl also supports three other functions that are
not mandatory, but may be implemented by the user. These are:

     i) errorCode()
    ii) errorString()
   iii) getStatisticName()

Function errorCode, if implemented, is called immediately after 
the call to function initializeStatistic() and immediately after 
every call to function calculateStatistic(). 

The measure3d.pm module implements both measure3d::errorCode() 
and measure3d::errorString().

The errorCode() and errorString() methods that are implmented in
your Statistic.pm modoule can return the value returned by the 
measure3d::errorCode() and measure3d::errorString() functions.

An example of this is below:

sub errorCode
{ 
  return measure3d::errorCode();
}

sub errorString
{
    return measure3d::errorString();
}

The third function that may be implemented is getStatisticName(). 
If this function is implemented, it is expected to return a string 
containing the name of the statistic being implmented. This string 
is used in the formatted output of statistic.pl. If this function 
is not implemented, then the statistic file name entered on the 
commandline is used in the formatted output. 

Note that all three functions described in this section are first
checked for existence before being called. So, if the user elects
to not implement these functions, no harm will be done. However, we
strongly recommend the implementation of at least the function
errorCode() since this is the only way for the statistic library to
report errors to the user. 

=item 6 

Having implemented the two mandatory functions (in point 3 above)
and zero or more of the three non-mandatory functions (in point 4
above), one must make these functions available outside the
package. To do so, one has to export them, thusly. 

For this, first include the Exporter package by including the
following line in the program

   require Exporter;

Now include the following line to inherit Exporter's functions:

   @ISA = qw ( Exporter );

Now export the various functions implemented so that they are
accessible outside this package, by adding the following line
(assume that you have implemented only the two mandatory
functions): 

   @EXPORT = qw( initializeStatistic calculateStatistic );

If you implement say the errorCode() and errorString() functions
too, you may export them like so: 

   @EXPORT = qw( initializeStatistic calculateStatistic errorCode errorString );
   
Note that the user may implement other functions too, and may
export them if he so wishes, but since statistic.pl is not
expecting anything besides the five functions above, doing so would
have no effect on statistic.pl. 

=item 7 

Finally, at the end of everything, add the line

   1;

   This will ensure that the LAST line of the file returns a 
   true value, and is necessary so that when this package is 
   loaded, it returns a TRUE value.

=back

=head2 Errors to look out for:

=over 4

=item 1 

The filename does not end with a .pm.

=item 2 

The rest of the filename (besides the extension) does not match the package
name (declared in the first line of the file). Remember its case sensitive!

=item 3 

The five functions (2 mandatory, 3 non-mandatory) must have their
names match EXACTLY with those shown above. Again, names are all
case sensitive.

=item 4 

The last line of the file is not "1;". This is necessary, and easily
overlooked!

=back

=head1 AUTHORS

    Ted Pedersen (tpederse@umn.edu)
    Satanjeev Banerjee <banerjee@cs.cmu.edu>
    Bridget McInnes (bthomson@d.umn.edu)
    
=head1 BUGS

=head1 SEE ALSO

 home page:    http://www.d.umn.edu/~tpederse/nsp.html

 mailing list: http://groups.yahoo.com/group/ngram/

=head1 COPYRIGHT

Copyright (C) 2004 Satanjeev Banerjee, Ted Pedersen and Bridget McInnes

Permission is granted to copy, distribute and/or modify this  document  
under the terms of the GNU Free Documentation License, Version 1.2 or  any  
later version published by the Free Software Foundation; with no  
Invariant Sections, no Front-Cover Texts, and no Back-Cover Texts.

Note: a copy of the GNU Free Documentation License is available on the web   
at L<http://www.gnu.org/copyleft/fdl.html> and is included in this    
distribution as FDL.txt. 

=cut

package measure3d;
require Exporter;

@ISA = qw ( Exporter );
@EXPORT = qw( initializeStatistic getObservedValues getExpectedValues getMarginalTotals getTotalTrigrams errorCode errorString );

my $n1pp = 0; my $np1p = 0; my $npp1 = 0; my $n11p = 0; my $np11 = 0;
my $n1p1 = 0; my $n2pp = 0; my $np2p = 0; my $npp2 = 0; my $nppp = 0;

# function to set up various variables before the actual computation
# starts. also to check if we are being given bigrams, and if our
# frequency combinations are enough to do the computation

sub initializeStatistic
{
    ($ngram, $nppp, $combIndex, @freqComb) = @_;
    
    $errorCodeNumber = 0;
    $errorMessage = "";
    
    # check if ngram !=3 . statistic only defined for ngram = 3. 
    if ($ngram != 3) {
	$errorMessage = "This statistic is only available for trigrams!";
	$errorCodeNumber = 1;  return;
    }
    
     # The total number of trigrams should not be less than equal to 0
    if ($nppp <= 0) { 
	$errorMessage = "Total number of trigrams ($nppp) must be greater than 0.";
	$errorCodeNumber = 10;  return;
    }

    # figure out from the @freqComb array if the frequency values we
    # are going to get are indeed the ones we need. 
    # while we figure this out, we shall also note which of the indices of the 
    # array passed to function calculateStatistic are the ones we want.

    for (my $i = 0; $i < $combIndex; $i++)
    {
	$str="";
        foreach(@{$freqComb[$i]}[1..$freqComb[$i][0]]) { $str.=$_."#"; }
        if($str eq "0#1#2#") {  $n111Index=$i; }
        if($str eq "0#")     {  $n1ppIndex=$i; }
        if($str eq "1#")     {  $np1pIndex=$i; }
	if($str eq "2#")     {  $npp1Index=$i; }
        if($str eq "0#1#")   {  $n11pIndex=$i; }
        if($str eq "1#2#")   {  $np11Index=$i; }
        if($str eq "0#2#")   {  $n1p1Index=$i; }
    }
    
    if (!(defined $n111Index)) { $errorCodeNumber = 100; $errorMessage = "Frequency combination \"0 1 2\" missing!\n"; }
    if (!(defined $n1ppIndex)) { $errorCodeNumber = 101; $errorMessage = "Frequency combination \"0\" missing!\n";   }
    if (!(defined $np1pIndex)) { $errorCodeNumber = 102; $errorMessage = "Frequency combination \"1\" missing!\n";   }
    if (!(defined $npp1Index)) { $errorCodeNumber = 103; $errorMessage = "Frequency combination \"2\" missing!\n";   }
    if (!(defined $n11pIndex)) { $errorCodeNumber = 104; $errorMessage = "Frequency combination \"0 1\" missing!\n"; }
    if (!(defined $np11Index)) { $errorCodeNumber = 105; $errorMessage = "Frequency combination \"1 2\" missing!\n"; }
    if (!(defined $n1p1Index)) { $errorCodeNumber = 106; $errorMessage = "Frequency combination \"0 2\" missing!\n"; }
}

# function to ensure the marginal values are reasonable with
# respect to each other and if so calculate the observed values
sub getObservedValues() 
{
    $n111=$_[$n111Index];
    $n1pp=$_[$n1ppIndex];
    $np1p=$_[$np1pIndex];
    $npp1=$_[$npp1Index];
    $n11p=$_[$n11pIndex];
    $np11=$_[$np11Index];
    $n1p1=$_[$n1p1Index];
    
    $n112=$n11p-$n111;
    $n211=$np11-$n111;
    $n212=$np1p-$n111-$n112-$n211;
    $n121=$n1p1-$n111;
    $n122=$n1pp-$n111-$n112-$n121;
    $n221=$npp1-$n111-$n211-$n121;
    $n222=$nppp-($n111+$n112+$n121+$n122+$n211+$n212+$n221);
    
    $n2pp=$nppp-$n1pp;
    $np2p=$nppp-$np1p;
    $npp2=$nppp-$npp1;
    
    # n111 should be greater than equal to zero 
    if ($n111< 0)    {
	$errorMessage = "Frequency value ($n111) must not be negative.";
	$errorCodeNumber = 200;  return;
    }
    
    # n111 frequency should be less than or equal to totalBigrams
    if ($n111> $nppp) {
	$errorMessage = "Frequency value ($n111) must not exceed total number of bigrams.";
	$errorCodeNumber = 201;  return;
    }
    
    # joint frequency n111 should be less than or equal to the marginal totals
    if ($n111 > $n1pp || $n111 > $np1p || $n111 > $npp1) {
	$errorMessage = "Frequency value of ngram ($n111) must not exceed the marginal totals.";
	$errorCodeNumber = 202;  return;
    }
    
    # n1pp should be greater than or equal to zero 
    if ($n1pp< 0) {
	$errorMessage = "Marginal total value ($n1pp) must not be negative.";
	$errorCodeNumber = 203;  return;
    }

    # n1pp should be less than or equal to totalBigrams
    if ($n1pp > $nppp) {
	$errorMessage = "Marginal total value ($n1pp) must not exceed total number of bigrams.";
	$errorCodeNumber = 204;  return;
    }

    # np1p should be greater than or equal to zero
    if ($np1p< 0) {
	$errorMessage = "Marginal total value ($np1p) must not be negative.";
        $errorCodeNumber = 205;  return;
    }

    # np1p should be less than or equal to totalBigrams
    if ($np1p > $nppp) {
	$errorMessage = "Marginal total value ($np1p) must not exceed total number of trigrams.";
        $errorCodeNumber = 206;  return;
    }
    
    # npp1 should be greater than or equal to zero 
    if ($npp1< 0) {
	$errorMessage = "Marginal total value ($npp1) must not be negative.";
	$errorCodeNumber = 207;  return;
    }
    
    # npp1 should be less than or equal to totalBigrams
    if ($npp1 > $nppp) {
	$errorMessage = "Marginal total value ($npp1) must not exceed total number of bigrams.";
	$errorCodeNumber = 208;  return;
    }

    #  Everything looks good so we can return the observed values
    @values = ( $n111, $n112, $n211, $n212, $n121, $n122, $n221, $n222 );

    return @values;
}

#  Calculates, checks and returns the expected values
sub getExpectedValues
{
    #  Calculate the expectec values
    $m111=$n1pp*$np1p*$npp1/($nppp**2);
    $m112=$n1pp*$np1p*$npp2/($nppp**2);
    $m121=$n1pp*$np2p*$npp1/($nppp**2);
    $m122=$n1pp*$np2p*$npp2/($nppp**2);
    $m211=$n2pp*$np1p*$npp1/($nppp**2);
    $m212=$n2pp*$np1p*$npp2/($nppp**2);
    $m221=$n2pp*$np2p*$npp1/($nppp**2);
    $m222=$n2pp*$np2p*$npp2/($nppp**2);
	
    # dont want ($n111 / $m111) to be 0 or less! flag error if so!
    if ( $n111 )  
    { 
	if ($m111 == 0) {
	    $errorMessage = "Expected value in cell (1,1,1) must not be zero";
	    $errorCodeNumber = 231;  return;
	}

	if (($n111 / $m111) < 0) {
	    $errorMessage = "About to take log of negative value for cell (1,1)";
	    $errorCodeNumber = 232;  return;
	}
    }

    if ( $n112 ) 
    { 
	if ($m112 == 0) {
	    $errorMessage = "Expected value in cell (1,1,2) must not be zero";
	    $errorCodeNumber = 233;  return;
	}
	
	if (($n112 / $m112) < 0) {
	    $errorMessage = "About to take log of negative value for cell (1,1,2)";
	    $errorCodeNumber = 234;  return;
	}
    }

    if ( $n121 ) 
    { 
	if ($m121 == 0) {
	    $errorMessage = "Expected value in cell (1,2,1) must not be zero";
	    $errorCodeNumber = 235;  return;
	}

	if (($n121 / $m121) < 0) {
	    $errorMessage = "About to take log of negative value for cell (1,2,1)";
	    $errorCodeNumber = 236;  return;
	}
    }

    if ( $n122 ) 
    { 
	if ($m122 == 0)	{
	    $errorMessage = "Expected value in cell (1,2,2) must not be zero";
	    $errorCodeNumber = 237;  return;
	}

	if (($n122 / $m122) < 0) {
	    $errorMessage = "About to take log of negative value for cell (1,2,2)";
	    $errorCodeNumber = 238;  return;
	}
    }
    
    if ( $n211 )
    {
        if ($m211 == 0) {
	    $errorMessage = "Expected value in cell (2,1,1) must not be zero";
            $errorCodeNumber = 239;  return;
        }
	
        if (($n211 / $m211) < 0) {
	    $errorMessage = "About to take log of negative value for cell (2,1,1)";
            $errorCodeNumber = 240;  return;
        }
    }
    
    if ( $n212 )
    {
        if ($m212 == 0) {
	    $errorMessage = "Expected value in cell (2,1,2) must not be zero";
            $errorCodeNumber = 241;  return;
        }
	
        if (($n212 / $m212) < 0) {
	    $errorMessage = "About to take log of negative value for cell (2,1,2)";
            $errorCodeNumber = 242;  return;
        }
    }

    if ( $n221 )
    {
        if ($m221 == 0)  {
	    $errorMessage = "Expected value in cell (2,2,1) must not be zero";
            $errorCodeNumber = 243;  return;
        }

        if (($n221 / $m221) < 0) {
	    $errorMessage = "About to take log of negative value for cell (2,2,1)";
            $errorCodeNumber = 244;  return;
        }
    }
    
    if ( $n222 )
    {
        if ($m222 == 0) {
	    $errorMessage = "Expected value in cell (2,2,2) must not be zero";
            $errorCodeNumber = 245;  return;
        }
	
        if (($n222 / $m222) < 0) {
	    $errorMessage = "About to take log of negative value for cell (2,2,2)";
            $errorCodeNumber = 246;  return;
        }
    }
     
    #  Everything looks good so we can return the expected values
    @values = ( $m111, $m112, $m121, $m122, $m211, $m212, $m221, $m222 );
    
    return @values;
}

#  Returns the marginal frequencies
sub getMarginalTotals {
    
    @values = ( $n1pp, $np1p, $npp1, $n11p, $np11, $n1p1, $n2pp, $np2p, $npp2 );
    return @values;
}

#  Return the total number of bigrams
sub getTotalTrigrams {
    return $nppp;
}

# function to return the error code of the last operation and reset
# error code. useful if the error can be recovered from!
sub errorCode 
{ 
    my $temp = $errorCodeNumber;
    $errorCodeNumber = 0;
    return($temp); 
}


# function to return the error message of the last operation and reset
# the message string. useful if error can be recovered from!
sub errorString
{
    my $temp = $errorMessage;
    $errorMessage = "";
    return($temp);
}

1;
