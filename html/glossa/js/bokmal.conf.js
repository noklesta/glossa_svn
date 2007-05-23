var conf = new Array;

var languageOpts = new Array;
languageOpts = [['BOKMAL', 'Norsk']];

conf['type'] = 'monolingual';
conf['title'] = 'Search the LKB';
conf['corpus_name'] = 'Lexicograpic corpus for Norwegian Bokmål';
var language='en';


// ** shortcuts ** //

shortcut("Ctrl+Shift+X",function() {
    addOpt('w','lemma','grunnform');
});

