var Menu;
function reloadMenuBul() {
Menu['BUL'] = new Hash(     1, new Hash(
        'contents', '<nobr>&nbsp;options &#187;&nbsp;</nobr>',
  	1, new Hash(
       'contents', 'word &#187;&nbsp;',
	    1, new Hash(
         'contents', 'lemma form',
	      'type', 'js',
	      'uri', "addOpt('w','lemma','lemma form')"
	   ),
	    2, new Hash(
         'contents', 'case sensitive',
	      'type', 'js',
	      'uri', "addOpt('w','case','case sensitive')"
	   ),
	    3, new Hash(
         'contents', 'start of word',
	      'type', 'js',
	      'uri', "addOpt('w','start','start of word')"
	   ),
	    4, new Hash(
         'contents', 'end of word',
	      'type', 'js',
	      'uri', "addOpt('w','end','end of word')"
	   ),
	    5, new Hash(
         'contents', 'middle of word',
	      'type', 'js',
	      'uri', "addOpt('w','middle','middle of word')"
	   ),
	    6, new Hash(
         'contents', 'exclude',
	      'type', 'js',
	      'uri', "addOpt('w','neg','exclude')"
	   )
),
  	2, new Hash(
       'contents', 'additional string &#187;&nbsp;',
	    1, new Hash(
         'contents', 'add word',
	      'type', 'js',
	      'uri', "addOpt('ADDSTRING','word','add word')"
,
       1, new Hash(
            'contents', 'choose',
	         'type', 'js',
	         'uri', "addOpt('ADDSTRING','word','add word')"
	      ),
	      2, new Hash(
            'contents', 'exclude',
	         'type', 'js',
	         'uri', "addOpt('ADDSTRING','!word','!add word')"
	      )
	   ),
	    2, new Hash(
         'contents', 'add negated word',
	      'type', 'js',
	      'uri', "addOpt('ADDSTRING','!word','add negated word')"
,
       1, new Hash(
            'contents', 'choose',
	         'type', 'js',
	         'uri', "addOpt('ADDSTRING','!word','add negated word')"
	      ),
	      2, new Hash(
            'contents', 'exclude',
	         'type', 'js',
	         'uri', "addOpt('ADDSTRING','!!word','!add negated word')"
	      )
	   ),
	    3, new Hash(
         'contents', 'add lemma',
	      'type', 'js',
	      'uri', "addOpt('ADDSTRING','lemma','add lemma')"
,
       1, new Hash(
            'contents', 'choose',
	         'type', 'js',
	         'uri', "addOpt('ADDSTRING','lemma','add lemma')"
	      ),
	      2, new Hash(
            'contents', 'exclude',
	         'type', 'js',
	         'uri', "addOpt('ADDSTRING','!lemma','!add lemma')"
	      )
	   ),
	    4, new Hash(
         'contents', 'add negated lemma',
	      'type', 'js',
	      'uri', "addOpt('ADDSTRING','!lemma','add negated lemma')"
,
       1, new Hash(
            'contents', 'choose',
	         'type', 'js',
	         'uri', "addOpt('ADDSTRING','!lemma','add negated lemma')"
	      ),
	      2, new Hash(
            'contents', 'exclude',
	         'type', 'js',
	         'uri', "addOpt('ADDSTRING','!!lemma','!add negated lemma')"
	      )
	   )
),
  	3, new Hash(
       'contents', 'occurences &#187;&nbsp;',
	    1, new Hash(
         'contents', '',
	      'type', 'js',
	      'uri', "addOpt('occ',' ','')"
,
       1, new Hash(
            'contents', 'choose',
	         'type', 'js',
	         'uri', "addOpt('occ',' ','')"
	      ),
	      2, new Hash(
            'contents', 'exclude',
	         'type', 'js',
	         'uri', "addOpt('occ','! ','!')"
	      )
	   ),
	    2, new Hash(
         'contents', 'zero or more',
	      'type', 'js',
	      'uri', "addOpt('occ','*','zero or more')"
,
       1, new Hash(
            'contents', 'choose',
	         'type', 'js',
	         'uri', "addOpt('occ','*','zero or more')"
	      ),
	      2, new Hash(
            'contents', 'exclude',
	         'type', 'js',
	         'uri', "addOpt('occ','!*','!zero or more')"
	      )
	   ),
	    3, new Hash(
         'contents', 'one or more',
	      'type', 'js',
	      'uri', "addOpt('occ','+','one or more')"
,
       1, new Hash(
            'contents', 'choose',
	         'type', 'js',
	         'uri', "addOpt('occ','+','one or more')"
	      ),
	      2, new Hash(
            'contents', 'exclude',
	         'type', 'js',
	         'uri', "addOpt('occ','!+','!one or more')"
	      )
	   ),
	    4, new Hash(
         'contents', 'zero or one',
	      'type', 'js',
	      'uri', "addOpt('occ','?','zero or one')"
,
       1, new Hash(
            'contents', 'choose',
	         'type', 'js',
	         'uri', "addOpt('occ','?','zero or one')"
	      ),
	      2, new Hash(
            'contents', 'exclude',
	         'type', 'js',
	         'uri', "addOpt('occ','!?','!zero or one')"
	      )
	   )
),
	  4, new Hash(
         'contents', '<br>'
         ),
  	5, new Hash(
       'contents', 'part-of-speech &#187;&nbsp;',
	    1, new Hash(
         'contents', '',
	      'type', 'js',
	      'uri', "addOpt('pos',' ','')"
,
       1, new Hash(
            'contents', 'choose',
	         'type', 'js',
	         'uri', "addOpt('pos',' ','')"
	      ),
	      2, new Hash(
            'contents', 'exclude',
	         'type', 'js',
	         'uri', "addOpt('pos','! ','!')"
	      )
	   ),
	    2, new Hash(
         'contents', 'noun',
	      'type', 'js',
	      'uri', "addOpt('pos','n','noun')"
,
       1, new Hash(
            'contents', 'choose',
	         'type', 'js',
	         'uri', "addOpt('pos','n','noun')"
	      ),
	      2, new Hash(
            'contents', 'exclude',
	         'type', 'js',
	         'uri', "addOpt('pos','!n','!noun')"
	      )
	   ),
	    3, new Hash(
         'contents', 'verb',
	      'type', 'js',
	      'uri', "addOpt('pos','v','verb')"
,
       1, new Hash(
            'contents', 'choose',
	         'type', 'js',
	         'uri', "addOpt('pos','v','verb')"
	      ),
	      2, new Hash(
            'contents', 'exclude',
	         'type', 'js',
	         'uri', "addOpt('pos','!v','!verb')"
	      )
	   ),
	    4, new Hash(
         'contents', 'adjective',
	      'type', 'js',
	      'uri', "addOpt('pos','adj','adjective')"
,
       1, new Hash(
            'contents', 'choose',
	         'type', 'js',
	         'uri', "addOpt('pos','adj','adjective')"
	      ),
	      2, new Hash(
            'contents', 'exclude',
	         'type', 'js',
	         'uri', "addOpt('pos','!adj','!adjective')"
	      )
	   ),
	    5, new Hash(
         'contents', 'adverb',
	      'type', 'js',
	      'uri', "addOpt('pos','adv','adverb')"
,
       1, new Hash(
            'contents', 'choose',
	         'type', 'js',
	         'uri', "addOpt('pos','adv','adverb')"
	      ),
	      2, new Hash(
            'contents', 'exclude',
	         'type', 'js',
	         'uri', "addOpt('pos','!adv','!adverb')"
	      )
	   ),
	    6, new Hash(
         'contents', 'preposition',
	      'type', 'js',
	      'uri', "addOpt('pos','prp','preposition')"
,
       1, new Hash(
            'contents', 'choose',
	         'type', 'js',
	         'uri', "addOpt('pos','prp','preposition')"
	      ),
	      2, new Hash(
            'contents', 'exclude',
	         'type', 'js',
	         'uri', "addOpt('pos','!prp','!preposition')"
	      )
	   ),
	    7, new Hash(
         'contents', 'postposition',
	      'type', 'js',
	      'uri', "addOpt('pos','postp','postposition')"
,
       1, new Hash(
            'contents', 'choose',
	         'type', 'js',
	         'uri', "addOpt('pos','postp','postposition')"
	      ),
	      2, new Hash(
            'contents', 'exclude',
	         'type', 'js',
	         'uri', "addOpt('pos','!postp','!postposition')"
	      )
	   ),
	    8, new Hash(
         'contents', 'determiner',
	      'type', 'js',
	      'uri', "addOpt('pos','det','determiner')"
,
       1, new Hash(
            'contents', 'choose',
	         'type', 'js',
	         'uri', "addOpt('pos','det','determiner')"
	      ),
	      2, new Hash(
            'contents', 'exclude',
	         'type', 'js',
	         'uri', "addOpt('pos','!det','!determiner')"
	      )
	   ),
	    9, new Hash(
         'contents', 'pronoun',
	      'type', 'js',
	      'uri', "addOpt('pos','pron','pronoun')"
,
       1, new Hash(
            'contents', 'choose',
	         'type', 'js',
	         'uri', "addOpt('pos','pron','pronoun')"
	      ),
	      2, new Hash(
            'contents', 'exclude',
	         'type', 'js',
	         'uri', "addOpt('pos','!pron','!pronoun')"
	      )
	   ),
	    10, new Hash(
         'contents', 'infinitive marker',
	      'type', 'js',
	      'uri', "addOpt('pos','infm','infinitive marker')"
,
       1, new Hash(
            'contents', 'choose',
	         'type', 'js',
	         'uri', "addOpt('pos','infm','infinitive marker')"
	      ),
	      2, new Hash(
            'contents', 'exclude',
	         'type', 'js',
	         'uri', "addOpt('pos','!infm','!infinitive marker')"
	      )
	   ),
	    11, new Hash(
         'contents', 'conjunction',
	      'type', 'js',
	      'uri', "addOpt('pos','conj','conjunction')"
,
       1, new Hash(
            'contents', 'choose',
	         'type', 'js',
	         'uri', "addOpt('pos','conj','conjunction')"
	      ),
	      2, new Hash(
            'contents', 'exclude',
	         'type', 'js',
	         'uri', "addOpt('pos','!conj','!conjunction')"
	      )
	   ),
	    12, new Hash(
         'contents', 'interjection',
	      'type', 'js',
	      'uri', "addOpt('pos','intj','interjection')"
,
       1, new Hash(
            'contents', 'choose',
	         'type', 'js',
	         'uri', "addOpt('pos','intj','interjection')"
	      ),
	      2, new Hash(
            'contents', 'exclude',
	         'type', 'js',
	         'uri', "addOpt('pos','!intj','!interjection')"
	      )
	   ),
	    13, new Hash(
         'contents', 'number',
	      'type', 'js',
	      'uri', "addOpt('pos','num','number')"
,
       1, new Hash(
            'contents', 'choose',
	         'type', 'js',
	         'uri', "addOpt('pos','num','number')"
	      ),
	      2, new Hash(
            'contents', 'exclude',
	         'type', 'js',
	         'uri', "addOpt('pos','!num','!number')"
	      )
	   ),
	    14, new Hash(
         'contents', 'punctuation',
	      'type', 'js',
	      'uri', "addOpt('pos','punct','punctuation')"
,
       1, new Hash(
            'contents', 'choose',
	         'type', 'js',
	         'uri', "addOpt('pos','punct','punctuation')"
	      ),
	      2, new Hash(
            'contents', 'exclude',
	         'type', 'js',
	         'uri', "addOpt('pos','!punct','!punctuation')"
	      )
	   ),
	    15, new Hash(
         'contents', 'prefix',
	      'type', 'js',
	      'uri', "addOpt('pos','pref','prefix')"
,
       1, new Hash(
            'contents', 'choose',
	         'type', 'js',
	         'uri', "addOpt('pos','pref','prefix')"
	      ),
	      2, new Hash(
            'contents', 'exclude',
	         'type', 'js',
	         'uri', "addOpt('pos','!pref','!prefix')"
	      )
	   ),
	    16, new Hash(
         'contents', 'specifier',
	      'type', 'js',
	      'uri', "addOpt('pos','spec','specifier')"
,
       1, new Hash(
            'contents', 'choose',
	         'type', 'js',
	         'uri', "addOpt('pos','spec','specifier')"
	      ),
	      2, new Hash(
            'contents', 'exclude',
	         'type', 'js',
	         'uri', "addOpt('pos','!spec','!specifier')"
	      )
	   ),
	    17, new Hash(
         'contents', 'article',
	      'type', 'js',
	      'uri', "addOpt('pos','art','article')"
,
       1, new Hash(
            'contents', 'choose',
	         'type', 'js',
	         'uri', "addOpt('pos','art','article')"
	      ),
	      2, new Hash(
            'contents', 'exclude',
	         'type', 'js',
	         'uri', "addOpt('pos','!art','!article')"
	      )
	   ),
	    18, new Hash(
         'contents', 'particle',
	      'type', 'js',
	      'uri', "addOpt('pos','pcle','particle')"
,
       1, new Hash(
            'contents', 'choose',
	         'type', 'js',
	         'uri', "addOpt('pos','pcle','particle')"
	      ),
	      2, new Hash(
            'contents', 'exclude',
	         'type', 'js',
	         'uri', "addOpt('pos','!pcle','!particle')"
	      )
	   )
),
  	6, new Hash(
       'contents', 'type &#187;&nbsp;',
	    1, new Hash(
         'contents', 'common',
	      'type', 'js',
	      'uri', "addOpt('type','c','common')"
,
       1, new Hash(
            'contents', 'choose',
	         'type', 'js',
	         'uri', "addOpt('type','c','common')"
	      ),
	      2, new Hash(
            'contents', 'exclude',
	         'type', 'js',
	         'uri', "addOpt('type','!c','!common')"
	      )
	   ),
	    2, new Hash(
         'contents', 'proper',
	      'type', 'js',
	      'uri', "addOpt('type','p','proper')"
,
       1, new Hash(
            'contents', 'choose',
	         'type', 'js',
	         'uri', "addOpt('type','p','proper')"
	      ),
	      2, new Hash(
            'contents', 'exclude',
	         'type', 'js',
	         'uri', "addOpt('type','!p','!proper')"
	      )
	   ),
	    3, new Hash(
         'contents', 'abbreviation',
	      'type', 'js',
	      'uri', "addOpt('type','abbr','abbreviation')"
,
       1, new Hash(
            'contents', 'choose',
	         'type', 'js',
	         'uri', "addOpt('type','abbr','abbreviation')"
	      ),
	      2, new Hash(
            'contents', 'exclude',
	         'type', 'js',
	         'uri', "addOpt('type','!abbr','!abbreviation')"
	      )
	   ),
	    4, new Hash(
         'contents', 'possesive',
	      'type', 'js',
	      'uri', "addOpt('type','poss','possesive')"
,
       1, new Hash(
            'contents', 'choose',
	         'type', 'js',
	         'uri', "addOpt('type','poss','possesive')"
	      ),
	      2, new Hash(
            'contents', 'exclude',
	         'type', 'js',
	         'uri', "addOpt('type','!poss','!possesive')"
	      )
	   ),
	    5, new Hash(
         'contents', 'demonstrative',
	      'type', 'js',
	      'uri', "addOpt('type','dem','demonstrative')"
,
       1, new Hash(
            'contents', 'choose',
	         'type', 'js',
	         'uri', "addOpt('type','dem','demonstrative')"
	      ),
	      2, new Hash(
            'contents', 'exclude',
	         'type', 'js',
	         'uri', "addOpt('type','!dem','!demonstrative')"
	      )
	   ),
	    6, new Hash(
         'contents', 'personal',
	      'type', 'js',
	      'uri', "addOpt('type','pers','personal')"
,
       1, new Hash(
            'contents', 'choose',
	         'type', 'js',
	         'uri', "addOpt('type','pers','personal')"
	      ),
	      2, new Hash(
            'contents', 'exclude',
	         'type', 'js',
	         'uri', "addOpt('type','!pers','!personal')"
	      )
	   ),
	    7, new Hash(
         'contents', 'impersonal',
	      'type', 'js',
	      'uri', "addOpt('type','impers','impersonal')"
,
       1, new Hash(
            'contents', 'choose',
	         'type', 'js',
	         'uri', "addOpt('type','impers','impersonal')"
	      ),
	      2, new Hash(
            'contents', 'exclude',
	         'type', 'js',
	         'uri', "addOpt('type','!impers','!impersonal')"
	      )
	   ),
	    8, new Hash(
         'contents', 'polite',
	      'type', 'js',
	      'uri', "addOpt('type','polite','polite')"
,
       1, new Hash(
            'contents', 'choose',
	         'type', 'js',
	         'uri', "addOpt('type','polite','polite')"
	      ),
	      2, new Hash(
            'contents', 'exclude',
	         'type', 'js',
	         'uri', "addOpt('type','!polite','!polite')"
	      )
	   ),
	    9, new Hash(
         'contents', 'reflexive',
	      'type', 'js',
	      'uri', "addOpt('type','refl','reflexive')"
,
       1, new Hash(
            'contents', 'choose',
	         'type', 'js',
	         'uri', "addOpt('type','refl','reflexive')"
	      ),
	      2, new Hash(
            'contents', 'exclude',
	         'type', 'js',
	         'uri', "addOpt('type','!refl','!reflexive')"
	      )
	   ),
	    10, new Hash(
         'contents', 'no conjugation',
	      'type', 'js',
	      'uri', "addOpt('type','noconj','no conjugation')"
,
       1, new Hash(
            'contents', 'choose',
	         'type', 'js',
	         'uri', "addOpt('type','noconj','no conjugation')"
	      ),
	      2, new Hash(
            'contents', 'exclude',
	         'type', 'js',
	         'uri', "addOpt('type','!noconj','!no conjugation')"
	      )
	   ),
	    11, new Hash(
         'contents', 'comma',
	      'type', 'js',
	      'uri', "addOpt('type','comma','comma')"
,
       1, new Hash(
            'contents', 'choose',
	         'type', 'js',
	         'uri', "addOpt('type','comma','comma')"
	      ),
	      2, new Hash(
            'contents', 'exclude',
	         'type', 'js',
	         'uri', "addOpt('type','!comma','!comma')"
	      )
	   ),
	    12, new Hash(
         'contents', 'perion',
	      'type', 'js',
	      'uri', "addOpt('type','period','perion')"
,
       1, new Hash(
            'contents', 'choose',
	         'type', 'js',
	         'uri', "addOpt('type','period','perion')"
	      ),
	      2, new Hash(
            'contents', 'exclude',
	         'type', 'js',
	         'uri', "addOpt('type','!period','!perion')"
	      )
	   ),
	    13, new Hash(
         'contents', 'ellipsis',
	      'type', 'js',
	      'uri', "addOpt('type','ellipsis','ellipsis')"
,
       1, new Hash(
            'contents', 'choose',
	         'type', 'js',
	         'uri', "addOpt('type','ellipsis','ellipsis')"
	      ),
	      2, new Hash(
            'contents', 'exclude',
	         'type', 'js',
	         'uri', "addOpt('type','!ellipsis','!ellipsis')"
	      )
	   ),
	    14, new Hash(
         'contents', 'semicolon',
	      'type', 'js',
	      'uri', "addOpt('type','semicolon','semicolon')"
,
       1, new Hash(
            'contents', 'choose',
	         'type', 'js',
	         'uri', "addOpt('type','semicolon','semicolon')"
	      ),
	      2, new Hash(
            'contents', 'exclude',
	         'type', 'js',
	         'uri', "addOpt('type','!semicolon','!semicolon')"
	      )
	   ),
	    15, new Hash(
         'contents', 'colon',
	      'type', 'js',
	      'uri', "addOpt('type','colon','colon')"
,
       1, new Hash(
            'contents', 'choose',
	         'type', 'js',
	         'uri', "addOpt('type','colon','colon')"
	      ),
	      2, new Hash(
            'contents', 'exclude',
	         'type', 'js',
	         'uri', "addOpt('type','!colon','!colon')"
	      )
	   ),
	    16, new Hash(
         'contents', 'left parenthesis',
	      'type', 'js',
	      'uri', "addOpt('type','lpar','left parenthesis')"
,
       1, new Hash(
            'contents', 'choose',
	         'type', 'js',
	         'uri', "addOpt('type','lpar','left parenthesis')"
	      ),
	      2, new Hash(
            'contents', 'exclude',
	         'type', 'js',
	         'uri', "addOpt('type','!lpar','!left parenthesis')"
	      )
	   ),
	    17, new Hash(
         'contents', 'right parenthesis',
	      'type', 'js',
	      'uri', "addOpt('type','rpar','right parenthesis')"
,
       1, new Hash(
            'contents', 'choose',
	         'type', 'js',
	         'uri', "addOpt('type','rpar','right parenthesis')"
	      ),
	      2, new Hash(
            'contents', 'exclude',
	         'type', 'js',
	         'uri', "addOpt('type','!rpar','!right parenthesis')"
	      )
	   ),
	    18, new Hash(
         'contents', 'question',
	      'type', 'js',
	      'uri', "addOpt('type','question','question')"
,
       1, new Hash(
            'contents', 'choose',
	         'type', 'js',
	         'uri', "addOpt('type','question','question')"
	      ),
	      2, new Hash(
            'contents', 'exclude',
	         'type', 'js',
	         'uri', "addOpt('type','!question','!question')"
	      )
	   ),
	    19, new Hash(
         'contents', 'exclamation mark',
	      'type', 'js',
	      'uri', "addOpt('type','excl','exclamation mark')"
,
       1, new Hash(
            'contents', 'choose',
	         'type', 'js',
	         'uri', "addOpt('type','excl','exclamation mark')"
	      ),
	      2, new Hash(
            'contents', 'exclude',
	         'type', 'js',
	         'uri', "addOpt('type','!excl','!exclamation mark')"
	      )
	   ),
	    20, new Hash(
         'contents', 'dash',
	      'type', 'js',
	      'uri', "addOpt('type','dash','dash')"
,
       1, new Hash(
            'contents', 'choose',
	         'type', 'js',
	         'uri', "addOpt('type','dash','dash')"
	      ),
	      2, new Hash(
            'contents', 'exclude',
	         'type', 'js',
	         'uri', "addOpt('type','!dash','!dash')"
	      )
	   ),
	    21, new Hash(
         'contents', 'coordination',
	      'type', 'js',
	      'uri', "addOpt('type','coord','coordination')"
,
       1, new Hash(
            'contents', 'choose',
	         'type', 'js',
	         'uri', "addOpt('type','coord','coordination')"
	      ),
	      2, new Hash(
            'contents', 'exclude',
	         'type', 'js',
	         'uri', "addOpt('type','!coord','!coordination')"
	      )
	   ),
	    22, new Hash(
         'contents', 'subordinating',
	      'type', 'js',
	      'uri', "addOpt('type','subord','subordinating')"
,
       1, new Hash(
            'contents', 'choose',
	         'type', 'js',
	         'uri', "addOpt('type','subord','subordinating')"
	      ),
	      2, new Hash(
            'contents', 'exclude',
	         'type', 'js',
	         'uri', "addOpt('type','!subord','!subordinating')"
	      )
	   ),
	    23, new Hash(
         'contents', 'attributive',
	      'type', 'js',
	      'uri', "addOpt('type','attr','attributive')"
,
       1, new Hash(
            'contents', 'choose',
	         'type', 'js',
	         'uri', "addOpt('type','attr','attributive')"
	      ),
	      2, new Hash(
            'contents', 'exclude',
	         'type', 'js',
	         'uri', "addOpt('type','!attr','!attributive')"
	      )
	   )
),
  	7, new Hash(
       'contents', 'type (verb) &#187;&nbsp;',
	    1, new Hash(
         'contents', 'participle',
	      'type', 'js',
	      'uri', "addOpt('type','participle','participle')"
,
       1, new Hash(
            'contents', 'choose',
	         'type', 'js',
	         'uri', "addOpt('type','participle','participle')"
	      ),
	      2, new Hash(
            'contents', 'exclude',
	         'type', 'js',
	         'uri', "addOpt('type','!participle','!participle')"
	      )
	   ),
	    2, new Hash(
         'contents', 'finite',
	      'type', 'js',
	      'uri', "addOpt('type','fin','finite')"
,
       1, new Hash(
            'contents', 'choose',
	         'type', 'js',
	         'uri', "addOpt('type','fin','finite')"
	      ),
	      2, new Hash(
            'contents', 'exclude',
	         'type', 'js',
	         'uri', "addOpt('type','!fin','!finite')"
	      )
	   ),
	    3, new Hash(
         'contents', 'infinite',
	      'type', 'js',
	      'uri', "addOpt('type','inf','infinite')"
,
       1, new Hash(
            'contents', 'choose',
	         'type', 'js',
	         'uri', "addOpt('type','inf','infinite')"
	      ),
	      2, new Hash(
            'contents', 'exclude',
	         'type', 'js',
	         'uri', "addOpt('type','!inf','!infinite')"
	      )
	   ),
	    4, new Hash(
         'contents', 'gerund',
	      'type', 'js',
	      'uri', "addOpt('type','gerund','gerund')"
,
       1, new Hash(
            'contents', 'choose',
	         'type', 'js',
	         'uri', "addOpt('type','gerund','gerund')"
	      ),
	      2, new Hash(
            'contents', 'exclude',
	         'type', 'js',
	         'uri', "addOpt('type','!gerund','!gerund')"
	      )
	   ),
	    5, new Hash(
         'contents', 'supine',
	      'type', 'js',
	      'uri', "addOpt('type','supine','supine')"
,
       1, new Hash(
            'contents', 'choose',
	         'type', 'js',
	         'uri', "addOpt('type','supine','supine')"
	      ),
	      2, new Hash(
            'contents', 'exclude',
	         'type', 'js',
	         'uri', "addOpt('type','!supine','!supine')"
	      )
	   ),
	    6, new Hash(
         'contents', 'genitive verb',
	      'type', 'js',
	      'uri', "addOpt('type','verbgenitive','genitive verb')"
,
       1, new Hash(
            'contents', 'choose',
	         'type', 'js',
	         'uri', "addOpt('type','verbgenitive','genitive verb')"
	      ),
	      2, new Hash(
            'contents', 'exclude',
	         'type', 'js',
	         'uri', "addOpt('type','!verbgenitive','!genitive verb')"
	      )
	   ),
	    7, new Hash(
         'contents', 'abessive verb',
	      'type', 'js',
	      'uri', "addOpt('type','verbabessive','abessive verb')"
,
       1, new Hash(
            'contents', 'choose',
	         'type', 'js',
	         'uri', "addOpt('type','verbabessive','abessive verb')"
	      ),
	      2, new Hash(
            'contents', 'exclude',
	         'type', 'js',
	         'uri', "addOpt('type','!verbabessive','!abessive verb')"
	      )
	   ),
	    8, new Hash(
         'contents', 'auxiliary',
	      'type', 'js',
	      'uri', "addOpt('type','aux','auxiliary')"
,
       1, new Hash(
            'contents', 'choose',
	         'type', 'js',
	         'uri', "addOpt('type','aux','auxiliary')"
	      ),
	      2, new Hash(
            'contents', 'exclude',
	         'type', 'js',
	         'uri', "addOpt('type','!aux','!auxiliary')"
	      )
	   )
),
  	8, new Hash(
       'contents', 'type (adverbs) &#187;&nbsp;',
	    1, new Hash(
         'contents', 'manner',
	      'type', 'js',
	      'uri', "addOpt('type','manner','manner')"
,
       1, new Hash(
            'contents', 'choose',
	         'type', 'js',
	         'uri', "addOpt('type','manner','manner')"
	      ),
	      2, new Hash(
            'contents', 'exclude',
	         'type', 'js',
	         'uri', "addOpt('type','!manner','!manner')"
	      )
	   ),
	    2, new Hash(
         'contents', 'time',
	      'type', 'js',
	      'uri', "addOpt('type','time','time')"
,
       1, new Hash(
            'contents', 'choose',
	         'type', 'js',
	         'uri', "addOpt('type','time','time')"
	      ),
	      2, new Hash(
            'contents', 'exclude',
	         'type', 'js',
	         'uri', "addOpt('type','!time','!time')"
	      )
	   ),
	    3, new Hash(
         'contents', 'location',
	      'type', 'js',
	      'uri', "addOpt('type','loc','location')"
,
       1, new Hash(
            'contents', 'choose',
	         'type', 'js',
	         'uri', "addOpt('type','loc','location')"
	      ),
	      2, new Hash(
            'contents', 'exclude',
	         'type', 'js',
	         'uri', "addOpt('type','!loc','!location')"
	      )
	   ),
	    4, new Hash(
         'contents', 'quantity and degree',
	      'type', 'js',
	      'uri', "addOpt('type','quant','quantity and degree')"
,
       1, new Hash(
            'contents', 'choose',
	         'type', 'js',
	         'uri', "addOpt('type','quant','quantity and degree')"
	      ),
	      2, new Hash(
            'contents', 'exclude',
	         'type', 'js',
	         'uri', "addOpt('type','!quant','!quantity and degree')"
	      )
	   ),
	    5, new Hash(
         'contents', 'modal',
	      'type', 'js',
	      'uri', "addOpt('type','modal','modal')"
,
       1, new Hash(
            'contents', 'choose',
	         'type', 'js',
	         'uri', "addOpt('type','modal','modal')"
	      ),
	      2, new Hash(
            'contents', 'exclude',
	         'type', 'js',
	         'uri', "addOpt('type','!modal','!modal')"
	      )
	   )
),
  	9, new Hash(
       'contents', 'type (numerals) &#187;&nbsp;',
	    1, new Hash(
         'contents', 'cardinal',
	      'type', 'js',
	      'uri', "addOpt('type','card','cardinal')"
,
       1, new Hash(
            'contents', 'choose',
	         'type', 'js',
	         'uri', "addOpt('type','card','cardinal')"
	      ),
	      2, new Hash(
            'contents', 'exclude',
	         'type', 'js',
	         'uri', "addOpt('type','!card','!cardinal')"
	      )
	   ),
	    2, new Hash(
         'contents', 'ordinal',
	      'type', 'js',
	      'uri', "addOpt('type','ord','ordinal')"
,
       1, new Hash(
            'contents', 'choose',
	         'type', 'js',
	         'uri', "addOpt('type','ord','ordinal')"
	      ),
	      2, new Hash(
            'contents', 'exclude',
	         'type', 'js',
	         'uri', "addOpt('type','!ord','!ordinal')"
	      )
	   ),
	    3, new Hash(
         'contents', 'adverbial',
	      'type', 'js',
	      'uri', "addOpt('type','advbl','adverbial')"
,
       1, new Hash(
            'contents', 'choose',
	         'type', 'js',
	         'uri', "addOpt('type','advbl','adverbial')"
	      ),
	      2, new Hash(
            'contents', 'exclude',
	         'type', 'js',
	         'uri', "addOpt('type','!advbl','!adverbial')"
	      )
	   ),
	    4, new Hash(
         'contents', 'fuzzy',
	      'type', 'js',
	      'uri', "addOpt('type','fuzzy','fuzzy')"
,
       1, new Hash(
            'contents', 'choose',
	         'type', 'js',
	         'uri', "addOpt('type','fuzzy','fuzzy')"
	      ),
	      2, new Hash(
            'contents', 'exclude',
	         'type', 'js',
	         'uri', "addOpt('type','!fuzzy','!fuzzy')"
	      )
	   )
),
  	10, new Hash(
       'contents', 'type (pronouns) &#187;&nbsp;',
	    1, new Hash(
         'contents', 'relative --pronouns',
	      'type', 'js',
	      'uri', "addOpt('type','relat','relative --pronouns')"
,
       1, new Hash(
            'contents', 'choose',
	         'type', 'js',
	         'uri', "addOpt('type','relat','relative --pronouns')"
	      ),
	      2, new Hash(
            'contents', 'exclude',
	         'type', 'js',
	         'uri', "addOpt('type','!relat','!relative --pronouns')"
	      )
	   ),
	    2, new Hash(
         'contents', 'collective --pronouns',
	      'type', 'js',
	      'uri', "addOpt('type','coll','collective --pronouns')"
,
       1, new Hash(
            'contents', 'choose',
	         'type', 'js',
	         'uri', "addOpt('type','coll','collective --pronouns')"
	      ),
	      2, new Hash(
            'contents', 'exclude',
	         'type', 'js',
	         'uri', "addOpt('type','!coll','!collective --pronouns')"
	      )
	   ),
	    3, new Hash(
         'contents', 'interrogative --pronouns',
	      'type', 'js',
	      'uri', "addOpt('type','interr','interrogative --pronouns')"
,
       1, new Hash(
            'contents', 'choose',
	         'type', 'js',
	         'uri', "addOpt('type','interr','interrogative --pronouns')"
	      ),
	      2, new Hash(
            'contents', 'exclude',
	         'type', 'js',
	         'uri', "addOpt('type','!interr','!interrogative --pronouns')"
	      )
	   ),
	    4, new Hash(
         'contents', 'indefinite --pronouns',
	      'type', 'js',
	      'uri', "addOpt('type','indef','indefinite --pronouns')"
,
       1, new Hash(
            'contents', 'choose',
	         'type', 'js',
	         'uri', "addOpt('type','indef','indefinite --pronouns')"
	      ),
	      2, new Hash(
            'contents', 'exclude',
	         'type', 'js',
	         'uri', "addOpt('type','!indef','!indefinite --pronouns')"
	      )
	   ),
	    5, new Hash(
         'contents', 'negative --pronouns',
	      'type', 'js',
	      'uri', "addOpt('type','neg','negative --pronouns')"
,
       1, new Hash(
            'contents', 'choose',
	         'type', 'js',
	         'uri', "addOpt('type','neg','negative --pronouns')"
	      ),
	      2, new Hash(
            'contents', 'exclude',
	         'type', 'js',
	         'uri', "addOpt('type','!neg','!negative --pronouns')"
	      )
	   ),
	    6, new Hash(
         'contents', 'clitic --pronouns',
	      'type', 'js',
	      'uri', "addOpt('type','clitic','clitic --pronouns')"
,
       1, new Hash(
            'contents', 'choose',
	         'type', 'js',
	         'uri', "addOpt('type','clitic','clitic --pronouns')"
	      ),
	      2, new Hash(
            'contents', 'exclude',
	         'type', 'js',
	         'uri', "addOpt('type','!clitic','!clitic --pronouns')"
	      )
	   )
),
  	11, new Hash(
       'contents', 'type (particles) &#187;&nbsp;',
	    1, new Hash(
         'contents', 'affirmative --particles',
	      'type', 'js',
	      'uri', "addOpt('type','affirm','affirmative --particles')"
,
       1, new Hash(
            'contents', 'choose',
	         'type', 'js',
	         'uri', "addOpt('type','affirm','affirmative --particles')"
	      ),
	      2, new Hash(
            'contents', 'exclude',
	         'type', 'js',
	         'uri', "addOpt('type','!affirm','!affirmative --particles')"
	      )
	   ),
	    2, new Hash(
         'contents', 'emphatic --particles',
	      'type', 'js',
	      'uri', "addOpt('type','emp','emphatic --particles')"
,
       1, new Hash(
            'contents', 'choose',
	         'type', 'js',
	         'uri', "addOpt('type','emp','emphatic --particles')"
	      ),
	      2, new Hash(
            'contents', 'exclude',
	         'type', 'js',
	         'uri', "addOpt('type','!emp','!emphatic --particles')"
	      )
	   ),
	    3, new Hash(
         'contents', 'verbal --particles',
	      'type', 'js',
	      'uri', "addOpt('type','vbl','verbal --particles')"
,
       1, new Hash(
            'contents', 'choose',
	         'type', 'js',
	         'uri', "addOpt('type','vbl','verbal --particles')"
	      ),
	      2, new Hash(
            'contents', 'exclude',
	         'type', 'js',
	         'uri', "addOpt('type','!vbl','!verbal --particles')"
	      )
	   ),
	    4, new Hash(
         'contents', 'auxiliary --particles',
	      'type', 'js',
	      'uri', "addOpt('type','aux','auxiliary --particles')"
,
       1, new Hash(
            'contents', 'choose',
	         'type', 'js',
	         'uri', "addOpt('type','aux','auxiliary --particles')"
	      ),
	      2, new Hash(
            'contents', 'exclude',
	         'type', 'js',
	         'uri', "addOpt('type','!aux','!auxiliary --particles')"
	      )
	   )
),
  	12, new Hash(
       'contents', 'reference (status of the referent) &#187;&nbsp;',
	    1, new Hash(
         'contents', 'entities',
	      'type', 'js',
	      'uri', "addOpt('ref','ent','entities')"
,
       1, new Hash(
            'contents', 'choose',
	         'type', 'js',
	         'uri', "addOpt('ref','ent','entities')"
	      ),
	      2, new Hash(
            'contents', 'exclude',
	         'type', 'js',
	         'uri', "addOpt('ref','!ent','!entities')"
	      )
	   ),
	    2, new Hash(
         'contents', 'one possessor',
	      'type', 'js',
	      'uri', "addOpt('ref','one_poss','one possessor')"
,
       1, new Hash(
            'contents', 'choose',
	         'type', 'js',
	         'uri', "addOpt('ref','one_poss','one possessor')"
	      ),
	      2, new Hash(
            'contents', 'exclude',
	         'type', 'js',
	         'uri', "addOpt('ref','!one_poss','!one possessor')"
	      )
	   ),
	    3, new Hash(
         'contents', 'many possessors',
	      'type', 'js',
	      'uri', "addOpt('ref','many_poss','many possessors')"
,
       1, new Hash(
            'contents', 'choose',
	         'type', 'js',
	         'uri', "addOpt('ref','many_poss','many possessors')"
	      ),
	      2, new Hash(
            'contents', 'exclude',
	         'type', 'js',
	         'uri', "addOpt('ref','!many_poss','!many possessors')"
	      )
	   ),
	    4, new Hash(
         'contents', 'causality',
	      'type', 'js',
	      'uri', "addOpt('ref','cause','causality')"
,
       1, new Hash(
            'contents', 'choose',
	         'type', 'js',
	         'uri', "addOpt('ref','cause','causality')"
	      ),
	      2, new Hash(
            'contents', 'exclude',
	         'type', 'js',
	         'uri', "addOpt('ref','!cause','!causality')"
	      )
	   )
),
  	13, new Hash(
       'contents', 'grade &#187;&nbsp;',
	    1, new Hash(
         'contents', 'positive',
	      'type', 'js',
	      'uri', "addOpt('grade','pos','positive')"
,
       1, new Hash(
            'contents', 'choose',
	         'type', 'js',
	         'uri', "addOpt('grade','pos','positive')"
	      ),
	      2, new Hash(
            'contents', 'exclude',
	         'type', 'js',
	         'uri', "addOpt('grade','!pos','!positive')"
	      )
	   ),
	    2, new Hash(
         'contents', 'comparative',
	      'type', 'js',
	      'uri', "addOpt('grade','comp','comparative')"
,
       1, new Hash(
            'contents', 'choose',
	         'type', 'js',
	         'uri', "addOpt('grade','comp','comparative')"
	      ),
	      2, new Hash(
            'contents', 'exclude',
	         'type', 'js',
	         'uri', "addOpt('grade','!comp','!comparative')"
	      )
	   ),
	    3, new Hash(
         'contents', 'superlative',
	      'type', 'js',
	      'uri', "addOpt('grade','sup','superlative')"
,
       1, new Hash(
            'contents', 'choose',
	         'type', 'js',
	         'uri', "addOpt('grade','sup','superlative')"
	      ),
	      2, new Hash(
            'contents', 'exclude',
	         'type', 'js',
	         'uri', "addOpt('grade','!sup','!superlative')"
	      )
	   )
),
  	14, new Hash(
       'contents', 'diathesis &#187;&nbsp;',
	    1, new Hash(
         'contents', 'passive',
	      'type', 'js',
	      'uri', "addOpt('dia','pas','passive')"
,
       1, new Hash(
            'contents', 'choose',
	         'type', 'js',
	         'uri', "addOpt('dia','pas','passive')"
	      ),
	      2, new Hash(
            'contents', 'exclude',
	         'type', 'js',
	         'uri', "addOpt('dia','!pas','!passive')"
	      )
	   ),
	    2, new Hash(
         'contents', 'active',
	      'type', 'js',
	      'uri', "addOpt('dia','akt','active')"
,
       1, new Hash(
            'contents', 'choose',
	         'type', 'js',
	         'uri', "addOpt('dia','akt','active')"
	      ),
	      2, new Hash(
            'contents', 'exclude',
	         'type', 'js',
	         'uri', "addOpt('dia','!akt','!active')"
	      )
	   )
),
  	15, new Hash(
       'contents', 'valency of verbs &#187;&nbsp;',
	    1, new Hash(
         'contents', 'transitive',
	      'type', 'js',
	      'uri', "addOpt('val','trans','transitive')"
,
       1, new Hash(
            'contents', 'choose',
	         'type', 'js',
	         'uri', "addOpt('val','trans','transitive')"
	      ),
	      2, new Hash(
            'contents', 'exclude',
	         'type', 'js',
	         'uri', "addOpt('val','!trans','!transitive')"
	      )
	   ),
	    2, new Hash(
         'contents', 'intransitive',
	      'type', 'js',
	      'uri', "addOpt('val','intrans','intransitive')"
,
       1, new Hash(
            'contents', 'choose',
	         'type', 'js',
	         'uri', "addOpt('val','intrans','intransitive')"
	      ),
	      2, new Hash(
            'contents', 'exclude',
	         'type', 'js',
	         'uri', "addOpt('val','!intrans','!intransitive')"
	      )
	   )
),
  	16, new Hash(
       'contents', 'tense &#187;&nbsp;',
	    1, new Hash(
         'contents', 'present',
	      'type', 'js',
	      'uri', "addOpt('tense','pr','present')"
,
       1, new Hash(
            'contents', 'choose',
	         'type', 'js',
	         'uri', "addOpt('tense','pr','present')"
	      ),
	      2, new Hash(
            'contents', 'exclude',
	         'type', 'js',
	         'uri', "addOpt('tense','!pr','!present')"
	      )
	   ),
	    2, new Hash(
         'contents', 'past',
	      'type', 'js',
	      'uri', "addOpt('tense','impf','past')"
,
       1, new Hash(
            'contents', 'choose',
	         'type', 'js',
	         'uri', "addOpt('tense','impf','past')"
	      ),
	      2, new Hash(
            'contents', 'exclude',
	         'type', 'js',
	         'uri', "addOpt('tense','!impf','!past')"
	      )
	   ),
	    3, new Hash(
         'contents', 'future',
	      'type', 'js',
	      'uri', "addOpt('tense','fut','future')"
,
       1, new Hash(
            'contents', 'choose',
	         'type', 'js',
	         'uri', "addOpt('tense','fut','future')"
	      ),
	      2, new Hash(
            'contents', 'exclude',
	         'type', 'js',
	         'uri', "addOpt('tense','!fut','!future')"
	      )
	   ),
	    4, new Hash(
         'contents', 'aorist',
	      'type', 'js',
	      'uri', "addOpt('tense','aor','aorist')"
,
       1, new Hash(
            'contents', 'choose',
	         'type', 'js',
	         'uri', "addOpt('tense','aor','aorist')"
	      ),
	      2, new Hash(
            'contents', 'exclude',
	         'type', 'js',
	         'uri', "addOpt('tense','!aor','!aorist')"
	      )
	   ),
	    5, new Hash(
         'contents', 'past (all other past tenses)',
	      'type', 'js',
	      'uri', "addOpt('tense','past','past (all other past tenses)')"
,
       1, new Hash(
            'contents', 'choose',
	         'type', 'js',
	         'uri', "addOpt('tense','past','past (all other past tenses)')"
	      ),
	      2, new Hash(
            'contents', 'exclude',
	         'type', 'js',
	         'uri', "addOpt('tense','!past','!past (all other past tenses)')"
	      )
	   )
),
  	17, new Hash(
       'contents', 'aspect &#187;&nbsp;',
	    1, new Hash(
         'contents', 'perfective',
	      'type', 'js',
	      'uri', "addOpt('aspect','pf','perfective')"
,
       1, new Hash(
            'contents', 'choose',
	         'type', 'js',
	         'uri', "addOpt('aspect','pf','perfective')"
	      ),
	      2, new Hash(
            'contents', 'exclude',
	         'type', 'js',
	         'uri', "addOpt('aspect','!pf','!perfective')"
	      )
	   ),
	    2, new Hash(
         'contents', 'imperfective',
	      'type', 'js',
	      'uri', "addOpt('aspect','ipf','imperfective')"
,
       1, new Hash(
            'contents', 'choose',
	         'type', 'js',
	         'uri', "addOpt('aspect','ipf','imperfective')"
	      ),
	      2, new Hash(
            'contents', 'exclude',
	         'type', 'js',
	         'uri', "addOpt('aspect','!ipf','!imperfective')"
	      )
	   )
),
  	18, new Hash(
       'contents', 'definiteness &#187;&nbsp;',
	    1, new Hash(
         'contents', 'definite',
	      'type', 'js',
	      'uri', "addOpt('defin','def','definite')"
,
       1, new Hash(
            'contents', 'choose',
	         'type', 'js',
	         'uri', "addOpt('defin','def','definite')"
	      ),
	      2, new Hash(
            'contents', 'exclude',
	         'type', 'js',
	         'uri', "addOpt('defin','!def','!definite')"
	      )
	   ),
	    2, new Hash(
         'contents', 'indefinite',
	      'type', 'js',
	      'uri', "addOpt('defin','indef','indefinite')"
,
       1, new Hash(
            'contents', 'choose',
	         'type', 'js',
	         'uri', "addOpt('defin','indef','indefinite')"
	      ),
	      2, new Hash(
            'contents', 'exclude',
	         'type', 'js',
	         'uri', "addOpt('defin','!indef','!indefinite')"
	      )
	   ),
	    3, new Hash(
         'contents', 'definite/indefinite',
	      'type', 'js',
	      'uri', "addOpt('defin','def/indef','definite/indefinite')"
,
       1, new Hash(
            'contents', 'choose',
	         'type', 'js',
	         'uri', "addOpt('defin','def/indef','definite/indefinite')"
	      ),
	      2, new Hash(
            'contents', 'exclude',
	         'type', 'js',
	         'uri', "addOpt('defin','!def/indef','!definite/indefinite')"
	      )
	   ),
	    4, new Hash(
         'contents', 'short form',
	      'type', 'js',
	      'uri', "addOpt('defin','short','short form')"
,
       1, new Hash(
            'contents', 'choose',
	         'type', 'js',
	         'uri', "addOpt('defin','short','short form')"
	      ),
	      2, new Hash(
            'contents', 'exclude',
	         'type', 'js',
	         'uri', "addOpt('defin','!short','!short form')"
	      )
	   ),
	    5, new Hash(
         'contents', 'full form',
	      'type', 'js',
	      'uri', "addOpt('defin','full','full form')"
,
       1, new Hash(
            'contents', 'choose',
	         'type', 'js',
	         'uri', "addOpt('defin','full','full form')"
	      ),
	      2, new Hash(
            'contents', 'exclude',
	         'type', 'js',
	         'uri', "addOpt('defin','!full','!full form')"
	      )
	   )
),
  	19, new Hash(
       'contents', 'mood &#187;&nbsp;',
	    1, new Hash(
         'contents', 'indicative',
	      'type', 'js',
	      'uri', "addOpt('mood','ind','indicative')"
,
       1, new Hash(
            'contents', 'choose',
	         'type', 'js',
	         'uri', "addOpt('mood','ind','indicative')"
	      ),
	      2, new Hash(
            'contents', 'exclude',
	         'type', 'js',
	         'uri', "addOpt('mood','!ind','!indicative')"
	      )
	   ),
	    2, new Hash(
         'contents', 'conjunctive',
	      'type', 'js',
	      'uri', "addOpt('mood','conj','conjunctive')"
,
       1, new Hash(
            'contents', 'choose',
	         'type', 'js',
	         'uri', "addOpt('mood','conj','conjunctive')"
	      ),
	      2, new Hash(
            'contents', 'exclude',
	         'type', 'js',
	         'uri', "addOpt('mood','!conj','!conjunctive')"
	      )
	   ),
	    3, new Hash(
         'contents', 'conditional',
	      'type', 'js',
	      'uri', "addOpt('mood','cond','conditional')"
,
       1, new Hash(
            'contents', 'choose',
	         'type', 'js',
	         'uri', "addOpt('mood','cond','conditional')"
	      ),
	      2, new Hash(
            'contents', 'exclude',
	         'type', 'js',
	         'uri', "addOpt('mood','!cond','!conditional')"
	      )
	   ),
	    4, new Hash(
         'contents', 'imperative',
	      'type', 'js',
	      'uri', "addOpt('mood','imp','imperative')"
,
       1, new Hash(
            'contents', 'choose',
	         'type', 'js',
	         'uri', "addOpt('mood','imp','imperative')"
	      ),
	      2, new Hash(
            'contents', 'exclude',
	         'type', 'js',
	         'uri', "addOpt('mood','!imp','!imperative')"
	      )
	   ),
	    5, new Hash(
         'contents', 'subjunctive',
	      'type', 'js',
	      'uri', "addOpt('mood','subj','subjunctive')"
,
       1, new Hash(
            'contents', 'choose',
	         'type', 'js',
	         'uri', "addOpt('mood','subj','subjunctive')"
	      ),
	      2, new Hash(
            'contents', 'exclude',
	         'type', 'js',
	         'uri', "addOpt('mood','!subj','!subjunctive')"
	      )
	   ),
	    6, new Hash(
         'contents', 'potensial',
	      'type', 'js',
	      'uri', "addOpt('mood','pot','potensial')"
,
       1, new Hash(
            'contents', 'choose',
	         'type', 'js',
	         'uri', "addOpt('mood','pot','potensial')"
	      ),
	      2, new Hash(
            'contents', 'exclude',
	         'type', 'js',
	         'uri', "addOpt('mood','!pot','!potensial')"
	      )
	   )
),
  	20, new Hash(
       'contents', 'case &#187;&nbsp;',
	    1, new Hash(
         'contents', 'accusative',
	      'type', 'js',
	      'uri', "addOpt('case','acc','accusative')"
,
       1, new Hash(
            'contents', 'choose',
	         'type', 'js',
	         'uri', "addOpt('case','acc','accusative')"
	      ),
	      2, new Hash(
            'contents', 'exclude',
	         'type', 'js',
	         'uri', "addOpt('case','!acc','!accusative')"
	      )
	   ),
	    2, new Hash(
         'contents', 'nominative',
	      'type', 'js',
	      'uri', "addOpt('case','nom','nominative')"
,
       1, new Hash(
            'contents', 'choose',
	         'type', 'js',
	         'uri', "addOpt('case','nom','nominative')"
	      ),
	      2, new Hash(
            'contents', 'exclude',
	         'type', 'js',
	         'uri', "addOpt('case','!nom','!nominative')"
	      )
	   ),
	    3, new Hash(
         'contents', 'dative',
	      'type', 'js',
	      'uri', "addOpt('case','dat','dative')"
,
       1, new Hash(
            'contents', 'choose',
	         'type', 'js',
	         'uri', "addOpt('case','dat','dative')"
	      ),
	      2, new Hash(
            'contents', 'exclude',
	         'type', 'js',
	         'uri', "addOpt('case','!dat','!dative')"
	      )
	   ),
	    4, new Hash(
         'contents', 'genitive',
	      'type', 'js',
	      'uri', "addOpt('case','gen','genitive')"
,
       1, new Hash(
            'contents', 'choose',
	         'type', 'js',
	         'uri', "addOpt('case','gen','genitive')"
	      ),
	      2, new Hash(
            'contents', 'exclude',
	         'type', 'js',
	         'uri', "addOpt('case','!gen','!genitive')"
	      )
	   ),
	    5, new Hash(
         'contents', 'illative',
	      'type', 'js',
	      'uri', "addOpt('case','ill','illative')"
,
       1, new Hash(
            'contents', 'choose',
	         'type', 'js',
	         'uri', "addOpt('case','ill','illative')"
	      ),
	      2, new Hash(
            'contents', 'exclude',
	         'type', 'js',
	         'uri', "addOpt('case','!ill','!illative')"
	      )
	   ),
	    6, new Hash(
         'contents', 'comitative',
	      'type', 'js',
	      'uri', "addOpt('case','com','comitative')"
,
       1, new Hash(
            'contents', 'choose',
	         'type', 'js',
	         'uri', "addOpt('case','com','comitative')"
	      ),
	      2, new Hash(
            'contents', 'exclude',
	         'type', 'js',
	         'uri', "addOpt('case','!com','!comitative')"
	      )
	   ),
	    7, new Hash(
         'contents', 'locative',
	      'type', 'js',
	      'uri', "addOpt('case','loc','locative')"
,
       1, new Hash(
            'contents', 'choose',
	         'type', 'js',
	         'uri', "addOpt('case','loc','locative')"
	      ),
	      2, new Hash(
            'contents', 'exclude',
	         'type', 'js',
	         'uri', "addOpt('case','!loc','!locative')"
	      )
	   ),
	    8, new Hash(
         'contents', 'essative',
	      'type', 'js',
	      'uri', "addOpt('case','ess','essative')"
,
       1, new Hash(
            'contents', 'choose',
	         'type', 'js',
	         'uri', "addOpt('case','ess','essative')"
	      ),
	      2, new Hash(
            'contents', 'exclude',
	         'type', 'js',
	         'uri', "addOpt('case','!ess','!essative')"
	      )
	   ),
	    9, new Hash(
         'contents', 'vocative',
	      'type', 'js',
	      'uri', "addOpt('case','voc','vocative')"
,
       1, new Hash(
            'contents', 'choose',
	         'type', 'js',
	         'uri', "addOpt('case','voc','vocative')"
	      ),
	      2, new Hash(
            'contents', 'exclude',
	         'type', 'js',
	         'uri', "addOpt('case','!voc','!vocative')"
	      )
	   )
),
  	21, new Hash(
       'contents', 'person &#187;&nbsp;',
	    1, new Hash(
         'contents', 'first',
	      'type', 'js',
	      'uri', "addOpt('person','1','first')"
,
       1, new Hash(
            'contents', 'choose',
	         'type', 'js',
	         'uri', "addOpt('person','1','first')"
	      ),
	      2, new Hash(
            'contents', 'exclude',
	         'type', 'js',
	         'uri', "addOpt('person','!1','!first')"
	      )
	   ),
	    2, new Hash(
         'contents', 'second',
	      'type', 'js',
	      'uri', "addOpt('person','2','second')"
,
       1, new Hash(
            'contents', 'choose',
	         'type', 'js',
	         'uri', "addOpt('person','2','second')"
	      ),
	      2, new Hash(
            'contents', 'exclude',
	         'type', 'js',
	         'uri', "addOpt('person','!2','!second')"
	      )
	   ),
	    3, new Hash(
         'contents', 'third',
	      'type', 'js',
	      'uri', "addOpt('person','3','third')"
,
       1, new Hash(
            'contents', 'choose',
	         'type', 'js',
	         'uri', "addOpt('person','3','third')"
	      ),
	      2, new Hash(
            'contents', 'exclude',
	         'type', 'js',
	         'uri', "addOpt('person','!3','!third')"
	      )
	   )
),
  	22, new Hash(
       'contents', 'type	 &#187;&nbsp;',
	    1, new Hash(
         'contents', 'substit',
	      'type', 'js',
	      'uri', "addOpt('type2','substit','substit')"
,
       1, new Hash(
            'contents', 'choose',
	         'type', 'js',
	         'uri', "addOpt('type2','substit','substit')"
	      ),
	      2, new Hash(
            'contents', 'exclude',
	         'type', 'js',
	         'uri', "addOpt('type2','!substit','!substit')"
	      )
	   ),
	    2, new Hash(
         'contents', 'attrib',
	      'type', 'js',
	      'uri', "addOpt('type2','attrib','attrib')"
,
       1, new Hash(
            'contents', 'choose',
	         'type', 'js',
	         'uri', "addOpt('type2','attrib','attrib')"
	      ),
	      2, new Hash(
            'contents', 'exclude',
	         'type', 'js',
	         'uri', "addOpt('type2','!attrib','!attrib')"
	      )
	   ),
	    3, new Hash(
         'contents', 'irrefl',
	      'type', 'js',
	      'uri', "addOpt('type2','irrefl','irrefl')"
,
       1, new Hash(
            'contents', 'choose',
	         'type', 'js',
	         'uri', "addOpt('type2','irrefl','irrefl')"
	      ),
	      2, new Hash(
            'contents', 'exclude',
	         'type', 'js',
	         'uri', "addOpt('type2','!irrefl','!irrefl')"
	      )
	   ),
	    4, new Hash(
         'contents', 'reflex',
	      'type', 'js',
	      'uri', "addOpt('type2','reflex','reflex')"
,
       1, new Hash(
            'contents', 'choose',
	         'type', 'js',
	         'uri', "addOpt('type2','reflex','reflex')"
	      ),
	      2, new Hash(
            'contents', 'exclude',
	         'type', 'js',
	         'uri', "addOpt('type2','!reflex','!reflex')"
	      )
	   ),
	    5, new Hash(
         'contents', 'gerund',
	      'type', 'js',
	      'uri', "addOpt('type2','ger','gerund')"
,
       1, new Hash(
            'contents', 'choose',
	         'type', 'js',
	         'uri', "addOpt('type2','ger','gerund')"
	      ),
	      2, new Hash(
            'contents', 'exclude',
	         'type', 'js',
	         'uri', "addOpt('type2','!ger','!gerund')"
	      )
	   ),
	    6, new Hash(
         'contents', 'past participle',
	      'type', 'js',
	      'uri', "addOpt('type2','pcp2','past participle')"
,
       1, new Hash(
            'contents', 'choose',
	         'type', 'js',
	         'uri', "addOpt('type2','pcp2','past participle')"
	      ),
	      2, new Hash(
            'contents', 'exclude',
	         'type', 'js',
	         'uri', "addOpt('type2','!pcp2','!past participle')"
	      )
	   ),
	    7, new Hash(
         'contents', 'present participle',
	      'type', 'js',
	      'uri', "addOpt('type2','pcp1','present participle')"
,
       1, new Hash(
            'contents', 'choose',
	         'type', 'js',
	         'uri', "addOpt('type2','pcp1','present participle')"
	      ),
	      2, new Hash(
            'contents', 'exclude',
	         'type', 'js',
	         'uri', "addOpt('type2','!pcp1','!present participle')"
	      )
	   )
),
  	23, new Hash(
       'contents', 'number &#187;&nbsp;',
	    1, new Hash(
         'contents', 'singular',
	      'type', 'js',
	      'uri', "addOpt('number','sg','singular')"
,
       1, new Hash(
            'contents', 'choose',
	         'type', 'js',
	         'uri', "addOpt('number','sg','singular')"
	      ),
	      2, new Hash(
            'contents', 'exclude',
	         'type', 'js',
	         'uri', "addOpt('number','!sg','!singular')"
	      )
	   ),
	    2, new Hash(
         'contents', 'dualis',
	      'type', 'js',
	      'uri', "addOpt('number','du','dualis')"
,
       1, new Hash(
            'contents', 'choose',
	         'type', 'js',
	         'uri', "addOpt('number','du','dualis')"
	      ),
	      2, new Hash(
            'contents', 'exclude',
	         'type', 'js',
	         'uri', "addOpt('number','!du','!dualis')"
	      )
	   ),
	    3, new Hash(
         'contents', 'plural',
	      'type', 'js',
	      'uri', "addOpt('number','pl','plural')"
,
       1, new Hash(
            'contents', 'choose',
	         'type', 'js',
	         'uri', "addOpt('number','pl','plural')"
	      ),
	      2, new Hash(
            'contents', 'exclude',
	         'type', 'js',
	         'uri', "addOpt('number','!pl','!plural')"
	      )
	   ),
	    4, new Hash(
         'contents', 'singular/plural',
	      'type', 'js',
	      'uri', "addOpt('number','sg/pl','singular/plural')"
,
       1, new Hash(
            'contents', 'choose',
	         'type', 'js',
	         'uri', "addOpt('number','sg/pl','singular/plural')"
	      ),
	      2, new Hash(
            'contents', 'exclude',
	         'type', 'js',
	         'uri', "addOpt('number','!sg/pl','!singular/plural')"
	      )
	   ),
	    5, new Hash(
         'contents', 'count form',
	      'type', 'js',
	      'uri', "addOpt('number','count','count form')"
,
       1, new Hash(
            'contents', 'choose',
	         'type', 'js',
	         'uri', "addOpt('number','count','count form')"
	      ),
	      2, new Hash(
            'contents', 'exclude',
	         'type', 'js',
	         'uri', "addOpt('number','!count','!count form')"
	      )
	   )
),
  	24, new Hash(
       'contents', 'polarity &#187;&nbsp;',
	    1, new Hash(
         'contents', 'negative',
	      'type', 'js',
	      'uri', "addOpt('polarity','neg','negative')"
,
       1, new Hash(
            'contents', 'choose',
	         'type', 'js',
	         'uri', "addOpt('polarity','neg','negative')"
	      ),
	      2, new Hash(
            'contents', 'exclude',
	         'type', 'js',
	         'uri', "addOpt('polarity','!neg','!negative')"
	      )
	   )
),
  	25, new Hash(
       'contents', 'gender &#187;&nbsp;',
	    1, new Hash(
         'contents', 'masculine',
	      'type', 'js',
	      'uri', "addOpt('gender','m','masculine')"
,
       1, new Hash(
            'contents', 'choose',
	         'type', 'js',
	         'uri', "addOpt('gender','m','masculine')"
	      ),
	      2, new Hash(
            'contents', 'exclude',
	         'type', 'js',
	         'uri', "addOpt('gender','!m','!masculine')"
	      )
	   ),
	    2, new Hash(
         'contents', 'feminine',
	      'type', 'js',
	      'uri', "addOpt('gender','f','feminine')"
,
       1, new Hash(
            'contents', 'choose',
	         'type', 'js',
	         'uri', "addOpt('gender','f','feminine')"
	      ),
	      2, new Hash(
            'contents', 'exclude',
	         'type', 'js',
	         'uri', "addOpt('gender','!f','!feminine')"
	      )
	   ),
	    3, new Hash(
         'contents', 'neuter',
	      'type', 'js',
	      'uri', "addOpt('gender','neu','neuter')"
,
       1, new Hash(
            'contents', 'choose',
	         'type', 'js',
	         'uri', "addOpt('gender','neu','neuter')"
	      ),
	      2, new Hash(
            'contents', 'exclude',
	         'type', 'js',
	         'uri', "addOpt('gender','!neu','!neuter')"
	      )
	   ),
	    4, new Hash(
         'contents', 'masculine/feminine',
	      'type', 'js',
	      'uri', "addOpt('gender','m/f','masculine/feminine')"
,
       1, new Hash(
            'contents', 'choose',
	         'type', 'js',
	         'uri', "addOpt('gender','m/f','masculine/feminine')"
	      ),
	      2, new Hash(
            'contents', 'exclude',
	         'type', 'js',
	         'uri', "addOpt('gender','!m/f','!masculine/feminine')"
	      )
	   ),
	    5, new Hash(
         'contents', 'masculine/neuter',
	      'type', 'js',
	      'uri', "addOpt('gender','m/neu','masculine/neuter')"
,
       1, new Hash(
            'contents', 'choose',
	         'type', 'js',
	         'uri', "addOpt('gender','m/neu','masculine/neuter')"
	      ),
	      2, new Hash(
            'contents', 'exclude',
	         'type', 'js',
	         'uri', "addOpt('gender','!m/neu','!masculine/neuter')"
	      )
	   ),
	    6, new Hash(
         'contents', 'masculine/feminine/neuter',
	      'type', 'js',
	      'uri', "addOpt('gender','m/f/neu','masculine/feminine/neuter')"
,
       1, new Hash(
            'contents', 'choose',
	         'type', 'js',
	         'uri', "addOpt('gender','m/f/neu','masculine/feminine/neuter')"
	      ),
	      2, new Hash(
            'contents', 'exclude',
	         'type', 'js',
	         'uri', "addOpt('gender','!m/f/neu','!masculine/feminine/neuter')"
	      )
	   ),
	    7, new Hash(
         'contents', 'feminine/neuter',
	      'type', 'js',
	      'uri', "addOpt('gender','f/neu','feminine/neuter')"
,
       1, new Hash(
            'contents', 'choose',
	         'type', 'js',
	         'uri', "addOpt('gender','f/neu','feminine/neuter')"
	      ),
	      2, new Hash(
            'contents', 'exclude',
	         'type', 'js',
	         'uri', "addOpt('gender','!f/neu','!feminine/neuter')"
	      )
	   ),
	    8, new Hash(
         'contents', 'utrum',
	      'type', 'js',
	      'uri', "addOpt('gender','utr','utrum')"
,
       1, new Hash(
            'contents', 'choose',
	         'type', 'js',
	         'uri', "addOpt('gender','utr','utrum')"
	      ),
	      2, new Hash(
            'contents', 'exclude',
	         'type', 'js',
	         'uri', "addOpt('gender','!utr','!utrum')"
	      )
	   )
),
  	26, new Hash(
       'contents', 'gender (of possessor) &#187;&nbsp;',
	    1, new Hash(
         'contents', 'masculine',
	      'type', 'js',
	      'uri', "addOpt('poss_gender','m','masculine')"
,
       1, new Hash(
            'contents', 'choose',
	         'type', 'js',
	         'uri', "addOpt('poss_gender','m','masculine')"
	      ),
	      2, new Hash(
            'contents', 'exclude',
	         'type', 'js',
	         'uri', "addOpt('poss_gender','!m','!masculine')"
	      )
	   ),
	    2, new Hash(
         'contents', 'feminine',
	      'type', 'js',
	      'uri', "addOpt('poss_gender','f','feminine')"
,
       1, new Hash(
            'contents', 'choose',
	         'type', 'js',
	         'uri', "addOpt('poss_gender','f','feminine')"
	      ),
	      2, new Hash(
            'contents', 'exclude',
	         'type', 'js',
	         'uri', "addOpt('poss_gender','!f','!feminine')"
	      )
	   ),
	    3, new Hash(
         'contents', 'neuter',
	      'type', 'js',
	      'uri', "addOpt('poss_gender','neu','neuter')"
,
       1, new Hash(
            'contents', 'choose',
	         'type', 'js',
	         'uri', "addOpt('poss_gender','neu','neuter')"
	      ),
	      2, new Hash(
            'contents', 'exclude',
	         'type', 'js',
	         'uri', "addOpt('poss_gender','!neu','!neuter')"
	      )
	   )
) ));
}