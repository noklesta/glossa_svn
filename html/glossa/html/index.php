<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.0//EN"
            "http://www.w3.org/TR/REC-html40/strict.dtd">
<html>
 <head>





<?php
  // ** initialize Glossa ** //  
  $htmlRoot = 'http://corp.hum.sdu.dk/glossa/';
  $cgiRoot = 'http://corp.hum.sdu.dk/cgi-bin/glossa/';
  $corpus = $_GET['corpus'];
  $corpus = ereg_replace("[^A-Za-z0-9]", "", $corpus); # for safety
  $def_base_corpus = strtoupper($corpus);
  $subcorpus = $_GET['subcorpus'];
  $corpus = ereg_replace("[^A-Za-z0-9]", "", $corpus); # for safety
  include("glossa.inc");
?>



 <link rel="stylesheet" type="text/css" href="

<?php echo $htmlRoot ?>/html/CE.css">

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


  echo "<script language='javascript' src='" . $htmlRoot . "/js/plainmenu.js'></script>";
  echo "<script language='javascript' src='" . $htmlRoot . "/js/" . $corpus . ".js'></script>";


?>






 <script language="javascript">
  var title = "<title>" + conf['title'] + "</title>";
  document.write(title);


 </script>







</head>
<body>

<div style="background-color:gray;color:white">
<table width='100%'>
<tr>
 <td><b>
<b> <script language="javascript">document.write(conf['corpus_name'])</script></b>

</b> </td>
 <td>
 Glossa (  
 <?php echo "<a href='" . $cgiRoot . "/get_hits.cgi?corpus=" . $_GET['corpus'] . "'>stored results</a> | "; ?>
 <?php echo "<a href='" . $htmlRoot . "/html/stats.php?corpus=" . $corpus . "&base_corpus=" . $def_base_corpus . "'>statistics</a> | "; ?>
 <?php echo "<a href='" . $htmlRoot . "/html/index_dev.php?fullQuery=yes&corpus=" . $_GET['corpus'] . "'>fullquery</a> | "; ?>
 <?php echo "<a target='_new' href='" . $htmlRoot . "/html/GLOSSA_manual.html'>help</a>"; ?> 
 )
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
        !!!!  tabellstrukturen i glossa_text.inc bør være uavhengig .... 
-->


<table id="query_table" cellpadding="10" cellspacing="10" border=0>

<?php include('glossa_text.inc') // * Glossa * // ?>






     <td style="background-color:#efefef;border-width:1px;border-style:solid;border-color:#afaeae">
     <script language="javascript">

       document.write("<input type='submit' value='");
     //document.write("<input type='button' onClick='submitForm()' value='");
       document.write(strings[language]['search']);
       document.write("'>");
    </script><br><br>
     <script language="javascript">
       document.write("<input type='button' onClick='window.location.reload()()' value='");
       document.write(strings[language]['reset']);
       document.write("'>");
    </script>
     </td>
</tr>










<tr><td style="background-color:#efefef;border-width:1px;border-style:solid;border-color:#afaeae" valign="top">

<?php 

if (file_exists($corpus.ing)) {
  include($corpus.inc);
}
?>



</td>



 <!-- felles --> 
<td valign='top' style="background-color:#efefef;border-width:1px;border-style:solid;border-color:#afaeae">
<?php 
 $lang['en']['show_texts']='Show texts'; 
 $lang['en']['save_subcorpus']='Save subcorpus'; 
 $lang['en']['choose_subcorpus']='Choose subcorpus'; 
?>
<input type="button" onClick="setAction('<?php echo $cgiRoot ?>/meta_direct.cgi');" value="<?php echo $lang['en']['show_texts'] ?>" /><br><br>
<input type="button" onClick="setAction('<?php echo $cgiRoot ?>/meta_save_choose.cgi');" value="<?php echo $lang['en']['save_subcorpus'] ?>" />
<br><br>

<?php 

echo "<a href='" . $cgiRoot . "subcorpus_choose.cgi?corpus=" . $corpus . "'>";
echo $lang['en']['choose_subcorpus'];
echo "</a>";

?>



</td></tr>
<tr><td valign='top' style="background-color:#efefef;border-width:1px;border-style:solid;border-color:#afaeae">
<span class="txt">
Display: 
<select name='structDisplay'>
<option></option>
<script language='javascript'>printDisplayOptions()</script>

</select>


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

<tr><td><font color='red'><b>

<script language='javascript'>
if (domLib_isOpera) { document.write("The Glossa interface has some minor problems with The Opera browser.<br> We recommend using Firefox (or Internet Explorer).") }
if (domLib_isSafari) { document.write("The Glossa interface has some problems with The Safari browser. <br>We recommend using Firefox (or Internet Explorer).") }
if (domLib_isKonq) { document.write("The Glossa interface has significant problems with The Konqueror browser. <br>We recommend using Firefox (or Internet Explorer).") }
</script>


<p>Caution: This page is currently undergoing development. <br>Some things will be broken.</td></tr>


</table>

</form>


</td>
<td valign='top'>

<?php

$credfile = "$corpus" . "_cred.inc";
if (file_exists($credfile)) {
  include($credfile);
}

?>

</td>
</tr>
</table>

<script language="javascript">
setFocus();
</script>


<br>
<br><br><br><br><br><br><br><br><br><br><br>

</div>
</body>
</html>