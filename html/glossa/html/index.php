<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.0//EN"
            "http://www.w3.org/TR/REC-html40/strict.dtd">
<!-- $Id$ -->
<html>
 <head>

<?php
  // ** initialize Glossa ** //  
include("index.inc");
  $corpus = $_GET['corpus'];
  $corpus = ereg_replace("[^A-Za-z0-9]", "", $corpus); # for safety
  $def_base_corpus = strtoupper($corpus);
  $subcorpus = $_GET['subcorpus'];
  $subcorpus = ereg_replace("[^A-Za-z0-9]", "", $subcorpus); # for safety
  include("glossa.inc");
?>

 <link rel="shortcut icon" href="<?php echo $favicon ?>" type="image/ico" />
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
	 <?php echo "<a href='" . $cgiRoot . "/get_hits.cgi?corpus=" . $_GET['corpus'] . "'>"; ?>
	 
	 <script language="javascript">
	 document.write(strings[language]['stored_results']);
	 </script>
	 <?php echo "</a> | "; ?>
	 <?php echo "<a href='" . $htmlRoot . "/html/stats.php?corpus=" . $corpus . "&base_corpus=" . $def_base_corpus . "'>"; ?>
	 <script language="javascript">
	 document.write(strings[language]['statistics']);
	 </script>
	 <?php echo "</a> | "; ?>
	 <?php echo "<a href='" . $htmlRoot . "/html/index_dev.php?fullQuery=yes&corpus=" . $_GET['corpus'] . "'>"; ?>
	 <script language="javascript">
	 document.write(strings[language]['full_query']);
	 </script>
         <?php echo "</a> | "; ?>
	 <?php echo "<a target='_new' href='" . $htmlRoot . "/html/GLOSSA_manual.html'>"; ?>
	 <script language="javascript">
	 document.write(strings[language]['help']);
	 </script>
	 <?php echo "</a>"; ?> 
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

if (file_exists($corpus . ".inc")) {
  include($corpus . ".inc");
}
?>



</td>



 <!-- felles --> 
<td valign='top' style="background-color:#efefef;border-width:1px;border-style:solid;border-color:#afaeae">

 <script language="javascript">
   document.write("<input type=\"button\" onClick=\"setAction('<?php echo $cgiRoot ?>/meta_direct.cgi');\" value=\"");
   document.write(strings[language]['show_text_list']);
   document.write("\" /><br /><br />");

   document.write("<input type=\"button\" onClick=\"setAction('<?php echo $cgiRoot ?>/meta_save_choose.cgi');\" value=\"");
   document.write(strings[language]['save_subcorpus']);
   document.write("\" /> <br /><br />");

   document.write("<a href='<?php echo $cgiRoot ?>/subcorpus_choose.cgi?corpus=<?php echo $corpus ?>'>");

   document.write(strings[language]['choose_subcorpus']);
   document.write("</a>");
 </script>



</td></tr>
<tr><td valign='top' style="background-color:#efefef;border-width:1px;border-style:solid;border-color:#afaeae">
<span class="txt">
<script language="javascript">
   document.write(strings[language]['display']);
   document.write(":");
</script>
<select name='structDisplay'>
<option></option>
<script language='javascript'>printDisplayOptions()</script>

</select>


&nbsp; &nbsp; &nbsp;
<script language="javascript">
   document.write(strings[language]['search_within']);
   document.write(":");
</script>
<select name='searchWithin'>
<option></option>
 <option value="last">
   <script language="javascript">
     document.write("- ");
     document.write(strings[language]['last_search']);
     document.write(" -");
   </script>
 </option>
</select>

</span>
</td>
<td>
</td>
</tr>

<tr><td><font color='red'><b>

<script language='javascript'>
  if (domLib_isOpera) { document.write(strings[language]['dom_opera']) }
  if (domLib_isSafari) { document.write(strings[language]['dom_safari']) }
  if (domLib_isKonq) { document.write(strings[language]['dom_konqueror']) }
</script>


<p>
<script language="javascript">
  document.write(strings[language]['bfw']);
</script>
</td></tr>


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
