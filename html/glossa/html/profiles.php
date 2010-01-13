<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.0//EN"  "http://www.w3.org/TR/REC-html40/strict.dtd">
<html>
 <head>
  <script language="JavaScript" src="http://omilia.uio.no/glossa/js/showtag.js"></script>
  <script language="JavaScript" src="http://omilia.uio.no/glossa/js/AC_QuickTime.js"></script>
  <link href="http://omilia.uio.no/glossa//html/tags.css" rel="stylesheet" type="text/css"></link>
<!--CSS file (default YUI Sam Skin) -->
<link type="text/css" rel="stylesheet" href="http://yui.yahooapis.com/2.6.0/build/datatable/assets/skins/sam/datatable.css">

<!-- Dependencies -->
<script type="text/javascript" src="http://yui.yahooapis.com/2.6.0/build/yahoo-dom-event/yahoo-dom-event.js"></script>
<script type="text/javascript" src="http://yui.yahooapis.com/2.6.0/build/element/element-beta-min.js"></script>
<script type="text/javascript" src="http://yui.yahooapis.com/2.6.0/build/datasource/datasource-min.js"></script>

<!-- OPTIONAL: JSON Utility (for DataSource) -->
<script type="text/javascript" src="http://yui.yahooapis.com/2.6.0/build/json/json-min.js"></script>

<!-- OPTIONAL: Connection Manager (enables XHR for DataSource) -->
<script type="text/javascript" src="http://yui.yahooapis.com/2.6.0/build/connection/connection-min.js"></script>

<!-- OPTIONAL: Get Utility (enables dynamic script nodes for DataSource) -->
<script type="text/javascript" src="http://yui.yahooapis.com/2.6.0/build/get/get-min.js"></script>

<!-- OPTIONAL: Drag Drop (enables resizeable or reorderable columns) -->
<script type="text/javascript" src="http://yui.yahooapis.com/2.6.0/build/dragdrop/dragdrop-min.js"></script>

<!-- OPTIONAL: Calendar (enables calendar editors) -->
<script type="text/javascript" src="http://yui.yahooapis.com/2.6.0/build/calendar/calendar-min.js"></script>

<!-- Source files -->
<script type="text/javascript" src="http://yui.yahooapis.com/2.6.0/build/datatable/datatable-min.js"></script>
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
        border : 1px solid #ccc;
	font-size:9px;
        background-color:#fff;
        border-collapse: separate;
        
}
  </style>
<?php

  // INIT

include("index.inc");

$texts["no"]["tit"] = "<h4>Informasjon om informant <i>%s</i> i %skorpuset</h4>\n";
$texts["en"]["tit"] = "<h4>Informant details for <i>%s</i> in the %s corpus</h4>\n";
$texts["en"]["sorry"] = "<h4>Sorry, no data available on informant <i>%s</i>.</h4>";
$texts["no"]["sorry"] = "<h4>Beklager, ingen opplysninger om informant <i>%s</i> i databasen.</h4>";


$tid  = $_GET['tid'];
$corpus = "";
$CORPUS = "";
foreach (array_keys($_POST) as $key) {
//  $$key = $_POST[$key];
#   print "$key is ${$key}<br />"; 
#    $gunk = (array)$_POST[$key];
#    print "$gunk:::($gunk[0]) - ($gunk[1]) - ($gunk[2])<br />";
    if (ereg('^meta_mode', $key)){ 

	preg_match('/[^_]+$/', $key, $matches);

	$operators[$matches[0]] = $_POST[$key]; //${$key};

    }

    if ( ereg( 'corpus$', $key ) ){ $CORPUS = strtoupper($_POST[$key]); $corpus = $_POST[$key];}

    if (ereg('^meta_value', $key)){ 

	preg_match('/[^:]+$/', $key, $matches);

	preg_match('/^([^\_]+)\_([^\_]+)$/', $matches[0], $rest);

#	print_r($rest);
	
	$not_of_interest = $rest[0];
	$table = $rest[1];
	$column = $rest[2];

	$value = join(",", $_POST[$key]);
	if(!$value){ $value = $_POST[$key];  }

	//	print "$key(((";print_r($_POST[$key]);print ")))[$value]<br / >";

	$columns[$column]  = $value ; 

    }

}

$conf = "/hf/foni/tekstlab/glossa-0.7/dat/$corpus/cgi.conf";

$conf = $configdir . $corpus ."/cgi.conf";
#$conf = "cgi.conf";

$file = fopen($conf, "r") or exit ("Kan ikke åpne konfigurasjonsfila: $conf");

