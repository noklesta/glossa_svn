<?php
define('ECLIPSE_ROOT', '');

require_once ECLIPSE_ROOT . 'DataFileReader.php';
require_once ECLIPSE_ROOT . 'Stack.php';
require_once ECLIPSE_ROOT . 'Loop.php';
require_once ECLIPSE_ROOT . 'LoopManipulator.php';
require_once ECLIPSE_ROOT . 'DataFile.php';
require_once ECLIPSE_ROOT . 'DataFileIterator.php';

class MenuConverter extends LoopManipulator
{
	var $levels;
    
	var $name;

	function MenuConverter($name = 'domMenu_main')
	{
		$this->name = $name;
		$this->levels =& new Stack();
	}

	function prepare()
	{
	    echo "domMenu_data.set('$this->name', new Hash(";
	}

    function current(&$row, $index)
	{
		$numClose = 0;
		$lastLevel = $lastIndex = 0;
		$comma = '';
		if (!$this->levels->isEmpty())
		{
			list($lastLevel, $lastIndex) = $this->levels->peek();
			$comma = ',';
		}

		$level = strlen($row[0]);
		if ($level == $lastLevel)
		{
		    $index = $lastIndex + 1;
			$numClose++;
		}
		elseif ($level > $lastLevel)
		{
			$index = 1;
		}
		elseif ($level < $lastLevel)
		{
			$numClose = 1 + ($lastLevel - $level);
			// find where we last branched off
			do
			{
				list($lastLevel, $index) = $this->levels->pop();
			}
			while ($level != $lastLevel);

			$index++;
		}

		$pad = str_repeat("\t", $level);
	    echo str_repeat(')', $numClose) . $comma . "
$pad$index, new Hash(
$pad	'contents', '" . (isset($row[1]) ? str_replace('\'', '\\\'', $row[1]) : '') . "',
$pad	'uri', '" . (isset($row[2]) ? str_replace('\'', '\\\'', $row[2]) : '') . "',
$pad	'target', '" . (isset($row[4]) ? $row[4] : '_self') . "',
$pad	'statusText', '" . (isset($row[3]) ? str_replace('\'', '\\\'', $row[3]) : '') . "'";
	    
	    $this->levels->push(array($level, $index));
	}

    function finish($total) 
    { 
		list($lastLevel,) = $this->levels->peek();
		$numClose = $lastLevel;
	    echo str_repeat(')', $numClose) . "
));";
    }
}

Loop::run(
    new DataFileIterator(new DataFile('layersmenu.txt', new DataFileReader(false))),
	new MenuConverter('domMenu_main')
);
?>
