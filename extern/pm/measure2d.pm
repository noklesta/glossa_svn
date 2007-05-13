
=head1 NAME

measure2d.pm 

=head1 SYNOPSIS

This module can be used as a foundation for building 2-dimensional 
measures of association that can then be used by statistic.pl. In 
particular this module provides functions that give convenient access to  
2-d (i.e., bigram) frequency counts as created by count.pl, as well as  
some degree of error handling that verifies the data.  

To be used in a measure module that is to be used by statistic.pl, the  
functions provided in this module must be embedded within other functions  
that adhere to the standards and naming convention described in  
Docs/NewStats.txt and is briefly summarized below.

=head1 DESCRIPTION

The functions in this module retrieve observed bigram frequency counts and  
marginal totals, and also compute expected values. They also provide 
support for error checking of the output produced by count.pl. These 
functions are used in all the bigram (2d) measure modules (e.g., 
ll.pm, tmi.pm, x2.pm, etc.) provided in NSP. If you are writing your own   
2d measure, you can use these functions as well. 

With bigram or 2d measures we use a 2x2 contingency table to store the  
frequency counts associated with each word in the bigram, as well as the  
number of times the bigram occurs. The notation we employ is as follows:
                  
            |word2  | not-word2|
            --------------------
    word1   | n11   |   n12    |  n1p 
  not-word1 | n21   |   n22    |  n2p
            --------------------
              np1       np2       npp

Marginal Frequencies:

 n1p = the number of bigrams where the first word is word1.
 np1 = the number of bigrams where the second word is word2.
 n2p = the number of bigrams where the first word is not word1. 
 np2 = the number of bigrams where the second word is not word2.

Observed Frequencies:

 n11 = number of times the bigram occurs, joint frequency
 n12 = number of times word1 occurs in the first position of a bigram  
       when word2 does not occur in the second position.
 n21 = number of times word2 occurs in the second position of a bigram
       when word1 does not occur in the first position.
 n22 = number of bigrams where word1 is not in the first position and
       word2 is not in the second position.

Expected Frequencies:

 m11 = expected number of times both words in the bigram occur       
       together if they are independent. (n1p*np1/npp)
 m12 = expected number of times word1 in the bigram will occur in 
       the first position when word2 does not occur in the second
       position given that the words are independent. (n1p*np2/npp)
 m21 = expected number of times word2 in the bigram will occur
       in the second position when word1 does not occur in the first
       position given that the words are independent. (np1*n2p/npp)
 m22 = expected number of times word1 will not occur in the first 
       position and word2 will not occur in the second position        
       given that the words are independent. (n2p*np2/npp)

=head2 Functions Included in measure2d:

=over 4

=item 1 

The intializeStatistic function performs initialization before 
the actual computation of measures of association begin. It also 
verifies that the input consists of bigrams, and that it has all 
the frequency combinations needed to do the computations. The
frequency combinations that are required for this module are 
np1, n1p and n11.

initializeStatistic() is passed the following input parameters:

     1) The ngram size. For 2d (bigram) measures this will be 2. 
     2) The total number of bigrams in the corpus (npp).
     3) The number of frequency combinations. 
     4) A 2-d array containing the frequency combinations.

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
frequency values for a bigram as found by count.pl. This will include 
three values: n11, n1p, and np1, in some order. The size of this array 
is guaranteed to be exactly the same as the third parameter passed to 
the function initializeStatistic() function above. 

The getObservedValues function verifies that the marginal frequencies np1 
and n1p are consistent with the value of the joint frequency of the bigram, 
n11. If they are not consistent, it sets an error code and error message, 
and the function returns.

If the marginals are valid, it computes the observed values for the   
remaining cells in the 2d table (n12, n21, n22) based on these marginal  
totals and the joint frequency and returns an array containing n11, n12,  
n21, and n22 respectively.

=item 3

The function calculateExpectedValues() calculates the expected 
values of the cells in the contingency table based on the marginal 
frequencies (n1p, n2p, np2, n2p) and the total sample size (npp). The  
expected values are estimated based on the assumption that the two words  
in the bigram are independent.

The function returns these values in an array ordered as follows: m11, 
m12, m21, m22.

=item 4

The function getMarginalValues will return the marginal frequencies in the
order of n1p, np1, n2p, np2.

=item 5

The function getTotalBigrams() returns the total number of bigrams in the 
corpus (npp).

=item 6

The function errorCode() returns 0 if the last operation was successful.
It will return an integer starting with 1 if the last operation failed. 
This indicates that statistic.pl should abort. It will return an integer 
starting with 2 to indicate a warning should be issued. This does not 
cause cause statistic.pl to abort. However, a warning after 
calculateStatistic() will cause the bigram which generated that warning to 
be ignored by statistic.pl.

