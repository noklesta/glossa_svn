var Menu;
function reloadMenuNota() {
Menu['NOTA2'] = new Hash(     1, new Hash(
        'contents', '<nobr>&nbsp;valg &#187;&nbsp;</nobr>',
  	1, new Hash(
       'contents', 'ord &#187;&nbsp;',
	    1, new Hash(
         'contents', 'grunnform',
	      'type', 'js',
	      'uri', "addOpt('w','lemma','grunnform')"
	   ),
	    2, new Hash(
         'contents', 'midten av ordet',
	      'type', 'js',
	      'uri', "addOpt('w','middle','midten av ordet')"
	   ),
	    3, new Hash(
         'contents', 'skill store/små bokst.',
	      'type', 'js',
	      'uri', "addOpt('w','case','skill store/små bokst.')"
	   ),
	    4, new Hash(
         'contents', 'slutten av ordet',
	      'type', 'js',
	      'uri', "addOpt('w','end','slutten av ordet')"
	   ),
	    5, new Hash(
         'contents', 'starten av ordet',
	      'type', 'js',
	      'uri', "addOpt('w','start','starten av ordet')"
	   ),
	    6, new Hash(
         'contents', 'utelukk',
	      'type', 'js',
	      'uri', "addOpt('w','neg','utelukk')"
	   )
),
  	2, new Hash(
       'contents', 'forekomster &#187;&nbsp;',
	    1, new Hash(
         'contents', 'en eller flere',
	      'type', 'js',
	      'uri', "addOpt('occ','+','en eller flere')"
,
       1, new Hash(
            'contents', 'velg',
	         'type', 'js',
	         'uri', "addOpt('occ','+','en eller flere')"
	      ),
	      2, new Hash(
            'contents', 'utelukk',
	         'type', 'js',
	         'uri', "addOpt('occ','!+','!en eller flere')"
	      )
	   ),
	    2, new Hash(
         'contents', 'null eller én',
	      'type', 'js',
	      'uri', "addOpt('occ','?','null eller én')"
,
       1, new Hash(
            'contents', 'velg',
	         'type', 'js',
	         'uri', "addOpt('occ','?','null eller én')"
	      ),
	      2, new Hash(
            'contents', 'utelukk',
	         'type', 'js',
	         'uri', "addOpt('occ','!?','!null eller én')"
	      )
	   ),
	    3, new Hash(
         'contents', 'null eller flere',
	      'type', 'js',
	      'uri', "addOpt('occ','*','null eller flere')"
,
       1, new Hash(
            'contents', 'velg',
	         'type', 'js',
	         'uri', "addOpt('occ','*','null eller flere')"
	      ),
	      2, new Hash(
            'contents', 'utelukk',
	         'type', 'js',
	         'uri', "addOpt('occ','!*','!null eller flere')"
	      )
	   )
),
	  3, new Hash(
         'contents', '<br>'
         ),
  	4, new Hash(
       'contents', 'ordklasse &#187;&nbsp;',
	    1, new Hash(
         'contents', 'adjektive',
	      'type', 'js',
	      'uri', "addOpt('ordkl','adj','adjektive')"
,
       1, new Hash(
            'contents', 'velg',
	         'type', 'js',
	         'uri', "addOpt('ordkl','adj','adjektive')"
	      ),
	      2, new Hash(
            'contents', 'utelukk',
	         'type', 'js',
	         'uri', "addOpt('ordkl','!adj','!adjektive')"
	      )
	   ),
	    2, new Hash(
         'contents', 'adverb',
	      'type', 'js',
	      'uri', "addOpt('ordkl','adv','adverb')"
,
       1, new Hash(
            'contents', 'velg',
	         'type', 'js',
	         'uri', "addOpt('ordkl','adv','adverb')"
	      ),
	      2, new Hash(
            'contents', 'utelukk',
	         'type', 'js',
	         'uri', "addOpt('ordkl','!adv','!adverb')"
	      )
	   ),
	    3, new Hash(
         'contents', 'determinativ',
	      'type', 'js',
	      'uri', "addOpt('ordkl','det','determinativ')"
,
       1, new Hash(
            'contents', 'velg',
	         'type', 'js',
	         'uri', "addOpt('ordkl','det','determinativ')"
	      ),
	      2, new Hash(
            'contents', 'utelukk',
	         'type', 'js',
	         'uri', "addOpt('ordkl','!det','!determinativ')"
	      )
	   ),
	    4, new Hash(
         'contents', 'infinitivsmerke',
	      'type', 'js',
	      'uri', "addOpt('ordkl','infmerke','infinitivsmerke')"
,
       1, new Hash(
            'contents', 'velg',
	         'type', 'js',
	         'uri', "addOpt('ordkl','infmerke','infinitivsmerke')"
	      ),
	      2, new Hash(
            'contents', 'utelukk',
	         'type', 'js',
	         'uri', "addOpt('ordkl','!infmerke','!infinitivsmerke')"
	      )
	   ),
	    5, new Hash(
         'contents', 'interjeksjon',
	      'type', 'js',
	      'uri', "addOpt('ordkl','interj','interjeksjon')"
,
       1, new Hash(
            'contents', 'velg',
	         'type', 'js',
	         'uri', "addOpt('ordkl','interj','interjeksjon')"
	      ),
	      2, new Hash(
            'contents', 'utelukk',
	         'type', 'js',
	         'uri', "addOpt('ordkl','!interj','!interjeksjon')"
	      )
	   ),
	    6, new Hash(
         'contents', 'konjunksjon',
	      'type', 'js',
	      'uri', "addOpt('ordkl','konj','konjunksjon')"
,
       1, new Hash(
            'contents', 'velg',
	         'type', 'js',
	         'uri', "addOpt('ordkl','konj','konjunksjon')"
	      ),
	      2, new Hash(
            'contents', 'utelukk',
	         'type', 'js',
	         'uri', "addOpt('ordkl','!konj','!konjunksjon')"
	      )
	   ),
	    7, new Hash(
         'contents', 'preposisjon',
	      'type', 'js',
	      'uri', "addOpt('ordkl','prep','preposisjon')"
,
       1, new Hash(
            'contents', 'velg',
	         'type', 'js',
	         'uri', "addOpt('ordkl','prep','preposisjon')"
	      ),
	      2, new Hash(
            'contents', 'utelukk',
	         'type', 'js',
	         'uri', "addOpt('ordkl','!prep','!preposisjon')"
	      )
	   ),
	    8, new Hash(
         'contents', 'pronomen',
	      'type', 'js',
	      'uri', "addOpt('ordkl','pron','pronomen')"
,
       1, new Hash(
            'contents', 'velg',
	         'type', 'js',
	         'uri', "addOpt('ordkl','pron','pronomen')"
	      ),
	      2, new Hash(
            'contents', 'utelukk',
	         'type', 'js',
	         'uri', "addOpt('ordkl','!pron','!pronomen')"
	      )
	   ),
	    9, new Hash(
         'contents', 'subjunksjon',
	      'type', 'js',
	      'uri', "addOpt('ordkl','sbu','subjunksjon')"
,
       1, new Hash(
            'contents', 'velg',
	         'type', 'js',
	         'uri', "addOpt('ordkl','sbu','subjunksjon')"
	      ),
	      2, new Hash(
            'contents', 'utelukk',
	         'type', 'js',
	         'uri', "addOpt('ordkl','!sbu','!subjunksjon')"
	      )
	   ),
	    10, new Hash(
         'contents', 'substantiv',
	      'type', 'js',
	      'uri', "addOpt('ordkl','s','substantiv')"
,
       1, new Hash(
            'contents', 'velg',
	         'type', 'js',
	         'uri', "addOpt('ordkl','s','substantiv')"
	      ),
	      2, new Hash(
            'contents', 'utelukk',
	         'type', 'js',
	         'uri', "addOpt('ordkl','!s','!substantiv')"
	      )
	   ),
	    11, new Hash(
         'contents', 'tegnsetting',
	      'type', 'js',
	      'uri', "addOpt('ordkl','punkt','tegnsetting')"
,
       1, new Hash(
            'contents', 'velg',
	         'type', 'js',
	         'uri', "addOpt('ordkl','punkt','tegnsetting')"
	      ),
	      2, new Hash(
            'contents', 'utelukk',
	         'type', 'js',
	         'uri', "addOpt('ordkl','!punkt','!tegnsetting')"
	      )
	   ),
	    12, new Hash(
         'contents', 'ukjent',
	      'type', 'js',
	      'uri', "addOpt('ordkl','ukjent','ukjent')"
,
       1, new Hash(
            'contents', 'velg',
	         'type', 'js',
	         'uri', "addOpt('ordkl','ukjent','ukjent')"
	      ),
	      2, new Hash(
            'contents', 'utelukk',
	         'type', 'js',
	         'uri', "addOpt('ordkl','!ukjent','!ukjent')"
	      )
	   ),
	    13, new Hash(
         'contents', 'verb',
	      'type', 'js',
	      'uri', "addOpt('ordkl','v','verb')"
,
       1, new Hash(
            'contents', 'velg',
	         'type', 'js',
	         'uri', "addOpt('ordkl','v','verb')"
	      ),
	      2, new Hash(
            'contents', 'utelukk',
	         'type', 'js',
	         'uri', "addOpt('ordkl','!v','!verb')"
	      )
	   )
),
  	5, new Hash(
       'contents', 'tegnsetting &#187;&nbsp;',
	    1, new Hash(
         'contents', 'anførselstegn',
	      'type', 'js',
	      'uri', "addOpt('type','anf','anførselstegn')"
,
       1, new Hash(
            'contents', 'velg',
	         'type', 'js',
	         'uri', "addOpt('type','anf','anførselstegn')"
	      ),
	      2, new Hash(
            'contents', 'utelukk',
	         'type', 'js',
	         'uri', "addOpt('type','!anf','!anførselstegn')"
	      )
	   ),
	    2, new Hash(
         'contents', 'ellipse',
	      'type', 'js',
	      'uri', "addOpt('type','ellipse','ellipse')"
,
       1, new Hash(
            'contents', 'velg',
	         'type', 'js',
	         'uri', "addOpt('type','ellipse','ellipse')"
	      ),
	      2, new Hash(
            'contents', 'utelukk',
	         'type', 'js',
	         'uri', "addOpt('type','!ellipse','!ellipse')"
	      )
	   ),
	    3, new Hash(
         'contents', 'høyreparentes',
	      'type', 'js',
	      'uri', "addOpt('type','par-s','høyreparentes')"
,
       1, new Hash(
            'contents', 'velg',
	         'type', 'js',
	         'uri', "addOpt('type','par-s','høyreparentes')"
	      ),
	      2, new Hash(
            'contents', 'utelukk',
	         'type', 'js',
	         'uri', "addOpt('type','!par-s','!høyreparentes')"
	      )
	   ),
	    4, new Hash(
         'contents', 'kolon',
	      'type', 'js',
	      'uri', "addOpt('type','kolon','kolon')"
,
       1, new Hash(
            'contents', 'velg',
	         'type', 'js',
	         'uri', "addOpt('type','kolon','kolon')"
	      ),
	      2, new Hash(
            'contents', 'utelukk',
	         'type', 'js',
	         'uri', "addOpt('type','!kolon','!kolon')"
	      )
	   ),
	    5, new Hash(
         'contents', 'komma',
	      'type', 'js',
	      'uri', "addOpt('type','komma','komma')"
,
       1, new Hash(
            'contents', 'velg',
	         'type', 'js',
	         'uri', "addOpt('type','komma','komma')"
	      ),
	      2, new Hash(
            'contents', 'utelukk',
	         'type', 'js',
	         'uri', "addOpt('type','!komma','!komma')"
	      )
	   ),
	    6, new Hash(
         'contents', 'punktum',
	      'type', 'js',
	      'uri', "addOpt('type','punktum','punktum')"
,
       1, new Hash(
            'contents', 'velg',
	         'type', 'js',
	         'uri', "addOpt('type','punktum','punktum')"
	      ),
	      2, new Hash(
            'contents', 'utelukk',
	         'type', 'js',
	         'uri', "addOpt('type','!punktum','!punktum')"
	      )
	   ),
	    7, new Hash(
         'contents', 'semikolon',
	      'type', 'js',
	      'uri', "addOpt('type','semikolon','semikolon')"
,
       1, new Hash(
            'contents', 'velg',
	         'type', 'js',
	         'uri', "addOpt('type','semikolon','semikolon')"
	      ),
	      2, new Hash(
            'contents', 'utelukk',
	         'type', 'js',
	         'uri', "addOpt('type','!semikolon','!semikolon')"
	      )
	   ),
	    8, new Hash(
         'contents', 'spørsmålstegn',
	      'type', 'js',
	      'uri', "addOpt('type','spm','spørsmålstegn')"
,
       1, new Hash(
            'contents', 'velg',
	         'type', 'js',
	         'uri', "addOpt('type','spm','spørsmålstegn')"
	      ),
	      2, new Hash(
            'contents', 'utelukk',
	         'type', 'js',
	         'uri', "addOpt('type','!spm','!spørsmålstegn')"
	      )
	   ),
	    9, new Hash(
         'contents', 'strek',
	      'type', 'js',
	      'uri', "addOpt('type','strek','strek')"
,
       1, new Hash(
            'contents', 'velg',
	         'type', 'js',
	         'uri', "addOpt('type','strek','strek')"
	      ),
	      2, new Hash(
            'contents', 'utelukk',
	         'type', 'js',
	         'uri', "addOpt('type','!strek','!strek')"
	      )
	   ),
	    10, new Hash(
         'contents', 'utropstegn',
	      'type', 'js',
	      'uri', "addOpt('type','utrop','utropstegn')"
,
       1, new Hash(
            'contents', 'velg',
	         'type', 'js',
	         'uri', "addOpt('type','utrop','utropstegn')"
	      ),
	      2, new Hash(
            'contents', 'utelukk',
	         'type', 'js',
	         'uri', "addOpt('type','!utrop','!utropstegn')"
	      )
	   ),
	    11, new Hash(
         'contents', 'venstreparentes',
	      'type', 'js',
	      'uri', "addOpt('type','par-b','venstreparentes')"
,
       1, new Hash(
            'contents', 'velg',
	         'type', 'js',
	         'uri', "addOpt('type','par-b','venstreparentes')"
	      ),
	      2, new Hash(
            'contents', 'utelukk',
	         'type', 'js',
	         'uri', "addOpt('type','!par-b','!venstreparentes')"
	      )
	   )
),
	  6, new Hash(
         'contents', '<br>'
         ),
  	7, new Hash(
       'contents', 'trekk (pronomen) &#187;&nbsp;',
	  1, new Hash(
         'contents', '<br><center><b>KASUS</b></center>'
         ),
	  2, new Hash(
         'contents', '<br><center><b>PERSON</b></center>'
         ),
	    3, new Hash(
         'contents', '',
	      'type', 'js',
	      'uri', "addOpt('pron','<kjønn>','')"
,
       1, new Hash(
            'contents', 'velg',
	         'type', 'js',
	         'uri', "addOpt('pron','<kjønn>','')"
	      ),
	      2, new Hash(
            'contents', 'utelukk',
	         'type', 'js',
	         'uri', "addOpt('pron','!<kjønn>','!')"
	      )
	   ),
	  4, new Hash(
         'contents', '<br><center><b>TALL</b></center>'
         ),
	    5, new Hash(
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
	    6, new Hash(
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
	    7, new Hash(
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
	    8, new Hash(
         'contents', 'akkusativ',
	      'type', 'js',
	      'uri', "addOpt('modus~kasus','akk','akkusativ')"
,
       1, new Hash(
            'contents', 'velg',
	         'type', 'js',
	         'uri', "addOpt('modus~kasus','akk','akkusativ')"
	      ),
	      2, new Hash(
            'contents', 'utelukk',
	         'type', 'js',
	         'uri', "addOpt('modus~kasus','!akk','!akkusativ')"
	      )
	   ),
	    9, new Hash(
         'contents', 'entall',
	      'type', 'js',
	      'uri', "addOpt('tall','ent','entall')"
,
       1, new Hash(
            'contents', 'velg',
	         'type', 'js',
	         'uri', "addOpt('tall','ent','entall')"
	      ),
	      2, new Hash(
            'contents', 'utelukk',
	         'type', 'js',
	         'uri', "addOpt('tall','!ent','!entall')"
	      )
	   ),
	    10, new Hash(
         'contents', 'entall eller flertall',
	      'type', 'js',
	      'uri', "addOpt('tall','ent/fl','entall eller flertall')"
,
       1, new Hash(
            'contents', 'velg',
	         'type', 'js',
	         'uri', "addOpt('tall','ent/fl','entall eller flertall')"
	      ),
	      2, new Hash(
            'contents', 'utelukk',
	         'type', 'js',
	         'uri', "addOpt('tall','!ent/fl','!entall eller flertall')"
	      )
	   ),
	    11, new Hash(
         'contents', 'feminin ',
	      'type', 'js',
	      'uri', "addOpt('kjonn','f','feminin ')"
,
       1, new Hash(
            'contents', 'velg',
	         'type', 'js',
	         'uri', "addOpt('kjonn','f','feminin ')"
	      ),
	      2, new Hash(
            'contents', 'utelukk',
	         'type', 'js',
	         'uri', "addOpt('kjonn','!f','!feminin ')"
	      )
	   ),
	    12, new Hash(
         'contents', 'feminin eller maskulin',
	      'type', 'js',
	      'uri', "addOpt('kjonn','m/f','feminin eller maskulin')"
,
       1, new Hash(
            'contents', 'velg',
	         'type', 'js',
	         'uri', "addOpt('kjonn','m/f','feminin eller maskulin')"
	      ),
	      2, new Hash(
            'contents', 'utelukk',
	         'type', 'js',
	         'uri', "addOpt('kjonn','!m/f','!feminin eller maskulin')"
	      )
	   ),
	    13, new Hash(
         'contents', 'flertall',
	      'type', 'js',
	      'uri', "addOpt('tall','fl','flertall')"
,
       1, new Hash(
            'contents', 'velg',
	         'type', 'js',
	         'uri', "addOpt('tall','fl','flertall')"
	      ),
	      2, new Hash(
            'contents', 'utelukk',
	         'type', 'js',
	         'uri', "addOpt('tall','!fl','!flertall')"
	      )
	   ),
	    14, new Hash(
         'contents', 'genitiv',
	      'type', 'js',
	      'uri', "addOpt('modus~kasus','gen','genitiv')"
,
       1, new Hash(
            'contents', 'velg',
	         'type', 'js',
	         'uri', "addOpt('modus~kasus','gen','genitiv')"
	      ),
	      2, new Hash(
            'contents', 'utelukk',
	         'type', 'js',
	         'uri', "addOpt('modus~kasus','!gen','!genitiv')"
	      )
	   ),
	    15, new Hash(
         'contents', 'høflig',
	      'type', 'js',
	      'uri', "addOpt('type','hfl','høflig')"
,
       1, new Hash(
            'contents', 'velg',
	         'type', 'js',
	         'uri', "addOpt('type','hfl','høflig')"
	      ),
	      2, new Hash(
            'contents', 'utelukk',
	         'type', 'js',
	         'uri', "addOpt('type','!hfl','!høflig')"
	      )
	   ),
	    16, new Hash(
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
	    17, new Hash(
         'contents', 'maskulin',
	      'type', 'js',
	      'uri', "addOpt('kjonn','m','maskulin')"
,
       1, new Hash(
            'contents', 'velg',
	         'type', 'js',
	         'uri', "addOpt('kjonn','m','maskulin')"
	      ),
	      2, new Hash(
            'contents', 'utelukk',
	         'type', 'js',
	         'uri', "addOpt('kjonn','!m','!maskulin')"
	      )
	   ),
	    18, new Hash(
         'contents', 'nøytrum',
	      'type', 'js',
	      'uri', "addOpt('kjonn','n','nøytrum')"
,
       1, new Hash(
            'contents', 'velg',
	         'type', 'js',
	         'uri', "addOpt('kjonn','n','nøytrum')"
	      ),
	      2, new Hash(
            'contents', 'utelukk',
	         'type', 'js',
	         'uri', "addOpt('kjonn','!n','!nøytrum')"
	      )
	   ),
	    19, new Hash(
         'contents', 'nominativ',
	      'type', 'js',
	      'uri', "addOpt('modus~kasus','nom','nominativ')"
,
       1, new Hash(
            'contents', 'velg',
	         'type', 'js',
	         'uri', "addOpt('modus~kasus','nom','nominativ')"
	      ),
	      2, new Hash(
            'contents', 'utelukk',
	         'type', 'js',
	         'uri', "addOpt('modus~kasus','!nom','!nominativ')"
	      )
	   ),
	    20, new Hash(
         'contents', 'personlig',
	      'type', 'js',
	      'uri', "addOpt('type','pers','personlig')"
,
       1, new Hash(
            'contents', 'velg',
	         'type', 'js',
	         'uri', "addOpt('type','pers','personlig')"
	      ),
	      2, new Hash(
            'contents', 'utelukk',
	         'type', 'js',
	         'uri', "addOpt('type','!pers','!personlig')"
	      )
	   ),
	    21, new Hash(
         'contents', 'refleksiv',
	      'type', 'js',
	      'uri', "addOpt('type','refl','refleksiv')"
,
       1, new Hash(
            'contents', 'velg',
	         'type', 'js',
	         'uri', "addOpt('type','refl','refleksiv')"
	      ),
	      2, new Hash(
            'contents', 'utelukk',
	         'type', 'js',
	         'uri', "addOpt('type','!refl','!refleksiv')"
	      )
	   ),
	    22, new Hash(
         'contents', 'resiprok',
	      'type', 'js',
	      'uri', "addOpt('type','resip','resiprok')"
,
       1, new Hash(
            'contents', 'velg',
	         'type', 'js',
	         'uri', "addOpt('type','resip','resiprok')"
	      ),
	      2, new Hash(
            'contents', 'utelukk',
	         'type', 'js',
	         'uri', "addOpt('type','!resip','!resiprok')"
	      )
	   ),
	    23, new Hash(
         'contents', 'spørrende',
	      'type', 'js',
	      'uri', "addOpt('type','spm','spørrende')"
,
       1, new Hash(
            'contents', 'velg',
	         'type', 'js',
	         'uri', "addOpt('type','spm','spørrende')"
	      ),
	      2, new Hash(
            'contents', 'utelukk',
	         'type', 'js',
	         'uri', "addOpt('type','!spm','!spørrende')"
	      )
	   )
),
  	8, new Hash(
       'contents', 'trekk (adjektiv)  &#187;&nbsp;',
	    1, new Hash(
         'contents', '',
	      'type', 'js',
	      'uri', "addOpt('adj','<kjønn>','')"
,
       1, new Hash(
            'contents', 'velg',
	         'type', 'js',
	         'uri', "addOpt('adj','<kjønn>','')"
	      ),
	      2, new Hash(
            'contents', 'utelukk',
	         'type', 'js',
	         'uri', "addOpt('adj','!<kjønn>','!')"
	      )
	   ),
	  2, new Hash(
         'contents', '<br><center><b>BESTEMTHET</b></center>'
         ),
	  3, new Hash(
         'contents', '<br><center><b>TALL</b></center>'
         ),
	  4, new Hash(
         'contents', '<br><center><b>GRAD</b></center>'
         ),
	    5, new Hash(
         'contents', '',
	      'type', 'js',
	      'uri', "addOpt('adj','<kjønn>','')"
,
       1, new Hash(
            'contents', 'velg',
	         'type', 'js',
	         'uri', "addOpt('adj','<kjønn>','')"
	      ),
	      2, new Hash(
            'contents', 'utelukk',
	         'type', 'js',
	         'uri', "addOpt('adj','!<kjønn>','!')"
	      )
	   ),
	    6, new Hash(
         'contents', 'appellativ',
	      'type', 'js',
	      'uri', "addOpt('type','a','appellativ')"
,
       1, new Hash(
            'contents', 'velg',
	         'type', 'js',
	         'uri', "addOpt('type','a','appellativ')"
	      ),
	      2, new Hash(
            'contents', 'utelukk',
	         'type', 'js',
	         'uri', "addOpt('type','!a','!appellativ')"
	      )
	   ),
	    7, new Hash(
         'contents', 'bestemt',
	      'type', 'js',
	      'uri', "addOpt('tid~bestemthet','be','bestemt')"
,
       1, new Hash(
            'contents', 'velg',
	         'type', 'js',
	         'uri', "addOpt('tid~bestemthet','be','bestemt')"
	      ),
	      2, new Hash(
            'contents', 'utelukk',
	         'type', 'js',
	         'uri', "addOpt('tid~bestemthet','!be','!bestemt')"
	      )
	   ),
	    8, new Hash(
         'contents', 'bestemt eller ubestemt',
	      'type', 'js',
	      'uri', "addOpt('tid~bestemthet','be/ub','bestemt eller ubestemt')"
,
       1, new Hash(
            'contents', 'velg',
	         'type', 'js',
	         'uri', "addOpt('tid~bestemthet','be/ub','bestemt eller ubestemt')"
	      ),
	      2, new Hash(
            'contents', 'utelukk',
	         'type', 'js',
	         'uri', "addOpt('tid~bestemthet','!be/ub','!bestemt eller ubestemt')"
	      )
	   ),
	    9, new Hash(
         'contents', 'entall',
	      'type', 'js',
	      'uri', "addOpt('tall','ent','entall')"
,
       1, new Hash(
            'contents', 'velg',
	         'type', 'js',
	         'uri', "addOpt('tall','ent','entall')"
	      ),
	      2, new Hash(
            'contents', 'utelukk',
	         'type', 'js',
	         'uri', "addOpt('tall','!ent','!entall')"
	      )
	   ),
	    10, new Hash(
         'contents', 'entall eller flertall',
	      'type', 'js',
	      'uri', "addOpt('tall','ent/fl','entall eller flertall')"
,
       1, new Hash(
            'contents', 'velg',
	         'type', 'js',
	         'uri', "addOpt('tall','ent/fl','entall eller flertall')"
	      ),
	      2, new Hash(
            'contents', 'utelukk',
	         'type', 'js',
	         'uri', "addOpt('tall','!ent/fl','!entall eller flertall')"
	      )
	   ),
	    11, new Hash(
         'contents', 'feminin',
	      'type', 'js',
	      'uri', "addOpt('kjonn','f','feminin')"
,
       1, new Hash(
            'contents', 'velg',
	         'type', 'js',
	         'uri', "addOpt('kjonn','f','feminin')"
	      ),
	      2, new Hash(
            'contents', 'utelukk',
	         'type', 'js',
	         'uri', "addOpt('kjonn','!f','!feminin')"
	      )
	   ),
	    12, new Hash(
         'contents', 'feminin',
	      'type', 'js',
	      'uri', "addOpt('kjonn','f','feminin')"
,
       1, new Hash(
            'contents', 'velg',
	         'type', 'js',
	         'uri', "addOpt('kjonn','f','feminin')"
	      ),
	      2, new Hash(
            'contents', 'utelukk',
	         'type', 'js',
	         'uri', "addOpt('kjonn','!f','!feminin')"
	      )
	   ),
	    13, new Hash(
         'contents', 'feminin eller maskulin',
	      'type', 'js',
	      'uri', "addOpt('kjonn','m/f','feminin eller maskulin')"
,
       1, new Hash(
            'contents', 'velg',
	         'type', 'js',
	         'uri', "addOpt('kjonn','m/f','feminin eller maskulin')"
	      ),
	      2, new Hash(
            'contents', 'utelukk',
	         'type', 'js',
	         'uri', "addOpt('kjonn','!m/f','!feminin eller maskulin')"
	      )
	   ),
	    14, new Hash(
         'contents', 'feminin or maskulin',
	      'type', 'js',
	      'uri', "addOpt('kjonn','m/f','feminin or maskulin')"
,
       1, new Hash(
            'contents', 'velg',
	         'type', 'js',
	         'uri', "addOpt('kjonn','m/f','feminin or maskulin')"
	      ),
	      2, new Hash(
            'contents', 'utelukk',
	         'type', 'js',
	         'uri', "addOpt('kjonn','!m/f','!feminin or maskulin')"
	      )
	   ),
	    15, new Hash(
         'contents', 'flertall',
	      'type', 'js',
	      'uri', "addOpt('tall','fl','flertall')"
,
       1, new Hash(
            'contents', 'velg',
	         'type', 'js',
	         'uri', "addOpt('tall','fl','flertall')"
	      ),
	      2, new Hash(
            'contents', 'utelukk',
	         'type', 'js',
	         'uri', "addOpt('tall','!fl','!flertall')"
	      )
	   ),
	    16, new Hash(
         'contents', 'ingen bøyning',
	      'type', 'js',
	      'uri', "addOpt('type','ubøy','ingen bøyning')"
,
       1, new Hash(
            'contents', 'velg',
	         'type', 'js',
	         'uri', "addOpt('type','ubøy','ingen bøyning')"
	      ),
	      2, new Hash(
            'contents', 'utelukk',
	         'type', 'js',
	         'uri', "addOpt('type','!ubøy','!ingen bøyning')"
	      )
	   ),
	    17, new Hash(
         'contents', 'komparativ',
	      'type', 'js',
	      'uri', "addOpt('grad~dia','komp','komparativ')"
,
       1, new Hash(
            'contents', 'velg',
	         'type', 'js',
	         'uri', "addOpt('grad~dia','komp','komparativ')"
	      ),
	      2, new Hash(
            'contents', 'utelukk',
	         'type', 'js',
	         'uri', "addOpt('grad~dia','!komp','!komparativ')"
	      )
	   ),
	    18, new Hash(
         'contents', 'maskulin',
	      'type', 'js',
	      'uri', "addOpt('kjonn','m','maskulin')"
,
       1, new Hash(
            'contents', 'velg',
	         'type', 'js',
	         'uri', "addOpt('kjonn','m','maskulin')"
	      ),
	      2, new Hash(
            'contents', 'utelukk',
	         'type', 'js',
	         'uri', "addOpt('kjonn','!m','!maskulin')"
	      )
	   ),
	    19, new Hash(
         'contents', 'maskulin',
	      'type', 'js',
	      'uri', "addOpt('kjonn','m','maskulin')"
,
       1, new Hash(
            'contents', 'velg',
	         'type', 'js',
	         'uri', "addOpt('kjonn','m','maskulin')"
	      ),
	      2, new Hash(
            'contents', 'utelukk',
	         'type', 'js',
	         'uri', "addOpt('kjonn','!m','!maskulin')"
	      )
	   ),
	    20, new Hash(
         'contents', 'nøytrum',
	      'type', 'js',
	      'uri', "addOpt('kjonn','n','nøytrum')"
,
       1, new Hash(
            'contents', 'velg',
	         'type', 'js',
	         'uri', "addOpt('kjonn','n','nøytrum')"
	      ),
	      2, new Hash(
            'contents', 'utelukk',
	         'type', 'js',
	         'uri', "addOpt('kjonn','!n','!nøytrum')"
	      )
	   ),
	    21, new Hash(
         'contents', 'nøytrum',
	      'type', 'js',
	      'uri', "addOpt('kjonn','n','nøytrum')"
,
       1, new Hash(
            'contents', 'velg',
	         'type', 'js',
	         'uri', "addOpt('kjonn','n','nøytrum')"
	      ),
	      2, new Hash(
            'contents', 'utelukk',
	         'type', 'js',
	         'uri', "addOpt('kjonn','!n','!nøytrum')"
	      )
	   ),
	    22, new Hash(
         'contents', 'ordenstall',
	      'type', 'js',
	      'uri', "addOpt('type','ordenstall','ordenstall')"
,
       1, new Hash(
            'contents', 'velg',
	         'type', 'js',
	         'uri', "addOpt('type','ordenstall','ordenstall')"
	      ),
	      2, new Hash(
            'contents', 'utelukk',
	         'type', 'js',
	         'uri', "addOpt('type','!ordenstall','!ordenstall')"
	      )
	   ),
	    23, new Hash(
         'contents', 'perfektum partisipp',
	      'type', 'js',
	      'uri', "addOpt('type','perf~part','perfektum partisipp')"
,
       1, new Hash(
            'contents', 'velg',
	         'type', 'js',
	         'uri', "addOpt('type','perf~part','perfektum partisipp')"
	      ),
	      2, new Hash(
            'contents', 'utelukk',
	         'type', 'js',
	         'uri', "addOpt('type','!perf~part','!perfektum partisipp')"
	      )
	   ),
	    24, new Hash(
         'contents', 'positiv',
	      'type', 'js',
	      'uri', "addOpt('grad~dia','pos','positiv')"
,
       1, new Hash(
            'contents', 'velg',
	         'type', 'js',
	         'uri', "addOpt('grad~dia','pos','positiv')"
	      ),
	      2, new Hash(
            'contents', 'utelukk',
	         'type', 'js',
	         'uri', "addOpt('grad~dia','!pos','!positiv')"
	      )
	   ),
	    25, new Hash(
         'contents', 'presens partisipp',
	      'type', 'js',
	      'uri', "addOpt('type','pres~part','presens partisipp')"
,
       1, new Hash(
            'contents', 'velg',
	         'type', 'js',
	         'uri', "addOpt('type','pres~part','presens partisipp')"
	      ),
	      2, new Hash(
            'contents', 'utelukk',
	         'type', 'js',
	         'uri', "addOpt('type','!pres~part','!presens partisipp')"
	      )
	   ),
	    26, new Hash(
         'contents', 'proprium',
	      'type', 'js',
	      'uri', "addOpt('type','p','proprium')"
,
       1, new Hash(
            'contents', 'velg',
	         'type', 'js',
	         'uri', "addOpt('type','p','proprium')"
	      ),
	      2, new Hash(
            'contents', 'utelukk',
	         'type', 'js',
	         'uri', "addOpt('type','!p','!proprium')"
	      )
	   ),
	    27, new Hash(
         'contents', 'superlativ',
	      'type', 'js',
	      'uri', "addOpt('grad~dia','sup','superlativ')"
,
       1, new Hash(
            'contents', 'velg',
	         'type', 'js',
	         'uri', "addOpt('grad~dia','sup','superlativ')"
	      ),
	      2, new Hash(
            'contents', 'utelukk',
	         'type', 'js',
	         'uri', "addOpt('grad~dia','!sup','!superlativ')"
	      )
	   ),
	    28, new Hash(
         'contents', 'trekk (substantiv)',
	      'type', 'js',
	      'uri', "addOpt('grad~dia','# subst ','trekk (substantiv)')"
,
       1, new Hash(
            'contents', 'velg',
	         'type', 'js',
	         'uri', "addOpt('grad~dia','# subst ','trekk (substantiv)')"
	      ),
	      2, new Hash(
            'contents', 'utelukk',
	         'type', 'js',
	         'uri', "addOpt('grad~dia','!# subst ','!trekk (substantiv)')"
	      )
	   ),
	    29, new Hash(
         'contents', 'ubestemt',
	      'type', 'js',
	      'uri', "addOpt('tid~bestemthet','ub','ubestemt')"
,
       1, new Hash(
            'contents', 'velg',
	         'type', 'js',
	         'uri', "addOpt('tid~bestemthet','ub','ubestemt')"
	      ),
	      2, new Hash(
            'contents', 'utelukk',
	         'type', 'js',
	         'uri', "addOpt('tid~bestemthet','!ub','!ubestemt')"
	      )
	   )
),
  	9, new Hash(
       'contents', 'trekk (determinativ) &#187;&nbsp;',
	    1, new Hash(
         'contents', 'demonstrativ',
	      'type', 'js',
	      'uri', "addOpt('type','dem','demonstrativ')"
,
       1, new Hash(
            'contents', 'velg',
	         'type', 'js',
	         'uri', "addOpt('type','dem','demonstrativ')"
	      ),
	      2, new Hash(
            'contents', 'utelukk',
	         'type', 'js',
	         'uri', "addOpt('type','!dem','!demonstrativ')"
	      )
	   ),
	    2, new Hash(
         'contents', 'forsterkende',
	      'type', 'js',
	      'uri', "addOpt('type','forst','forsterkende')"
,
       1, new Hash(
            'contents', 'velg',
	         'type', 'js',
	         'uri', "addOpt('type','forst','forsterkende')"
	      ),
	      2, new Hash(
            'contents', 'utelukk',
	         'type', 'js',
	         'uri', "addOpt('type','!forst','!forsterkende')"
	      )
	   ),
	    3, new Hash(
         'contents', 'høflig',
	      'type', 'js',
	      'uri', "addOpt('type','hfl','høflig')"
,
       1, new Hash(
            'contents', 'velg',
	         'type', 'js',
	         'uri', "addOpt('type','hfl','høflig')"
	      ),
	      2, new Hash(
            'contents', 'utelukk',
	         'type', 'js',
	         'uri', "addOpt('type','!hfl','!høflig')"
	      )
	   ),
	    4, new Hash(
         'contents', 'kvator',
	      'type', 'js',
	      'uri', "addOpt('type','kvant','kvator')"
,
       1, new Hash(
            'contents', 'velg',
	         'type', 'js',
	         'uri', "addOpt('type','kvant','kvator')"
	      ),
	      2, new Hash(
            'contents', 'utelukk',
	         'type', 'js',
	         'uri', "addOpt('type','!kvant','!kvator')"
	      )
	   ),
	    5, new Hash(
         'contents', 'possesiv',
	      'type', 'js',
	      'uri', "addOpt('type','poss','possesiv')"
,
       1, new Hash(
            'contents', 'velg',
	         'type', 'js',
	         'uri', "addOpt('type','poss','possesiv')"
	      ),
	      2, new Hash(
            'contents', 'utelukk',
	         'type', 'js',
	         'uri', "addOpt('type','!poss','!possesiv')"
	      )
	   ),
	    6, new Hash(
         'contents', 'romertall',
	      'type', 'js',
	      'uri', "addOpt('type','romertall','romertall')"
,
       1, new Hash(
            'contents', 'velg',
	         'type', 'js',
	         'uri', "addOpt('type','romertall','romertall')"
	      ),
	      2, new Hash(
            'contents', 'utelukk',
	         'type', 'js',
	         'uri', "addOpt('type','!romertall','!romertall')"
	      )
	   ),
	    7, new Hash(
         'contents', 'spørrende',
	      'type', 'js',
	      'uri', "addOpt('type','spm','spørrende')"
,
       1, new Hash(
            'contents', 'velg',
	         'type', 'js',
	         'uri', "addOpt('type','spm','spørrende')"
	      ),
	      2, new Hash(
            'contents', 'utelukk',
	         'type', 'js',
	         'uri', "addOpt('type','!spm','!spørrende')"
	      )
	   )
),
  	10, new Hash(
       'contents', 'trekk (verb) &#187;&nbsp;',
	    1, new Hash(
         'contents', 'imperativ',
	      'type', 'js',
	      'uri', "addOpt('modus~kasus','imp','imperativ')"
,
       1, new Hash(
            'contents', 'velg',
	         'type', 'js',
	         'uri', "addOpt('modus~kasus','imp','imperativ')"
	      ),
	      2, new Hash(
            'contents', 'utelukk',
	         'type', 'js',
	         'uri', "addOpt('modus~kasus','!imp','!imperativ')"
	      )
	   ),
	    2, new Hash(
         'contents', 'infinitiv',
	      'type', 'js',
	      'uri', "addOpt('tid~bestemethet','inf','infinitiv')"
,
       1, new Hash(
            'contents', 'velg',
	         'type', 'js',
	         'uri', "addOpt('tid~bestemethet','inf','infinitiv')"
	      ),
	      2, new Hash(
            'contents', 'utelukk',
	         'type', 'js',
	         'uri', "addOpt('tid~bestemethet','!inf','!infinitiv')"
	      )
	   ),
	    3, new Hash(
         'contents', 'passiv',
	      'type', 'js',
	      'uri', "addOpt('grad~dia','pass','passiv')"
,
       1, new Hash(
            'contents', 'velg',
	         'type', 'js',
	         'uri', "addOpt('grad~dia','pass','passiv')"
	      ),
	      2, new Hash(
            'contents', 'utelukk',
	         'type', 'js',
	         'uri', "addOpt('grad~dia','!pass','!passiv')"
	      )
	   ),
	    4, new Hash(
         'contents', 'perfektum partisipp',
	      'type', 'js',
	      'uri', "addOpt('type','perf-part','perfektum partisipp')"
,
       1, new Hash(
            'contents', 'velg',
	         'type', 'js',
	         'uri', "addOpt('type','perf-part','perfektum partisipp')"
	      ),
	      2, new Hash(
            'contents', 'utelukk',
	         'type', 'js',
	         'uri', "addOpt('type','!perf-part','!perfektum partisipp')"
	      )
	   ),
	    5, new Hash(
         'contents', 'presens',
	      'type', 'js',
	      'uri', "addOpt('tid~bestemthet','pres','presens')"
,
       1, new Hash(
            'contents', 'velg',
	         'type', 'js',
	         'uri', "addOpt('tid~bestemthet','pres','presens')"
	      ),
	      2, new Hash(
            'contents', 'utelukk',
	         'type', 'js',
	         'uri', "addOpt('tid~bestemthet','!pres','!presens')"
	      )
	   ),
	    6, new Hash(
         'contents', 'preteritum',
	      'type', 'js',
	      'uri', "addOpt('tid~bestemthet','past','preteritum')"
,
       1, new Hash(
            'contents', 'velg',
	         'type', 'js',
	         'uri', "addOpt('tid~bestemthet','past','preteritum')"
	      ),
	      2, new Hash(
            'contents', 'utelukk',
	         'type', 'js',
	         'uri', "addOpt('tid~bestemthet','!past','!preteritum')"
	      )
	   ),
	    7, new Hash(
         'contents', 'ubøyelig',
	      'type', 'js',
	      'uri', "addOpt('type','ubøy','ubøyelig')"
,
       1, new Hash(
            'contents', 'velg',
	         'type', 'js',
	         'uri', "addOpt('type','ubøy','ubøyelig')"
	      ),
	      2, new Hash(
            'contents', 'utelukk',
	         'type', 'js',
	         'uri', "addOpt('type','!ubøy','!ubøyelig')"
	      )
	   )
) ));
}
