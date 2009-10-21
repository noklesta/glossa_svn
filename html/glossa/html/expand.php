<?php
  // INIT

$id  = $_GET['line_key']; // the sql-table key for the segment returned by CQP
$size = $_GET['size']; // context width
$video = $_GET['video'];
$mode = $_GET['mode'];
$left = $_GET['left'];
$right = $_GET['right'];

if(!($left&&$right)){#print "<script>alert('$left and $right');</script>";
    $left = 1;$right = 1;
}
$size= $right + $left;
#print "<script>alert('$left and $right');</script>";
if($size > 4 && $mode != "text"){$mode = "nest";} // just incase the script is invoked wrongly. ie, too great a context for the text div. 

$corpus = $_GET['corpus'];

#if  ($corpus == 'demo'){ $corpus = 'nota'; }

$conf = "/hf/foni/tekstlab/glossa-0.7/dat/$corpus/cgi.conf";
$conf = "cgi.conf";

$file = fopen($conf, "r") or exit ("Kan ikke åpne konfigurasjonsfila: $conf");

while(!feof($file)){
    $line = fgets($file);
    if (ereg('^\#', $line)){ continue; }
    $split = split('=', $line);
    $conf_array[trim($split[0])] = trim($split[1]);
}
fclose($file);
?>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.0//EN"  "http://www.w3.org/TR/REC-html40/strict.dtd">
<html>
 <head>
<script language="JavaScript" src=<?php echo "\"" . $conf_array['htmlRoot'] . "js/showtag.js\"" ?> ></script>
  <script language="JavaScript" src=<?php echo "\"" . $conf_array['htmlRoot'] . "js/AC_QuickTime.js\"" ?> ></script>
  <script type="text/javascript" src=<?php echo "\"" . $conf_array['htmlRoot'] . "js/QT.js\"" ?> ></script>
  <script language="JavaScript" type="text/javascript">
  var ladjust = 1;
  var radjust  = 1;
  function times(){
      st = document.getElementById('sstart');
      st.innerHTML = document.QTplayer.GetStartTime();
      sp = document.getElementById('sstop');
      sp.innerHTML = document.QTplayer.GetEndTime();
  }
  </script>
  <link href=<?php echo "\"" . $conf_array['htmlRoot'] . "html/tags.css\"" ?> rel="stylesheet" type="text/css"></link>
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
	top: 5px;
        left:860px;
	padding: 5px;
	border: 1px solid #000;
	background: #fff;
	width: 100px;
	height: 244px;

}
table.res{
/*	width: 100%; */
	border : 0px solid #aaa;
	font-size:9px;
	background-color:#fff;
}
div.tracker{
	position: relative;
	top: 2px;
	left: 0px;
	border: 1px solid #000;
	background: #000;
	width: 100px;
	height: 7px;
	
}
div.pointl{
	float:left;
	top: 0px;
	left: 0px;
	border: 0px solid #000;
	background: #fff;
	width: 5px;
	height: 7px;
}
div.pointr{
	float:right;
	top: 0px;
	left: 0px;
	border: 0px solid #000;
	background: #fff;
	width: 5px;
	height: 7px;
}
  </style>
<?php

$database = $conf_array["db_name"];
$user = $conf_array["db_uname"];
$pass = $conf_array["db_pwd"];
$dbhost = $conf_array["db_host"];
$cqp_atts = split(" ", $conf_array['corpus_attributes']);

//echo "$dbhost, $user";

$movie_loc = $conf_array["media_url"];

$table = strtoupper($corpus)."segments";

if($size < 0){ $size = 0; } // negative makes no sense

$session = mysql_connect ($dbhost . ':/var/lib/mysql/mysql.sock', $user, $pass)
     or die ('I cannot connect to the database because my toes really hurt and I '
             . mysql_error());

mysql_select_db ($database, $session);

$mov = "SELECT audio_file FROM $table WHERE id = $id";          //vid

#print "<script>alert('$mov');</script>";

$lower_bound = $id - $left;#$id - $size;
$upper_bound = $id + $right;#$id + $size;

$f = mysql_query($mov);

$arr = mysql_fetch_array($f);

$audio_file = $arr[0];

$context = "SELECT id,begin,end FROM $table WHERE id >= " . $lower_bound . " AND id <= " . $upper_bound .
           " AND audio_file = '" . $audio_file  . "';"; 

#print "<script>alert('" . $audio_file . "');</script>";
$fn =filename($audio_file, $video, $corpus);
#print "<script>alert('" . $corpus . " - " . $movie_loc . $fn . "');</script>";

#bigbrother - rtsp://lillestroem.uio.no/hf/ilf/BB/lyd/BB_d10.mov
#bigbrother - rtsp://lillestroem.uio.no/hf/ilf/BB/BB_d10_800.mov

