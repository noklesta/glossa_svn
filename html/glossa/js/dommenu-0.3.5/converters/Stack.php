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
 * Class <code>Stack</code> represents a last-in-first-out (LIFO) stack of
 * objects.
 * <p>
 *   It extends class <code>Vector</code> with five operations that
 *   allow a vector to be treated as a stack.
 * </p>
 * <p>
 *   The usual push and pop operations are provided, as well as a method to
 *   peek at the top item on the stack, a method to test for whether the stack
 *   is empty (<code>isEmpty</code>), and a method to search the stack for an
 *   item and discover how far it is from the top.
 * </p>
 * <p>
 *   When a stack is first created, it contains no items.
 * </p>
 ***/
class Stack
{
	// DATA MEMBERS

	/***
	 * The vector list of items
	 * @type array
	 ***/
	var $elementData;

	// CREATORS

	/***
	 * Create a Stack which is card deck with the top item being the end of the Vector list
	 ***/
	function Stack()
	{
		$this->elementData = array();
	}

	// MANIPULATORS

	/***
	 * Peek at the item from the top of the Stack without removing it (last item of Vector).
	 * @return	mixed
	 ***/
	function peek()
	{
		return end($this->elementData);
	}

	/***
	 * Pop a item from the Stack (top of stack, last item of Vector).
	 * @return	mixed
	 ***/
	function pop()
	{
		return array_pop($this->elementData);
	}

	/***
	 * Push a item into the Stack (top of stack, last item of Vector)
	 * @param	mixed	$item
	 * @return	mixed
	 ***/
	function push($item)
	{
		array_push($this->elementData, $item);
		return $item;
	}
	
	/***
	 * Tests if this stack is empty.
	 * :NOTE: can't name this empty() since it is a language construct and 
	 * the php parser won't let us use it as a method name
	 * @return boolean
	 ***/
	function isEmpty()
	{
		return !count($this->elementData);
	}

	/***
	 * Returns the 1-based position where an object is on this stack.
	 * the topmost item on the stack is considered to be at distance 1.
	 * @param $o value to search for
	 ***/
	function search($o)
	{
		$index = array_search($o, $this->elementData, true);
		if (is_int($index)) {
			return count($this->elementData) - $index;
		}
		
		return -1;
	}
}
?>
