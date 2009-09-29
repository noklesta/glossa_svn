<?php

// * initialize * //


function printJsHead() {

  global $htmlRoot;
  global $corpus;
  global $cgiRoot;
  global $subcorpus;
  echo "<script language='JavaScript' src='" . $htmlRoot . "/js/dommenu-0.3.5/domLib.js'></script>\n"
     . "<script language='JavaScript' src='" . $htmlRoot . "/js/dommenu-0.3.5/domMenu.js'></script>\n"
     . "<script language='JavaScript' src='" . $htmlRoot . "/js/language.js'></script>\n"
     . "<script language='JavaScript' src='" . $htmlRoot . "/js/meta.js'></script>\n"
     . "<script language='javascript'>var Menu=new Array;</script>\n"
     . "<script language='JavaScript' src='" . $htmlRoot . "/js/misc.js'></script>\n"
     . "<script language='JavaScript' src='" . $cgiRoot . "/javascript_arrays_from_database.cgi?corpus=" 
       . $corpus . "&subcorpus=" 
       . $subcorpus . "'></script>\n"
     . "<script language='JavaScript' src='" . $htmlRoot . "/js/shortcuts.js'></script>\n"
     . "<script language='JavaScript' src='" . $htmlRoot . "/js/" . $corpus . ".conf.js'></script>\n"
     . "<script language='JavaScript' src='" . $htmlRoot . "/js/dynamic_form_dev.js'></script>\n\n"
   ;




}



?>