$res = mysql_query($context);
$lower_fixed = 0;
$begin = 0;
$end = 10000;

while( $row = mysql_fetch_array($res) ){

# check all segments are from same transcription
# ie, context size could overlap transcription boundary.
#.. could it?!? even when you check that audio_file is correct?

    $lid = $row["id"];

    if(!$lower_fixed){ #check lower_bound first

	if( $lid >= $lower_bound ){ $lower_bound = $lid; $begin = $row["begin"]; }

	$lower_fixed = 1;
    }

    $upper_bound = $lid;
    $end = $row["end"];

}

# need to make an adjustment. if lower_bound - 1.end > lower_bound.begin, then this should also be played. same for upper_bound
$previousend = "SELECT end FROM $table WHERE id = " . ($lower_bound - 1) . ";";
$nextbegin = "SELECT begin FROM $table WHERE id = " . ($lower_bound + 1) . ";";


$res = mysql_query($previousend);
$row = mysql_fetch_array($res);
if( $row["end"] > $begin ){ $lower_bound -= 1; }
#print "<script>alert('begin: (" . $begin . "), end: " . $row["end"] . "');</script>";
$res = mysql_query($nextbegin);
$row = mysql_fetch_array($res);
if( $row["begin"] < $end ){ $upper_bound += 1; }
#print "<script>alert('low: " . $lower_bound . ", up: " . $upper_bound. "');</script>";

?>

<body>


<?php

       // TEXT ____________________

if($mode != 'nest'){

    $segs = "SELECT * FROM $table WHERE audio_file = '$audio_file' AND id >= $lower_bound AND id <= $upper_bound";

    $segs = mysql_query($segs);
    
    $stringy = db2html($segs);
 

    print "<div class=\"txt\">" . $stringy . "</div>";

//print $divs;

 }

if($mode == 'nest'){
?>
 <div class="iframe">
      <iframe name="text" frameborder="0" width="525" height="256" scrolling="auto" src=
<?php
     echo "\"?line_key=$id&corpus=$corpus&left=$left&right=$right&mode=text\"";
?>>
      </iframe>
  </div>
 <?php 
}

      // !TEXT ____________________




     // VIDEO

