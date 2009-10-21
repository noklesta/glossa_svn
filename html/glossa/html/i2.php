<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.0//EN"  "http://www.w3.org/TR/REC-html40/strict.dtd">
<html>
 <head>
<?php 

if ( $_GET['corpus'] == 'run' ){
?><META HTTP-EQUIV="Content-Type" CONTENT="text/html; charset=UTF-8"><?php
	}
elseif ( $_GET['corpus'] == 'mak' ) {
?><META HTTP-EQUIV="Content-Type" CONTENT="text/html; charset=ISO-8859-5"><?php
}
elseif ( $_GET['corpus'] == 'latvian' ) {
?><META HTTP-EQUIV="Content-Type" CONTENT="text/html; charset=CP1257"><?php
}
else{
?><META HTTP-EQUIV="Content-Type" CONTENT="text/html; charset=ISO-8859-1"><?php
}

  // ** initialize Glossa ** //  
include("index.inc");
//  $htmlRoot = 'http://foni.uio.no/glossa';
//  $cgiRoot = 'http://foni.uio.no/cgi-bin/glossa2';
  $corpus = $_GET['corpus'];
  $uilang = $_GET['uilang'];
  $def_base_corpus = strtoupper($corpus);
  $subcorpus = $_GET['subcorpus'];
  include("glossa.inc");

if(!$uilang){
    $uilang = 'no';
}

if($corpus == 'scandiasyn'){ $uilang = 'en'; }

?>
 <!--<link rel="stylesheet" type="text/css" href="http://yui.yahooapis.com/2.7.0/build/reset/reset-min.css">-->
 <link rel="shortcut icon" href="http://omilia.uio.no/img/favicon.ico" type="image/ico" />
 <link rel="stylesheet" type="text/css" href="<?php echo $htmlRoot ?>/html/CE.css">

<?php printJsHead();   // ** Glossa ** //   ?>

<script language='javascript'>
  var charset='iso-8859-1';
  if (conf['charset']) {
    charset=conf['charset'];
  }

var a = "<meta http-equiv='Content-Type' content='text/html;charset=" + charset + "' >";
  document.write(a);

</script>

<?php 

// * get menus * // 

