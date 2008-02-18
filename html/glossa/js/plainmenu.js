var Menu;
function reloadMenuPlain() {
Menu['PLAINMENU'] = new Hash(     1, new Hash(
        'contents', '<nobr>&nbsp;options &#187;&nbsp;</nobr>',
  	1, new Hash(
       'contents', 'word &#187;&nbsp;',
	    1, new Hash(
         'contents', 'case sensitive',
	      'type', 'js',
	      'uri', "addOpt('w','case','case sensitive')"
	   ),
	    2, new Hash(
         'contents', 'start of word',
	      'type', 'js',
	      'uri', "addOpt('w','start','start of word')"
	   ),
	    3, new Hash(
         'contents', 'end of word',
	      'type', 'js',
	      'uri', "addOpt('w','end','end of word')"
	   ),
	    4, new Hash(
         'contents', 'middle of word',
	      'type', 'js',
	      'uri', "addOpt('w','middle','middle of word')"
	   ),
	    5, new Hash(
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
) ));
}
