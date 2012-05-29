var Menu;
function reloadMenuOmc2_no() {
Menu['OMC3_NO'] = new Hash(     1, new Hash(
        'contents', '<nobr>&nbsp;valg &#187;&nbsp;</nobr>',
  	1, new Hash(
       'contents', 'word &#187;&nbsp;',
	    1, new Hash(
         'contents', 'case sensitive',
	      'type', 'js',
	      'uri', "addOpt('w','case','case sensitive')"
	   ),
	    2, new Hash(
         'contents', 'end of word',
	      'type', 'js',
	      'uri', "addOpt('w','end','end of word')"
	   ),
	    3, new Hash(
         'contents', 'exclude',
	      'type', 'js',
	      'uri', "addOpt('w','neg','exclude')"
	   ),
	    4, new Hash(
         'contents', 'lemma form',
	      'type', 'js',
	      'uri', "addOpt('w','lemma','lemma form')"
	   ),
	    5, new Hash(
         'contents', 'middle of word',
	      'type', 'js',
	      'uri', "addOpt('w','middle','middle of word')"
	   ),
	    6, new Hash(
         'contents', 'start of word',
	      'type', 'js',
	      'uri', "addOpt('w','start','start of word')"
	   )
),
  	2, new Hash(
       'contents', 'occurences &#187;&nbsp;',
	    1, new Hash(
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
	    2, new Hash(
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
	    2, new Hash(
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
	    3, new Hash(
         'contents', 'conjunction',
	      'type', 'js',
	      'uri', "addOpt('pos','konj','conjunction')"
,
       1, new Hash(
            'contents', 'velg',
	         'type', 'js',
	         'uri', "addOpt('pos','konj','conjunction')"
	      ),
	      2, new Hash(
            'contents', 'utelukk',
	         'type', 'js',
	         'uri', "addOpt('pos','!konj','!conjunction')"
	      )
	   ),
	    4, new Hash(
         'contents', 'determiner',
	      'type', 'js',
	      'uri', "addOpt('pos','det','determiner')"
,
       1, new Hash(
            'contents', 'velg',
	         'type', 'js',
	         'uri', "addOpt('pos','det','determiner')"
	      ),
	      2, new Hash(
            'contents', 'utelukk',
	         'type', 'js',
	         'uri', "addOpt('pos','!det','!determiner')"
	      )
	   ),
	    5, new Hash(
         'contents', 'infinitive marker',
	      'type', 'js',
	      'uri', "addOpt('pos','inf-merke','infinitive marker')"
,
       1, new Hash(
            'contents', 'velg',
	         'type', 'js',
	         'uri', "addOpt('pos','inf-merke','infinitive marker')"
	      ),
	      2, new Hash(
            'contents', 'utelukk',
	         'type', 'js',
	         'uri', "addOpt('pos','!inf-merke','!infinitive marker')"
	      )
	   ),
	    6, new Hash(
         'contents', 'interjection',
	      'type', 'js',
	      'uri', "addOpt('pos','interj','interjection')"
,
       1, new Hash(
            'contents', 'velg',
	         'type', 'js',
	         'uri', "addOpt('pos','interj','interjection')"
	      ),
	      2, new Hash(
            'contents', 'utelukk',
	         'type', 'js',
	         'uri', "addOpt('pos','!interj','!interjection')"
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
	    9, new Hash(
         'contents', 'preposistion',
	      'type', 'js',
	      'uri', "addOpt('pos','prep','preposistion')"
,
       1, new Hash(
            'contents', 'velg',
	         'type', 'js',
	         'uri', "addOpt('pos','prep','preposistion')"
	      ),
	      2, new Hash(
            'contents', 'utelukk',
	         'type', 'js',
	         'uri', "addOpt('pos','!prep','!preposistion')"
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
         'contents', 'subjunction',
	      'type', 'js',
	      'uri', "addOpt('pos','sbu','subjunction')"
,
       1, new Hash(
            'contents', 'velg',
	         'type', 'js',
	         'uri', "addOpt('pos','sbu','subjunction')"
	      ),
	      2, new Hash(
            'contents', 'utelukk',
	         'type', 'js',
	         'uri', "addOpt('pos','!sbu','!subjunction')"
	      )
	   ),
	    12, new Hash(
         'contents', 'unknown',
	      'type', 'js',
	      'uri', "addOpt('pos','ukjent','unknown')"
,
       1, new Hash(
            'contents', 'velg',
	         'type', 'js',
	         'uri', "addOpt('pos','ukjent','unknown')"
	      ),
	      2, new Hash(
            'contents', 'utelukk',
	         'type', 'js',
	         'uri', "addOpt('pos','!ukjent','!unknown')"
	      )
	   ),
	    13, new Hash(
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
	   )
),
  	5, new Hash(
       'contents', 'Punctuation &#187;&nbsp;',
	    1, new Hash(
         'contents', 'colon',
	      'type', 'js',
	      'uri', "addOpt('type','colon','colon')"
,
       1, new Hash(
            'contents', 'velg',
	         'type', 'js',
	         'uri', "addOpt('type','colon','colon')"
	      ),
	      2, new Hash(
            'contents', 'utelukk',
	         'type', 'js',
	         'uri', "addOpt('type','!colon','!colon')"
	      )
	   ),
	    2, new Hash(
         'contents', 'comma',
	      'type', 'js',
	      'uri', "addOpt('type','comma','comma')"
,
       1, new Hash(
            'contents', 'velg',
	         'type', 'js',
	         'uri', "addOpt('type','comma','comma')"
	      ),
	      2, new Hash(
            'contents', 'utelukk',
	         'type', 'js',
	         'uri', "addOpt('type','!comma','!comma')"
	      )
	   ),
	    3, new Hash(
         'contents', 'dash',
	      'type', 'js',
	      'uri', "addOpt('type','dash','dash')"
,
       1, new Hash(
            'contents', 'velg',
	         'type', 'js',
	         'uri', "addOpt('type','dash','dash')"
	      ),
	      2, new Hash(
            'contents', 'utelukk',
	         'type', 'js',
	         'uri', "addOpt('type','!dash','!dash')"
	      )
	   ),
	    4, new Hash(
         'contents', 'ellipsis',
	      'type', 'js',
	      'uri', "addOpt('type','ellipsis','ellipsis')"
,
       1, new Hash(
            'contents', 'velg',
	         'type', 'js',
	         'uri', "addOpt('type','ellipsis','ellipsis')"
	      ),
	      2, new Hash(
            'contents', 'utelukk',
	         'type', 'js',
	         'uri', "addOpt('type','!ellipsis','!ellipsis')"
	      )
	   ),
	    5, new Hash(
         'contents', 'exclamation mark',
	      'type', 'js',
	      'uri', "addOpt('type','excl','exclamation mark')"
,
       1, new Hash(
            'contents', 'velg',
	         'type', 'js',
	         'uri', "addOpt('type','excl','exclamation mark')"
	      ),
	      2, new Hash(
            'contents', 'utelukk',
	         'type', 'js',
	         'uri', "addOpt('type','!excl','!exclamation mark')"
	      )
	   ),
	    6, new Hash(
         'contents', 'period',
	      'type', 'js',
	      'uri', "addOpt('type','period','period')"
,
       1, new Hash(
            'contents', 'velg',
	         'type', 'js',
	         'uri', "addOpt('type','period','period')"
	      ),
	      2, new Hash(
            'contents', 'utelukk',
	         'type', 'js',
	         'uri', "addOpt('type','!period','!period')"
	      )
	   ),
	    7, new Hash(
         'contents', 'parenthesis start',
	      'type', 'js',
	      'uri', "addOpt('type','lpar','parenthesis start')"
,
       1, new Hash(
            'contents', 'velg',
	         'type', 'js',
	         'uri', "addOpt('type','lpar','parenthesis start')"
	      ),
	      2, new Hash(
            'contents', 'utelukk',
	         'type', 'js',
	         'uri', "addOpt('type','!lpar','!parenthesis start')"
	      )
	   ),
	    8, new Hash(
         'contents', 'parenthesis end',
	      'type', 'js',
	      'uri', "addOpt('type','rpar','parenthesis end')"
,
       1, new Hash(
            'contents', 'velg',
	         'type', 'js',
	         'uri', "addOpt('type','rpar','parenthesis end')"
	      ),
	      2, new Hash(
            'contents', 'utelukk',
	         'type', 'js',
	         'uri', "addOpt('type','!rpar','!parenthesis end')"
	      )
	   ),
	    9, new Hash(
         'contents', 'question mark',
	      'type', 'js',
	      'uri', "addOpt('type','question','question mark')"
,
       1, new Hash(
            'contents', 'velg',
	         'type', 'js',
	         'uri', "addOpt('type','question','question mark')"
	      ),
	      2, new Hash(
            'contents', 'utelukk',
	         'type', 'js',
	         'uri', "addOpt('type','!question','!question mark')"
	      )
	   ),
	    10, new Hash(
         'contents', 'quote',
	      'type', 'js',
	      'uri', "addOpt('type','quote','quote')"
,
       1, new Hash(
            'contents', 'velg',
	         'type', 'js',
	         'uri', "addOpt('type','quote','quote')"
	      ),
	      2, new Hash(
            'contents', 'utelukk',
	         'type', 'js',
	         'uri', "addOpt('type','!quote','!quote')"
	      )
	   ),
	    11, new Hash(
         'contents', 'semicolon',
	      'type', 'js',
	      'uri', "addOpt('type','semicolon','semicolon')"
,
       1, new Hash(
            'contents', 'velg',
	         'type', 'js',
	         'uri', "addOpt('type','semicolon','semicolon')"
	      ),
	      2, new Hash(
            'contents', 'utelukk',
	         'type', 'js',
	         'uri', "addOpt('type','!semicolon','!semicolon')"
	      )
	   )
),
	  6, new Hash(
         'contents', '<br>'
         ),
  	7, new Hash(
       'contents', 'features (pronouns) &#187;&nbsp;',
	    1, new Hash(
         'contents', 'human',
	      'type', 'js',
	      'uri', "addOpt('type','hum','human')"
,
       1, new Hash(
            'contents', 'velg',
	         'type', 'js',
	         'uri', "addOpt('type','hum','human')"
	      ),
	      2, new Hash(
            'contents', 'utelukk',
	         'type', 'js',
	         'uri', "addOpt('type','!hum','!human')"
	      )
	   ),
	    2, new Hash(
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
	    3, new Hash(
         'contents', 'polite',
	      'type', 'js',
	      'uri', "addOpt('type','polite','polite')"
,
       1, new Hash(
            'contents', 'velg',
	         'type', 'js',
	         'uri', "addOpt('type','polite','polite')"
	      ),
	      2, new Hash(
            'contents', 'utelukk',
	         'type', 'js',
	         'uri', "addOpt('type','!polite','!polite')"
	      )
	   ),
	    4, new Hash(
         'contents', 'question',
	      'type', 'js',
	      'uri', "addOpt('type','question','question')"
,
       1, new Hash(
            'contents', 'velg',
	         'type', 'js',
	         'uri', "addOpt('type','question','question')"
	      ),
	      2, new Hash(
            'contents', 'utelukk',
	         'type', 'js',
	         'uri', "addOpt('type','!question','!question')"
	      )
	   ),
	    5, new Hash(
         'contents', 'reflexive',
	      'type', 'js',
	      'uri', "addOpt('type','refl','reflexive')"
,
       1, new Hash(
            'contents', 'velg',
	         'type', 'js',
	         'uri', "addOpt('type','refl','reflexive')"
	      ),
	      2, new Hash(
            'contents', 'utelukk',
	         'type', 'js',
	         'uri', "addOpt('type','!refl','!reflexive')"
	      )
	   ),
	    6, new Hash(
         'contents', 'reciprocal',
	      'type', 'js',
	      'uri', "addOpt('type','resip','reciprocal')"
,
       1, new Hash(
            'contents', 'velg',
	         'type', 'js',
	         'uri', "addOpt('type','resip','reciprocal')"
	      ),
	      2, new Hash(
            'contents', 'utelukk',
	         'type', 'js',
	         'uri', "addOpt('type','!resip','!reciprocal')"
	      )
	   ),
	  7, new Hash(
         'contents', '<br><center><b>CASE</b></center>'
         ),
	    8, new Hash(
         'contents', 'accusative',
	      'type', 'js',
	      'uri', "addOpt('mood~case','acc','accusative')"
,
       1, new Hash(
            'contents', 'velg',
	         'type', 'js',
	         'uri', "addOpt('mood~case','acc','accusative')"
	      ),
	      2, new Hash(
            'contents', 'utelukk',
	         'type', 'js',
	         'uri', "addOpt('mood~case','!acc','!accusative')"
	      )
	   ),
	    9, new Hash(
         'contents', 'genitive',
	      'type', 'js',
	      'uri', "addOpt('mood~case','gen','genitive')"
,
       1, new Hash(
            'contents', 'velg',
	         'type', 'js',
	         'uri', "addOpt('mood~case','gen','genitive')"
	      ),
	      2, new Hash(
            'contents', 'utelukk',
	         'type', 'js',
	         'uri', "addOpt('mood~case','!gen','!genitive')"
	      )
	   ),
	    10, new Hash(
         'contents', 'nominative',
	      'type', 'js',
	      'uri', "addOpt('mood~case','nom','nominative')"
,
       1, new Hash(
            'contents', 'velg',
	         'type', 'js',
	         'uri', "addOpt('mood~case','nom','nominative')"
	      ),
	      2, new Hash(
            'contents', 'utelukk',
	         'type', 'js',
	         'uri', "addOpt('mood~case','!nom','!nominative')"
	      )
	   ),
	  11, new Hash(
         'contents', '<br><center><b>PERSON</b></center>'
         ),
	    12, new Hash(
         'contents', '1. person',
	      'type', 'js',
	      'uri', "addOpt('person~type2','1','1. person')"
,
       1, new Hash(
            'contents', 'velg',
	         'type', 'js',
	         'uri', "addOpt('person~type2','1','1. person')"
	      ),
	      2, new Hash(
            'contents', 'utelukk',
	         'type', 'js',
	         'uri', "addOpt('person~type2','!1','!1. person')"
	      )
	   ),
	    13, new Hash(
         'contents', '2. person',
	      'type', 'js',
	      'uri', "addOpt('person~type2','2','2. person')"
,
       1, new Hash(
            'contents', 'velg',
	         'type', 'js',
	         'uri', "addOpt('person~type2','2','2. person')"
	      ),
	      2, new Hash(
            'contents', 'utelukk',
	         'type', 'js',
	         'uri', "addOpt('person~type2','!2','!2. person')"
	      )
	   ),
	    14, new Hash(
         'contents', '3. person',
	      'type', 'js',
	      'uri', "addOpt('person~type2','3','3. person')"
,
       1, new Hash(
            'contents', 'velg',
	         'type', 'js',
	         'uri', "addOpt('person~type2','3','3. person')"
	      ),
	      2, new Hash(
            'contents', 'utelukk',
	         'type', 'js',
	         'uri', "addOpt('person~type2','!3','!3. person')"
	      )
	   ),
	  15, new Hash(
         'contents', '<br><center><b>GENDER</b></center>'
         ),
	    16, new Hash(
         'contents', 'feminine',
	      'type', 'js',
	      'uri', "addOpt('gender','f','feminine')"
,
       1, new Hash(
            'contents', 'velg',
	         'type', 'js',
	         'uri', "addOpt('gender','f','feminine')"
	      ),
	      2, new Hash(
            'contents', 'utelukk',
	         'type', 'js',
	         'uri', "addOpt('gender','!f','!feminine')"
	      )
	   ),
	    17, new Hash(
         'contents', 'feminine or masculine',
	      'type', 'js',
	      'uri', "addOpt('gender','m/f','feminine or masculine')"
,
       1, new Hash(
            'contents', 'velg',
	         'type', 'js',
	         'uri', "addOpt('gender','m/f','feminine or masculine')"
	      ),
	      2, new Hash(
            'contents', 'utelukk',
	         'type', 'js',
	         'uri', "addOpt('gender','!m/f','!feminine or masculine')"
	      )
	   ),
	    18, new Hash(
         'contents', 'masculine',
	      'type', 'js',
	      'uri', "addOpt('gender','m','masculine')"
,
       1, new Hash(
            'contents', 'velg',
	         'type', 'js',
	         'uri', "addOpt('gender','m','masculine')"
	      ),
	      2, new Hash(
            'contents', 'utelukk',
	         'type', 'js',
	         'uri', "addOpt('gender','!m','!masculine')"
	      )
	   ),
	    19, new Hash(
         'contents', 'neuter',
	      'type', 'js',
	      'uri', "addOpt('gender','n','neuter')"
,
       1, new Hash(
            'contents', 'velg',
	         'type', 'js',
	         'uri', "addOpt('gender','n','neuter')"
	      ),
	      2, new Hash(
            'contents', 'utelukk',
	         'type', 'js',
	         'uri', "addOpt('gender','!n','!neuter')"
	      )
	   ),
	  20, new Hash(
         'contents', '<br><center><b>NUMBER</b></center>'
         ),
	    21, new Hash(
         'contents', 'singular',
	      'type', 'js',
	      'uri', "addOpt('number','sg','singular')"
,
       1, new Hash(
            'contents', 'velg',
	         'type', 'js',
	         'uri', "addOpt('number','sg','singular')"
	      ),
	      2, new Hash(
            'contents', 'utelukk',
	         'type', 'js',
	         'uri', "addOpt('number','!sg','!singular')"
	      )
	   ),
	    22, new Hash(
         'contents', 'singular og plural',
	      'type', 'js',
	      'uri', "addOpt('number','sg/pl','singular og plural')"
,
       1, new Hash(
            'contents', 'velg',
	         'type', 'js',
	         'uri', "addOpt('number','sg/pl','singular og plural')"
	      ),
	      2, new Hash(
            'contents', 'utelukk',
	         'type', 'js',
	         'uri', "addOpt('number','!sg/pl','!singular og plural')"
	      )
	   ),
	    23, new Hash(
         'contents', 'plural',
	      'type', 'js',
	      'uri', "addOpt('number','pl','plural')"
,
       1, new Hash(
            'contents', 'velg',
	         'type', 'js',
	         'uri', "addOpt('number','pl','plural')"
	      ),
	      2, new Hash(
            'contents', 'utelukk',
	         'type', 'js',
	         'uri', "addOpt('number','!pl','!plural')"
	      )
	   )
),
  	8, new Hash(
       'contents', 'features (nouns) &#187;&nbsp;',
	    1, new Hash(
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
	   ),
	    2, new Hash(
         'contents', 'no inflection',
	      'type', 'js',
	      'uri', "addOpt('type','noconj','no inflection')"
,
       1, new Hash(
            'contents', 'velg',
	         'type', 'js',
	         'uri', "addOpt('type','noconj','no inflection')"
	      ),
	      2, new Hash(
            'contents', 'utelukk',
	         'type', 'js',
	         'uri', "addOpt('type','!noconj','!no inflection')"
	      )
	   ),
	    3, new Hash(
         'contents', 'proprer name',
	      'type', 'js',
	      'uri', "addOpt('type','p','proprer name')"
,
       1, new Hash(
            'contents', 'velg',
	         'type', 'js',
	         'uri', "addOpt('type','p','proprer name')"
	      ),
	      2, new Hash(
            'contents', 'utelukk',
	         'type', 'js',
	         'uri', "addOpt('type','!p','!proprer name')"
	      )
	   ),
	  4, new Hash(
         'contents', '<br><center><b>GENDER</b></center>'
         ),
	    5, new Hash(
         'contents', 'feminine',
	      'type', 'js',
	      'uri', "addOpt('gender','f','feminine')"
,
       1, new Hash(
            'contents', 'velg',
	         'type', 'js',
	         'uri', "addOpt('gender','f','feminine')"
	      ),
	      2, new Hash(
            'contents', 'utelukk',
	         'type', 'js',
	         'uri', "addOpt('gender','!f','!feminine')"
	      )
	   ),
	    6, new Hash(
         'contents', 'feminine or masculine',
	      'type', 'js',
	      'uri', "addOpt('gender','m/f','feminine or masculine')"
,
       1, new Hash(
            'contents', 'velg',
	         'type', 'js',
	         'uri', "addOpt('gender','m/f','feminine or masculine')"
	      ),
	      2, new Hash(
            'contents', 'utelukk',
	         'type', 'js',
	         'uri', "addOpt('gender','!m/f','!feminine or masculine')"
	      )
	   ),
	    7, new Hash(
         'contents', 'masculine',
	      'type', 'js',
	      'uri', "addOpt('gender','m','masculine')"
,
       1, new Hash(
            'contents', 'velg',
	         'type', 'js',
	         'uri', "addOpt('gender','m','masculine')"
	      ),
	      2, new Hash(
            'contents', 'utelukk',
	         'type', 'js',
	         'uri', "addOpt('gender','!m','!masculine')"
	      )
	   ),
	    8, new Hash(
         'contents', 'neuter',
	      'type', 'js',
	      'uri', "addOpt('gender','n','neuter')"
,
       1, new Hash(
            'contents', 'velg',
	         'type', 'js',
	         'uri', "addOpt('gender','n','neuter')"
	      ),
	      2, new Hash(
            'contents', 'utelukk',
	         'type', 'js',
	         'uri', "addOpt('gender','!n','!neuter')"
	      )
	   ),
	  9, new Hash(
         'contents', '<br><center><b>DEFINITENESS</b></center>'
         ),
	    10, new Hash(
         'contents', 'definite',
	      'type', 'js',
	      'uri', "addOpt('tense~defin','def','definite')"
,
       1, new Hash(
            'contents', 'velg',
	         'type', 'js',
	         'uri', "addOpt('tense~defin','def','definite')"
	      ),
	      2, new Hash(
            'contents', 'utelukk',
	         'type', 'js',
	         'uri', "addOpt('tense~defin','!def','!definite')"
	      )
	   ),
	    11, new Hash(
         'contents', 'definite or indefinite',
	      'type', 'js',
	      'uri', "addOpt('tense~defin','def/indef','definite or indefinite')"
,
       1, new Hash(
            'contents', 'velg',
	         'type', 'js',
	         'uri', "addOpt('tense~defin','def/indef','definite or indefinite')"
	      ),
	      2, new Hash(
            'contents', 'utelukk',
	         'type', 'js',
	         'uri', "addOpt('tense~defin','!def/indef','!definite or indefinite')"
	      )
	   ),
	    12, new Hash(
         'contents', 'indefinite',
	      'type', 'js',
	      'uri', "addOpt('tense~defin','indef','indefinite')"
,
       1, new Hash(
            'contents', 'velg',
	         'type', 'js',
	         'uri', "addOpt('tense~defin','indef','indefinite')"
	      ),
	      2, new Hash(
            'contents', 'utelukk',
	         'type', 'js',
	         'uri', "addOpt('tense~defin','!indef','!indefinite')"
	      )
	   ),
	  13, new Hash(
         'contents', '<br><center><b>NUMBER</b></center>'
         ),
	    14, new Hash(
         'contents', 'plural',
	      'type', 'js',
	      'uri', "addOpt('number','pl','plural')"
,
       1, new Hash(
            'contents', 'velg',
	         'type', 'js',
	         'uri', "addOpt('number','pl','plural')"
	      ),
	      2, new Hash(
            'contents', 'utelukk',
	         'type', 'js',
	         'uri', "addOpt('number','!pl','!plural')"
	      )
	   ),
	    15, new Hash(
         'contents', 'singular',
	      'type', 'js',
	      'uri', "addOpt('number','sg','singular')"
,
       1, new Hash(
            'contents', 'velg',
	         'type', 'js',
	         'uri', "addOpt('number','sg','singular')"
	      ),
	      2, new Hash(
            'contents', 'utelukk',
	         'type', 'js',
	         'uri', "addOpt('number','!sg','!singular')"
	      )
	   ),
	    16, new Hash(
         'contents', 'singular or plural',
	      'type', 'js',
	      'uri', "addOpt('number','sg/pl','singular or plural')"
,
       1, new Hash(
            'contents', 'velg',
	         'type', 'js',
	         'uri', "addOpt('number','sg/pl','singular or plural')"
	      ),
	      2, new Hash(
            'contents', 'utelukk',
	         'type', 'js',
	         'uri', "addOpt('number','!sg/pl','!singular or plural')"
	      )
	   )
),
  	9, new Hash(
       'contents', 'features (adjective)  &#187;&nbsp;',
	  1, new Hash(
         'contents', '<br><center><b>DEGREE</b></center>'
         ),
	    2, new Hash(
         'contents', 'comparative',
	      'type', 'js',
	      'uri', "addOpt('degr~dia','comp','comparative')"
,
       1, new Hash(
            'contents', 'velg',
	         'type', 'js',
	         'uri', "addOpt('degr~dia','comp','comparative')"
	      ),
	      2, new Hash(
            'contents', 'utelukk',
	         'type', 'js',
	         'uri', "addOpt('degr~dia','!comp','!comparative')"
	      )
	   ),
	    3, new Hash(
         'contents', 'positive',
	      'type', 'js',
	      'uri', "addOpt('degr~dia','pos','positive')"
,
       1, new Hash(
            'contents', 'velg',
	         'type', 'js',
	         'uri', "addOpt('degr~dia','pos','positive')"
	      ),
	      2, new Hash(
            'contents', 'utelukk',
	         'type', 'js',
	         'uri', "addOpt('degr~dia','!pos','!positive')"
	      )
	   ),
	    4, new Hash(
         'contents', 'superlative',
	      'type', 'js',
	      'uri', "addOpt('degr~dia','sup','superlative')"
,
       1, new Hash(
            'contents', 'velg',
	         'type', 'js',
	         'uri', "addOpt('degr~dia','sup','superlative')"
	      ),
	      2, new Hash(
            'contents', 'utelukk',
	         'type', 'js',
	         'uri', "addOpt('degr~dia','!sup','!superlative')"
	      )
	   ),
	  5, new Hash(
         'contents', '<br><center><b>GENDER</b></center>'
         ),
	    6, new Hash(
         'contents', 'feminine',
	      'type', 'js',
	      'uri', "addOpt('gender','f','feminine')"
,
       1, new Hash(
            'contents', 'velg',
	         'type', 'js',
	         'uri', "addOpt('gender','f','feminine')"
	      ),
	      2, new Hash(
            'contents', 'utelukk',
	         'type', 'js',
	         'uri', "addOpt('gender','!f','!feminine')"
	      )
	   ),
	    7, new Hash(
         'contents', 'feminine or masculine',
	      'type', 'js',
	      'uri', "addOpt('gender','m/f','feminine or masculine')"
,
       1, new Hash(
            'contents', 'velg',
	         'type', 'js',
	         'uri', "addOpt('gender','m/f','feminine or masculine')"
	      ),
	      2, new Hash(
            'contents', 'utelukk',
	         'type', 'js',
	         'uri', "addOpt('gender','!m/f','!feminine or masculine')"
	      )
	   ),
	    8, new Hash(
         'contents', 'masculine',
	      'type', 'js',
	      'uri', "addOpt('gender','m','masculine')"
,
       1, new Hash(
            'contents', 'velg',
	         'type', 'js',
	         'uri', "addOpt('gender','m','masculine')"
	      ),
	      2, new Hash(
            'contents', 'utelukk',
	         'type', 'js',
	         'uri', "addOpt('gender','!m','!masculine')"
	      )
	   ),
	    9, new Hash(
         'contents', 'neuter',
	      'type', 'js',
	      'uri', "addOpt('gender','n','neuter')"
,
       1, new Hash(
            'contents', 'velg',
	         'type', 'js',
	         'uri', "addOpt('gender','n','neuter')"
	      ),
	      2, new Hash(
            'contents', 'utelukk',
	         'type', 'js',
	         'uri', "addOpt('gender','!n','!neuter')"
	      )
	   )
),
  	10, new Hash(
       'contents', 'features (determiner) &#187;&nbsp;',
	    1, new Hash(
         'contents', 'amplifying',
	      'type', 'js',
	      'uri', "addOpt('     type','emph','amplifying')"
,
       1, new Hash(
            'contents', 'velg',
	         'type', 'js',
	         'uri', "addOpt('     type','emph','amplifying')"
	      ),
	      2, new Hash(
            'contents', 'utelukk',
	         'type', 'js',
	         'uri', "addOpt('     type','!emph','!amplifying')"
	      )
	   ),
	    2, new Hash(
         'contents', 'demonstrative',
	      'type', 'js',
	      'uri', "addOpt('     type','dem','demonstrative')"
,
       1, new Hash(
            'contents', 'velg',
	         'type', 'js',
	         'uri', "addOpt('     type','dem','demonstrative')"
	      ),
	      2, new Hash(
            'contents', 'utelukk',
	         'type', 'js',
	         'uri', "addOpt('     type','!dem','!demonstrative')"
	      )
	   ),
	    3, new Hash(
         'contents', 'polite',
	      'type', 'js',
	      'uri', "addOpt('     type','polite','polite')"
,
       1, new Hash(
            'contents', 'velg',
	         'type', 'js',
	         'uri', "addOpt('     type','polite','polite')"
	      ),
	      2, new Hash(
            'contents', 'utelukk',
	         'type', 'js',
	         'uri', "addOpt('     type','!polite','!polite')"
	      )
	   ),
	    4, new Hash(
         'contents', 'possesive',
	      'type', 'js',
	      'uri', "addOpt('     type','poss','possesive')"
,
       1, new Hash(
            'contents', 'velg',
	         'type', 'js',
	         'uri', "addOpt('     type','poss','possesive')"
	      ),
	      2, new Hash(
            'contents', 'utelukk',
	         'type', 'js',
	         'uri', "addOpt('     type','!poss','!possesive')"
	      )
	   ),
	    5, new Hash(
         'contents', 'quantifier',
	      'type', 'js',
	      'uri', "addOpt('     type','quant','quantifier')"
,
       1, new Hash(
            'contents', 'velg',
	         'type', 'js',
	         'uri', "addOpt('     type','quant','quantifier')"
	      ),
	      2, new Hash(
            'contents', 'utelukk',
	         'type', 'js',
	         'uri', "addOpt('     type','!quant','!quantifier')"
	      )
	   ),
	    6, new Hash(
         'contents', 'question',
	      'type', 'js',
	      'uri', "addOpt('     type','question','question')"
,
       1, new Hash(
            'contents', 'velg',
	         'type', 'js',
	         'uri', "addOpt('     type','question','question')"
	      ),
	      2, new Hash(
            'contents', 'utelukk',
	         'type', 'js',
	         'uri', "addOpt('     type','!question','!question')"
	      )
	   ),
	    7, new Hash(
         'contents', 'roman numeral',
	      'type', 'js',
	      'uri', "addOpt('     type','roman~num','roman numeral')"
,
       1, new Hash(
            'contents', 'velg',
	         'type', 'js',
	         'uri', "addOpt('     type','roman~num','roman numeral')"
	      ),
	      2, new Hash(
            'contents', 'utelukk',
	         'type', 'js',
	         'uri', "addOpt('     type','!roman~num','!roman numeral')"
	      )
	   )
),
  	11, new Hash(
       'contents', 'features (verb) &#187;&nbsp;',
	    1, new Hash(
         'contents', 'imperative',
	      'type', 'js',
	      'uri', "addOpt('mood~case','imp','imperative')"
,
       1, new Hash(
            'contents', 'velg',
	         'type', 'js',
	         'uri', "addOpt('mood~case','imp','imperative')"
	      ),
	      2, new Hash(
            'contents', 'utelukk',
	         'type', 'js',
	         'uri', "addOpt('mood~case','!imp','!imperative')"
	      )
	   ),
	    2, new Hash(
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
	    3, new Hash(
         'contents', 'no inflection',
	      'type', 'js',
	      'uri', "addOpt('type','noconj','no inflection')"
,
       1, new Hash(
            'contents', 'velg',
	         'type', 'js',
	         'uri', "addOpt('type','noconj','no inflection')"
	      ),
	      2, new Hash(
            'contents', 'utelukk',
	         'type', 'js',
	         'uri', "addOpt('type','!noconj','!no inflection')"
	      )
	   ),
	    4, new Hash(
         'contents', 'passive',
	      'type', 'js',
	      'uri', "addOpt('degr~dia','pass','passive')"
,
       1, new Hash(
            'contents', 'velg',
	         'type', 'js',
	         'uri', "addOpt('degr~dia','pass','passive')"
	      ),
	      2, new Hash(
            'contents', 'utelukk',
	         'type', 'js',
	         'uri', "addOpt('degr~dia','!pass','!passive')"
	      )
	   ),
	    5, new Hash(
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
	    6, new Hash(
         'contents', 'perfect participle',
	      'type', 'js',
	      'uri', "addOpt('type','perf~part~v','perfect participle')"
,
       1, new Hash(
            'contents', 'velg',
	         'type', 'js',
	         'uri', "addOpt('type','perf~part~v','perfect participle')"
	      ),
	      2, new Hash(
            'contents', 'utelukk',
	         'type', 'js',
	         'uri', "addOpt('type','!perf~part~v','!perfect participle')"
	      )
	   ),
	    7, new Hash(
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
	   )
) ));
}