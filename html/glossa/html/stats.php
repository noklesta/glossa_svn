<html>
<head>


 <meta http-equiv="Content-Type" content="text/html;charset=iso-8859-1" >
 <link rel="stylesheet" type="text/css" href="http://corp.hum.sdu.dk/glossa/html/CE.css">


<?php
  // ** initialize Glossa ** //  
  $htmlRoot = 'http://omilia.uio.no/glossa/';
  $cgiRoot = 'http://omilia.uio.no/cgi-bin/glossa/';
  $corpus = $_GET['corpus'];
  $subcorpus = $_GET['subcorpus'];
  include("glossa.inc");
?>

<?php printJsHead();   // ** Glossa ** //   ?>

</head>
<body style='margin:15'>


<h1>Generate lexical statistics for 

<?php 
  echo $_GET['corpus']; 
  echo " (";
  echo $_GET['base_corpus'];
  echo ")";
?> 
</h1>

<form action=" <?php echo $cgiRoot ?>/stats2.cgi" method="GET">


<?php 
echo "<input type=\"hidden\" name=\"corpus\" value=\""; echo $_GET['corpus']; echo "\" />";
echo "<input type=\"hidden\" name=\"base_corpus\" value=\""; echo $_GET['base_corpus']; echo "\" />";

 ?> 

<b>include:</b><br> 
<input type="checkbox" name="include_form" />word form </br> 
<input type="checkbox" name="include_lemma" checked />lemma form </br> 
<input type="checkbox" name="include_pos"  />Part-of-Speech </br> 
<br>

<b>POS filter:</b>
<select name="pos">

<?php 
if ($_GET['corpus'] == 'bokmal') {
 echo "<option value=''></option>
 <option value='s'>noun</option>
 <option value='v'>verb</option>
 <option value='pron'>pronoun</option>
 <option value='adj'>adjective</option>
 <option value='adv'>adverb</option>";
}
else {
 echo "<option value=''></option>
 <option value='n'>noun</option>
 <option value='v'>verb</option>
 <option value='pron'>pronoun</option>
 <option value='adj'>adjective</option>
 <option value='adv'>adverb</option>";
}
?>

</select> &nbsp; <b>cutoff:</b> <input name="cutoff" type="text" size=5 value=1000 /><br>
<br>

<b>format:</b> <select name="format">
          <option value="html">html</option>
          <option value="tsv" disabled>tab separated values</option>
          <option value="csv" disabled>comma separated values</option>
          <option value="excel" disabled>excel spreadsheet</option>
          <option value="histogram" disabled>histogram</option>
        </select>

<br><br>

<input type="button" onClick="submitForm()" value="submit"/>
<input type="reset" />

<br><br>

<table>

<tr><td style="background-color:#efefef;border-width:1px;border-style:solid;border-color:#afaeae">

<?php 

if ( $_GET['corpus'] == 'bokmal' ) {
  include("bokmal.inc");
}
elseif ( $_GET['corpus'] == 'omc' ) {
  include("omc.inc");
}
elseif ( $_GET['corpus'] == 'omc4' ) {
  include("omc.inc");
}
elseif ( $_GET['corpus'] == 'sami' ) {
  include("sami.inc");
}
elseif ( $_GET['corpus'] == 'test' ) {
  include("test.inc");
}

?>


</td></tr></table>

</form>


</body>
</html>