=item 7

The function errorString() returns the text of an error message. 

=back

=head2 Writing your own statistic module

Any measure module being used by statistic.pl must follow this  
convention. In order to make it easier to build 2d measures, we provide 
a 2d specific functions that can be embedded within the measure module in 
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

To use the measure2d.pm module you need to include it in your 
Statistic.pm module. 

A small code snippet to ensure that it is included is as follows:

 #  Check to see if the statistic.pm module can see the
 #  measure2d.pm module ... if not see if it can be found.
    
 use Config;
 use File::Spec;
  
 my $path_sep = $Config::Config{path_sep};
  
 my $module = "measure2d.pm"; my $modulename = "measure2d.pm";
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
that include the bigram size which is 2, the total number of 
bigrams in the corpus, the number of frequency combinations 
and an array containing the frequency combinations. More detail 
of these parameters are described above in the description of 
the measure2d::initializeStatistic function.

These paramters can be passed directly into the measure2d.pm
module's function measure2d::intializeStatistic. For example: 

 sub initializeStatistic {
 
     measure2d::initializeStatistic(@_);
 
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

There exists two main functions in the module measure2d.pm in order
to help calculate the bigram statistic. 

   1.  measure2d::getObservedValues(@frequencies)
   2.  measure2d::getExpectedValues();

The function measure2d::getObservedValues will return the list of
observed values from the given bigram. If it does not then there
existed an error in the calculation of these values and zero should
be returned. An example of how this can be used is as follows:

if( !( ($n11, $n12, $n21, $n22) = measure2d::getObservedValues(@_) ) )
{
        return(0);
}

where @_ is the parameters sent to calculateStatistic from statistic.pl.
A more detailed description of this function can be seen above.

The function measure2d::getExpectedValues will return the list of
expected values from the given bigram. If it does not then there 
existed an error in the calculation of these values and zero should
be returned. An example of how this can be used is as follows:


if( !( ($n11, $n12, $n21, $n22) = measure2d::getExpectedValues() ) )
{
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

The measure2d.pm module implements both measure2d::errorCode() 
and measure2d::errorString().

The errorCode() and errorString() methods that are implmented in
your Statistic.pm modoule can return the value returned by the 
measure2d::errorCode() and measure2d::errorString() functions.

An example of this is below:

sub errorCode
{ 
  return measure2d::errorCode();
}

sub errorString
{
    return measure2d::errorString();
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

package measure2d;
require Exporter;

@ISA = qw ( Exporter );
@EXPORT = qw( initializeStatistic getObservedValues getExpectedValues getMarginalTotals getTotalBigrams errorCode errorString );

#  Initialize the marginal frequencies
my $np2 = 0; my $n2p = 0; my $n1p = 0; my $np1 = 0; $npp = 0;

# function to set up various variables before the actual computation
# starts. also to check if we are being given bigrams, and if our
# frequency combinations are enough to do the computation

sub initializeStatistic
{
    ($ngram, $npp, $combIndex, @freqComb) = @_;
    
    $errorCodeNumber = 0;    $errorMessage = "";

    # check if ngram > 2. 
    if ($ngram > 2) {
	$errorCodeNumber = 1;
	$errorMessage = "This statistic is only available for bigrams!";
	return;
    }

    # The total number of bigrams (npp) should not be less than equal to 0
    if ($npp <= 0) { 
	$errorCodeNumber = 10;
	$errorMessage = "Total number of bigrams ($npp) must be greater than 0.";
	return;
    }

    # figure out from the @freqComb array if the frequency values we
    # are going to get are indeed the ones we need. the ones we need
    # are (0,1), (0) and (1). while we figure this out, we shall also
    # note which of the indices of the array passed to function
    # calculateStatistic are the ones we want.

    for (my $i = 0; $i < $combIndex; $i++)    {
	$string = join (" ", @{$freqComb[$i]}[1..$freqComb[$i][0]]);

	if ($string eq "0 1")  { $n11FreqIndex = $i; }
	elsif ($string eq "0") { $np1FreqIndex  = $i; }
	elsif ($string eq "1") { $n1pFreqIndex = $i; }
    }

    if (!(defined $n11FreqIndex)) {
	$errorMessage = "Frequency combination \"0 1\" (frequency of bigram) missing!\n";
	$errorCodeNumber = 100;
    }

    if (!(defined $np1FreqIndex)) {
	$errorMessage = "Frequency combination \"0\" (frequency of bigrams containing left token) missing!\n";
	$errorCodeNumber = 101;
    }

    if (!(defined $n1pFreqIndex))  {
	$errorMessage = "Frequency combination \"1\" (frequency of bigrams containing right token) missing!\n";
	$errorCodeNumber = 102;	
    }
}

# function to ensure the marginal values are reasonable with
# respect to each other and if so calculate the observed values
sub getObservedValues() 
{
    $n11 = $_[$n11FreqIndex];
    $n1p  = $_[$n1pFreqIndex];
    $np1 = $_[$np1FreqIndex];
     
    # joint frequency should be greater than equal to zero 
    if ($n11 < 0)  { 
	$errorMessage = "Frequency value ($n11) must not be negative.";
	$errorCodeNumber = 200;	return; 
    }
    
    # joint frequency (n11) should be less than or equal to the 
    # total number of bigrams (npp)
    if($n11 > $npp) {
	$errorMessage = "Frequency value ($n11) must not exceed total number of bigrams.";
	$errorCodeNumber = 201;	return;
    }

    # joint frequency should be less than or equal to the marginal totals
    if ($n11 > $np1 || $n11 > $n1p) {
	$errorMessage = "Frequency value of ngram ($n11) must not exceed the marginal totals.";
	$errorCodeNumber = 202;	return;
    }

    # left frequency (np1) should be greater than or equal to zero 
    if ($np1 < 0) {
	$errorMessage = "Marginal total value ($np1) must not be negative.";
	$errorCodeNumber = 210;	    return;
    }

    # left frequency (np1) should be less than or equal to the total
    #  number of bigrams (npp)
    if ($np1 > $npp) {
	$errorMessage = "Marginal total value ($np1) must not exceed total number of bigrams.";
	$errorCodeNumber = 211;	    return;
    }

    # right frequency (n1p) should be greater than or equal to zero 
    if ($n1p < 0) {
	$errorMessage = "Marginal total value ($n1p) must not be negative.";
	$errorCodeNumber = 220;	    return;
    }

    # right frequency (n1p) should be less than or equal to the total
    # number of bigrams (npp)
    if ($n1p > $npp) {
	$errorMessage = "Marginal total value ($n1p) must not exceed total number of bigrams.";
	$errorCodeNumber = 221;	    return;
    }
    
    #  The marginal totals are reasonable so we can
    #  calculate the observed frequencies
    $n12 = $n1p - $n11;
    $n21 = $np1 - $n11;
    $np2 = $npp - $np1;
    $n2p = $npp - $n1p;
    $n22 = $np2 - $n12;
    
    #  Everything looks good so we can return the observed values
    @values = ($n11, $n12, $n21, $n22);
    return @values;
}

#  Calculates, checks and returns the expected values
sub getExpectedValues
{
    #  calculate the expected values
    my $m11 = $n1p * $np1 / $npp;
    my $m12 = $n1p * $np2 / $npp;
    my $m21 = $n2p * $np1 / $npp;
    my $m22 = $n2p * $np2 / $npp;
    
    # dont want ($nxy / $mxy) to be 0 or less! flag error if so and return 0;
    if ( $n11 )  { 
	if ($m11 == 0) {
	    $errorMessage = "Expected value in cell (1,1) must not be zero";
	    $errorCodeNumber = 231;         return;
	}
	
	if (($n11 / $m11) < 0) {
	    $errorMessage = "About to take log of negative value for cell (1,1)";
	    $errorCodeNumber = 232;	    return;
	}	
    }
    
    if ( $n12 ) { 
	if ($m12 == 0) {
	    $errorMessage = "Expected value in cell (1,2) must not be zero";
	    $errorCodeNumber = 233;         return;
	}

	if (($n12 / $m12) < 0) {
	    $errorMessage = "About to take log of negative value for cell (1,2)";
	    $errorCodeNumber = 234;	    return;
	}
    }

    if ( $n21 ) { 
	if ($m21 == 0) {
	    $errorMessage = "Expected value in cell (2,1) must not be zero";
	    $errorCodeNumber = 235;	    return;
	}
	
	if (($n21 / $m21) < 0) {
	    $errorMessage = "About to take log of negative value for cell (2,1)";
	    $errorCodeNumber = 236;	    return;
	}
    }
    
    if ( $n22 )  { 
	if ($m22 == 0)  {
	    $errorMessage = "Expected value in cell (2,2) must not be zero";
	    $errorCodeNumber = 237;	    return;
	}
	
	if (($n22 / $m22) < 0) {
	    $errorMessage = "About to take log of negative value for cell (2,2)";
	    $errorCodeNumber = 238;	    return;
	}
    }
    
    #  Everything looks good so we can return the expected values
    @values = ($m11, $m12, $m21, $m22);
    return @values;
}

#  Returns the marginal frequencies

sub getMarginalTotals {
    
    @values = ($n1p, $np1, $n2p, $np2);
    return @values;
}

#  Return the total number of bigrams
sub getTotalBigrams {
    return $npp;
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
