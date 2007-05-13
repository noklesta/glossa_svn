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
 * Class <code>DataFileIterator</code> implements the iterator pattern for
 * <code>DataFile</code> objects.
 * @see DataFile
 ***/
class DataFileIterator extends Iterator 
{
    // DATA MEMBERS

    /***
     * The <code>DataFile</code> whose contents must be iterated over
     * @type DataFile
     ***/
    var $datafile;

    /***
     * The current index
     * @type int
     ***/
    var $current;

    /***
     * The total number of records
     * @type int
     ***/
    var $max;

    // CREATORS

    /***
     * Construct a new <code>DataFileIterator</code>
     * @param $datafile the <code>DataFile</code> to iterate over
     ***/
    function DataFileIterator(&$datafile) 
    {
        $this->datafile =& $datafile;
        $this->max      =  $datafile->getRecordCount();
        $this->reset();
    }

    // MANIPULATORS

    /***
     * @returns void
     ***/
    function reset() 
    {
        $this->current = 0;
    }

    /***
     * @returns void
     ***/
    function next() 
    {
        $this->current++;
    }

    // ACCESSORS

    /***
     * @returns bool
     ***/
    function isValid() 
    {
        return $this->current < $this->max;
    }

    /***
     * @returns array
     ***/
    function &getCurrent() 
    {
        return $this->datafile->getRecord($this->current);
    }
}
?>
