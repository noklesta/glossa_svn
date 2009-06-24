var Menu;
function reloadMenu() {
Menu['KONKPLUS'] = new Hash(     1, new Hash(
        'contents', '<nobr>&nbsp;options &#187;&nbsp;</nobr>',
  	1, new Hash(
       'contents', 'ord &#187;&nbsp;',
	    1, new Hash(
         'contents', 'storlekskänsligt',
	      'type', 'js',
	      'uri', "addOpt('w','case','storlekskänsligt')"
	   ),
	    2, new Hash(
         'contents', 'i början av ord',
	      'type', 'js',
	      'uri', "addOpt('w','start','i början av ord')"
	   ),
	    3, new Hash(
         'contents', 'i slutet av ord',
	      'type', 'js',
	      'uri', "addOpt('w','end','i slutet av ord')"
	   ),
	    4, new Hash(
         'contents', 'i mitten av ord',
	      'type', 'js',
	      'uri', "addOpt('w','middle','i mitten av ord')"
	   ),
	    5, new Hash(
         'contents', 'uteslut',
	      'type', 'js',
	      'uri', "addOpt('w','neg','uteslut')"
	   )
),
  	2, new Hash(
       'contents', 'ytterligare sträng &#187;&nbsp;',
	    1, new Hash(
         'contents', 'lägg till ord',
	      'type', 'js',
	      'uri', "addOpt('ADDSTRING','word','lägg till ord')"
,
       1, new Hash(
            'contents', 'choose',
	         'type', 'js',
	         'uri', "addOpt('ADDSTRING','word','lägg till ord')"
	      ),
	      2, new Hash(
            'contents', 'exclude',
	         'type', 'js',
	         'uri', "addOpt('ADDSTRING','!word','!lägg till ord')"
	      )
	   ),
	    2, new Hash(
         'contents', 'uteslut ord',
	      'type', 'js',
	      'uri', "addOpt('ADDSTRING','!word','uteslut ord')"
,
       1, new Hash(
            'contents', 'choose',
	         'type', 'js',
	         'uri', "addOpt('ADDSTRING','!word','uteslut ord')"
	      ),
	      2, new Hash(
            'contents', 'exclude',
	         'type', 'js',
	         'uri', "addOpt('ADDSTRING','!!word','!uteslut ord')"
	      )
	   )
) ));

}