if($mode != 'text'){

    $QTstart = "SELECT begin FROM $table WHERE id = $lower_bound";
    $QTstop  = "SELECT end FROM $table WHERE id = $upper_bound";
    $QTstart = mysql_query($QTstart);
    $QTstart = mysql_fetch_array($QTstart);
    $QTstart = $QTstart[0];
    $QTstop = mysql_query($QTstop);
    $QTstop = mysql_fetch_array($QTstop);
    $QTstop = $QTstop[0];
?>
<script>
     // alert(<?php echo "'start: $QTstart, stop: $QTstop'" ?>);
</script>
<?php

#    $QTstart = sec2QTcode($QTstart);
#    $QTstop = sec2QTcode($QTstop);

    $QTstart = secs2hhmmssff($QTstart);
    $QTstop = secs2hhmmssff($QTstop);

?>
<div class="mov">
<!--
<script language="javascript" type="text/javascript">

    var mov = <?php echo "'$movie_loc$fn'";?>;
    QT_WriteOBJECT( mov, '320', '256', '', 'EnableJavaScript', 'True', 'emb#NAME' , 'movie1' , 'obj#id' , 'movie1') ;

</script>
-->


<object  CLASSID='clsid:02BF25D5-8C17-4B23-BC80-D3488ABDDC6B' 
width='320' height='256' CODEBASE='http://www.apple.com/qtactivex/qtplugin.cab' 
id='QTplayer'>

<param name='qtsrc' value=<?php


echo "'$movie_loc$fn'";

?>>

<param name='starttime' value=<?php

echo "'$QTstart'";

?>>
<param name='endtime' value=<?php

echo "'$QTstop'";

?>>
<param name='autoplay' value='true'>
<param name='loop' value='false'>
<param name='controller' value='true'>
<embed src='http://lillestroem.uio.no/hf/ilf/test.mov' qtsrc=<?php
     
     echo "'$movie_loc$fn' starttime='$QTstart' endtime='$QTstop'";

?> width='320' height='256' autoplay='true' loop='false' controller='true' pluginspage='http://www.apple.com/quicktime/' name='QTplayer'>
</embed>
</object><br />

</div>

<div class="ctrl">
 <table border="0">
       <tr><td colspan="2">
 <strong><a href="QTtrouble.html" target="_blank">Trouble viewing video?</a></strong><br />
 <b>context&#177;</b><br />Offset<br />
       </tr></td>
       <tr>
       <td>
      Left
       </td>
       <td>
       <select id="" name="" class="" size="1" onchange=<?php print "\"window.location='?corpus=" . $corpus . "&video=" . $video . "&line_key=" . $id . "&left='+this.value+'&right=" . $right . "'\"";?>>
       <option value="0">-</option>
	    <?php 
	    for($j = 0; $j < 20; $j++){
		?>
		<option value=<?php print "\"$j\""; if($j==$left){print " selected";}?>><?php echo "-" . $j;  ?></option>
		<?php
	    }
    ?>
      </select>
     </td></tr>
     <tr>
     <td>
      Right
     </td>
     <td>
     <select id="" name="" class="" size="1" onchange=<?php print "\"window.location='?corpus=" . $corpus . "&video=" . $video . "&line_key=" . $id . "&right='+this.value+'&left=" . $left . "'\"";?>>
     <option value="0">-</option>
	  <?php 
	  for($j = 0; $j < 20; $j++){
	      ?>
     <option value=<?php print "\"$j\""; if($j==$right){print " selected";} ?>><?php echo $j;  ?></option>
	      <?php
	  }
    ?>
     </select>
     </td></tr>
     </table>
<!--
<div class="tracker">
<div class="pointl" id="start0" onclick="indi('start0', '#1a1', 'lr');restart(document.QTplayer, -4);times();"></div>
<div class="pointl" id="start1" onclick="indi('start1', '#1a1', 'lr');restart(document.QTplayer, -3);times();"></div>
<div class="pointl" id="start2" onclick="indi('start2', '#1a1', 'lr');restart(document.QTplayer, -2);times();"></div>
<div class="pointl" id="start3" onclick="indi('start3', '#1a1', 'lr');restart(document.QTplayer, -1);times();"></div>
<div class="pointl" id="start4" onclick="indi('start4', '#1a1', 'lr');restart(document.QTplayer, 0);times();"></div>
<div class="pointl" id="start5" onclick="indi('start5', '#1a1', 'lr');restart(document.QTplayer, 1);times();"></div>
<div class="pointl" id="start6" onclick="indi('start6', '#1a1', 'lr');restart(document.QTplayer, 2);times();"></div>
<div class="pointl" id="start7" onclick="indi('start7', '#1a1', 'lr');restart(document.QTplayer, 3);times();"></div>
<div class="pointl" id="start8" onclick="indi('start8', '#1a1', 'lr');restart(document.QTplayer, 4);times();"></div>

<div class="pointr" id="stop0" onclick="indi('stop0', '#c11', 'lr');reend(document.QTplayer, 4);times();"></div>
<div class="pointr" id="stop1" onclick="indi('stop1', '#c11', 'lr');reend(document.QTplayer, 3);times();"></div>
<div class="pointr" id="stop2" onclick="indi('stop2', '#c11', 'lr');reend(document.QTplayer, 2);times();"></div>
<div class="pointr" id="stop3" onclick="indi('stop3', '#c11', 'lr');reend(document.QTplayer, 1);times();"></div>
<div class="pointr" id="stop4" onclick="indi('stop4', '#c11', 'lr');reend(document.QTplayer, 0);times();"></div>
<div class="pointr" id="stop5" onclick="indi('stop5', '#c11', 'lr');reend(document.QTplayer, -1);times();"></div>
<div class="pointr" id="stop6" onclick="indi('stop6', '#c11', 'lr');reend(document.QTplayer, -2);times();"></div>
<div class="pointr" id="stop7" onclick="indi('stop7', '#c11', 'lr');reend(document.QTplayer, -3);times();"></div>
<div class="pointr" id="stop8" onclick="indi('stop8', '#c11', 'lr');reend(document.QTplayer, -4);times();"></div>
</div>
-->
<div>
<br />
<table border="1">
<tr>
  <td><span onclick="restart(document.QTplayer, ladjust--);times();" style="cursor: pointer;">-</span></td>
  <td>Start</td>
  <td><span onclick="restart(document.QTplayer, ladjust++);times();" style="cursor: pointer;">+</span></td>
</tr>
<tr>
	 <td colspan="3" align="center"><span id="sstart"></span></td>
</tr>
<tr>
  <td><span onclick="reend(document.QTplayer, radjust--);times();" style="cursor: pointer;">-</span></td>
  <td>Stop</td>
  <td><span onclick="reend(document.QTplayer, radjust++);times();" style="cursor: pointer;">+</span></td>
</tr>
<tr>
  <td colspan="3" align="center"><span id="sstop"></span></td>
</tr>
<tr>
<td colspan="3"><span onclick="document.QTplayer.Play();" style="cursor: pointer;">&gt;&gt;</span></td>
</tr>
</table>
<span id="track"></span>
</div>

</div>
<br />
<?php



       }
       // !VIDEO
