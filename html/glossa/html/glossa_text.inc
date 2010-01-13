<!-- $Id$ -->
  <td>
<script language="javascript">
document.write("<input id='addRowsButton' type='button' value='add phrase' onClick='writeWidgetTokenRow()'></input>");
document.write("<input id='delRowsButton' type='button' value='delete phrase' onClick='delWidgetTokenRow()' disabled></input>");
</script>
  </td>
 </tr>
 <?php
  if ($_GET['fullQuery'] == 'yes') {
    echo "<script language='javascript'>fullQuery='yes';</script>";
  }
 ?>
 <script language="javascript">writeWidgetTokenRow(0);</script>
  <tr>
  <td valign="top" style="background-color:#efefef;border-width:1px;border-style:solid;border-color:#afaeae">
   <table width="100%">
    <tr>
     <td valign="top">
       <input name="query_corpus" type="hidden" value="<?php echo $_GET['corpus'] ?>"></input>
       <input name="query_root" type="hidden" value="@@query_root@@"></input>
       <span class="txt">
         <script language="javascript">document.write(strings[language]['regexp'])</script>: <input type="checkbox" name="query_regex"><br>
         <script language="javascript">document.write(strings[language]['search_within'])</script>: <input type="text" size="2" name="query_within" value="s"></input>
       </span>
     </td>
     <td valign="top" style="padding-left:15px">
      <span class="txt"><script language="javascript">document.write(strings[language]['hits'])</script>: <input type=text name="query_results_page" value=20 size="5"><br>
      <script language="javascript">document.write(strings[language]['max_res'])</script> :</span> <input type=text name="query_results_max" value=200 size="5"><br></span>
     </td>
     <td valign="top" style="padding-left:15px;text-align:left">
      <span class="txt2" style="float:right"><script language="javascript">document.write(strings[language]['rand'])</script> <input type="checkbox" name="query_results_random"></input></span><br>
      <span class="txt2" style="float:right"><nobr><script language="javascript">document.write(strings[language]['fastcut'])</script> <input type="checkbox" name="query_results_fastcut"></input><nobr></span>
     </td>
<?php

$conf = $configdir . $corpus ."/cgi.conf";

$file = fopen($conf, "r") or exit ("Kan ikke åpne konfigurasjonsfila: $conf");

while(!feof($file)){
    $line = fgets($file);
    if (ereg('^\#', $line)){ continue; }
    $split = split(' = ', $line);
    $conf_array[trim($split[0])] = trim($split[1]);
}

fclose($file);

$display_attributes = array();
$display_spiecified = false;
if($conf_array['display_attributes']){
  $display_specified = true;
  foreach(split(' ', $conf_array['display_attributes']) as $value){
    list($name, $position) = split('_', $value);
    $display_attributes[$name] = $position;
  }
}
//foreach($display_attributes as $nym => $pos){ echo $nym . "->" . $pos . "<br />"; }
if( $display_specified ){
?>
     <td align="right">
<?php
    $checked = "checked='true'";
    foreach($display_attributes as $nym => $pos){
      echo "<span class='txt2'>$nym <input type='radio' name='atttype' id='atttype' value='$pos' $checked /></span><br />\n";
      $checked = '';
      //      <span class="txt2">Orthographic <input type='radio' name='atttype' id='atttype' value='0' checked='true' /></span><br />
      // <span class="txt2">Phonetic <input type='radio' name='atttype' id='atttype' value='2' /></span><br />
      //<span class="txt2">Both <input type='radio' name='atttype' id='atttype' value='x' /></span>
    }
?>
    </td>
<?php
}
if($conf_array['corpus_mode'] == 'speech'){
?>
      <input type="hidden" name="query_context_type" value="sentences" /> 
      <input type="hidden" name="query_context_left" value="0" /> 
      <input type="hidden" name="query_context_right" value="0" />
<?php
}
else{
?>
</td>
     <td valign="top" style="padding-left:30px">
       <script language="javascript">document.write(strings[language]['context'])</script>:<br>
       <input type="radio" name="query_context_type" value="sentences"><script language="javascript">document.write(strings[language]['sent'])</script> <input type="radio" name="query_context_type" value="chars"  checked><script language="javascript">document.write(strings[language]['word'])</script><br>
       &nbsp;<input type="TEXT" name="query_context_left" SIZE=1 value="7"><span class="txt2"><script language="javascript">document.write(strings[language]['left'])</script></span>
       &nbsp;<input type="TEXT" name="query_context_right" SIZE=1 value="7"><span class="txt2"><script language="javascript">document.write(strings[language]['right'])</script></span>
     </td>
<?php
}
?>
    </tr>
   </table>
  </td>
