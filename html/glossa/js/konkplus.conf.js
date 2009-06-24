
var languageOpts = new Array;

languageOpts = [['KONKPLUS', 'svenska','swe']];

var htmlRoot = 'http://isissb.spraakdata.gu.se/glossa/';
var cgiRoot = 'http://isissb.spraakdata.gu.se/cgi-bin/glossa/';

var conf = new Array;

conf['type'] = 'monolingual';
conf['title'] = 'Konkplus – Språkbanken testar Glossa (ej för publik användning)';
conf['corpus_name'] = 'Konkplus';
conf['charset'] = 'UTF-8';
var language = 'swe';

// ** shortcuts ** //

shortcut("Ctrl+Shift+L",function() {
    addOpt('w','lemma','grundform');
});

shortcut("Ctrl+Shift+E",function() {
    addOpt('w','end','slutet av ordet')
});

shortcut("Ctrl+Shift+S",function() {
    addOpt('w','start','början av ordet')
});

shortcut("Ctrl+Shift+C",function() {
    addOpt('w','case','skilj på stora/små bokstäver.')
});