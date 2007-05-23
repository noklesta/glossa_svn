
//
//      Misc functions
//




function changeVisibility(Id, Style) {

        var Object = document.getElementById(Id)
        if (Object) { Object.style.display = Style }

}



var Cell = "0_1";



function addOpt(Type, Id, Name) {


	if (Type == 'ADDSTRING') {
		var TmpName = prompt("Add your word/lemma:");
		if (TmpName) {
		}
		else {
			return 0;
		}

		TmpName = Name + TmpName;
		Name = TmpName;

		if (Id == 'word') {  	Name = "word:" + Name }	
		if (Id == 'lemma') {  	Name = "lemma:" + Name }	


		Id = Id + "_" + TmpName;

	}	
	else {
		Id = Type + "_" + Id;
	}
	



	var Select_Id = Cell + "_select";

	changeVisibility(Select_Id, "block");

	var Select = document.getElementById(Select_Id);
	var Options = Select.options;
	var OptLength = Options.length;
	OptLengt = OptLength + 1;
	var Opt = new Option(Name, Id);
	Options[OptLength]=Opt;

	Select.size=OptLength+1;


}


function remOpt(Select) {

	var Options = Select.options;
	Options[Select.selectedIndex]=null;
	var OptLength = Options.length;

	Select.size=OptLength;

	if (OptLength==0) {
		Select.style.display="none";
	}

}


function toggleSelectAll (truefalse) {


	var selects=document.getElementsByTagName('select'); 
	for (var i = 0; i < selects.length; i++) { 

		var select = selects[i];
		if (select.multiple) {	
			var Options = select.options;
			var l = Options.length;
			for (var k=0;k<l;k++) {
				Options[k].selected = truefalse;
			}
		}

	}

}

function submitForm() {

         var w = 630, h = 1200;
         if (window.screen) {
               w = window.screen.availWidth;
               h = window.screen.availHeight;
         }   

	var ran_number=Math.round(Math.random()*4000000);
	document.forms[0].target=ran_number;
	mywin=window.open('',ran_number,'resizable=yes,menubar=yes,scrollbars=yes,toolbar=yes,location=no,directories=no,screenX=5,screenY=5,width='+w+',height='+h);
	toggleSelectAll(true);
	document.forms[0].submit();
	toggleSelectAll(false);

}

function setAction(target) {
	
	var oldTarget=document.forms[0].action;
	document.forms[0].action=target;
	submitForm();
	document.forms[0].action=oldTarget;

}

function setFocus() {

    document.forms[0].elements[0].focus();

}