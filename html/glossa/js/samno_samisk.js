var Menu;
function reloadMenuSamNoSamisk() {
Menu['SAMNO_SAMISK'] = new Hash(     1, new Hash(
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
       'contents', 'occurences &#187;&nbsp;',
	    1, new Hash(
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
	    2, new Hash(
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
	    3, new Hash(
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
	  3, new Hash(
         'contents', '<br>'
         ),
  	4, new Hash(
       'contents', 'Part of Speech &#187;&nbsp;',
	    1, new Hash(
         'contents', 'adjective',
	      'type', 'js',
	      'uri', "addOpt('pos','A','adjective')"
,
       1, new Hash(
            'contents', 'choose',
	         'type', 'js',
	         'uri', "addOpt('pos','A','adjective')"
	      ),
	      2, new Hash(
            'contents', 'exclude',
	         'type', 'js',
	         'uri', "addOpt('pos','!A','!adjective')"
	      )
	   ),
	    2, new Hash(
         'contents', 'CC',
	      'type', 'js',
	      'uri', "addOpt('pos','CC','CC')"
,
       1, new Hash(
            'contents', 'choose',
	         'type', 'js',
	         'uri', "addOpt('pos','CC','CC')"
	      ),
	      2, new Hash(
            'contents', 'exclude',
	         'type', 'js',
	         'uri', "addOpt('pos','!CC','!CC')"
	      )
	   ),
	    3, new Hash(
         'contents', 'preposition',
	      'type', 'js',
	      'uri', "addOpt('pos','Pr','preposition')"
,
       1, new Hash(
            'contents', 'choose',
	         'type', 'js',
	         'uri', "addOpt('pos','Pr','preposition')"
	      ),
	      2, new Hash(
            'contents', 'exclude',
	         'type', 'js',
	         'uri', "addOpt('pos','!Pr','!preposition')"
	      )
	   ),
	    4, new Hash(
         'contents', 'noun',
	      'type', 'js',
	      'uri', "addOpt('pos','N','noun')"
,
       1, new Hash(
            'contents', 'choose',
	         'type', 'js',
	         'uri', "addOpt('pos','N','noun')"
	      ),
	      2, new Hash(
            'contents', 'exclude',
	         'type', 'js',
	         'uri', "addOpt('pos','!N','!noun')"
	      )
	   ),
	    5, new Hash(
         'contents', 'pronoun',
	      'type', 'js',
	      'uri', "addOpt('pos','Pron','pronoun')"
,
       1, new Hash(
            'contents', 'choose',
	         'type', 'js',
	         'uri', "addOpt('pos','Pron','pronoun')"
	      ),
	      2, new Hash(
            'contents', 'exclude',
	         'type', 'js',
	         'uri', "addOpt('pos','!Pron','!pronoun')"
	      )
	   ),
	    6, new Hash(
         'contents', 'postposition',
	      'type', 'js',
	      'uri', "addOpt('pos','Po','postposition')"
,
       1, new Hash(
            'contents', 'choose',
	         'type', 'js',
	         'uri', "addOpt('pos','Po','postposition')"
	      ),
	      2, new Hash(
            'contents', 'exclude',
	         'type', 'js',
	         'uri', "addOpt('pos','!Po','!postposition')"
	      )
	   ),
	    7, new Hash(
         'contents', 'verb',
	      'type', 'js',
	      'uri', "addOpt('pos','V','verb')"
,
       1, new Hash(
            'contents', 'choose',
	         'type', 'js',
	         'uri', "addOpt('pos','V','verb')"
	      ),
	      2, new Hash(
            'contents', 'exclude',
	         'type', 'js',
	         'uri', "addOpt('pos','!V','!verb')"
	      )
	   ),
	    8, new Hash(
         'contents', 'CS',
	      'type', 'js',
	      'uri', "addOpt('pos','CS','CS')"
,
       1, new Hash(
            'contents', 'choose',
	         'type', 'js',
	         'uri', "addOpt('pos','CS','CS')"
	      ),
	      2, new Hash(
            'contents', 'exclude',
	         'type', 'js',
	         'uri', "addOpt('pos','!CS','!CS')"
	      )
	   ),
	    9, new Hash(
         'contents', 'adverb',
	      'type', 'js',
	      'uri', "addOpt('pos','Adv','adverb')"
,
       1, new Hash(
            'contents', 'choose',
	         'type', 'js',
	         'uri', "addOpt('pos','Adv','adverb')"
	      ),
	      2, new Hash(
            'contents', 'exclude',
	         'type', 'js',
	         'uri', "addOpt('pos','!Adv','!adverb')"
	      )
	   ),
	    10, new Hash(
         'contents', 'interjection',
	      'type', 'js',
	      'uri', "addOpt('pos','Interj','interjection')"
,
       1, new Hash(
            'contents', 'choose',
	         'type', 'js',
	         'uri', "addOpt('pos','Interj','interjection')"
	      ),
	      2, new Hash(
            'contents', 'exclude',
	         'type', 'js',
	         'uri', "addOpt('pos','!Interj','!interjection')"
	      )
	   ),
	    11, new Hash(
         'contents', 'numeral',
	      'type', 'js',
	      'uri', "addOpt('pos','Num','numeral')"
,
       1, new Hash(
            'contents', 'choose',
	         'type', 'js',
	         'uri', "addOpt('pos','Num','numeral')"
	      ),
	      2, new Hash(
            'contents', 'exclude',
	         'type', 'js',
	         'uri', "addOpt('pos','!Num','!numeral')"
	      )
	   ),
	    12, new Hash(
         'contents', 'particle',
	      'type', 'js',
	      'uri', "addOpt('pos','Pcle','particle')"
,
       1, new Hash(
            'contents', 'choose',
	         'type', 'js',
	         'uri', "addOpt('pos','Pcle','particle')"
	      ),
	      2, new Hash(
            'contents', 'exclude',
	         'type', 'js',
	         'uri', "addOpt('pos','!Pcle','!particle')"
	      )
	   )
),
  	5, new Hash(
       'contents', 'function &#187;&nbsp;',
	    1, new Hash(
         'contents', 'TITLE',
	      'type', 'js',
	      'uri', "addOpt('syn','@TITLE','TITLE')"
,
       1, new Hash(
            'contents', 'choose',
	         'type', 'js',
	         'uri', "addOpt('syn','@TITLE','TITLE')"
	      ),
	      2, new Hash(
            'contents', 'exclude',
	         'type', 'js',
	         'uri', "addOpt('syn','!@TITLE','!TITLE')"
	      )
	   ),
	    2, new Hash(
         'contents', 'GN>',
	      'type', 'js',
	      'uri', "addOpt('syn','@GN>','GN>')"
,
       1, new Hash(
            'contents', 'choose',
	         'type', 'js',
	         'uri', "addOpt('syn','@GN>','GN>')"
	      ),
	      2, new Hash(
            'contents', 'exclude',
	         'type', 'js',
	         'uri', "addOpt('syn','!@GN>','!GN>')"
	      )
	   ),
	    3, new Hash(
         'contents', 'PCLE',
	      'type', 'js',
	      'uri', "addOpt('syn','@PCLE','PCLE')"
,
       1, new Hash(
            'contents', 'choose',
	         'type', 'js',
	         'uri', "addOpt('syn','@PCLE','PCLE')"
	      ),
	      2, new Hash(
            'contents', 'exclude',
	         'type', 'js',
	         'uri', "addOpt('syn','!@PCLE','!PCLE')"
	      )
	   ),
	    4, new Hash(
         'contents', 'GP<',
	      'type', 'js',
	      'uri', "addOpt('syn','@GP<','GP<')"
,
       1, new Hash(
            'contents', 'choose',
	         'type', 'js',
	         'uri', "addOpt('syn','@GP<','GP<')"
	      ),
	      2, new Hash(
            'contents', 'exclude',
	         'type', 'js',
	         'uri', "addOpt('syn','!@GP<','!GP<')"
	      )
	   ),
	    5, new Hash(
         'contents', 'NQ<',
	      'type', 'js',
	      'uri', "addOpt('syn','@NQ<','NQ<')"
,
       1, new Hash(
            'contents', 'choose',
	         'type', 'js',
	         'uri', "addOpt('syn','@NQ<','NQ<')"
	      ),
	      2, new Hash(
            'contents', 'exclude',
	         'type', 'js',
	         'uri', "addOpt('syn','!@NQ<','!NQ<')"
	      )
	   ),
	    6, new Hash(
         'contents', 'CMPND',
	      'type', 'js',
	      'uri', "addOpt('syn','@CMPND','CMPND')"
,
       1, new Hash(
            'contents', 'choose',
	         'type', 'js',
	         'uri', "addOpt('syn','@CMPND','CMPND')"
	      ),
	      2, new Hash(
            'contents', 'exclude',
	         'type', 'js',
	         'uri', "addOpt('syn','!@CMPND','!CMPND')"
	      )
	   ),
	    7, new Hash(
         'contents', 'OBJ',
	      'type', 'js',
	      'uri', "addOpt('syn','@OBJ','OBJ')"
,
       1, new Hash(
            'contents', 'choose',
	         'type', 'js',
	         'uri', "addOpt('syn','@OBJ','OBJ')"
	      ),
	      2, new Hash(
            'contents', 'exclude',
	         'type', 'js',
	         'uri', "addOpt('syn','!@OBJ','!OBJ')"
	      )
	   ),
	    8, new Hash(
         'contents', 'PrcN',
	      'type', 'js',
	      'uri', "addOpt('syn','@PrcN>','PrcN')"
,
       1, new Hash(
            'contents', 'choose',
	         'type', 'js',
	         'uri', "addOpt('syn','@PrcN>','PrcN')"
	      ),
	      2, new Hash(
            'contents', 'exclude',
	         'type', 'js',
	         'uri', "addOpt('syn','!@PrcN>','!PrcN')"
	      )
	   ),
	    9, new Hash(
         'contents', 'CS-COMP',
	      'type', 'js',
	      'uri', "addOpt('syn','@CS-COMPL','CS-COMP')"
,
       1, new Hash(
            'contents', 'choose',
	         'type', 'js',
	         'uri', "addOpt('syn','@CS-COMPL','CS-COMP')"
	      ),
	      2, new Hash(
            'contents', 'exclude',
	         'type', 'js',
	         'uri', "addOpt('syn','!@CS-COMPL','!CS-COMP')"
	      )
	   ),
	    10, new Hash(
         'contents', 'SUBJ-QH',
	      'type', 'js',
	      'uri', "addOpt('syn','@SUBJ-QH','SUBJ-QH')"
,
       1, new Hash(
            'contents', 'choose',
	         'type', 'js',
	         'uri', "addOpt('syn','@SUBJ-QH','SUBJ-QH')"
	      ),
	      2, new Hash(
            'contents', 'exclude',
	         'type', 'js',
	         'uri', "addOpt('syn','!@SUBJ-QH','!SUBJ-QH')"
	      )
	   ),
	    11, new Hash(
         'contents', 'SPRED',
	      'type', 'js',
	      'uri', "addOpt('syn','@SPRED','SPRED')"
,
       1, new Hash(
            'contents', 'choose',
	         'type', 'js',
	         'uri', "addOpt('syn','@SPRED','SPRED')"
	      ),
	      2, new Hash(
            'contents', 'exclude',
	         'type', 'js',
	         'uri', "addOpt('syn','!@SPRED','!SPRED')"
	      )
	   ),
	    12, new Hash(
         'contents', 'AN>',
	      'type', 'js',
	      'uri', "addOpt('syn','@AN>','AN>')"
,
       1, new Hash(
            'contents', 'choose',
	         'type', 'js',
	         'uri', "addOpt('syn','@AN>','AN>')"
	      ),
	      2, new Hash(
            'contents', 'exclude',
	         'type', 'js',
	         'uri', "addOpt('syn','!@AN>','!AN>')"
	      )
	   ),
	    13, new Hash(
         'contents', 'VOC',
	      'type', 'js',
	      'uri', "addOpt('syn','@VOC','VOC')"
,
       1, new Hash(
            'contents', 'choose',
	         'type', 'js',
	         'uri', "addOpt('syn','@VOC','VOC')"
	      ),
	      2, new Hash(
            'contents', 'exclude',
	         'type', 'js',
	         'uri', "addOpt('syn','!@VOC','!VOC')"
	      )
	   ),
	    14, new Hash(
         'contents', 'DN>',
	      'type', 'js',
	      'uri', "addOpt('syn','@DN>','DN>')"
,
       1, new Hash(
            'contents', 'choose',
	         'type', 'js',
	         'uri', "addOpt('syn','@DN>','DN>')"
	      ),
	      2, new Hash(
            'contents', 'exclude',
	         'type', 'js',
	         'uri', "addOpt('syn','!@DN>','!DN>')"
	      )
	   ),
	    15, new Hash(
         'contents', 'NNum',
	      'type', 'js',
	      'uri', "addOpt('syn','@NNum>','NNum')"
,
       1, new Hash(
            'contents', 'choose',
	         'type', 'js',
	         'uri', "addOpt('syn','@NNum>','NNum')"
	      ),
	      2, new Hash(
            'contents', 'exclude',
	         'type', 'js',
	         'uri', "addOpt('syn','!@NNum>','!NNum')"
	      )
	   ),
	    16, new Hash(
         'contents', '+FAUXV',
	      'type', 'js',
	      'uri', "addOpt('syn','@+FAUXV','+FAUXV')"
,
       1, new Hash(
            'contents', 'choose',
	         'type', 'js',
	         'uri', "addOpt('syn','@+FAUXV','+FAUXV')"
	      ),
	      2, new Hash(
            'contents', 'exclude',
	         'type', 'js',
	         'uri', "addOpt('syn','!@+FAUXV','!+FAUXV')"
	      )
	   ),
	    17, new Hash(
         'contents', 'GA>',
	      'type', 'js',
	      'uri', "addOpt('syn','@GA>','GA>')"
,
       1, new Hash(
            'contents', 'choose',
	         'type', 'js',
	         'uri', "addOpt('syn','@GA>','GA>')"
	      ),
	      2, new Hash(
            'contents', 'exclude',
	         'type', 'js',
	         'uri', "addOpt('syn','!@GA>','!GA>')"
	      )
	   ),
	    18, new Hash(
         'contents', 'ADV-ADVV',
	      'type', 'js',
	      'uri', "addOpt('syn','@ADV-ADV','ADV-ADVV')"
,
       1, new Hash(
            'contents', 'choose',
	         'type', 'js',
	         'uri', "addOpt('syn','@ADV-ADV','ADV-ADVV')"
	      ),
	      2, new Hash(
            'contents', 'exclude',
	         'type', 'js',
	         'uri', "addOpt('syn','!@ADV-ADV','!ADV-ADVV')"
	      )
	   ),
	    19, new Hash(
         'contents', 'NumQ',
	      'type', 'js',
	      'uri', "addOpt('syn','@NumQ<','NumQ')"
,
       1, new Hash(
            'contents', 'choose',
	         'type', 'js',
	         'uri', "addOpt('syn','@NumQ<','NumQ')"
	      ),
	      2, new Hash(
            'contents', 'exclude',
	         'type', 'js',
	         'uri', "addOpt('syn','!@NumQ<','!NumQ')"
	      )
	   ),
	    20, new Hash(
         'contents', '-FAUXV',
	      'type', 'js',
	      'uri', "addOpt('syn','@-FAUXV','-FAUXV')"
,
       1, new Hash(
            'contents', 'choose',
	         'type', 'js',
	         'uri', "addOpt('syn','@-FAUXV','-FAUXV')"
	      ),
	      2, new Hash(
            'contents', 'exclude',
	         'type', 'js',
	         'uri', "addOpt('syn','!@-FAUXV','!-FAUXV')"
	      )
	   ),
	    21, new Hash(
         'contents', 'GP>',
	      'type', 'js',
	      'uri', "addOpt('syn','@GP>','GP>')"
,
       1, new Hash(
            'contents', 'choose',
	         'type', 'js',
	         'uri', "addOpt('syn','@GP>','GP>')"
	      ),
	      2, new Hash(
            'contents', 'exclude',
	         'type', 'js',
	         'uri', "addOpt('syn','!@GP>','!GP>')"
	      )
	   ),
	    22, new Hash(
         'contents', '-FSUBJ',
	      'type', 'js',
	      'uri', "addOpt('syn','@-FSUBJ','-FSUBJ')"
,
       1, new Hash(
            'contents', 'choose',
	         'type', 'js',
	         'uri', "addOpt('syn','@-FSUBJ','-FSUBJ')"
	      ),
	      2, new Hash(
            'contents', 'exclude',
	         'type', 'js',
	         'uri', "addOpt('syn','!@-FSUBJ','!-FSUBJ')"
	      )
	   ),
	    23, new Hash(
         'contents', 'PRON>',
	      'type', 'js',
	      'uri', "addOpt('syn','@PROP>','PRON>')"
,
       1, new Hash(
            'contents', 'choose',
	         'type', 'js',
	         'uri', "addOpt('syn','@PROP>','PRON>')"
	      ),
	      2, new Hash(
            'contents', 'exclude',
	         'type', 'js',
	         'uri', "addOpt('syn','!@PROP>','!PRON>')"
	      )
	   ),
	    24, new Hash(
         'contents', 'QN<',
	      'type', 'js',
	      'uri', "addOpt('syn','@QN<','QN<')"
,
       1, new Hash(
            'contents', 'choose',
	         'type', 'js',
	         'uri', "addOpt('syn','@QN<','QN<')"
	      ),
	      2, new Hash(
            'contents', 'exclude',
	         'type', 'js',
	         'uri', "addOpt('syn','!@QN<','!QN<')"
	      )
	   ),
	    25, new Hash(
         'contents', 'PronN',
	      'type', 'js',
	      'uri', "addOpt('syn','@PronN<','PronN')"
,
       1, new Hash(
            'contents', 'choose',
	         'type', 'js',
	         'uri', "addOpt('syn','@PronN<','PronN')"
	      ),
	      2, new Hash(
            'contents', 'exclude',
	         'type', 'js',
	         'uri', "addOpt('syn','!@PronN<','!PronN')"
	      )
	   ),
	    26, new Hash(
         'contents', 'HNOUN',
	      'type', 'js',
	      'uri', "addOpt('syn','@HNOUN','HNOUN')"
,
       1, new Hash(
            'contents', 'choose',
	         'type', 'js',
	         'uri', "addOpt('syn','@HNOUN','HNOUN')"
	      ),
	      2, new Hash(
            'contents', 'exclude',
	         'type', 'js',
	         'uri', "addOpt('syn','!@HNOUN','!HNOUN')"
	      )
	   ),
	    27, new Hash(
         'contents', 'OPRED',
	      'type', 'js',
	      'uri', "addOpt('syn','@OPRED','OPRED')"
,
       1, new Hash(
            'contents', 'choose',
	         'type', 'js',
	         'uri', "addOpt('syn','@OPRED','OPRED')"
	      ),
	      2, new Hash(
            'contents', 'exclude',
	         'type', 'js',
	         'uri', "addOpt('syn','!@OPRED','!OPRED')"
	      )
	   ),
	    28, new Hash(
         'contents', 'SUBJ',
	      'type', 'js',
	      'uri', "addOpt('syn','@SUBJ','SUBJ')"
,
       1, new Hash(
            'contents', 'choose',
	         'type', 'js',
	         'uri', "addOpt('syn','@SUBJ','SUBJ')"
	      ),
	      2, new Hash(
            'contents', 'exclude',
	         'type', 'js',
	         'uri', "addOpt('syn','!@SUBJ','!SUBJ')"
	      )
	   ),
	    29, new Hash(
         'contents', 'CS',
	      'type', 'js',
	      'uri', "addOpt('syn','@CS','CS')"
,
       1, new Hash(
            'contents', 'choose',
	         'type', 'js',
	         'uri', "addOpt('syn','@CS','CS')"
	      ),
	      2, new Hash(
            'contents', 'exclude',
	         'type', 'js',
	         'uri', "addOpt('syn','!@CS','!CS')"
	      )
	   ),
	    30, new Hash(
         'contents', '+FMAINV',
	      'type', 'js',
	      'uri', "addOpt('syn','@+FMAINV','+FMAINV')"
,
       1, new Hash(
            'contents', 'choose',
	         'type', 'js',
	         'uri', "addOpt('syn','@+FMAINV','+FMAINV')"
	      ),
	      2, new Hash(
            'contents', 'exclude',
	         'type', 'js',
	         'uri', "addOpt('syn','!@+FMAINV','!+FMAINV')"
	      )
	   ),
	    31, new Hash(
         'contents', 'ADVL',
	      'type', 'js',
	      'uri', "addOpt('syn','@ADVL','ADVL')"
,
       1, new Hash(
            'contents', 'choose',
	         'type', 'js',
	         'uri', "addOpt('syn','@ADVL','ADVL')"
	      ),
	      2, new Hash(
            'contents', 'exclude',
	         'type', 'js',
	         'uri', "addOpt('syn','!@ADVL','!ADVL')"
	      )
	   ),
	    32, new Hash(
         'contents', 'NumN',
	      'type', 'js',
	      'uri', "addOpt('syn','@NumN<','NumN')"
,
       1, new Hash(
            'contents', 'choose',
	         'type', 'js',
	         'uri', "addOpt('syn','@NumN<','NumN')"
	      ),
	      2, new Hash(
            'contents', 'exclude',
	         'type', 'js',
	         'uri', "addOpt('syn','!@NumN<','!NumN')"
	      )
	   ),
	    33, new Hash(
         'contents', '-FAMINV',
	      'type', 'js',
	      'uri', "addOpt('syn','@-FMAINV','-FAMINV')"
,
       1, new Hash(
            'contents', 'choose',
	         'type', 'js',
	         'uri', "addOpt('syn','@-FMAINV','-FAMINV')"
	      ),
	      2, new Hash(
            'contents', 'exclude',
	         'type', 'js',
	         'uri', "addOpt('syn','!@-FMAINV','!-FAMINV')"
	      )
	   ),
	    34, new Hash(
         'contents', 'INTERJ',
	      'type', 'js',
	      'uri', "addOpt('syn','@INTERJ','INTERJ')"
,
       1, new Hash(
            'contents', 'choose',
	         'type', 'js',
	         'uri', "addOpt('syn','@INTERJ','INTERJ')"
	      ),
	      2, new Hash(
            'contents', 'exclude',
	         'type', 'js',
	         'uri', "addOpt('syn','!@INTERJ','!INTERJ')"
	      )
	   ),
	    35, new Hash(
         'contents', 'ActionN',
	      'type', 'js',
	      'uri', "addOpt('syn','@ActioN>','ActionN')"
,
       1, new Hash(
            'contents', 'choose',
	         'type', 'js',
	         'uri', "addOpt('syn','@ActioN>','ActionN')"
	      ),
	      2, new Hash(
            'contents', 'exclude',
	         'type', 'js',
	         'uri', "addOpt('syn','!@ActioN>','!ActionN')"
	      )
	   ),
	    36, new Hash(
         'contents', 'QN>',
	      'type', 'js',
	      'uri', "addOpt('syn','@QN>','QN>')"
,
       1, new Hash(
            'contents', 'choose',
	         'type', 'js',
	         'uri', "addOpt('syn','@QN>','QN>')"
	      ),
	      2, new Hash(
            'contents', 'exclude',
	         'type', 'js',
	         'uri', "addOpt('syn','!@QN>','!QN>')"
	      )
	   ),
	    37, new Hash(
         'contents', 'ADV-A',
	      'type', 'js',
	      'uri', "addOpt('syn','@ADV-A','ADV-A')"
,
       1, new Hash(
            'contents', 'choose',
	         'type', 'js',
	         'uri', "addOpt('syn','@ADV-A','ADV-A')"
	      ),
	      2, new Hash(
            'contents', 'exclude',
	         'type', 'js',
	         'uri', "addOpt('syn','!@ADV-A','!ADV-A')"
	      )
	   ),
	    38, new Hash(
         'contents', 'CC',
	      'type', 'js',
	      'uri', "addOpt('syn','@CC','CC')"
,
       1, new Hash(
            'contents', 'choose',
	         'type', 'js',
	         'uri', "addOpt('syn','@CC','CC')"
	      ),
	      2, new Hash(
            'contents', 'exclude',
	         'type', 'js',
	         'uri', "addOpt('syn','!@CC','!CC')"
	      )
	   )
),
  	6, new Hash(
       'contents', 'number &#187;&nbsp;',
	    1, new Hash(
         'contents', 'singular',
	      'type', 'js',
	      'uri', "addOpt('number','Sg','singular')"
,
       1, new Hash(
            'contents', 'choose',
	         'type', 'js',
	         'uri', "addOpt('number','Sg','singular')"
	      ),
	      2, new Hash(
            'contents', 'exclude',
	         'type', 'js',
	         'uri', "addOpt('number','!Sg','!singular')"
	      )
	   ),
	    2, new Hash(
         'contents', 'plural',
	      'type', 'js',
	      'uri', "addOpt('number','Pl','plural')"
,
       1, new Hash(
            'contents', 'choose',
	         'type', 'js',
	         'uri', "addOpt('number','Pl','plural')"
	      ),
	      2, new Hash(
            'contents', 'exclude',
	         'type', 'js',
	         'uri', "addOpt('number','!Pl','!plural')"
	      )
	   )
),
  	7, new Hash(
       'contents', 'case &#187;&nbsp;',
	    1, new Hash(
         'contents', 'com',
	      'type', 'js',
	      'uri', "addOpt('case','Com','com')"
,
       1, new Hash(
            'contents', 'choose',
	         'type', 'js',
	         'uri', "addOpt('case','Com','com')"
	      ),
	      2, new Hash(
            'contents', 'exclude',
	         'type', 'js',
	         'uri', "addOpt('case','!Com','!com')"
	      )
	   ),
	    2, new Hash(
         'contents', 'locative',
	      'type', 'js',
	      'uri', "addOpt('case','Loc','locative')"
,
       1, new Hash(
            'contents', 'choose',
	         'type', 'js',
	         'uri', "addOpt('case','Loc','locative')"
	      ),
	      2, new Hash(
            'contents', 'exclude',
	         'type', 'js',
	         'uri', "addOpt('case','!Loc','!locative')"
	      )
	   ),
	    3, new Hash(
         'contents', 'accusative',
	      'type', 'js',
	      'uri', "addOpt('case','Acc','accusative')"
,
       1, new Hash(
            'contents', 'choose',
	         'type', 'js',
	         'uri', "addOpt('case','Acc','accusative')"
	      ),
	      2, new Hash(
            'contents', 'exclude',
	         'type', 'js',
	         'uri', "addOpt('case','!Acc','!accusative')"
	      )
	   ),
	    4, new Hash(
         'contents', 'ill',
	      'type', 'js',
	      'uri', "addOpt('case','Ill','ill')"
,
       1, new Hash(
            'contents', 'choose',
	         'type', 'js',
	         'uri', "addOpt('case','Ill','ill')"
	      ),
	      2, new Hash(
            'contents', 'exclude',
	         'type', 'js',
	         'uri', "addOpt('case','!Ill','!ill')"
	      )
	   ),
	    5, new Hash(
         'contents', 'genitive',
	      'type', 'js',
	      'uri', "addOpt('case','Gen','genitive')"
,
       1, new Hash(
            'contents', 'choose',
	         'type', 'js',
	         'uri', "addOpt('case','Gen','genitive')"
	      ),
	      2, new Hash(
            'contents', 'exclude',
	         'type', 'js',
	         'uri', "addOpt('case','!Gen','!genitive')"
	      )
	   ),
	    6, new Hash(
         'contents', 'nominative',
	      'type', 'js',
	      'uri', "addOpt('case','Nom','nominative')"
,
       1, new Hash(
            'contents', 'choose',
	         'type', 'js',
	         'uri', "addOpt('case','Nom','nominative')"
	      ),
	      2, new Hash(
            'contents', 'exclude',
	         'type', 'js',
	         'uri', "addOpt('case','!Nom','!nominative')"
	      )
	   )
),
  	8, new Hash(
       'contents', 'mood &#187;&nbsp;',
	    1, new Hash(
         'contents', 'pot',
	      'type', 'js',
	      'uri', "addOpt('mood','Pot','pot')"
,
       1, new Hash(
            'contents', 'choose',
	         'type', 'js',
	         'uri', "addOpt('mood','Pot','pot')"
	      ),
	      2, new Hash(
            'contents', 'exclude',
	         'type', 'js',
	         'uri', "addOpt('mood','!Pot','!pot')"
	      )
	   ),
	    2, new Hash(
         'contents', 'imprt',
	      'type', 'js',
	      'uri', "addOpt('mood','Imprt','imprt')"
,
       1, new Hash(
            'contents', 'choose',
	         'type', 'js',
	         'uri', "addOpt('mood','Imprt','imprt')"
	      ),
	      2, new Hash(
            'contents', 'exclude',
	         'type', 'js',
	         'uri', "addOpt('mood','!Imprt','!imprt')"
	      )
	   ),
	    3, new Hash(
         'contents', 'cond',
	      'type', 'js',
	      'uri', "addOpt('mood','Cond','cond')"
,
       1, new Hash(
            'contents', 'choose',
	         'type', 'js',
	         'uri', "addOpt('mood','Cond','cond')"
	      ),
	      2, new Hash(
            'contents', 'exclude',
	         'type', 'js',
	         'uri', "addOpt('mood','!Cond','!cond')"
	      )
	   ),
	    4, new Hash(
         'contents', 'ind',
	      'type', 'js',
	      'uri', "addOpt('mood','Ind','ind')"
,
       1, new Hash(
            'contents', 'choose',
	         'type', 'js',
	         'uri', "addOpt('mood','Ind','ind')"
	      ),
	      2, new Hash(
            'contents', 'exclude',
	         'type', 'js',
	         'uri', "addOpt('mood','!Ind','!ind')"
	      )
	   )
),
  	9, new Hash(
       'contents', 'tense &#187;&nbsp;',
	    1, new Hash(
         'contents', 'past',
	      'type', 'js',
	      'uri', "addOpt('tense','Prt','past')"
,
       1, new Hash(
            'contents', 'choose',
	         'type', 'js',
	         'uri', "addOpt('tense','Prt','past')"
	      ),
	      2, new Hash(
            'contents', 'exclude',
	         'type', 'js',
	         'uri', "addOpt('tense','!Prt','!past')"
	      )
	   ),
	    2, new Hash(
         'contents', 'present',
	      'type', 'js',
	      'uri', "addOpt('tense','Prs','present')"
,
       1, new Hash(
            'contents', 'choose',
	         'type', 'js',
	         'uri', "addOpt('tense','Prs','present')"
	      ),
	      2, new Hash(
            'contents', 'exclude',
	         'type', 'js',
	         'uri', "addOpt('tense','!Prs','!present')"
	      )
	   )
),
  	10, new Hash(
       'contents', 'polarity &#187;&nbsp;',
	    1, new Hash(
         'contents', 'neg',
	      'type', 'js',
	      'uri', "addOpt('polarity','neg','neg')"
,
       1, new Hash(
            'contents', 'choose',
	         'type', 'js',
	         'uri', "addOpt('polarity','neg','neg')"
	      ),
	      2, new Hash(
            'contents', 'exclude',
	         'type', 'js',
	         'uri', "addOpt('polarity','!neg','!neg')"
	      )
	   )
),
  	11, new Hash(
       'contents', 'grade &#187;&nbsp;',
	    1, new Hash(
         'contents', 'comparative',
	      'type', 'js',
	      'uri', "addOpt('grade','Comp','comparative')"
,
       1, new Hash(
            'contents', 'choose',
	         'type', 'js',
	         'uri', "addOpt('grade','Comp','comparative')"
	      ),
	      2, new Hash(
            'contents', 'exclude',
	         'type', 'js',
	         'uri', "addOpt('grade','!Comp','!comparative')"
	      )
	   ),
	    2, new Hash(
         'contents', 'superlative',
	      'type', 'js',
	      'uri', "addOpt('grade','Superl','superlative')"
,
       1, new Hash(
            'contents', 'choose',
	         'type', 'js',
	         'uri', "addOpt('grade','Superl','superlative')"
	      ),
	      2, new Hash(
            'contents', 'exclude',
	         'type', 'js',
	         'uri', "addOpt('grade','!Superl','!superlative')"
	      )
	   )
),
  	12, new Hash(
       'contents', 'type &#187;&nbsp;',
	    1, new Hash(
         'contents', 'plc',
	      'type', 'js',
	      'uri', "addOpt('type','Plc','plc')"
,
       1, new Hash(
            'contents', 'choose',
	         'type', 'js',
	         'uri', "addOpt('type','Plc','plc')"
	      ),
	      2, new Hash(
            'contents', 'exclude',
	         'type', 'js',
	         'uri', "addOpt('type','!Plc','!plc')"
	      )
	   ),
	    2, new Hash(
         'contents', 'acr',
	      'type', 'js',
	      'uri', "addOpt('type','ACR','acr')"
,
       1, new Hash(
            'contents', 'choose',
	         'type', 'js',
	         'uri', "addOpt('type','ACR','acr')"
	      ),
	      2, new Hash(
            'contents', 'exclude',
	         'type', 'js',
	         'uri', "addOpt('type','!ACR','!acr')"
	      )
	   ),
	    3, new Hash(
         'contents', 'fem',
	      'type', 'js',
	      'uri', "addOpt('type','Fem','fem')"
,
       1, new Hash(
            'contents', 'choose',
	         'type', 'js',
	         'uri', "addOpt('type','Fem','fem')"
	      ),
	      2, new Hash(
            'contents', 'exclude',
	         'type', 'js',
	         'uri', "addOpt('type','!Fem','!fem')"
	      )
	   ),
	    4, new Hash(
         'contents', 'abbr',
	      'type', 'js',
	      'uri', "addOpt('type','ABBR','abbr')"
,
       1, new Hash(
            'contents', 'choose',
	         'type', 'js',
	         'uri', "addOpt('type','ABBR','abbr')"
	      ),
	      2, new Hash(
            'contents', 'exclude',
	         'type', 'js',
	         'uri', "addOpt('type','!ABBR','!abbr')"
	      )
	   ),
	    5, new Hash(
         'contents', 'left',
	      'type', 'js',
	      'uri', "addOpt('type','LEFT','left')"
,
       1, new Hash(
            'contents', 'choose',
	         'type', 'js',
	         'uri', "addOpt('type','LEFT','left')"
	      ),
	      2, new Hash(
            'contents', 'exclude',
	         'type', 'js',
	         'uri', "addOpt('type','!LEFT','!left')"
	      )
	   ),
	    6, new Hash(
         'contents', 'punct',
	      'type', 'js',
	      'uri', "addOpt('type','PUNCT','punct')"
,
       1, new Hash(
            'contents', 'choose',
	         'type', 'js',
	         'uri', "addOpt('type','PUNCT','punct')"
	      ),
	      2, new Hash(
            'contents', 'exclude',
	         'type', 'js',
	         'uri', "addOpt('type','!PUNCT','!punct')"
	      )
	   ),
	    7, new Hash(
         'contents', 'clb',
	      'type', 'js',
	      'uri', "addOpt('type','CLB','clb')"
,
       1, new Hash(
            'contents', 'choose',
	         'type', 'js',
	         'uri', "addOpt('type','CLB','clb')"
	      ),
	      2, new Hash(
            'contents', 'exclude',
	         'type', 'js',
	         'uri', "addOpt('type','!CLB','!clb')"
	      )
	   ),
	    8, new Hash(
         'contents', 'sur',
	      'type', 'js',
	      'uri', "addOpt('type','Sur','sur')"
,
       1, new Hash(
            'contents', 'choose',
	         'type', 'js',
	         'uri', "addOpt('type','Sur','sur')"
	      ),
	      2, new Hash(
            'contents', 'exclude',
	         'type', 'js',
	         'uri', "addOpt('type','!Sur','!sur')"
	      )
	   ),
	    9, new Hash(
         'contents', 'right',
	      'type', 'js',
	      'uri', "addOpt('type','RIGHT','right')"
,
       1, new Hash(
            'contents', 'choose',
	         'type', 'js',
	         'uri', "addOpt('type','RIGHT','right')"
	      ),
	      2, new Hash(
            'contents', 'exclude',
	         'type', 'js',
	         'uri', "addOpt('type','!RIGHT','!right')"
	      )
	   ),
	    10, new Hash(
         'contents', 'org',
	      'type', 'js',
	      'uri', "addOpt('type','Org','org')"
,
       1, new Hash(
            'contents', 'choose',
	         'type', 'js',
	         'uri', "addOpt('type','Org','org')"
	      ),
	      2, new Hash(
            'contents', 'exclude',
	         'type', 'js',
	         'uri', "addOpt('type','!Org','!org')"
	      )
	   ),
	    11, new Hash(
         'contents', 'obj',
	      'type', 'js',
	      'uri', "addOpt('type','Obj','obj')"
,
       1, new Hash(
            'contents', 'choose',
	         'type', 'js',
	         'uri', "addOpt('type','Obj','obj')"
	      ),
	      2, new Hash(
            'contents', 'exclude',
	         'type', 'js',
	         'uri', "addOpt('type','!Obj','!obj')"
	      )
	   ),
	    12, new Hash(
         'contents', 'mal',
	      'type', 'js',
	      'uri', "addOpt('type','Mal','mal')"
,
       1, new Hash(
            'contents', 'choose',
	         'type', 'js',
	         'uri', "addOpt('type','Mal','mal')"
	      ),
	      2, new Hash(
            'contents', 'exclude',
	         'type', 'js',
	         'uri', "addOpt('type','!Mal','!mal')"
	      )
	   )
) ));
}