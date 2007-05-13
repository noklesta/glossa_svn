=head1 NAME

Text::NSP - the Ngram Statistics Package

=head1 SYNOPSIS

The Ngram Statistic Package allows a user to count sequences of Ngrams in 
large corpora of text, and measure their association. 

=head1 DESCRIPTION

The module NSP.pm is a stub that doesn't have any real functionality. 
The real work is done by five programs:

count.pl statistic.pl rank.pl combig.pl kocos.pl

These are not modules, and are run from the command line. All have 
extensive command line help and documentation in /docs.

See docs/README.pod for an extensive description. 

=head1 AUTHOR

Ted Pedersen, E<lt>tpederse@d.umn.eduE<gt>

=head1 BUGS

See docs/Todo.pod

=head1 SEE ALSO

http://groups.yahoo.com/group/ngram/

http://www.d.umn.edu/~tpederse/nsp.html

=head1 COPYRIGHT

Copyright (c) 2003 by Ted Pedersen

This program is free software; you can redistribute it and/or modify it under
the terms of the GNU General Public License as published by the Free Software
Foundation; either version 2 of the License, or (at your option) any later
version.

This program is distributed in the hope that it will be useful, but WITHOUT
ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS
FOR A PARTICULAR PURPOSE. See the GNU General Public License for more details.

You should have received a copy of the GNU General Public License along with
this program; if not, write to

The Free Software Foundation, Inc.,
59 Temple Place - Suite 330,
Boston, MA  02111-1307, USA.

=cut

package Text::NSP;

use 5.008;
use strict;
use warnings;

require Exporter;
use AutoLoader qw(AUTOLOAD);

our @ISA = qw(Exporter);

# Items to export into callers namespace by default. Note: do not export
# names by default without a very good reason. Use EXPORT_OK instead.
# Do not simply export all your public functions/methods/constants.

# This allows declaration	use Text::NSP ':all';
# If you do not need this, moving things directly into @EXPORT or @EXPORT_OK
# will save memory.
our %EXPORT_TAGS = ( 'all' => [ qw(
	
) ] );

our @EXPORT_OK = ( @{ $EXPORT_TAGS{'all'} } );

our @EXPORT = qw(
	
);

# Preloaded methods go here.

# Autoload methods go after =cut, and are processed by the autosplit program.

1;

__END__