if ( $_GET['corpus'] == 'test' ) {
  echo "<script language='javascript' src='" . $htmlRoot . "/js/test.js'></script>";
}
elseif ( $_GET['corpus'] == 'omc' ) {
  echo "<script language='javascript' src='" . $htmlRoot . "/js/omc_en.js'></script>";
  echo "<script language='javascript' src='" . $htmlRoot . "/js/omc_fr.js'></script>";

  echo "<script language='javascript' src='" . $htmlRoot . "/js/omc_de.js'></script>";
  echo "<script language='javascript' src='" . $htmlRoot . "/js/omc_nl.js'></script>";

  echo "<script language='javascript' src='" . $htmlRoot . "/js/omc_no.js'></script>";

  echo "<script language='javascript' src='" . $htmlRoot . "/js/omc_po.js'></script>";
}
elseif ( $_GET['corpus'] == 'omc4' ) {
  echo "<script language='javascript' src='" . $htmlRoot . "/js/omc4_en.js'></script>";
  echo "<script language='javascript' src='" . $htmlRoot . "/js/omc4_fr.js'></script>";

  echo "<script language='javascript' src='" . $htmlRoot . "/js/omc4_de.js'></script>";
  echo "<script language='javascript' src='" . $htmlRoot . "/js/omc4_nl.js'></script>";

  echo "<script language='javascript' src='" . $htmlRoot . "/js/omc4_no.js'></script>";
  echo "<script language='javascript' src='" . $htmlRoot . "/js/omc4_po.js'></script>";
}
elseif ( $_GET['corpus'] == 'run' ) {
  echo "<script language='javascript' src='" . $htmlRoot . "/js/run_no.js'></script>";
  echo "<script language='javascript' src='" . $htmlRoot . "/js/run_ru.js'></script>";
  echo "<script language='javascript' src='" . $htmlRoot . "/js/run_en.js'></script>";
}
elseif ( $_GET['corpus'] == 'sami' ) {

}
elseif ($_GET['corpus'] == 'nota' ) {
  echo "<script language='javascript' src='" . $htmlRoot . "/js/nota.js'></script>";

}
elseif ($_GET['corpus'] == 'demo' ) {
  echo "<script language='javascript' src='" . $htmlRoot . "/js/demo.js'></script>";

}
elseif ($_GET['corpus'] == 'upus' ) {
  echo "<script language='javascript' src='" . $htmlRoot . "/js/upus.js'></script>";

}
elseif ($_GET['corpus'] == 'upus2' ) {
  echo "<script language='javascript' src='" . $htmlRoot . "/js/upus2.js'></script>";

}
elseif ($_GET['corpus'] == 'scandiasyn' ) {
  echo "<script language='javascript' src='" . $htmlRoot . "/js/scandiasyn.js'></script>";

}
elseif ($_GET['corpus'] == 'bigbrother' ) {
  echo "<script language='javascript' src='" . $htmlRoot . "/js/bigbrother.js'></script>";
  
}
elseif ($_GET['corpus'] == 'taus') {
  echo "<script language='javascript' src='" . $htmlRoot . "/js/taus.js'></script>";

}
elseif ( $_GET['corpus'] == 'bokmal' ) {
  echo "<script language='javascript' src='" . $htmlRoot . "/js/bokmal.js'></script>";

}
elseif ( $_GET['corpus'] == 'samno' ) {
  echo "<script language='javascript' src='" . $htmlRoot . "/js/samno_samisk.js'></script>";
  echo "<script language='javascript' src='" . $htmlRoot . "/js/samno_norsk.js'></script>";

}
elseif ( $_GET['corpus'] == 'bul' ) {
  echo "<script language='javascript' src='" . $htmlRoot . "/js/bul.js'></script>";
}
elseif ( $_GET['corpus'] == 'euro_news_fr1' ) {
  echo "<script language='javascript' src='" . $htmlRoot . "/js/euro_news_fr1.js'></script>";
}
elseif ( $_GET['corpus'] == 'euro_news_fr2' ) {
  echo "<script language='javascript' src='" . $htmlRoot . "/js/euro_news_fr2.js'></script>";
}
elseif ( $_GET['corpus'] == 'euro_news_fr3' ) {
  echo "<script language='javascript' src='" . $htmlRoot . "/js/euro_news_fr3.js'></script>";
}
elseif ( $_GET['corpus'] == 'euro_news_fr4' ) {
  echo "<script language='javascript' src='" . $htmlRoot . "/js/euro_news_fr4.js'></script>";
}
elseif ( $_GET['corpus'] == 'usenet' ) {
  echo "<script language='javascript' src='" . $htmlRoot . "/js/usenet.js'></script>";
}
elseif ( $_GET['corpus'] == 'mak' ) {
  echo "<script language='javascript' src='" . $htmlRoot . "/js/mak.js'></script>";
}
elseif ( $_GET['corpus'] == 'latvian' ) {
  echo "<script language='javascript' src='" . $htmlRoot . "/js/latvian.js'></script>";
}


?>

 <script language="javascript">

  var title = "<title>" + conf['title'] + "</title>";
  document.write(title);

 </script>
</head>
<body>
<div style="background-color:gray;color:white">
<table width='100%' border='0'>
<tr>
 <td><b>
 <b>
 <script language="javascript">document.write(conf['corpus_name'])</script></b>
 </b>
 </td>
 <td width='150px'>

 </td>
 <td>
 Glossa (
 <?php echo "<a id='stored_results' target='_blank' href='" . $cgiRoot . "/get_hits.cgi?corpus=" . $_GET['corpus'] . "'>my results</a> | "; ?>
 <?php echo "<a id='annotations' target='_blank' href='" . $cgiRoot . "/annotation_sets.cgi?corpus=" . $_GET['corpus'] . "'>my annotations</a> | "; ?>

 <?php
 if($corpus=='nota' || $corpus=='upus' || $corpus=='scandiasyn' || $corpus=='upus2' || $corpus=='demo' || $corpus=='bigbrother'){
     echo "<span id='statistics'>statistics</span> | ";
     echo "<span id='full_query'>full query</span> | ";
 }
 else{?>
 
 <?php echo "<a id='statistics' target='_blank' href='" . $htmlRoot . "/html/stats.php?corpus=" . $corpus . "&base_corpus=" . $def_base_corpus . "'>statistics</a> | "; ?>
 <?php echo "<a id='full_query' target='_blank' href='" . $htmlRoot . "/html/index_dev.php?fullQuery=yes&corpus=" . $_GET['corpus'] . "'>full query</a> | "; ?>

 <?php
 }
 ?>
 <?php echo "<a id='help' target='_new' href='" . $htmlRoot . "/html/GLOSSA_manual.html'>help</a>"; ?> )
 </td>
 <td>
 <?php
 if($corpus == 'nota' or $corpus == 'demo'){
     ?>
     <span style='color: yellow;cursor: pointer;' id='lang' onclick='toggleLang();'>Norsk</span>
     <?php
 }
 ?>
