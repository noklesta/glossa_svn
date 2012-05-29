var Menu;
function reloadMenuOmc2_fr() {
Menu['OMC3_FR'] = new Hash(     1, new Hash(
        'contents', '<nobr>&nbsp;valg &#187;&nbsp;</nobr>',
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
       'contents', 'occurences &#187;&nbsp;',
	    1, new Hash(
         'contents', 'zero or more',
	      'type', 'js',
	      'uri', "addOpt('occ','*','zero or more')"
,
       1, new Hash(
            'contents', 'velg',
	         'type', 'js',
	         'uri', "addOpt('occ','*','zero or more')"
	      ),
	      2, new Hash(
            'contents', 'utelukk',
	         'type', 'js',
	         'uri', "addOpt('occ','!*','!zero or more')"
	      )
	   ),
	    2, new Hash(
         'contents', 'one or more',
	      'type', 'js',
	      'uri', "addOpt('occ','+','one or more')"
,
       1, new Hash(
            'contents', 'velg',
	         'type', 'js',
	         'uri', "addOpt('occ','+','one or more')"
	      ),
	      2, new Hash(
            'contents', 'utelukk',
	         'type', 'js',
	         'uri', "addOpt('occ','!+','!one or more')"
	      )
	   ),
	    3, new Hash(
         'contents', 'zero or one',
	      'type', 'js',
	      'uri', "addOpt('occ','?','zero or one')"
,
       1, new Hash(
            'contents', 'velg',
	         'type', 'js',
	         'uri', "addOpt('occ','?','zero or one')"
	      ),
	      2, new Hash(
            'contents', 'utelukk',
	         'type', 'js',
	         'uri', "addOpt('occ','!?','!zero or one')"
	      )
	   )
),
	  3, new Hash(
         'contents', '<br>'
         ),
  	4, new Hash(
       'contents', 'Part of Speech &#187;&nbsp;',
	    1, new Hash(
         'contents', 'abbreviation',
	      'type', 'js',
	      'uri', "addOpt('pos','abbr','abbreviation')"
,
       1, new Hash(
            'contents', 'velg',
	         'type', 'js',
	         'uri', "addOpt('pos','abbr','abbreviation')"
	      ),
	      2, new Hash(
            'contents', 'utelukk',
	         'type', 'js',
	         'uri', "addOpt('pos','!abbr','!abbreviation')"
	      )
	   ),
	    2, new Hash(
         'contents', 'adjective',
	      'type', 'js',
	      'uri', "addOpt('pos','adj','adjective')"
,
       1, new Hash(
            'contents', 'velg',
	         'type', 'js',
	         'uri', "addOpt('pos','adj','adjective')"
	      ),
	      2, new Hash(
            'contents', 'utelukk',
	         'type', 'js',
	         'uri', "addOpt('pos','!adj','!adjective')"
	      )
	   ),
	    3, new Hash(
         'contents', 'adverb',
	      'type', 'js',
	      'uri', "addOpt('pos','adv','adverb')"
,
       1, new Hash(
            'contents', 'velg',
	         'type', 'js',
	         'uri', "addOpt('pos','adv','adverb')"
	      ),
	      2, new Hash(
            'contents', 'utelukk',
	         'type', 'js',
	         'uri', "addOpt('pos','!adv','!adverb')"
	      )
	   ),
	    4, new Hash(
         'contents', 'article',
	      'type', 'js',
	      'uri', "addOpt('pos','art','article')"
,
       1, new Hash(
            'contents', 'velg',
	         'type', 'js',
	         'uri', "addOpt('pos','art','article')"
	      ),
	      2, new Hash(
            'contents', 'utelukk',
	         'type', 'js',
	         'uri', "addOpt('pos','!art','!article')"
	      )
	   ),
	    5, new Hash(
         'contents', 'pronoun',
	      'type', 'js',
	      'uri', "addOpt('pos','pron','pronoun')"
,
       1, new Hash(
            'contents', 'velg',
	         'type', 'js',
	         'uri', "addOpt('pos','pron','pronoun')"
	      ),
	      2, new Hash(
            'contents', 'utelukk',
	         'type', 'js',
	         'uri', "addOpt('pos','!pron','!pronoun')"
	      )
	   ),
	    6, new Hash(
         'contents', 'interjection',
	      'type', 'js',
	      'uri', "addOpt('pos','int','interjection')"
,
       1, new Hash(
            'contents', 'velg',
	         'type', 'js',
	         'uri', "addOpt('pos','int','interjection')"
	      ),
	      2, new Hash(
            'contents', 'utelukk',
	         'type', 'js',
	         'uri', "addOpt('pos','!int','!interjection')"
	      )
	   ),
	    7, new Hash(
         'contents', 'noun',
	      'type', 'js',
	      'uri', "addOpt('pos','n','noun')"
,
       1, new Hash(
            'contents', 'velg',
	         'type', 'js',
	         'uri', "addOpt('pos','n','noun')"
	      ),
	      2, new Hash(
            'contents', 'utelukk',
	         'type', 'js',
	         'uri', "addOpt('pos','!n','!noun')"
	      )
	   ),
	    8, new Hash(
         'contents', 'number',
	      'type', 'js',
	      'uri', "addOpt('pos','number','number')"
,
       1, new Hash(
            'contents', 'velg',
	         'type', 'js',
	         'uri', "addOpt('pos','number','number')"
	      ),
	      2, new Hash(
            'contents', 'utelukk',
	         'type', 'js',
	         'uri', "addOpt('pos','!number','!number')"
	      )
	   ),
	    9, new Hash(
         'contents', 'preposition',
	      'type', 'js',
	      'uri', "addOpt('pos','prep','preposition')"
,
       1, new Hash(
            'contents', 'velg',
	         'type', 'js',
	         'uri', "addOpt('pos','prep','preposition')"
	      ),
	      2, new Hash(
            'contents', 'utelukk',
	         'type', 'js',
	         'uri', "addOpt('pos','!prep','!preposition')"
	      )
	   ),
	    10, new Hash(
         'contents', 'punctuation',
	      'type', 'js',
	      'uri', "addOpt('pos','punct','punctuation')"
,
       1, new Hash(
            'contents', 'velg',
	         'type', 'js',
	         'uri', "addOpt('pos','punct','punctuation')"
	      ),
	      2, new Hash(
            'contents', 'utelukk',
	         'type', 'js',
	         'uri', "addOpt('pos','!punct','!punctuation')"
	      )
	   ),
	    11, new Hash(
         'contents', 'symbol',
	      'type', 'js',
	      'uri', "addOpt('pos','symb','symbol')"
,
       1, new Hash(
            'contents', 'velg',
	         'type', 'js',
	         'uri', "addOpt('pos','symb','symbol')"
	      ),
	      2, new Hash(
            'contents', 'utelukk',
	         'type', 'js',
	         'uri', "addOpt('pos','!symb','!symbol')"
	      )
	   ),
	    12, new Hash(
         'contents', 'verb',
	      'type', 'js',
	      'uri', "addOpt('pos','v','verb')"
,
       1, new Hash(
            'contents', 'velg',
	         'type', 'js',
	         'uri', "addOpt('pos','v','verb')"
	      ),
	      2, new Hash(
            'contents', 'utelukk',
	         'type', 'js',
	         'uri', "addOpt('pos','!v','!verb')"
	      )
	   ),
	    13, new Hash(
         'contents', 'conjunction',
	      'type', 'js',
	      'uri', "addOpt('pos','conj','conjunction')"
,
       1, new Hash(
            'contents', 'velg',
	         'type', 'js',
	         'uri', "addOpt('pos','conj','conjunction')"
	      ),
	      2, new Hash(
            'contents', 'utelukk',
	         'type', 'js',
	         'uri', "addOpt('pos','!conj','!conjunction')"
	      )
	   ),
	    14, new Hash(
         'contents', 'preposition plus article',
	      'type', 'js',
	      'uri', "addOpt('pos','prep+art','preposition plus article')"
,
       1, new Hash(
            'contents', 'velg',
	         'type', 'js',
	         'uri', "addOpt('pos','prep+art','preposition plus article')"
	      ),
	      2, new Hash(
            'contents', 'utelukk',
	         'type', 'js',
	         'uri', "addOpt('pos','!prep+art','!preposition plus article')"
	      )
	   )
),
  	5, new Hash(
       'contents', 'morphology (verb) &#187;&nbsp;',
	    1, new Hash(
         'contents', 'conditional',
	      'type', 'js',
	      'uri', "addOpt('mood~case','cond','conditional')"
,
       1, new Hash(
            'contents', 'velg',
	         'type', 'js',
	         'uri', "addOpt('mood~case','cond','conditional')"
	      ),
	      2, new Hash(
            'contents', 'utelukk',
	         'type', 'js',
	         'uri', "addOpt('mood~case','!cond','!conditional')"
	      )
	   ),
	    2, new Hash(
         'contents', 'future',
	      'type', 'js',
	      'uri', "addOpt('tense~defin','futur','future')"
,
       1, new Hash(
            'contents', 'velg',
	         'type', 'js',
	         'uri', "addOpt('tense~defin','futur','future')"
	      ),
	      2, new Hash(
            'contents', 'utelukk',
	         'type', 'js',
	         'uri', "addOpt('tense~defin','!futur','!future')"
	      )
	   ),
	    3, new Hash(
         'contents', 'impertive',
	      'type', 'js',
	      'uri', "addOpt('tense~defin','impera','impertive')"
,
       1, new Hash(
            'contents', 'velg',
	         'type', 'js',
	         'uri', "addOpt('tense~defin','impera','impertive')"
	      ),
	      2, new Hash(
            'contents', 'utelukk',
	         'type', 'js',
	         'uri', "addOpt('tense~defin','!impera','!impertive')"
	      )
	   ),
	    4, new Hash(
         'contents', 'imperfect',
	      'type', 'js',
	      'uri', "addOpt('tense~defin','imperf','imperfect')"
,
       1, new Hash(
            'contents', 'velg',
	         'type', 'js',
	         'uri', "addOpt('tense~defin','imperf','imperfect')"
	      ),
	      2, new Hash(
            'contents', 'utelukk',
	         'type', 'js',
	         'uri', "addOpt('tense~defin','!imperf','!imperfect')"
	      )
	   ),
	    5, new Hash(
         'contents', 'infinitive',
	      'type', 'js',
	      'uri', "addOpt('tense~defin','inf','infinitive')"
,
       1, new Hash(
            'contents', 'velg',
	         'type', 'js',
	         'uri', "addOpt('tense~defin','inf','infinitive')"
	      ),
	      2, new Hash(
            'contents', 'utelukk',
	         'type', 'js',
	         'uri', "addOpt('tense~defin','!inf','!infinitive')"
	      )
	   ),
	    6, new Hash(
         'contents', 'participle',
	      'type', 'js',
	      'uri', "addOpt('tense~defin','part','participle')"
,
       1, new Hash(
            'contents', 'velg',
	         'type', 'js',
	         'uri', "addOpt('tense~defin','part','participle')"
	      ),
	      2, new Hash(
            'contents', 'utelukk',
	         'type', 'js',
	         'uri', "addOpt('tense~defin','!part','!participle')"
	      )
	   ),
	    7, new Hash(
         'contents', 'past',
	      'type', 'js',
	      'uri', "addOpt('tense~defin','past','past')"
,
       1, new Hash(
            'contents', 'velg',
	         'type', 'js',
	         'uri', "addOpt('tense~defin','past','past')"
	      ),
	      2, new Hash(
            'contents', 'utelukk',
	         'type', 'js',
	         'uri', "addOpt('tense~defin','!past','!past')"
	      )
	   ),
	    8, new Hash(
         'contents', 'present',
	      'type', 'js',
	      'uri', "addOpt('tense~defin','present','present')"
,
       1, new Hash(
            'contents', 'velg',
	         'type', 'js',
	         'uri', "addOpt('tense~defin','present','present')"
	      ),
	      2, new Hash(
            'contents', 'utelukk',
	         'type', 'js',
	         'uri', "addOpt('tense~defin','!present','!present')"
	      )
	   ),
	    9, new Hash(
         'contents', 'simple past',
	      'type', 'js',
	      'uri', "addOpt('tense~defin','simple-past','simple past')"
,
       1, new Hash(
            'contents', 'velg',
	         'type', 'js',
	         'uri', "addOpt('tense~defin','simple-past','simple past')"
	      ),
	      2, new Hash(
            'contents', 'utelukk',
	         'type', 'js',
	         'uri', "addOpt('tense~defin','!simple-past','!simple past')"
	      )
	   ),
	    10, new Hash(
         'contents', 'subjunctive',
	      'type', 'js',
	      'uri', "addOpt('mood~case','subj','subjunctive')"
,
       1, new Hash(
            'contents', 'velg',
	         'type', 'js',
	         'uri', "addOpt('mood~case','subj','subjunctive')"
	      ),
	      2, new Hash(
            'contents', 'utelukk',
	         'type', 'js',
	         'uri', "addOpt('mood~case','!subj','!subjunctive')"
	      )
	   ),
	    11, new Hash(
         'contents', 'present',
	      'type', 'js',
	      'uri', "addOpt('tense~defin','pres','present')"
,
       1, new Hash(
            'contents', 'velg',
	         'type', 'js',
	         'uri', "addOpt('tense~defin','pres','present')"
	      ),
	      2, new Hash(
            'contents', 'utelukk',
	         'type', 'js',
	         'uri', "addOpt('tense~defin','!pres','!present')"
	      )
	   ),
	    12, new Hash(
         'contents', 'present (participles)',
	      'type', 'js',
	      'uri', "addOpt('type','pres','present (participles)')"
,
       1, new Hash(
            'contents', 'velg',
	         'type', 'js',
	         'uri', "addOpt('type','pres','present (participles)')"
	      ),
	      2, new Hash(
            'contents', 'utelukk',
	         'type', 'js',
	         'uri', "addOpt('type','!pres','!present (participles)')"
	      )
	   ),
	    13, new Hash(
         'contents', 'past (participles)',
	      'type', 'js',
	      'uri', "addOpt('type','past','past (participles)')"
,
       1, new Hash(
            'contents', 'velg',
	         'type', 'js',
	         'uri', "addOpt('type','past','past (participles)')"
	      ),
	      2, new Hash(
            'contents', 'utelukk',
	         'type', 'js',
	         'uri', "addOpt('type','!past','!past (participles)')"
	      )
	   )
),
  	6, new Hash(
       'contents', 'morphology (pronoun) &#187;&nbsp;',
	    1, new Hash(
         'contents', 'possessive',
	      'type', 'js',
	      'uri', "addOpt('type','poss','possessive')"
,
       1, new Hash(
            'contents', 'velg',
	         'type', 'js',
	         'uri', "addOpt('type','poss','possessive')"
	      ),
	      2, new Hash(
            'contents', 'utelukk',
	         'type', 'js',
	         'uri', "addOpt('type','!poss','!possessive')"
	      )
	   ),
	    2, new Hash(
         'contents', 'demonstrative',
	      'type', 'js',
	      'uri', "addOpt('type','dem','demonstrative')"
,
       1, new Hash(
            'contents', 'velg',
	         'type', 'js',
	         'uri', "addOpt('type','dem','demonstrative')"
	      ),
	      2, new Hash(
            'contents', 'utelukk',
	         'type', 'js',
	         'uri', "addOpt('type','!dem','!demonstrative')"
	      )
	   ),
	    3, new Hash(
         'contents', 'indefinite',
	      'type', 'js',
	      'uri', "addOpt('type','indef','indefinite')"
,
       1, new Hash(
            'contents', 'velg',
	         'type', 'js',
	         'uri', "addOpt('type','indef','indefinite')"
	      ),
	      2, new Hash(
            'contents', 'utelukk',
	         'type', 'js',
	         'uri', "addOpt('type','!indef','!indefinite')"
	      )
	   ),
	    4, new Hash(
         'contents', 'personal',
	      'type', 'js',
	      'uri', "addOpt('type','pers','personal')"
,
       1, new Hash(
            'contents', 'velg',
	         'type', 'js',
	         'uri', "addOpt('type','pers','personal')"
	      ),
	      2, new Hash(
            'contents', 'utelukk',
	         'type', 'js',
	         'uri', "addOpt('type','!pers','!personal')"
	      )
	   ),
	    5, new Hash(
         'contents', 'relative',
	      'type', 'js',
	      'uri', "addOpt('type','rel','relative')"
,
       1, new Hash(
            'contents', 'velg',
	         'type', 'js',
	         'uri', "addOpt('type','rel','relative')"
	      ),
	      2, new Hash(
            'contents', 'utelukk',
	         'type', 'js',
	         'uri', "addOpt('type','!rel','!relative')"
	      )
	   )
),
  	7, new Hash(
       'contents', 'morphology (noun) &#187;&nbsp;',
	    1, new Hash(
         'contents', 'proper noun',
	      'type', 'js',
	      'uri', "addOpt('type','p','proper noun')"
,
       1, new Hash(
            'contents', 'velg',
	         'type', 'js',
	         'uri', "addOpt('type','p','proper noun')"
	      ),
	      2, new Hash(
            'contents', 'utelukk',
	         'type', 'js',
	         'uri', "addOpt('type','!p','!proper noun')"
	      )
	   ),
	    2, new Hash(
         'contents', 'common noun',
	      'type', 'js',
	      'uri', "addOpt('type','c','common noun')"
,
       1, new Hash(
            'contents', 'velg',
	         'type', 'js',
	         'uri', "addOpt('type','c','common noun')"
	      ),
	      2, new Hash(
            'contents', 'utelukk',
	         'type', 'js',
	         'uri', "addOpt('type','!c','!common noun')"
	      )
	   )
) ));
}