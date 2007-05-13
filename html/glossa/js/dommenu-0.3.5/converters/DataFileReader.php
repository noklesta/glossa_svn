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

/***
 * Class <code>DataFileReader</code> is a class for processing lines in a 
 * <code>DataFile</code>, and can also be used as a base class for new readers.
 * <p>
 *   By default, <code>DataFile</code>s are assumed to have a descriptor on the
 *   first line, with the fields separated by a <code>|</code>-character.
 * </p>
 * <p>
 *   The descriptor is a list of fieldnames, separated by the same separator as
 *   is used for the records. For example:
 * </p>
 * <pre>
 *   name     | description         | link
 *   sunlight | My personal website | www.sunlight.tmfweb.nl
 *   eclipse  | PHP library         | www.sunlight.tmfweb.nl/eclipse
 *   dawn     | PHP framework       | www.sunlight.tmfweb.nl/dawn
 *   ...      | ...                 | ...
 * </pre>
 * <p>
 *   The <code>DataFileReader</code> normally returns an integer-indexed array
 *   of fields, and if a descriptor is used, the array is also indexed on
 *   fieldname. Thus in the above example, if <code>$fields</code> is the array
 *   returned by the reader, both <code>$fields[1]</code> and
 *   <code>$fields['description']</code> point to the same value. This is very
 *   useful, as it allows the addition of additional fields in the file at
 *   any index, without enforcing a rewrite of existing code. Also, a possible
 *   transition to databases and queries is extremely simplified.
 * </p>
 * <p>
 *   Class <code>DataFileReader</code> has a method <code>filter</code> that
 *   does nothing by default, but subclasses can override it to select only
 *   those records that are of interest. The method gets an array of fields as
 *   its sole parameter, and returns this same array if the record should show
 *   up in the result. By returning <code>false</code> instead of the array,
 *   the record will be skipped. In short, subclasses need only implement the
 *   method <code>filter</code> to enable some kind of specialized filtering.
 * </p>
 * @see DataFile
 ***/
class DataFileReader
{
    // DATA MEMBERS

    /***
     * The separator between fields
     * @type string
     ***/
    var $separator;

    /***
     * The array of descriptors
     * @type array
     ***/
    var $fields;

    /***
     * Whether the first line contains a descriptor or not
     * @type bool
     ***/
    var $hasDescription;

    // CREATORS

    /***
     * Construct a new <code>DataFileReader</code>
     * @param $hasDescription whether the first line contains a descriptor
     * @param $separator the separator between fields
     ***/
    function DataFileReader($hasDescription = true, $separator = '|') 
    {
        $this->separator      = $separator;
        $this->hasDescription = $hasDescription;
        $this->firstLine      = true;
        $this->fields         = array();
    }

    // MANIPULATORS

    /***
     * Process a single line and turn it into a record (or <code>false</code> 
     * if the record is invalid)
     * @param $line the line to process
     * @returns array
     ***/
    function parseLine($line) 
    {
		// skip commented lines
		if ($line{0} == '#')
		{
            return false;
		}
        $fields = $this->getFields($line);
        $size   = count($fields);
        if ($this->firstLine) 
        {
			$this->firstLine = false;
            if ($this->hasDescription)
            {
                $this->fields = $fields;
                return false;
            }
            return $this->filter($fields);
        }
        if ($this->hasDescription) 
        {
            for ($i = 0; $i < $size; $i++) 
            {
                $fields[$this->fields[$i]] =& $fields[$i];
            }
        }
        return $this->filter($fields);
    }

    /***
     * Apply a filter on a record; if the record is valid, return the array
     * itself; in all other cases return <code>false</code>
     * @returns array
     ***/
    function filter($fields)
    {
        return $fields;
    }

    // ACCESSORS

    /***
     * Convert a line to an array of fields
     * @private
     * @param $line the line to convert
     * @returns array
     ***/
    function getFields($line)
    {
        return array_map('trim', explode($this->separator, $line));
    }
}
?>