?>
<script language="JavaScript" type="text/javascript">
//initQT(document.QTplayer);
indi('start4', '#1a1', 'lr');
indi('stop4', '#c11', 'lr');
restart(document.QTplayer, 0);

times();
</script>

</body>

<?php

function filename( $fn, $vid, $corp ){

    $pat = "/^[A-Z]*_/";
    $fn = preg_replace ( $pat, "", $fn );
    $pat = "/\.wav/";
    $fn = preg_replace ( $pat, "", $fn);
    if($corp == 'bigbrother'){ 
	$pat = "/_[A-Z]+$/";
	$fn = preg_replace($pat, "", $fn);
	$fn = "BB_" . $fn;
    }
    if (!$vid){ return "lyd/" . $fn . ".mov"; }
#    print "<script>alert('" . $fn . "');</script>";
    if( $corp == 'nota' || $corp == 'upus2' || $corp == 'demo'){return $fn . "_320kbps.mov";}
    return $fn."_800.mov";
    return $fn."_320kbps.mov";

}

function secs2hhmmssff($sex){
    $secs = $sex / 1;
    $dec  = fmod($sex, 1);
    $h = $secs / 3600;
    $m = $secs % 3600;    
    $s = $m % 60;
    $m = $m / 60;
    $f = $dec * 25;
    return sprintf("%02d:%02d:%02d:%02d",$h,$m,$s,$f);
}

function sec2QTcode($sex){ // converts second 
                           // to QuickTime code.
    $split = split("\.", $sex);
    $h = $split[0] / 3600;
    $m = $split[0] % 3600;
    $s = $m % 60;
    $m = $m / 60;
    $d = $split[1];
    if ( preg_match( "/d\d$/", $d ) ){ $d = $d . "0"; } // must be three digits.
    $d = floor($d / (1000/30));
    return sprintf("%02d:%02d:%02d:%02d",$h,$m,$s,$d);

}
function db2html($rows){
    global $cqp_atts;
    global $id;
    $j = 0;
    $table = "<table border=\"0\" width='100%%' class=\"res\">\n%s\n</table>\n";
    $tr    = "<tr valign='top' bgcolor='%s'>\n<td>%s</td>\n<td><span style='color:%s;font-weight:%s'>%s</span></td>\n</tr>\n";
    $color = "#000";
    $bgcolor = "#ffffff";
    $last_ref = 0;
    $fill = "";
    $weight = "normal";

    $divs = "";
    while($row=mysql_fetch_array($rows)){
	$pretty = "";
	$ref=$row["ref"];
	$begin=$row["begin"];
	$end=$row["end"];

	$seg = $row["seg"];
	$toks = split("]", $seg);
	foreach($toks as $tok){
	    $divs .= popdiv($j, $tok, $cqp_atts);
	    $pretty .= span ($j++, $tok);
	}
	if($ref != $last_ref){
	    if($bgcolor == "#ffffff"){$bgcolor="#ffffff";}
	    else{$bgcolor="#ffffff";}	    
	}
	if($row["id"] == $id){$color = "#a00";$weight = "bold";}
	else{$color = "#000";$weight = "normal";}
	$fill .= sprintf($tr, $bgcolor, $ref, $color, $weight, $pretty);
	//		$fill .= "<tr valign='top' bgcolor='$bgcolor'>\n<td>$ref</td>".
	//	    "<td><font color='$color'>$seg</font></td>\n</tr>\n";
	$last_ref = $ref;
    }

    $table =  sprintf($table, $fill);
    return $table . "\n" . $divs;
}
function popdiv($i, $tok, $atts){

    $tok = preg_replace("/^\[/", "", $tok);

    $vals = split("\|", $tok);
    
    $div = "<div id=\"%d\" class=\"tag\">%s</div>\n";

    $att = "<b>%s: </b>%s<br />";

    $cont = "";

    for($j = 0; $j < count($vals); $j++){

	if(!$vals[$j]){continue;}

	$cont .= sprintf($att, $atts[$j], $vals[$j]);

    }

    return sprintf($div, $i, $cont);

}

function span($spani, $tok){

    $pat = "/\[([^\|]+)/";

    $pretty = "";

    preg_match($pat, $tok, $match);

    $tok = preg_replace("/^\[/", "", $match[0]);

    $tok = preg_replace("/\|$/", "", $tok);

    $tok = spank($spani, $tok);

    return $tok." ";

}

function spank($i, $str){

    $span = "<span onMouseOver=\"showTag(arguments[0], '%d')\" onMouseOut=\"hideTag('%d')\">%s</span>\n";

    return sprintf($span, $i, $i, $str);

}

?>