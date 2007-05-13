use XML::XPath;
use XML::XPath::XMLParser;
use Data::Dumper;

my $xp = XML::XPath->new(filename => '/tmp/test.xhtml');
    
my $nodeset = $xp->find('/html/body/p'); # find all paragraphs    

my @nodes = $nodeset->get_nodelist;
my $a = 1;
while (@nodes) {
    print "FOUND\n\n";
      print XML::XPath::NodeSet::string_value(\@nodes);
    print "\n\n";
    XML::XPath::NodeSet::shift(\@nodes);
    $a++;
}
