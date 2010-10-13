<?php

$config_file = '../../../cgi-bin/glossa/paths.conf';
$comment = "#";

$fp = fopen($config_file, "r");

while (!feof($fp)) {
  $line = trim(fgets($fp));
  if ($line && !ereg("^$comment", $line)) {
    $pieces = split("[ \t]+", $line);
    $option = trim($pieces[0]);
    $value = trim($pieces[1]);
    $config_values[$option] = $value;
  }
}

fclose($fp);

     // ** initialize Glossa ** //  
$configdir = $config_values['conf'];
$htmlRoot = '/glossa/';
$cgiRoot = '/cgi-bin/glossa/';
$favicon = '/favicon.ico';

?>
