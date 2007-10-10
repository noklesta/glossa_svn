var Menu;
function reloadMenuOmc2_po() {
Menu['OMC4_PO'] = new Hash(     1, new Hash(
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
	    6, new Hash(
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
	    7, new Hash(
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
	    8, new Hash(
         'contents', 'prefix',
	      'type', 'js',
	      'uri', "addOpt('pos','pref','prefix')"
,
       1, new Hash(
            'contents', 'velg',
	         'type', 'js',
	         'uri', "addOpt('pos','pref','prefix')"
	      ),
	      2, new Hash(
            'contents', 'utelukk',
	         'type', 'js',
	         'uri', "addOpt('pos','!pref','!prefix')"
	      )
	   ),
	    9, new Hash(
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
	    10, new Hash(
         'contents', 'specifier',
	      'type', 'js',
	      'uri', "addOpt('pos','spec','specifier')"
,
       1, new Hash(
            'contents', 'velg',
	         'type', 'js',
	         'uri', "addOpt('pos','spec','specifier')"
	      ),
	      2, new Hash(
            'contents', 'utelukk',
	         'type', 'js',
	         'uri', "addOpt('pos','!spec','!specifier')"
	      )
	   ),
	    11, new Hash(
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
         'contents', 'finite',
	      'type', 'js',
	      'uri', "addOpt('mood~case','finite','finite')"
,
       1, new Hash(
            'contents', 'velg',
	         'type', 'js',
	         'uri', "addOpt('mood~case','finite','finite')"
	      ),
	      2, new Hash(
            'contents', 'utelukk',
	         'type', 'js',
	         'uri', "addOpt('mood~case','!finite','!finite')"
	      )
	   ),
	    3, new Hash(
         'contents', 'future',
	      'type', 'js',
	      'uri', "addOpt('mood~case','futur','future')"
,
       1, new Hash(
            'contents', 'velg',
	         'type', 'js',
	         'uri', "addOpt('mood~case','futur','future')"
	      ),
	      2, new Hash(
            'contents', 'utelukk',
	         'type', 'js',
	         'uri', "addOpt('mood~case','!futur','!future')"
	      )
	   ),
	    4, new Hash(
         'contents', 'gerund',
	      'type', 'js',
	      'uri', "addOpt('mood~case','gerund','gerund')"
,
       1, new Hash(
            'contents', 'velg',
	         'type', 'js',
	         'uri', "addOpt('mood~case','gerund','gerund')"
	      ),
	      2, new Hash(
            'contents', 'utelukk',
	         'type', 'js',
	         'uri', "addOpt('mood~case','!gerund','!gerund')"
	      )
	   ),
	    5, new Hash(
         'contents', 'imperative',
	      'type', 'js',
	      'uri', "addOpt('mood~case','imper','imperative')"
,
       1, new Hash(
            'contents', 'velg',
	         'type', 'js',
	         'uri', "addOpt('mood~case','imper','imperative')"
	      ),
	      2, new Hash(
            'contents', 'utelukk',
	         'type', 'js',
	         'uri', "addOpt('mood~case','!imper','!imperative')"
	      )
	   ),
	    6, new Hash(
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
	    7, new Hash(
         'contents', 'indicative',
	      'type', 'js',
	      'uri', "addOpt('mood~case','ind','indicative')"
,
       1, new Hash(
            'contents', 'velg',
	         'type', 'js',
	         'uri', "addOpt('mood~case','ind','indicative')"
	      ),
	      2, new Hash(
            'contents', 'utelukk',
	         'type', 'js',
	         'uri', "addOpt('mood~case','!ind','!indicative')"
	      )
	   ),
	    8, new Hash(
         'contents', 'infinite',
	      'type', 'js',
	      'uri', "addOpt('mood~case','infinite','infinite')"
,
       1, new Hash(
            'contents', 'velg',
	         'type', 'js',
	         'uri', "addOpt('mood~case','infinite','infinite')"
	      ),
	      2, new Hash(
            'contents', 'utelukk',
	         'type', 'js',
	         'uri', "addOpt('mood~case','!infinite','!infinite')"
	      )
	   ),
	    9, new Hash(
         'contents', 'participle',
	      'type', 'js',
	      'uri', "addOpt('mood~case','participle','participle')"
,
       1, new Hash(
            'contents', 'velg',
	         'type', 'js',
	         'uri', "addOpt('mood~case','participle','participle')"
	      ),
	      2, new Hash(
            'contents', 'utelukk',
	         'type', 'js',
	         'uri', "addOpt('mood~case','!participle','!participle')"
	      )
	   ),
	    10, new Hash(
         'contents', 'perfect',
	      'type', 'js',
	      'uri', "addOpt('mood~case','perf','perfect')"
,
       1, new Hash(
            'contents', 'velg',
	         'type', 'js',
	         'uri', "addOpt('mood~case','perf','perfect')"
	      ),
	      2, new Hash(
            'contents', 'utelukk',
	         'type', 'js',
	         'uri', "addOpt('mood~case','!perf','!perfect')"
	      )
	   ),
	    11, new Hash(
         'contents', 'present',
	      'type', 'js',
	      'uri', "addOpt('mood~case','pres','present')"
,
       1, new Hash(
            'contents', 'velg',
	         'type', 'js',
	         'uri', "addOpt('mood~case','pres','present')"
	      ),
	      2, new Hash(
            'contents', 'utelukk',
	         'type', 'js',
	         'uri', "addOpt('mood~case','!pres','!present')"
	      )
	   ),
	    12, new Hash(
         'contents', 'simple',
	      'type', 'js',
	      'uri', "addOpt('mood~case','simp','simple')"
,
       1, new Hash(
            'contents', 'velg',
	         'type', 'js',
	         'uri', "addOpt('mood~case','simp','simple')"
	      ),
	      2, new Hash(
            'contents', 'utelukk',
	         'type', 'js',
	         'uri', "addOpt('mood~case','!simp','!simple')"
	      )
	   ),
	    13, new Hash(
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
	   )
),
  	6, new Hash(
       'contents', 'morphology (case) &#187;&nbsp;',
	    1, new Hash(
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
	    2, new Hash(
         'contents', 'accusative or dative',
	      'type', 'js',
	      'uri', "addOpt('mood~case','acc/dat','accusative or dative')"
,
       1, new Hash(
            'contents', 'velg',
	         'type', 'js',
	         'uri', "addOpt('mood~case','acc/dat','accusative or dative')"
	      ),
	      2, new Hash(
            'contents', 'utelukk',
	         'type', 'js',
	         'uri', "addOpt('mood~case','!acc/dat','!accusative or dative')"
	      )
	   ),
	    3, new Hash(
         'contents', 'dative',
	      'type', 'js',
	      'uri', "addOpt('mood~case','dat','dative')"
,
       1, new Hash(
            'contents', 'velg',
	         'type', 'js',
	         'uri', "addOpt('mood~case','dat','dative')"
	      ),
	      2, new Hash(
            'contents', 'utelukk',
	         'type', 'js',
	         'uri', "addOpt('mood~case','!dat','!dative')"
	      )
	   ),
	    4, new Hash(
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
	    5, new Hash(
         'contents', 'nom/piv',
	      'type', 'js',
	      'uri', "addOpt('mood~case','nom/piv','nom/piv')"
,
       1, new Hash(
            'contents', 'velg',
	         'type', 'js',
	         'uri', "addOpt('mood~case','nom/piv','nom/piv')"
	      ),
	      2, new Hash(
            'contents', 'utelukk',
	         'type', 'js',
	         'uri', "addOpt('mood~case','!nom/piv','!nom/piv')"
	      )
	   ),
	    6, new Hash(
         'contents', 'piv',
	      'type', 'js',
	      'uri', "addOpt('mood~case','piv','piv')"
,
       1, new Hash(
            'contents', 'velg',
	         'type', 'js',
	         'uri', "addOpt('mood~case','piv','piv')"
	      ),
	      2, new Hash(
            'contents', 'utelukk',
	         'type', 'js',
	         'uri', "addOpt('mood~case','!piv','!piv')"
	      )
	   )
),
  	7, new Hash(
       'contents', 'morphology (noun) &#187;&nbsp;',
	    1, new Hash(
         'contents', 'common noun',
	      'type', 'js',
	      'uri', "addOpt('   type','c','common noun')"
,
       1, new Hash(
            'contents', 'velg',
	         'type', 'js',
	         'uri', "addOpt('   type','c','common noun')"
	      ),
	      2, new Hash(
            'contents', 'utelukk',
	         'type', 'js',
	         'uri', "addOpt('   type','!c','!common noun')"
	      )
	   ),
	    2, new Hash(
         'contents', 'plural',
	      'type', 'js',
	      'uri', "addOpt('   type','pl','plural')"
,
       1, new Hash(
            'contents', 'velg',
	         'type', 'js',
	         'uri', "addOpt('   type','pl','plural')"
	      ),
	      2, new Hash(
            'contents', 'utelukk',
	         'type', 'js',
	         'uri', "addOpt('   type','!pl','!plural')"
	      )
	   ),
	    3, new Hash(
         'contents', 'plural or singular',
	      'type', 'js',
	      'uri', "addOpt('   type','pl/sg','plural or singular')"
,
       1, new Hash(
            'contents', 'velg',
	         'type', 'js',
	         'uri', "addOpt('   type','pl/sg','plural or singular')"
	      ),
	      2, new Hash(
            'contents', 'utelukk',
	         'type', 'js',
	         'uri', "addOpt('   type','!pl/sg','!plural or singular')"
	      )
	   ),
	    4, new Hash(
         'contents', 'proper noun',
	      'type', 'js',
	      'uri', "addOpt('   type','p','proper noun')"
,
       1, new Hash(
            'contents', 'velg',
	         'type', 'js',
	         'uri', "addOpt('   type','p','proper noun')"
	      ),
	      2, new Hash(
            'contents', 'utelukk',
	         'type', 'js',
	         'uri', "addOpt('   type','!p','!proper noun')"
	      )
	   ),
	    5, new Hash(
         'contents', 'singular',
	      'type', 'js',
	      'uri', "addOpt('   type','sg','singular')"
,
       1, new Hash(
            'contents', 'velg',
	         'type', 'js',
	         'uri', "addOpt('   type','sg','singular')"
	      ),
	      2, new Hash(
            'contents', 'utelukk',
	         'type', 'js',
	         'uri', "addOpt('   type','!sg','!singular')"
	      )
	   )
),
  	8, new Hash(
       'contents', 'morphology (pron) &#187;&nbsp;',
	    1, new Hash(
         'contents', 'first person',
	      'type', 'js',
	      'uri', "addOpt('person~type2','1','first person')"
,
       1, new Hash(
            'contents', 'velg',
	         'type', 'js',
	         'uri', "addOpt('person~type2','1','first person')"
	      ),
	      2, new Hash(
            'contents', 'utelukk',
	         'type', 'js',
	         'uri', "addOpt('person~type2','!1','!first person')"
	      )
	   ),
	    2, new Hash(
         'contents', 'second person',
	      'type', 'js',
	      'uri', "addOpt('person~type2','2','second person')"
,
       1, new Hash(
            'contents', 'velg',
	         'type', 'js',
	         'uri', "addOpt('person~type2','2','second person')"
	      ),
	      2, new Hash(
            'contents', 'utelukk',
	         'type', 'js',
	         'uri', "addOpt('person~type2','!2','!second person')"
	      )
	   ),
	    3, new Hash(
         'contents', 'third person',
	      'type', 'js',
	      'uri', "addOpt('person~type2','3','third person')"
,
       1, new Hash(
            'contents', 'velg',
	         'type', 'js',
	         'uri', "addOpt('person~type2','3','third person')"
	      ),
	      2, new Hash(
            'contents', 'utelukk',
	         'type', 'js',
	         'uri', "addOpt('person~type2','!3','!third person')"
	      )
	   )
),
  	9, new Hash(
       'contents', 'morphology (gender) &#187;&nbsp;',
	    1, new Hash(
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
	    2, new Hash(
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
	    3, new Hash(
         'contents', 'masculine or feminine',
	      'type', 'js',
	      'uri', "addOpt('gender','m/f','masculine or feminine')"
,
       1, new Hash(
            'contents', 'velg',
	         'type', 'js',
	         'uri', "addOpt('gender','m/f','masculine or feminine')"
	      ),
	      2, new Hash(
            'contents', 'utelukk',
	         'type', 'js',
	         'uri', "addOpt('gender','!m/f','!masculine or feminine')"
	      )
	   )
),
  	10, new Hash(
       'contents', 'morphology (conjunction) &#187;&nbsp;',
	    1, new Hash(
         'contents', 'coordinationg',
	      'type', 'js',
	      'uri', "addOpt('type','coord','coordinationg')"
,
       1, new Hash(
            'contents', 'velg',
	         'type', 'js',
	         'uri', "addOpt('type','coord','coordinationg')"
	      ),
	      2, new Hash(
            'contents', 'utelukk',
	         'type', 'js',
	         'uri', "addOpt('type','!coord','!coordinationg')"
	      )
	   ),
	    2, new Hash(
         'contents', 'subordinating',
	      'type', 'js',
	      'uri', "addOpt('type','subord','subordinating')"
,
       1, new Hash(
            'contents', 'velg',
	         'type', 'js',
	         'uri', "addOpt('type','subord','subordinating')"
	      ),
	      2, new Hash(
            'contents', 'utelukk',
	         'type', 'js',
	         'uri', "addOpt('type','!subord','!subordinating')"
	      )
	   )
) ));
}
