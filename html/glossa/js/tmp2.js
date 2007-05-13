var tableCounter = new Array;
var curRow=-1;


var languageSelected = new Array;

function writeWidgetTokenRow() {

	curRow++;

	var Html = 
      	   "<table style='border-width:1px;border-style:outset;border-color:#afaeae;padding:10px' id='tokenrow_" + curRow + "'>";

	


	Html += "<td>y</td></tr></table>";

	var queryTable = document.getElementById('query_table');	
 	var tableRow = queryTable.insertRow(curRow);
 	var tableCell = tableRow.insertCell(0);

	tableCell.innerHTML = Html;

	tableCounter[curRow] = 0;	
	writeWidgetToken(curRow);

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




	tableId="tokenrow_"+row;
	var tableRow = document.getElementById(tableId);
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