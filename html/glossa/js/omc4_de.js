var Menu;
function reloadMenuOmc2_de() {
Menu['OMC4_DE'] = new Hash(     1, new Hash(
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
	    6, new Hash(
         'contents', 'foreign',
	      'type', 'js',
	      'uri', "addOpt('pos','foreign','foreign')"
,
       1, new Hash(
            'contents', 'velg',
	         'type', 'js',
	         'uri', "addOpt('pos','foreign','foreign')"
	      ),
	      2, new Hash(
            'contents', 'utelukk',
	         'type', 'js',
	         'uri', "addOpt('pos','!foreign','!foreign')"
	      )
	   ),
	    7, new Hash(
         'contents', 'interjection',
	      'type', 'js',
	      'uri', "addOpt('pos','intj','interjection')"
,
       1, new Hash(
            'contents', 'velg',
	         'type', 'js',
	         'uri', "addOpt('pos','intj','interjection')"
	      ),
	      2, new Hash(
            'contents', 'utelukk',
	         'type', 'js',
	         'uri', "addOpt('pos','!intj','!interjection')"
	      )
	   ),
	    8, new Hash(
         'contents', 'non-word',
	      'type', 'js',
	      'uri', "addOpt('pos','nonword','non-word')"
,
       1, new Hash(
            'contents', 'velg',
	         'type', 'js',
	         'uri', "addOpt('pos','nonword','non-word')"
	      ),
	      2, new Hash(
            'contents', 'utelukk',
	         'type', 'js',
	         'uri', "addOpt('pos','!nonword','!non-word')"
	      )
	   ),
	    9, new Hash(
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
	    10, new Hash(
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
	    11, new Hash(
         'contents', 'particle',
	      'type', 'js',
	      'uri', "addOpt('pos','part','particle')"
,
       1, new Hash(
            'contents', 'velg',
	         'type', 'js',
	         'uri', "addOpt('pos','part','particle')"
	      ),
	      2, new Hash(
            'contents', 'utelukk',
	         'type', 'js',
	         'uri', "addOpt('pos','!part','!particle')"
	      )
	   ),
	    12, new Hash(
         'contents', 'postposition',
	      'type', 'js',
	      'uri', "addOpt('pos','postp','postposition')"
,
       1, new Hash(
            'contents', 'velg',
	         'type', 'js',
	         'uri', "addOpt('pos','postp','postposition')"
	      ),
	      2, new Hash(
            'contents', 'utelukk',
	         'type', 'js',
	         'uri', "addOpt('pos','!postp','!postposition')"
	      )
	   ),
	    13, new Hash(
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
	    14, new Hash(
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
	    15, new Hash(
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
	    16, new Hash(
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
         'contents', '<br>'
         ),
  	6, new Hash(
       'contents', 'Morphology (verb) &#187;&nbsp;',
	    1, new Hash(
         'contents', 'auxilliary verb',
	      'type', 'js',
	      'uri', "addOpt('type','a','auxilliary verb')"
,
       1, new Hash(
            'contents', 'velg',
	         'type', 'js',
	         'uri', "addOpt('type','a','auxilliary verb')"
	      ),
	      2, new Hash(
            'contents', 'utelukk',
	         'type', 'js',
	         'uri', "addOpt('type','!a','!auxilliary verb')"
	      )
	   ),
	    2, new Hash(
         'contents', 'finite',
	      'type', 'js',
	      'uri', "addOpt('type','finit','finite')"
,
       1, new Hash(
            'contents', 'velg',
	         'type', 'js',
	         'uri', "addOpt('type','finit','finite')"
	      ),
	      2, new Hash(
            'contents', 'utelukk',
	         'type', 'js',
	         'uri', "addOpt('type','!finit','!finite')"
	      )
	   ),
	    3, new Hash(
         'contents', 'full verb',
	      'type', 'js',
	      'uri', "addOpt('type','v','full verb')"
,
       1, new Hash(
            'contents', 'velg',
	         'type', 'js',
	         'uri', "addOpt('type','v','full verb')"
	      ),
	      2, new Hash(
            'contents', 'utelukk',
	         'type', 'js',
	         'uri', "addOpt('type','!v','!full verb')"
	      )
	   ),
	    4, new Hash(
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
	    5, new Hash(
         'contents', 'infinitive',
	      'type', 'js',
	      'uri', "addOpt('mood~case','infin','infinitive')"
,
       1, new Hash(
            'contents', 'velg',
	         'type', 'js',
	         'uri', "addOpt('mood~case','infin','infinitive')"
	      ),
	      2, new Hash(
            'contents', 'utelukk',
	         'type', 'js',
	         'uri', "addOpt('mood~case','!infin','!infinitive')"
	      )
	   ),
	    6, new Hash(
         'contents', 'modal verb',
	      'type', 'js',
	      'uri', "addOpt('type','m','modal verb')"
,
       1, new Hash(
            'contents', 'velg',
	         'type', 'js',
	         'uri', "addOpt('type','m','modal verb')"
	      ),
	      2, new Hash(
            'contents', 'utelukk',
	         'type', 'js',
	         'uri', "addOpt('type','!m','!modal verb')"
	      )
	   ),
	    7, new Hash(
         'contents', 'perfect participle',
	      'type', 'js',
	      'uri', "addOpt('tense~defin','part~perf','perfect participle')"
,
       1, new Hash(
            'contents', 'velg',
	         'type', 'js',
	         'uri', "addOpt('tense~defin','part~perf','perfect participle')"
	      ),
	      2, new Hash(
            'contents', 'utelukk',
	         'type', 'js',
	         'uri', "addOpt('tense~defin','!part~perf','!perfect participle')"
	      )
	   ),
	    8, new Hash(
         'contents', 'with zu',
	      'type', 'js',
	      'uri', "addOpt('type','mit~zu','with zu')"
,
       1, new Hash(
            'contents', 'velg',
	         'type', 'js',
	         'uri', "addOpt('type','mit~zu','with zu')"
	      ),
	      2, new Hash(
            'contents', 'utelukk',
	         'type', 'js',
	         'uri', "addOpt('type','!mit~zu','!with zu')"
	      )
	   )
),
  	7, new Hash(
       'contents', 'Morphology (pronoun) &#187;&nbsp;',
	    1, new Hash(
         'contents', 'adverbial',
	      'type', 'js',
	      'uri', "addOpt('type','ad','adverbial')"
,
       1, new Hash(
            'contents', 'velg',
	         'type', 'js',
	         'uri', "addOpt('type','ad','adverbial')"
	      ),
	      2, new Hash(
            'contents', 'utelukk',
	         'type', 'js',
	         'uri', "addOpt('type','!ad','!adverbial')"
	      )
	   ),
	    2, new Hash(
         'contents', 'attributive',
	      'type', 'js',
	      'uri', "addOpt('type','attr','attributive')"
,
       1, new Hash(
            'contents', 'velg',
	         'type', 'js',
	         'uri', "addOpt('type','attr','attributive')"
	      ),
	      2, new Hash(
            'contents', 'utelukk',
	         'type', 'js',
	         'uri', "addOpt('type','!attr','!attributive')"
	      )
	   ),
	    3, new Hash(
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
	    4, new Hash(
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
	    5, new Hash(
         'contents', 'interrogative',
	      'type', 'js',
	      'uri', "addOpt('type','inter','interrogative')"
,
       1, new Hash(
            'contents', 'velg',
	         'type', 'js',
	         'uri', "addOpt('type','inter','interrogative')"
	      ),
	      2, new Hash(
            'contents', 'utelukk',
	         'type', 'js',
	         'uri', "addOpt('type','!inter','!interrogative')"
	      )
	   ),
	    6, new Hash(
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
	    7, new Hash(
         'contents', 'possesive',
	      'type', 'js',
	      'uri', "addOpt('type','poss','possesive')"
,
       1, new Hash(
            'contents', 'velg',
	         'type', 'js',
	         'uri', "addOpt('type','poss','possesive')"
	      ),
	      2, new Hash(
            'contents', 'utelukk',
	         'type', 'js',
	         'uri', "addOpt('type','!poss','!possesive')"
	      )
	   ),
	    8, new Hash(
         'contents', 'reflex',
	      'type', 'js',
	      'uri', "addOpt('type','reflex','reflex')"
,
       1, new Hash(
            'contents', 'velg',
	         'type', 'js',
	         'uri', "addOpt('type','reflex','reflex')"
	      ),
	      2, new Hash(
            'contents', 'utelukk',
	         'type', 'js',
	         'uri', "addOpt('type','!reflex','!reflex')"
	      )
	   ),
	    9, new Hash(
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
	   ),
	    10, new Hash(
         'contents', 'substituting',
	      'type', 'js',
	      'uri', "addOpt('type','subst','substituting')"
,
       1, new Hash(
            'contents', 'velg',
	         'type', 'js',
	         'uri', "addOpt('type','subst','substituting')"
	      ),
	      2, new Hash(
            'contents', 'utelukk',
	         'type', 'js',
	         'uri', "addOpt('type','!subst','!substituting')"
	      )
	   )
),
  	8, new Hash(
       'contents', 'Morphology (particle) &#187;&nbsp;',
	    1, new Hash(
         'contents', 'adv/adj',
	      'type', 'js',
	      'uri', "addOpt('type','adv/adv','adv/adj')"
,
       1, new Hash(
            'contents', 'velg',
	         'type', 'js',
	         'uri', "addOpt('type','adv/adv','adv/adj')"
	      ),
	      2, new Hash(
            'contents', 'utelukk',
	         'type', 'js',
	         'uri', "addOpt('type','!adv/adv','!adv/adj')"
	      )
	   ),
	    2, new Hash(
         'contents', 'infinitive marker',
	      'type', 'js',
	      'uri', "addOpt('type','infmark','infinitive marker')"
,
       1, new Hash(
            'contents', 'velg',
	         'type', 'js',
	         'uri', "addOpt('type','infmark','infinitive marker')"
	      ),
	      2, new Hash(
            'contents', 'utelukk',
	         'type', 'js',
	         'uri', "addOpt('type','!infmark','!infinitive marker')"
	      )
	   ),
	    3, new Hash(
         'contents', 'negation',
	      'type', 'js',
	      'uri', "addOpt('type','neg','negation')"
,
       1, new Hash(
            'contents', 'velg',
	         'type', 'js',
	         'uri', "addOpt('type','neg','negation')"
	      ),
	      2, new Hash(
            'contents', 'utelukk',
	         'type', 'js',
	         'uri', "addOpt('type','!neg','!negation')"
	      )
	   ),
	    4, new Hash(
         'contents', 'reply',
	      'type', 'js',
	      'uri', "addOpt('type','reply','reply')"
,
       1, new Hash(
            'contents', 'velg',
	         'type', 'js',
	         'uri', "addOpt('type','reply','reply')"
	      ),
	      2, new Hash(
            'contents', 'utelukk',
	         'type', 'js',
	         'uri', "addOpt('type','!reply','!reply')"
	      )
	   )
),
  	9, new Hash(
       'contents', 'Morphology (conjunction) &#187;&nbsp;',
	    1, new Hash(
         'contents', 'coordinating',
	      'type', 'js',
	      'uri', "addOpt('type','coor','coordinating')"
,
       1, new Hash(
            'contents', 'velg',
	         'type', 'js',
	         'uri', "addOpt('type','coor','coordinating')"
	      ),
	      2, new Hash(
            'contents', 'utelukk',
	         'type', 'js',
	         'uri', "addOpt('type','!coor','!coordinating')"
	      )
	   ),
	    2, new Hash(
         'contents', 'subordinating',
	      'type', 'js',
	      'uri', "addOpt('type','sub','subordinating')"
,
       1, new Hash(
            'contents', 'velg',
	         'type', 'js',
	         'uri', "addOpt('type','sub','subordinating')"
	      ),
	      2, new Hash(
            'contents', 'utelukk',
	         'type', 'js',
	         'uri', "addOpt('type','!sub','!subordinating')"
	      )
	   )
),
  	10, new Hash(
       'contents', 'Morphology (preposition) &#187;&nbsp;',
	    1, new Hash(
         'contents', 'left',
	      'type', 'js',
	      'uri', "addOpt('type','left','left')"
,
       1, new Hash(
            'contents', 'velg',
	         'type', 'js',
	         'uri', "addOpt('type','left','left')"
	      ),
	      2, new Hash(
            'contents', 'utelukk',
	         'type', 'js',
	         'uri', "addOpt('type','!left','!left')"
	      )
	   ),
	    2, new Hash(
         'contents', 'right',
	      'type', 'js',
	      'uri', "addOpt('type','right','right')"
,
       1, new Hash(
            'contents', 'velg',
	         'type', 'js',
	         'uri', "addOpt('type','right','right')"
	      ),
	      2, new Hash(
            'contents', 'utelukk',
	         'type', 'js',
	         'uri', "addOpt('type','!right','!right')"
	      )
	   ),
	    3, new Hash(
         'contents', 'with article',
	      'type', 'js',
	      'uri', "addOpt('type','with~art','with article')"
,
       1, new Hash(
            'contents', 'velg',
	         'type', 'js',
	         'uri', "addOpt('type','with~art','with article')"
	      ),
	      2, new Hash(
            'contents', 'utelukk',
	         'type', 'js',
	         'uri', "addOpt('type','!with~art','!with article')"
	      )
	   )
),
  	11, new Hash(
       'contents', 'Morphology (adjective) &#187;&nbsp;',
	    1, new Hash(
         'contents', 'adv/pred',
	      'type', 'js',
	      'uri', "addOpt('type','adv/pred','adv/pred')"
,
       1, new Hash(
            'contents', 'velg',
	         'type', 'js',
	         'uri', "addOpt('type','adv/pred','adv/pred')"
	      ),
	      2, new Hash(
            'contents', 'utelukk',
	         'type', 'js',
	         'uri', "addOpt('type','!adv/pred','!adv/pred')"
	      )
	   ),
	    2, new Hash(
         'contents', 'attributive',
	      'type', 'js',
	      'uri', "addOpt('type','attr','attributive')"
,
       1, new Hash(
            'contents', 'velg',
	         'type', 'js',
	         'uri', "addOpt('type','attr','attributive')"
	      ),
	      2, new Hash(
            'contents', 'utelukk',
	         'type', 'js',
	         'uri', "addOpt('type','!attr','!attributive')"
	      )
	   )
),
  	12, new Hash(
       'contents', 'Morphology (noun) &#187;&nbsp;',
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
	   )
) ));
}
