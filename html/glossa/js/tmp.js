var tableCounter = new Array;
var curRow=-1;


var languageSelected = new Array;

function writeWidgetTokenRow() {

	curRow++;

	var Html = 
      	   "<table style='border-width:1px;border-style:outset;border-color:#afaeae;padding:10px' id='tokenrow_" + curRow + "'>";

	if (conf['type'] == 'multilingual') {

	       Html += "<tr><td colspan=6> <select title='Choose language of corpus. ' onChange=\"setLanguage(this.selectedIndex,'" + curRow + "')\" id='language" + curRow + "' name='phrase_" + curRow + "_corpus'>";

              for (var k=0;k<languageOpts.length;k++) {		
       	    Html += "<option value='" + languageOpts[k][0] + "'";
		    if (k == curRow) { 
			Html += " selected";
			languageSelected[curRow]=[languageOpts[k][0]];
	           }
		    Html += ">" + languageOpts[k][1] + "</option>";
		}

		if (curRow > 5) { languageSelected[curRow]=languageOpts[0][0] }

       	Html += "</select>";

		 if (languageSelected[curRow] != languageSelected[0]) {
		   Html += "&nbsp; <select title='Choose search mode' id='language1' name='phrase_" + curRow + "_mode' onChange='addTargetLangs()'>"
       	 + "<option value='match' selected></option>"
       	 + "<option value='match'>match (default)</option>"
       	 + "<option value='exclude'>exclude</option>"
//       	 + "<option value='highlight'>highlight</option>"
       	 + "</select>";
	
			Html += "<br><input type='checkbox' name='phrase_" + curRow + "_optalign' />optional alignment";
	        }

		 var languageSeen=0;
               for (var k=0;k<languageSelected.length-1;k++) {		
			// var Tmp = languageSelected[k] + ":::" + languageSelected[curRow];
			// alert(Tmp);
			if (languageSelected[k] == languageSelected[curRow]) {
				languageSeen=1;
			} 
		 }		
		
		 Html += "</td><td id='connectwith_" + curRow + "' style='display:";

		 if (languageSeen) { Html += "block" }
		 else { Html += "none" }

		 Html += "'> <select title='Choose logical connection to phrases of the same corpus' name='phrase_" + curRow + "_connectBool'>"
	 	 + "<option value='and' selected>&nbsp;</option>"
        	 + "<option value='and'>AND (default)</option>"
        	 + "<option value='or'>OR</option>"
        	 + "</select></td></tr>";

	}
	else {
		Html += "<tr><td></td></tr>";
                languageSelected[curRow]=languageOpts[0][0];
	       // languageSelected[curRow]='ILN_LEKS';
	}

	Html += "<tr><td></td>"
	 + "<td style='float:left'><nobr><input type='button' value='+' onClick='writeWidgetToken(" + curRow + ")'></input>"
	 + "<input type='button' id='delbutton_" + curRow + "'  value='-' onClick='delWidgetToken(" + curRow + ")'></input></nobr></td>"
	 + "</tr></table>"
	 + "<input type='hidden' name='phrase_number' value='" + curRow + "'></input>";
//	 + "<input type='hidden' id='base_corpus' name='phrase_" + curRow + "_corpus' value='" + languageOpts[curRow][0] + "'></input>"
//	 + "<input type='hidden' name='phrase_type' value='corpus'></input>";

	var queryTable = document.getElementById('query_table');	
 	var tableRow = queryTable.insertRow(curRow);
 	var tableCell = tableRow.insertCell(0);

	tableCell.innerHTML = Html;

	tableCounter[curRow] = 0;	
	writeWidgetToken(curRow);

	if (curRow == 1) {
		var objectIdButton = "delRowsButton";
	        var button = document.getElementById(objectIdButton);
		button.disabled=false;
	}

}

function setLanguage(langIndex,row) {

	var newLang = languageOpts[langIndex][0];
	languageSelected[row]=newLang;

	// change menu
	changeMenu(row,newLang);

	if (row == 0) {
		var baseCorpusInput=document.getElementById('base_corpus');
		baseCorpusInput.value=newLang;
	}

	var seenLang = new Array;

       for (var k=0;k<languageSelected.length;k++) {	
	
	  var curLang = languageSelected[k];

	  if (seenLang[curLang]) {
		setConnectWith(row,'block');
	  }
	  else {
		setConnectWith(row,'none');
	  }

	  seenLang[curLang]=1;

       }

}

