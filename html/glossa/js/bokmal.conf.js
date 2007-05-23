var conf = new Array;

var languageOpts = new Array;
languageOpts = [['BOKMAL', 'Norsk']];

conf['type'] = 'monolingual';
conf['title'] = 'Search the LKB';
conf['corpus_name'] = 'Lexicograpic corpus for Norwegian Bokmål';
var language='en';


// ** shortcuts ** //

shortcut("Ctrl+Shift+G",function() {
    addOpt('w','lemma','grunnform');
});

shortcut("Ctrl+Shift+L",function() {
    addOpt('w','end','slutten av ordet')
});

shortcut("Ctrl+Shift+T",function() {
    addOpt('w','start','starten av ordet')
});

shortcut("Ctrl+Shift+B",function() {
    addOpt('w','case','skill store/små bokst.')
});

// 
// adj, adv, det, inf, int, konj, prep, pron, subj, subst, tegn, verb, ukjent

shortcut("Ctrl+Shift+A",function() {
    addOpt('ordkl','adj','adjektive')
});

shortcut("Ctrl+Shift+D",function() {
    addOpt('ordkl','adv','adverb')
});

shortcut("Ctrl+Shift+S",function() {
    addOpt('ordkl','s','substantiv')
});

shortcut("Ctrl+Shift+V",function() {
    addOpt('ordkl','v','verb')
});




