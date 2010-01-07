<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.0//EN"  "http://www.w3.org/TR/REC-html40/strict.dtd">
<html>
 <head>
  <script language="JavaScript" src="http://omilia.uio.no/glossa/js/showtag.js"></script>
  <script language="JavaScript" src="http://omilia.uio.no/glossa/js/AC_QuickTime.js"></script>
  <link href="http://omilia.uio.no/glossa//html/tags.css" rel="stylesheet" type="text/css"></link>
  <style>
body {
    margin: 0px 0px 0px 0px;
    padding: 0px 0px 0px 0px;
    font-family: verdana, arial, helvetica, sans-serif;
    color: #000; /* was ccc */
    font-size: 10px;
    line-height: 16px;
    margin-top: 12px;
    margin-bottom: 10px;
    background-color: #fff;
}
div.txt{
	position: absolute;
	top: 0px;
	left:0px;
	padding: 5px;
	border: 0px solid #000;
	background: #fff;
	width: 500px;
        height: 260px; 
}
div.iframe{
	position: absolute;
	top: 0px;
	left:0px;
	padding: 0px;
	border: 0px solid #000;
	background: #fff;
	width: 560px;
        height: 260px;
}
div.mov{
	position: absolute;
	top: 0px;
	left:530px;
	padding: 5px;
	border: 0px solid #000;
/*	background: #fff;
	width: 500px; 
	height: 250px; 
	float: right; */
}
div.ctrl{
	position: absolute;
	top: 0px;
        left:864px;
	padding: 5px;
	border: 0px solid #000;
	background: #fff;
	width: 100px;
	height: 260px;

}
table.res{
/*	width: 100%; */
	border : 0px solid #aaa;
	font-size:9px;
	background-color:#fff;
}
  </style>
</head>
<body>
<?php

  // INIT


$texts["no"]["tit"] = "<h4>Informasjon om informant <i>%s</i> i %skorpuset</h4>\n";
$texts["en"]["tit"] = "<h4>Informant details for <i>%s</i> in the %s corpus</h4>\n";
$texts["en"]["sorry"] = "<h4>Sorry, no data available on informant <i>%s</i>.</h4>";
$texts["no"]["sorry"] = "<h4>Beklager, ingen opplysninger om informant <i>%s</i> i databasen.</h4>";


$tid  = $_GET['tid'];
$corpus  = $_GET['corpus'];

//$conf = "/hf/foni/tekstlab/glossa-0.7/dat/$corpus/cgi.conf";
$conf = $configdir . $corpus ."/cgi.conf";

$file = fopen($conf, "r") or exit ("Kan ikke åpne konfigurasjonsfila: $conf");

while(!feof($file)){
    $line = fgets($file);
    if (ereg('^\#', $line)){ continue; }
    $split = split('=', $line);
    $conf_array[trim($split[0])] = trim($split[1]);
}

fclose($file);

$lang = $conf_array["lang"];

if($conf_array["lang"] == 'no'){

    print "<h4>Informasjon om informant <i>$tid</i> i " . ucfirst($corpus) . "korpuset</h4>\n";

}
else{print "<h4>Informant details for <i>$tid</i> in the " . ucfirst($corpus) . " corpus</h4>\n";}

$database = $conf_array["db_name"];
$user = $conf_array["db_uname"];
$pass = $conf_array["db_pwd"];
$dbhost = $conf_array["db_host"];

$meta = $conf_array["meta_text"];
$alias = $conf_array["meta_text_alias"];

$meta_string = preg_replace ( "/ /", ",", $meta );
$meta = split("/ /", $meta);

$alias = split("\t", $alias);

$table = strtoupper($corpus)."author";

$session = mysql_connect ($dbhost, $user, $pass)
     or die ('I cannot connect to the database because: '
             . mysql_error());

mysql_select_db ($database, $session);

$profile = "SELECT $meta_string FROM $table WHERE tid = '$tid'";

print "<b>" . $profile . "</b>";

$profile = mysql_query($profile);
$profile = mysql_fetch_row($profile);

if(!$profile){
    
    print "!!!";
    printf($texts[$lang]["sorry"], $tid);

}

else{
    print "<table border='1 ' cellspacing='0'>\n<tr>\n";

    foreach ($alias as $val){

	print "<td><b>" . ucfirst($val) . "</b></td>\n";

    }

    print "</tr>\n<tr align='left'>\n";

    $profile = join("</td>\n<td>", $profile);
    print "<td>" . $profile . "</td>\n";
 
/*

foreach ($profile as $value){

    print "<td>$value</td>\n";

}
*/
    print "</tr>\n<table>\n";
}
?>
<body>
<html>