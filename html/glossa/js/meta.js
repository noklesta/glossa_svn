/*

	Functions relating to the subcorpus creation widgets.

*/

function printDisplayOptions() {

	var Options;
	for (i in displayContent) {
	    if (i != 'clone') {
	    	Options += "<option value='" + i + "'>" + displayContent[i] + "</option>";
	    }
	}
	document.write(Options);

}



function writeWidgetDoubleTable(widgetId, widgetName, defaultPosition) {

       var selected = widgetContent[widgetId].selected;
       var unselected = widgetContent[widgetId].unselected;
	var tableName = widgetContent[widgetId].tablename;
	var mode = widgetContent[widgetId].mode;
	var colName = widgetContent[widgetId].colname;

	var listLen = selected.length + unselected.length;
	if (listLen > 7) { listLen = 7 } 
	if (listLen < 3) { listLen = 3 } 

	if (unselected.length > 0) { defaultPosition="visible" }

        //
        //      ** selected **
        // 


        var HTML='';

	if (defaultPosition == 'hidden') {
	   HTML +=  "<div style='display:block' id='" + widgetId + "_show' " + "onClick=\"changeVisibility('" + widgetId + "_show','none');changeVisibility('" + widgetId + "','block');\"><nobr><span class='txt'>" + widgetName + "</span><img src='../html/img/plus.gif' /></nobr>&nbsp;&nbsp;</div>"
	        + "<div  style='display:none' class='doubleTableTable' id='" + widgetId + "'>"
	}
	else {

	   HTML +=  "<div style='display:none' id='" + widgetId + "_show' " + "onClick=\"changeVisibility('" + widgetId + "_show','none');changeVisibility('" + widgetId + "','block');\"><nobr><span class='txt'>" + widgetName + "</span><img src='../html/img/plus.gif' /></nobr>&nbsp;&nbsp;</div>"
	   + "<div  style='display:block' class='doubleTableTable' id='" + widgetId + "'>"
	}



         HTML += "<div id='" + widgetId + "_show' " + "onClick=\"changeVisibility('" + widgetId + "_show','block');changeVisibility('" + widgetId + "','none');resetDoubleTable('" + widgetId + "');\"><nobr><span class='txt2'>" + widgetName + "</span><img src='../html/img/minus.gif' /></nobr>&nbsp;&nbsp;</div>"

         
         + "<table><tr><td valign='top'>"
         + "<select id=\'" + widgetId + "-selected' multiple "
         + "size='" + listLen + "'" 
         + "ondblclick=\"moveSelected(\'" + widgetId + "-selected\',\'" + widgetId + "-unselected\');\">";


         for(var i=0;i<selected.length;i++) {

		var optionValue=selected[i][0];
		var optionName=selected[i][0];

		if (selected[i].length == 2) {
			optionName=selected[i][1];
		}
               HTML += "<option title='" + optionValue + "' value='" + optionValue + "'>" + optionName + "</option>";    
        }
        
        HTML += "</select>";


        
        //
        //      ** buttons **
        // 

        HTML += "</td><td valign='top'><br>"

          + "<span onclick=\"moveSelected(\'" + widgetId + "-selected\',\'" + widgetId + "-unselected\')\">[&#8250;]</span>"
          + "<br>"
          + "<span onclick=\"moveSelected(\'" + widgetId + "-unselected\',\'" + widgetId + "-selected\')\">[&#8249;]</span>"
          + "<br></td>"
        ;



        //
        //      ** unselected **
        // 


        HTML += "<td valign='top'>"
         + "<select id=\'" + widgetId + "-unselected' multiple "
         + "name='meta_values_" + widgetId + "::" + tableName + "." + colName + "' size='" + listLen + "'"
         + "ondblclick=\"moveSelected(\'" + widgetId + "-unselected\',\'" + widgetId + "-selected\');\">"
        ;

        for(var i=0;i<unselected.length;i++) {
		var optionName;
		if (selected[i][1]) {
			optionName=unselected[i][1];
		}
		else {
			optionName=unselected[i][0];
		}
                HTML += "<option value='" + unselected[i][0] + "'>" + optionName + "</option>";    
        }
        
        HTML += "</select><br>";
	HTML += "<select name='meta_mode_" + widgetId + "'>";
	HTML += "<option value='LIKE'>" + strings[language]['choose'] + "</option><option value='NOT LIKE'";
	if (mode == 'NOT LIKE') {
		HTML += " selected";
	}
	HTML += ">" + strings[language]['exclude'] + "</option></select>";



       HTML += "</div></td></tr></table>";	

        document.write(HTML);

	var idAll= widgetId + "-alle";
        if (widgetContent[idAll]) {   
             var selected_all = widgetContent[idAll].selected;	
        }

	var detailsName = widgetName + " (" + strings[language]['details'] + ")";

	if (selected_all) {
		// document.write('<br>');
		writeWidgetDoubleTable(idAll, detailsName, 'hidden')
	}

	document.write("</div>");


}





