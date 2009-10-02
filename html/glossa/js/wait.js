/* $Id$ */


var lang = strings[language];

var Html = lang['query_searching'];

var i = 0;
var Finished = 0;

Print();

function Print() {

	setTimeout("doIt()", 500);
}

function doIt() {

	i++;
	writeIt();
	if (Finished) {} 
	else if (i < 10) { Print() } 
	else { 
		i=0; 
		Html = lang['query_searching'];
		Print()
	}

}

function writeIt() {

   	object = document.getElementById("waiting");
   	object.innerHTML=Html;
  	Html = Html + "&nbsp;.";

}

function stopWait() {
//   	object = document.getElementById("waiting");
//   	object.innerHTML='';
	Html="";
	Finished=1;
}