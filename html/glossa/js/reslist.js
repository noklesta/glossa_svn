/* $Id$ */
//showList(2,'heisann');

function showList(No,String,Hits,Corpus,Max, Html) {

        var val = arguments[6];

	Object=document.getElementById("placeholder");

        var atttype = "";
        if( arguments.length > 6){ atttype = "&atttype=" + val; }

	var HTML;
	// FIXME
	if (Corpus == 'bokmal') {HTML="Antall treff: <b>" + Hits + "</b>" + Max + "<br>Resultatsider: ";}
	else {HTML=Html;}
	//	alert(HTML);
	for (var i = 1;i<=No;i++) {

		if (i==1) { HTML=HTML+"<font size=\"+1\"><b>" }
		HTML=HTML+"<a href=\"" + cgiRoot + "/show_page_dev.cgi?n="+i+"&query_id="+String+"&corpus="+Corpus+atttype+"\"> "+i+"</a>";
		if (i==1) { HTML=HTML+"</b></font>" }	
	
	}	

	Object.innerHTML=HTML;		

}

function boldPage(No) {
	
	var Id = "page_" + No;
	Object=document.getElementById(Id);
	Object.innerHTML="<font size=\"+1\"><b>" + No + "</b></font>";

}

function clearCheckBoxes() {


	var checkBoxes = document.getElementsByTagName('input');
	for (i=0; i<checkBoxes.length; i++) {
		checkBoxes[i].checked=false;
	}


}