function writeWidgetFromTo(widgetId, widgetName, defaultPosition, note) {

	// temporary fix ...

            
	 widgetContent['pubdate']=new Array();
	 widgetContent['pubdate'].tablename="text";
	 widgetContent['pubdate'].colname="pubdate";

	 widgetContent['age']= new Array();
	 widgetContent['age'].tablename="author";
	 widgetContent['age'].colname="born";

	 widgetContent['time']= new Array();
	 widgetContent['time'].tablename="text";
	 widgetContent['time'].colname="time";


	 var tableName = widgetContent[widgetId].tablename;
	 var colName = widgetContent[widgetId].colname;

        var selected = widgetContent[widgetId].selected;

        var HTML='';

	 if (defaultPosition == 'hidden') {
	   HTML +=  "<div style='display:block' id='" + widgetId + "_show' " + "onClick=\"changeVisibility('" + widgetId + "_show','none');changeVisibility('" + widgetId + "','block');\"><span class='txt'>" + widgetName + "</span><img src='../html/img/plus.gif' />&nbsp;&nbsp;</div>"
	        + "<div  style='display:none' class='doubleTableTable' id='" + widgetId + "'>"
	}
	else {

	   HTML +=  "<div style='display:none' id='" + widgetId + "_show' " + "onClick=\"changeVisibility('" + widgetId + "_show','none');changeVisibility('" + widgetId + "','block');\"><span class='txt2'>" + widgetName + "</span><img src='../html/img/plus.gif' />&nbsp;&nbsp;</div>"
	   + "<div  style='display:block' class='doubleTableTable' id='" + widgetId + "'>"
	}

       HTML += "<div id='" + widgetId + "_show' " + "onClick=\"resetFromTo('" + widgetId + "'); changeVisibility('" + widgetId + "_show','block');changeVisibility('" + widgetId + "','none');\"><span class='txt2'>" + widgetName + "</span><img src='../html/img/minus.gif' />&nbsp;&nbsp;</div>";


	HTML += "<input id='" + widgetId + "-from' name='meta_values_" + widgetId + "::" + tableName + "." + colName + "' size='4'></input> " + strings[language]['from'] + "<br>";


	HTML += "<input id='" + widgetId + "-to' name='meta_values_" + widgetId + "::" + tableName + "." + colName + "' size='4'></input> " + strings[language]['to'] + "<br>";
	HTML += "<input name='meta_mode_" + widgetId + "' type='hidden' value='range'></input>";


	HTML += note;
       HTML += "</div></div>";


       document.write(HTML);

}

function writeWidgetRadio(widgetId, widgetName, defaultPosition) {

    var selected = widgetContent[widgetId].selected;
    var tableName = widgetContent[widgetId].tablename;
    var colName = widgetContent[widgetId].colname;

    var HTML='';

	 if (defaultPosition == 'hidden') {
	   HTML +=  "<div style='display:block' id='" + widgetId + "_show' " + "onClick=\"changeVisibility('" + widgetId + "_show','none');changeVisibility('" + widgetId + "','block');\"><span class='txt' id='"+widgetId+"_span'>" + widgetName + "</span><img src='../html/img/plus.gif' />&nbsp;&nbsp;</div>"
	        + "<div  style='display:none' class='doubleTableTable' id='" + widgetId + "'>"
	}
	else {

	   HTML +=  "<div style='display:none' id='" + widgetId + "_show' " + "onClick=\"changeVisibility('" + widgetId + "_show','none');changeVisibility('" + widgetId + "','block');\"><span class='txt2' id='"+widgetId+"_span'>" + widgetName + "</span><img src='../html/img/plus.gif' />&nbsp;&nbsp;</div>"
	   + "<div  style='display:block' class='doubleTableTable' id='" + widgetId + "'>"
	}

       HTML += "<div id='" + widgetId + "_show' " + "onClick=\"resetCheck('" + widgetId + "'); changeVisibility('" + widgetId + "_show','block');changeVisibility('" + widgetId + "','none');\"><span class='txt2' id='"+widgetId+"_span'>" + widgetName + "</span><img src='../html/img/minus.gif' />&nbsp;&nbsp;</div>";


       for(var i=0;i<selected.length;i++) {

		var optionValue=selected[i][0];
		var optionName=selected[i][1];

	       HTML += "<input type='radio' id='" + widgetId + "_" + i + "' name='meta_values_" + widgetId + "::" + tableName + "." + colName + "' value='" + optionValue + "'></input> " + optionName + "<br>";

	}

	HTML += "<input name='meta_mode_" + widgetId + "' type='hidden' value='check'></input>";
       HTML += "</div></div>";


       document.write(HTML);

}