while(!feof($file)){
    $line = fgets($file);
    if (ereg('^\#', $line)){ continue; }
    $split = split('=', $line);
    $conf_array[trim($split[0])] = trim($split[1]);
}

fclose($file);

$lang = $conf_array["lang"];

$database = $conf_array["db_name"];
$user = $conf_array["db_uname"];
$pass = $conf_array["db_pwd"];
$dbhost = $conf_array["db_host"];

$meta = $conf_array["meta_author"];
$alias = $conf_array["meta_author_alias"];

$meta_string = preg_replace ( "/ /", ",", $meta );
$meta = split(" ", $meta);

$alias = split("\t", $alias);

$table = strtoupper($corpus)."author";

$session = mysql_connect ($dbhost . ':/var/lib/mysql/mysql.sock', $user, $pass)
  or die ('I cannot connect to the database (' . $dbhost . ')  because: '
             . mysql_error());

mysql_select_db ($database, $session);

$profiles = "SELECT $meta_string FROM $table";

$total = "SELECT SUM(wc) FROM $table"; 

$first = 1;

foreach (array_keys($columns) as $key){
    $value = "";
    if($first){$profiles .= " WHERE ";}
    else{$profiles .= " AND ";}
    $first = 0;
    $opp = $operators[$key];
    if($opp == 'LIKE'){
	$opp = 'REGEXP';
	$value = preg_replace( "/,/", "|", $columns[$key] );
    }
    else{ $value = $columns[$key]; }
    if ($opp == 'check'){ $opp = '=';  }
    $profiles .= $key . " " . $opp . " '" . $value ."'";

}

if( $first ){ $profiles .= " WHERE "; }
 else{ $profiles .= " AND "; }

$profiles .= " active IS NOT NULL;";

$wcs = $profiles;


$wcs = preg_replace("/SELECT .+ FROM/", "SELECT SUM(wc) FROM", $wcs);

$total = mysql_query($total);

$total = mysql_fetch_row($total);

$wcs = mysql_query($wcs);

$wcs = mysql_fetch_row($wcs);

?>
  <script>

  YAHOO.util.Event.addListener(window, "load", function() {
    YAHOO.example.EnhanceFromMarkup = new function() {
        var myColumnDefs = [
<?php
$nelts = count($meta);
for($j = 0; $j < $nelts; $j++){
    printf("{key:\"%s\",label:\"%s\",sortable:true}", $meta[$j], ucfirst($alias[$j]));
    if($j < $nelts){print ",\n";}
}
?>
			    ];
        this.myDataSource = new YAHOO.util.DataSource(YAHOO.util.Dom.get("accounts"));
        this.myDataSource.responseType = YAHOO.util.DataSource.TYPE_HTMLTABLE;
        this.myDataSource.responseSchema = {
            fields: [
<?php
for($j = 0; $j < $nelts; $j++){
    printf("{key:\"%s\"}", $meta[$j]);
    if($j < $nelts){print ",\n";}
}
?>
		    ]
        };
        this.myDataTable = new YAHOO.widget.DataTable("markup", myColumnDefs, this.myDataSource,
                {caption:"",
                sortedBy:{key:"wc",dir:"desc"}}
        );
    };
});


  </script>
  </head>
  <body>
<?php

print "<b>Word count for selected informants: $wcs[0] (total for " . ucfirst($corpus) . " corpus: $total[0])</b>";

if($conf_array["lang"] == 'no'){

    print "<h4>Informasjon om informant <i>$tid</i> i " . ucfirst($corpus) . "korpuset</h4>\n";

}
else{print "<h4>Informant details for <i>$tid</i> in the " . ucfirst($corpus) . " corpus</h4>\n";}


$sq = mysql_query($profiles);

$profile = mysql_fetch_row($sq);

if(!$profile){
    
    printf($texts[$lang]["sorry"], $tid);

}
else{

    print "<div id='markup'>\n<table class='res' id='accounts'>\n<thead>\n<tr style='background-color: #d0e0ef;'>\n";

    foreach ($alias as $val){

	print "<th>" . ucfirst($val) . "</th>\n";

    }

    print "</tr>\n</thead>\n<tbody>\n";

    while( $profile ){

	print "<tr style='background-color: #f2fbff;' align='left'>\n";

	$profile = join("</td>\n<td>", $profile);
	print "<td><span style='color:#300;'>" . $profile . "</span></td>\n";
	print "</tr>\n";
	$profile = mysql_fetch_row($sq);
    }
	
/*

foreach ($profile as $value){

    print "<td>$value</td>\n";

}
*/
    print "</tbody></tr>\n<table>\n</div>";
}
?>
