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
 * Class Iterator is an abstract base class for iterators.
 * <p>
 *   Class <code>Iterator</code> offers the interface of all iterators. The
 *   comments for each method decribe the exact behavior the method should
 *   implement.
 * </p>
 * <p>
 *   When an iterator is created for some object, it's imperative that the
 *   object doesn't change for the duration of the iteration. This may or may
 *   not lead to unexpected results, depending on the object iterated over.
 *   However, it is possible to modify the object returned by the
 *   <code>getCurrent()</code> method of the iterator. For example, when
 *   iterating over arrays with an <code>ArrayIterator</code>, no elements
 *   should be removed from or added to the array, but individual elements may
 *   be altered.
 * </p>
 * <p>
 *   Given an iterator <code>$it</code>, the iteration loop is run as follows:
 * </p>
 * <pre>
 *   for ($it->reset(); $it->isValid(); $it->next())
 *   {
 *       $object =& $it->getCurrent();
 *       doSomethingWith($object);
 *   }
 * </pre>
 * <p>
 *   Note that every iterator should reset (or: initialize) itself on 
 *   construction, so that the loop can also be run like: <code>for ($it =& new
 *   Iterator(); $it->isValid(); $it->next()) ...</code>.
 * </p>
 ***/
class Iterator
{
    // CREATORS

    /***
     * Create a new iterator that's immediately ready for use.  Normally,
     * the constructor calls <code>reset()</code>.
     ***/
    function Iterator()
    {
    }

    // MANIPULATORS

    /***
     * Initialize this iterator.
     * @returns void
     ***/
    function reset()
    {
        die('Method <b>reset</b> of class <b>Iterator</b> is not implemented.');
    }

    /***
     * Advance the internal cursor to the next object. The behavior of this
     * method is undefined if <code>isValid()</code> returns <code>false</code>.
     * @returns void
     ***/
    function next()
    {
        die('Method <b>next</b> of class <b>Iterator</b> is not implemented.');
    }

    // ACCESSORS

    /***
     * Check if the iterator is valid
     * @returns bool
     ***/
    function isValid()
    {
        die('Method <b>isValid</b> of class <b>Iterator</b> is not '.
        'implemented.');
    }

    /***
     * Return a reference to the current object. The behavior of this method
     * is undefined if <code>isValid()</code> returns <code>false</code>.
     * @returns mixed
     ***/
    function &getCurrent() 
    {
        die('Method <b>getCurrent</b> of class <b>Iterator</b> is not ' .
            'implemented.');
    }
}
?>