function writeWidgetCheck(widgetId, widgetName, defaultPosition) {

       var selected = widgetContent[widgetId].selected;
	var tableName = widgetContent[widgetId].tablename;
	var colName = widgetContent[widgetId].colname;

        var HTML='';

	 if (defaultPosition == 'hidden') {
	   HTML +=  "<div style='display:block' id='" + widgetId + "_show' " + "onClick=\"changeVisibility('" + widgetId + "_show','none');changeVisibility('" + widgetId + "','block');\"><span class='txt'>" + widgetName + "</span><img src='../html/img/plus.gif' />&nbsp;&nbsp;</div>"
	        + "<div  style='display:none' class='doubleTableTable' id='" + widgetId + "'>"
	}
	else {

	   HTML +=  "<div style='display:none' id='" + widgetId + "_show' " + "onClick=\"changeVisibility('" + widgetId + "_show','none');changeVisibility('" + widgetId + "','block');\"><span class='txt2'>" + widgetName + "</span><img src='../html/img/plus.gif' />&nbsp;&nbsp;</div>"
	   + "<div  style='display:block' class='doubleTableTable' id='" + widgetId + "'>"
	}

       HTML += "<div id='" + widgetId + "_show' " + "onClick=\"resetCheck('" + widgetId + "'); changeVisibility('" + widgetId + "_show','block');changeVisibility('" + widgetId + "','none');\"><span class='txt2'>" + widgetName + "</span><img src='../html/img/minus.gif' />&nbsp;&nbsp;</div>";


       for(var i=0;i<selected.length;i++) {

		var optionValue=selected[i][0];
		var optionName=selected[i][1];

	       HTML += "<input type='checkbox' id='" + widgetId + "_" + i + "' name='meta_values_" + widgetId + "::" + tableName + "." + colName + "' value='" + optionValue + "'></input> " + optionName + "<br>";

	}

	HTML += "<input name='meta_mode_" + widgetId + "' type='hidden' value='check'></input>";
       HTML += "</div></div>";


       document.write(HTML);

}


//
// auxilliary functions
// 

function moveSelected(s,t){

   var ops=document.getElementById(s);
   var tgt=document.getElementById(t);

   var l=ops.length-1;
   var obj;// for IE!
   for(var j=l;j>=0;j--){ //go backwards through the array, due to re-indexing on elt-removal!
      if(ops[j].selected){
	 try{
	    tgt.add(ops[j],null);// for mozilla. this is standards compliant!
	 }
	 catch(ex){ //this bit's for IE. since it works on both i could've dropped.. oh well.
	    obj=new Option();
	    obj.text=ops[j].text;
	    obj.value=ops[j].value;
	    tgt.add(obj);
	    ops.remove(j);
	 }
      }
   }
   for(var i=0; i<tgt.length;i++){tgt[i].selected=false;}

   sortSelect(tgt);

}


function resetDoubleTable (id) {

	lId=id+"-selected";
	rId=id+"-unselected";

	var select = document.getElementById(rId);
	var Options = select.options;
	var l = Options.length;
	for (var k=0;k<l;k++) {
		Options[k].selected = true;
	}

	moveSelected(rId,lId)

}


function resetFromTo (id) {

	fId=id+"-from";
	tId=id+"-to";

	var from = document.getElementById(fId);
	from.value="";

	var to= document.getElementById(tId);
	to.value="";

}

function resetCheck (id) {

       var selected = widgetContent[id].selected;

       for(var i=0;i<selected.length;i++) {

		var checkId = id + "_" + i;
		var check = document.getElementById(checkId);
		check.checked=false;
	}

}


function sortSelect(obj) {

        o=new Array();

        for (var i=0; i<obj.options.length; i++) {
	   o[o.length] 
                = new Option( 
                        obj.options[i].text,
                        obj.options[i].value,
                        obj.options[i].defaultSelected,
                        obj.options[i].selected
                );
        }

        o = o.sort (
                function(a,b) { 
	         if ((a.text+"") < (b.text+"")) { return -1; }
	         if ((a.text+"") > (b.text+"")) { return 1; }
	         return 0;
	       } 
        );

        for (var i=0; i<o.length; i++) {
	    obj.options[i] 
                = new Option(
                        o[i].text,
                        o[i].value,
                        o[i].defaultSelected,
                        o[i].selected
                );
        }

}