</td>
 <td width='40%'>

 </td>
 </tr>
</table>

</div>

 <table>
<tr>
<td>


<form action="
 <?php echo $cgiRoot ?>
/query_dev.cgi" method="POST" onSubmit='submitForm(); return false'  onReset="hideAll()">


<!-- 
        !!!!  tabellstrukturen i glossa_text.inc bУИr vУІre uavhengig .... 
-->

<table id="query_table" cellpadding="10" cellspacing="10" border="0">

<?php include('glossa_text.inc') // * Glossa * // ?>


     <td style="background-color:#efefef;border-width:1px;border-style:solid;border-color:#afaeae">
     <script language="javascript">

       document.write("<input id='search' type='submit' value='");
     //document.write("<input type='button' onClick='submitForm()' value='");

       document.write(strings[language]['search']);
       document.write("'>");
    </script><br><br>
     <script language="javascript">
       document.write("<input id='reset' type='button' onClick='window.location.reload()()' value='");
       document.write(strings[language]['reset']);
       document.write("'>");
    </script>
     </td>
</tr>








<?php if(strpos($_GET['corpus'], 'euro_news_fr') === false) { ?>


<tr><td style="background-color:#efefef;border-width:1px;border-style:solid;border-color:#afaeae" valign="top">

<?php 



if ( $_GET['corpus'] == 'test' ) {
  include("test.inc");
}
elseif ( $_GET['corpus'] == 'omc' ) {
  include("omc.inc");
}
elseif ( $_GET['corpus'] == 'omc4' ) {
  include("omc.inc");
}
elseif ( $_GET['corpus'] == 'run' ) {
  include("run.inc");
}
elseif ( $_GET['corpus'] == 'sami' ) {

}
elseif ( $_GET['corpus'] == 'nota') {
  include("nota.inc");
}
elseif ( $_GET['corpus'] == 'demo') {
  include("demo.inc");
}
elseif ( $_GET['corpus'] == 'scandiasyn' ) {
  include("scandiasyn.inc");
}
elseif ( $_GET['corpus'] == 'bigbrother' ) {
  include("bigbrother.inc");
}
elseif ( $_GET['corpus'] == 'upus' ) {
  include("upus.inc");
}
elseif ( $_GET['corpus'] == 'upus2' ) {
  include("upus2.inc");
}
elseif ( $_GET['taus'] == 'taus' ) {
  include("taus.inc");
}
elseif ( $_GET['corpus'] == 'bokmal' ) {
  include("bokmal.inc");
}
elseif ( $_GET['corpus'] == 'samno' ) {
  include("samno.inc");
}

elseif ( $_GET['corpus'] == 'bul' ) {
  include("bul.inc");
}
elseif ( $_GET['corpus'] == 'euro_news_fr1' ) {
  include("euro_news_fr1.inc");
}
elseif ( $_GET['corpus'] == 'euro_news_fr2' ) {
  include("euro_news_fr2.inc");
}
elseif ( $_GET['corpus'] == 'usenet' ) {
  include("usenet.inc");
}
elseif ( $_GET['corpus'] == 'mak' ) {
  include("mak.inc");
}
elseif ( $_GET['corpus'] == 'latvian' ) {
  include("latvian.inc");
}

?>



</td>



 <!-- felles --> 
<td valign='top' style="background-color:#efefef;border-width:1px;border-style:solid;border-color:#afaeae">
<?php

 $lang['en']['show_texts']='Show texts'; 
 $lang['en']['save_subcorpus']='Save subcorpus'; 
 $lang['en']['choose_subcorpus']='Choose subcorpus'; 
 $lang['no']['show_texts']='Vis tekster'; 
 $lang['no']['save_subcorpus']='Lagre subkorpus'; 
 $lang['no']['choose_subcorpus']='Velg subkorpus'; 

?>
<?php

 if($corpus=='nota' || $corpus=='upus' || $corpus=='scandiasyn' || $corpus=='upus2' || $corpus=='demo' || $corpus=='bigbrother'){
?>
<input type="button" id="show_texts_alt" onClick="setAction('profiles.php');" value="<?php echo $lang['en']['show_texts'] ?>" /><br><br>
<?php
	 }
 else{
?>
<input type="button" id="show_texts" onClick="setAction('<?php echo $cgiRoot; ?>/meta_direct.cgi');" value="<?php echo $lang['no']['show_texts'] ?>" /><br><br>
<?php
	 }
//if($corpus != 'nota'){
?>
<input type="button" id="save_subcorpus" onClick="setAction('<?php echo $cgiRoot ?>/meta_save_choose.cgi');" 
<?php 

     echo "value=\"" . $lang[$uilang]['save_subcorpus'] . "\""; 

?>
 />

<?php
//}
?>
<br><br>

<?php
//if($corpus != 'nota' and $corpus != 'demo'){
    echo "<a id='choose_subcorpus' href='" . $cgiRoot . "subcorpus_choose.cgi?corpus=" . $corpus . "'>";
 echo $lang[$uilang]['choose_subcorpus'];
    echo "</a>";
//}
?>
</td></tr>
<?php } ?>