function setConnectWith(row,display) {

	var id="connectwith_" + row;
	var object=document.getElementById(id);
	object.style.display=display;

}

function delWidgetTokenRow() {

	var queryTable = document.getElementById('query_table');
	queryTable.deleteRow(curRow);

	languageSelected[curRow]='';

	if (curRow == 1) {
		var objectIdButton = "delRowsButton";
	        var button = document.getElementById(objectIdButton);
		button.disabled=true;
	}

	curRow--;
}


function delWidgetToken(row) {



	var col=tableCounter[row];
	tableId="tokenrow_"+row;
	var tableRow = document.getElementById(tableId);
 	tableRow.rows[1].deleteCell(col);

	tableCounter[row]--;


	if (tableCounter[row] == 1) {
		var objectIdButton = "delbutton_" + row;
	        var button = document.getElementById(objectIdButton);
		button.disabled=true;
	}




}

function writeWidgetToken(row) {

	var languageSel = languageSelected[row];

	tableCounter[row]++;
	var col = tableCounter[row];


	var objectIdButton = "delbutton_" + row;	
	var button = document.getElementById(objectIdButton);
	if (col == 2) {
		button.disabled=false;
	}
	if (col == 1) {
		button.disabled=true;
	}

	tableId="tokenrow_"+row;
	var tableRow = document.getElementById(tableId);
	//	alert(tableRow.id);
 	var tableCell = tableRow.rows[0].insertCell(col);


	var Html = "<table><tr>";

	var Display="block";

	if (col > 1) {
		Html += 
  	   "<td valign='top'>"
           +  strings[language]['interval'] + ":<br>"
	   + "<input name=\"token_" + row + "_" + col + "_intmin\" "
	   +   "id=\"int_" + row + "_" + col + "_words_min\" "
	   +   "type=\"text\" size=\"1\"></input>" + strings[language]['min'] + "<br>"
	   + "<input name=\"token_" + row + "_" + col + "_intmax\" "
	   +   "id=\"int_" + row + "_" + col + "_words_max\" "
	   +   "type=\"text\" size=\"1\"></input>" + strings[language]['max']
	   + "</td>";
	}

	var menuName = "menu_" + row + "_" + col;

	ReloadMenu(languageSel);
	domMenu_data.set(menuName, Menu[languageSel]);

	domMenu_settings.set(menuName, new Hash(
    		'menuBarWidth', '0%'
	));

	var cell=row + "_" + col;

	Html += "<td valign='top'>"
	+ "<input type=\"TEXT\" id=\"string_" + row + "_" + col + "\" name=\"token_" + row + "_" + col + "_string\" size=\"12\"></input>"
	+ "<div onMouseOver=\"Cell='" + cell + "'\" id='" + menuName + "'></div>"
	+ "<select onMouseOver=\"Cell='" + cell + "'\" name=\"token_"  + row + "_" + col + "_atts\" id=\""  + row + "_" + col + "_select\" style='display:none' multiple size=2 onDblClick=\"remOpt(this)\">"
	+ "</select>"
	+ "</td></tr></table>";

	tableCell.vAlign="top";
	tableCell.innerHTML = Html;

       domMenu_activate(menuName);




}



function changeMenu (row,languageName) {


      for (var k=0;k<tableCounter[row];k++) {		
	
	  var j=k+1;

	  // set row language

	  // set menu
	  var menuName = "menu_" + row + "_" + j;

	  var menuAnch = document.getElementById(menuName);
	  menuAnch.innerHTML="";

	  ReloadMenu(languageName);
	  domMenu_data.set(menuName, Menu[languageName]);
         domMenu_activate(menuName);

      }

}



function ReloadMenu(language) {

 	delete Menu[language];

	// FIXME: this should be dynamic ...
	if (language == 'OMC3_DE') {
		reloadMenuOmc2_de();		
	}
	else if (language == 'OMC3_FR') {
		reloadMenuOmc2_fr();
	}		
	else if (language == 'OMC3_NO') {
		reloadMenuOmc2_no();		
	}
	else if (language == 'OMC3_NL') {
		reloadMenuOmc2_nl();		
	}
	else if (language == 'OMC3_PO') {
		reloadMenuOmc2_po();		
	}
	else if (language == 'OMC3_EN') {
		reloadMenuOmc2_en();		
	}
	else if (language == 'ILN_LEKS') {
		reloadMenuBokmal();		
	}
	else if (language == 'SAMI') {
		reloadMenuSami();		
	}


}