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

require_once(ECLIPSE_ROOT . 'FileIterator.php');

/***
 * Class <code>DataFile</code> reads record-based textfiles into memory.
 * <p>
 *   The class is very simple, in that it does only 3 things:
 * </p>
 * <ol>
 *   <li>
 *     It reads the complete file specified on construction.
 *   </li>
 *   <li>
 *     It delegates the processing of each line in the the file to a
 *     <code>DataFileReader</code> object
 *   </li>
 *   <li>
 *     It stores the records in an internal array
 *   </li>
 * </ol>
 * <p>
 *   Once a <code>DataFile</code>-object has been created, the methods
 *   <code>getRecordCount</code> and <code>getRecord</code> can be used to get
 *   the total number of records in the file, and a record at a specific index.
 *   Or, for more generic behavior, a <code>DataFileIterator</code> can be used.
 * </p>
 * <p>
 *   Because the actual processing of the file is delegated to an object of
 *   class <code>DataFileReader</code>, class <code>DataFile</code> can be used
 *   for many kinds of files; by simply specifying a different
 *   <code>DataFileReader</code>, a file with a completely different structure
 *   can be read.
 * </p>
 * <p>
 *   On construction not only the filename of the file to read must be 
 *   specified; the <code>DataFileReader</code> to use must be passed as well.
 *   In most cases an object of class <code>DataFileReader</code> will do the
 *   job nicely.
 * </p>
 * <p>
 *   Class <code>DataFile</code> is meant for read-only access. Although it's
 *   possible to change records once they are read, these changes cannot be
 *   saved. This functionality is left out, because it's very difficult to
 *   implement. (Take into account that PHP runs in a multi-user environment!)
 * </p>
 * @see DataFileReader
 * @see DataFileIterator
 ***/
class DataFile 
{
    // DATA MEMBERS

    /***
     * The name of the file to read
     * @type string
     ***/
    var $filename;

    /***
     * The <code>DataFileReader</code> to use
     * @type DataFileReader
     ***/
    var $reader;

    /***
     * The array of records in the file
     * @type array
     ***/
    var $records;

    /***
     * The total number of records in the file
     * @type int
     ***/
    var $count;

    /***
     * The maximum number of character on each line
     * @type int
     ***/
    var $bufferSize;

    // CREATORS

    /***
     * Construct a new <code>DataFile</code>
     * @param $filename the name of the file to read
     * @param $datafilereader the <code>DataFileReader</code> to use
     * @param $bufferSize the maximum number of characters on a line
     ***/
    function DataFile($filename, &$datafilereader, $bufferSize = 4096) 
    {
        $this->filename   = $filename;
        $this->bufferSize = $bufferSize;
        $this->records    = array();
        $this->count      = -1;
        $this->reader     =& $datafilereader;
        $this->readFile();
    }

    // MANIPULATORS

    /***
     * Read the file into memory
     * @returns void
     * @private
     ***/
    function readFile() {
        $it =& new FileIterator($this->filename, $this->bufferSize);
        for ( ; $it->isValid(); $it->next()) 
        {
            $line   =& $it->getCurrent();
            $record =  $this->reader->parseLine($line);
            if ($record !== false)
            {
                array_push($this->records, $record);
            }
        }
        $this->count = count($this->records);
    }

    // ACCESSORS

    /***
     * Return the total number of records in the file
     * @returns int
     ***/
    function getRecordCount() 
    {
        return $this->count;
    }

    /***
     * Return the record at the specified index
     * @param $index the index of the record to return
     * @returns array
     ***/
    function &getRecord($index) 
    {
        return $this->records[$index];
    }
}
?>