<?php
if($corpus != 'nota' and $corpus != 'demo'){
?>

<tr><td valign='top' style="background-color:#efefef;border-width:1px;border-style:solid;border-color:#afaeae">

<?php if(strpos($_GET['corpus'], 'euro_news_fr') === false) { ?>
<span class="txt">
Display: 
<select name='structDisplay'>
<option></option>
<script language='javascript'>printDisplayOptions()</script>
</select>
<?php } ?>

&nbsp; &nbsp; &nbsp;
Search within: 
<select name='searchWithin'>
<option></option>
 <option value="last"> - last search - </option>
</select>

</span>
</td>
<td>
</td>
</tr>
<?php
}
?>

<tr><td><font color='red'><b>

<script language='javascript'>
if (domLib_isOpera) { document.write("The Glossa interface has some minor problems with The Opera browser.<br> We recommend using Firefox (or Internet Explorer).") }
if (domLib_isSafari) { document.write("The Glossa interface has some problems with The Safari browser. <br>We recommend using Firefox (or Internet Explorer).") }
if (domLib_isKonq) { document.write("The Glossa interface has significant problems with The Konqueror browser. <br>We recommend using Firefox (or Internet Explorer).") }
</script>

<table border="0">
<tr>
<td valign="top">
<img src="http://omilia.uio.no/img/tri.png" alt="caution"><br />
Denne Glossaversjonen er under utvikling.<br />
This version of Glossa is undergoing development.
</td>
<td width="330" valign="top" align="right">
Please report bugs and errors <a href="https://nettskjema.uio.no/answer.html?fid=40969&lang=no" target="_blank">here</a><br /><br />
<a target="_blank" href='http://www.hf.uio.no/tekstlab'><img style='border-style: none' src='http://omilia.uio.no/img/logo.png' /></a>
</td>
</tr></table>
</td>
</tr>


</table>

</form>


</td>
<td valign='top'>

<?php

if ( $_GET['corpus'] == 'test' ) {
  include("test_cred.inc");
}
elseif ( $_GET['corpus'] == 'omc' ) {
  include("omc_cred.inc");
}
elseif ( $_GET['corpus'] == 'omc4' ) {
  include("omc_cred.inc");
}
elseif ( $_GET['corpus'] == 'run' ) {
  include("run_cred.inc");
}
elseif ( $_GET['corpus'] == 'sami' ) {

}
elseif ( $_GET['corpus'] == 'bokmal' ) {

}
elseif ( $_GET['corpus'] == 'samno' ) {
  include("samno_cred.inc");
}
elseif ( $_GET['corpus'] == 'upus2' ) {
  include("upus_cred.inc");
}
elseif ( $_GET['corpus'] == 'taus' ) {
  include("taus_cred.inc");
}

elseif ( $_GET['corpus'] == 'snakkis' ) {
  include("snakkis_cred.inc");
}

elseif ( $_GET['corpus'] == 'nota') {
  include("nota_cred.inc");
}

elseif ( $_GET['corpus'] == 'demo' ) {
  include("demo_cred.inc");
}
elseif ( $_GET['corpus'] == 'scandiasyn' ) {
  include("scandiasyn_cred.inc");
}

elseif ( $_GET['corpus'] == 'bigbrother' ) {
  include("bigbrother_cred.inc");
}
elseif ( $_GET['corpus'] == 'euro_news_fr1' ) {
  include("euro_news_fr1_cred.inc");
}
elseif ( $_GET['corpus'] == 'euro_news_fr2' ) {
  include("euro_news_fr2_cred.inc");
}
elseif ( $_GET['corpus'] == 'euro_news_fr3' ) {
  include("euro_news_fr3_cred.inc");
}
elseif ( $_GET['corpus'] == 'euro_news_fr4' ) {
  include("euro_news_fr4_cred.inc");
}
?>

</td>
</tr>
</table>

<script language="javascript">
setFocus();
<?php
 if($corpus == 'nota'){
     ?> 
 toggleLang();
     <?php
 }
 ?>

</script>


<br>
<br><br><br><br><br><br><br><br><br><br><br><hr />

</div>
</body>
</html>
