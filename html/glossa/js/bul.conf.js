var conf = new Array;

var languageOpts = new Array;
languageOpts = [['BUL', 'Bulgarian']];

conf['type'] = 'monolingual';
conf['charset'] = 'UTF-8';
conf['title'] = 'Search corpus';
conf['corpus_name'] = 'Bulgarian corpus';
var language='en';

var cgiRoot = 'http://omilia.uio.no/cgi-bin/glossa/';


// ** shortcuts ** //

shortcut("Ctrl+Shift+L",function() {
    addOpt('w','lemma','lemma');
});

shortcut("Ctrl+Shift+E",function() {
    addOpt('w','end','end of word')
});

shortcut("Ctrl+Shift+S",function() {
    addOpt('w','start','start of word')
});

shortcut("Ctrl+Shift+C",function() {
    addOpt('w','case','case sensitive')
});


shortcut("Ctrl+Shift+A",function() {
    addOpt('pos','adj','adjective')
});

shortcut("Ctrl+Shift+D",function() {
    addOpt('pos','adv','adverb')
});

shortcut("Ctrl+Shift+N",function() {
    addOpt('pos','n','noun')
});

shortcut("Ctrl+Shift+V",function() {
    addOpt('pos','v','verb')
});




