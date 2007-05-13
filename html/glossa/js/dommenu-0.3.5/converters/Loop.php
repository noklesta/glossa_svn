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
 * Class <code>Loop</code> implements an iteration that can be influenced by a
 * manipulator as defined by class <code>LoopManipulator</code>.
 * <p>
 *   To start the loop, just call the static method <code>run</code> with an
 *   iterator and a loop manipulator. The method returns the total number of
 *   objects that was processed.
 * </p>
 * <p>
 *   See class <code>LoopManipulator</code> for more information on how to
 *   influence loops and why this simple class is extremely useful.
 * </p>
 * @see Iterator
 * @see LoopManipulator
 ***/
class Loop
{
    // MANIPULATORS

    /***
     * Run a loop on an iterator and a manipulator and return the number of
     * items processed.
     * @param $iterator the <code>Iterator</code> to run the loop on
     * @param $manipulator the <code>LoopManipulator</code> to use
     * @returns int
     * @static
     ***/
    function run(&$iterator, &$manipulator)
    {
        $index = 0;
        $iterator->reset();
        if ($iterator->isValid())
        {
            $manipulator->prepare();
        }
        for ( ; $iterator->isValid(); $iterator->next())
        {
            $current =& $iterator->getCurrent();
            if ($index)
            {
                $manipulator->between($index);
            }
            $manipulator->current($current, $index++);
        }
        if ($index)
        {
            $manipulator->finish($index);
        }
        return $index;
    }
}
?>
