<?php
/*** 
 * Eclipse - Extensible Class Library for PHP Software Engineers
 * Copyright (C) 2001, 2002  Vincent Oostindie
 *
 * This library is free software; you can redistribute it and/or
 * modify it under the terms of the GNU Lesser General Public
 * License as published by the Free Software Foundation; either
 * version 2.1 of the License, or (at your option) any later version.
 *
 * This library is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU
 * Lesser General Public License for more details.
 * 
 * You should have received a copy of the GNU Lesser General Public
 * License along with this library; if not, write to the Free Software
 * Foundation, Inc., 59 Temple Place, Suite 330, Boston, MA  02111-1307  USA
 ***/

if (!defined('ECLIPSE_ROOT')) 
{
    define('ECLIPSE_ROOT', '');
}

require_once(ECLIPSE_ROOT . 'Iterator.php');

/***
 * Class <code>FileIterator</code> provides a simple iterator for traversing the
 * lines in a text file.
 * <p>
 *   On construction a filename must be passed, and the contents can then be
 *   iterated over like any other <code>Iterator</code>. If the iterator is used
 *   normally (from front to back completely), the internal file pointer is
 *   closed automatically when the end of the file is reached. If the standard
 *   iteration loop is not completed, the file pointer should be closed
 *   explicitly by calling <code>close()</code> on the iterator. For example:
 * </p>
 * <pre>
 *   $closed =  true;
 *   $it     =& new FileIterator('eclipse.txt');
 *   for ( ; $it->isValid(); $it->next())
 *   {
 *       $line =& $it->getCurrent();
 *       if ($line == 'STOP!')
 *       {
 *           $closed = false;
 *           break;
 *       }
 *       echo $line, "\n";
 *   }
 *   if (!$closed)
 *   {
 *       $it->close();
 *   }
 * </pre>
 * <p>
 *   If the file to be read can't be opened for one reason or another, this
 *   class will not fail. Instead, it will simply 'iterate over nothing'. Of
 *   course, PHP will still log warnings and/or errors somewhere, depending on
 *   how this is configured.
 * </p>
 ***/
class FileIterator extends Iterator
{
    // DATA MEMBERS

    /***
     * The name of the text file
     * @type string
     ***/
    var $filename;

    /***
     * The number of characters to read at once (at most!)
     * @type int
     ***/
    var $bufferSize;
        
    /***
     * The file pointer for the opened file
     * @type filepointer
     ***/
    var $pointer;
        
    /***
     * The current line in the file
     * @type string
     ***/
    var $line;

    // CREATORS
        
    function FileIterator($filename, $bufferSize = 4096) 
    {
        $this->filename   = $filename;
        $this->bufferSize = $bufferSize;
        $this->pointer    = false;
        $this->line       = false;
        $this->reset();
    }

    // MANIPULATORS
        
    /***
     * Close the internal file pointer. This method must be called if the 
     * iteration is stopped before it is completed (that is: before the end of
     * the file is reached).
     * @returns void
     ***/
    function close() 
    {
        if ($this->pointer !== false) 
        {
            fclose($this->pointer);
            $this->pointer = false;
            $this->line    = false;
        }
    }

    /***
     * Read a single line from the file.
     * @returns string
     * @private
     ***/
    function readLine() 
    {
        return fgets($this->pointer, $this->bufferSize);
    }

    /***
     * @returns void
     ***/
    function reset() 
    {
        if ($this->pointer) 
        {
            rewind($this->pointer);
        }
        else 
        {
            $this->pointer = fopen($this->filename, 'r');
        }
        $this->line = ($this->pointer !== false) ? $this->readLine() : false;
    }

    /***
     * @returns void
     ***/
    function next() 
    {
        $this->line = $this->readLine();
    }

    // ACCESSORS
        
    /***
     * @returns bool
     ***/
    function isValid() 
    {
        if ($this->pointer === false || feof($this->pointer)) 
        {
            $this->close();
            return false;
        }
        return true;
    }

    /***
     * @returns string
     ***/
    function &getCurrent()
    {
        return $this->line;
    }
}
?>
