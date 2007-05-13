// Compressed version of the DOM Menu Library //

var domLib_userAgent=navigator.userAgent.toLowerCase();var domLib_isMac=navigator.appVersion.indexOf('Mac')!=-1;var domLib_isWin=domLib_userAgent.indexOf('windows')!=-1;var domLib_isOpera=domLib_userAgent.indexOf('opera')!=-1;var domLib_isOpera7up=domLib_userAgent.match(/opera.(7|8)/i);var domLib_isSafari=domLib_userAgent.indexOf('safari')!=-1;var domLib_isKonq=domLib_userAgent.indexOf('konqueror')!=-1;var domLib_isKHTML=(domLib_isKonq||domLib_isSafari||domLib_userAgent.indexOf('khtml')!=-1);var domLib_isIE=(!domLib_isKHTML&&!domLib_isOpera&&(domLib_userAgent.indexOf('msie 5')!=-1||domLib_userAgent.indexOf('msie 6')!=-1));var domLib_isIE5up=domLib_isIE;var domLib_isIE50=(domLib_isIE&&domLib_userAgent.indexOf('msie 5.0')!=-1);var domLib_isIE55=(domLib_isIE&&domLib_userAgent.indexOf('msie 5.5')!=-1);var domLib_isIE5=(domLib_isIE50||domLib_isIE55);var domLib_isGecko=domLib_userAgent.indexOf('gecko/')!=-1;var domLib_isMacIE=(domLib_isIE&&domLib_isMac);var domLib_isIE55up=domLib_isIE5up&&!domLib_isIE50&&!domLib_isMacIE;var domLib_isIE6up=domLib_isIE55up&&!domLib_isIE55;var domLib_standardsMode=(document.compatMode&&document.compatMode=='CSS1Compat');var domLib_useLibrary=(domLib_isOpera7up||domLib_isKHTML||domLib_isIE5up||domLib_isGecko||domLib_isMacIE||document.defaultView);var domLib_hasBrokenTimeout=(domLib_isMacIE||(domLib_isKonq&&domLib_userAgent.match(/konqueror\/3.([2-9])/)==null));var domLib_canFade=(domLib_isGecko||domLib_isIE||domLib_isSafari||domLib_isOpera);var domLib_canDrawOverSelect=(domLib_isMac||domLib_isOpera||domLib_isGecko);var domLib_canDrawOverFlash=(domLib_isMac||domLib_isWin);var domLib_eventTarget=domLib_isIE?'srcElement':'currentTarget';var domLib_eventButton=domLib_isIE?'button':'which';var domLib_eventTo=domLib_isIE?'toElement':'relatedTarget';var domLib_stylePointer=domLib_isIE?'hand':'pointer';var domLib_styleNoMaxWidth=domLib_isOpera?'10000px':'none';var domLib_hidePosition='-1000px';var domLib_scrollbarWidth=14;var domLib_autoId=1;var domLib_zIndex=100;var domLib_collisionElements;var domLib_collisionsCached=false;var domLib_timeoutStateId=0;var domLib_timeoutStates=new Hash();if(!document.ELEMENT_NODE)
{document.ELEMENT_NODE=1;document.ATTRIBUTE_NODE=2;document.TEXT_NODE=3;document.DOCUMENT_NODE=9;document.DOCUMENT_FRAGMENT_NODE=11;}
Object.prototype.clone=function()
{var copy={};for(var i in this)
{var value=this[i];try
{if(value!=null&&typeof(value)=='object'&&value!=window&&!value.nodeType)
{value.clone=Object.clone;copy[i]=value.clone();}
else
{copy[i]=value;}}
catch(e)
{copy[i]=value;}}
return copy;}
function Hash()
{this.length=0;this.numericLength=0;this.elementData=[];for(var i=0;i<arguments.length;i+=2)
{if(typeof(arguments[i+1])!='undefined')
{this.elementData[arguments[i]]=arguments[i+1];this.length++;if(arguments[i]==parseInt(arguments[i]))
{this.numericLength++;}}}}
Hash.prototype.get=function(in_key)
{return this.elementData[in_key];}
Hash.prototype.set=function(in_key,in_value)
{if(typeof(in_value)!='undefined')
{if(typeof(this.elementData[in_key])=='undefined')
{this.length++;if(in_key==parseInt(in_key))
{this.numericLength++;}}
return this.elementData[in_key]=in_value;}
return false;}
Hash.prototype.remove=function(in_key)
{var tmp_value;if(typeof(this.elementData[in_key])!='undefined')
{this.length--;if(in_key==parseInt(in_key))
{this.numericLength--;}
tmp_value=this.elementData[in_key];delete this.elementData[in_key];}
return tmp_value;}
Hash.prototype.size=function()
{return this.length;}
Hash.prototype.has=function(in_key)
{return typeof(this.elementData[in_key])!='undefined';}
Hash.prototype.find=function(in_obj)
{for(var tmp_key in this.elementData)
{if(this.elementData[tmp_key]==in_obj)
{return tmp_key;}}}
Hash.prototype.merge=function(in_hash)
{for(var tmp_key in in_hash.elementData)
{if(typeof(this.elementData[tmp_key])=='undefined')
{this.length++;if(tmp_key==parseInt(tmp_key))
{this.numericLength++;}}
this.elementData[tmp_key]=in_hash.elementData[tmp_key];}}
Hash.prototype.compare=function(in_hash)
{if(this.length!=in_hash.length)
{return false;}
for(var tmp_key in this.elementData)
{if(this.elementData[tmp_key]!=in_hash.elementData[tmp_key])
{return false;}}
return true;}
function domLib_isDescendantOf(in_object,in_ancestor)
{if(in_object==in_ancestor)
{return true;}
while(in_object!=document.documentElement)
{try
{if((tmp_object=in_object.offsetParent)&&tmp_object==in_ancestor)
{return true;}
else if((tmp_object=in_object.parentNode)==in_ancestor)
{return true;}
else
{in_object=tmp_object;}}
catch(e)
{return true;}}
return false;}
function domLib_detectCollisions(in_object,in_recover,in_useCache)
{if(!domLib_collisionsCached)
{var tags=[];if(!domLib_canDrawOverFlash)
{tags[tags.length]='object';}
if(!domLib_canDrawOverSelect)
{tags[tags.length]='select';}
domLib_collisionElements=domLib_getElementsByTagNames(tags);domLib_collisionsCached=in_useCache;}
if(in_recover)
{for(var cnt=0;cnt<domLib_collisionElements.length;cnt++)
{var thisElement=domLib_collisionElements[cnt];if(!thisElement.hideList)
{thisElement.hideList=new Hash();}
thisElement.hideList.remove(in_object.id);if(!thisElement.hideList.length)
{domLib_collisionElements[cnt].style.visibility='visible';if(domLib_isKonq)
{domLib_collisionElements[cnt].style.display='';}}}
return;}
else if(domLib_collisionElements.length==0)
{return;}
var objectOffsets=domLib_getOffsets(in_object);for(var cnt=0;cnt<domLib_collisionElements.length;cnt++)
{var thisElement=domLib_collisionElements[cnt];if(domLib_isDescendantOf(thisElement,in_object))
{continue;}
if(domLib_isKonq&&thisElement.tagName=='SELECT'&&(thisElement.size<=1&&!thisElement.multiple))
{continue;}
if(!thisElement.hideList)
{thisElement.hideList=new Hash();}
var selectOffsets=domLib_getOffsets(thisElement);var center2centerDistance=Math.sqrt(Math.pow(selectOffsets.get('leftCenter')-objectOffsets.get('leftCenter'),2)+Math.pow(selectOffsets.get('topCenter')-objectOffsets.get('topCenter'),2));var radiusSum=selectOffsets.get('radius')+objectOffsets.get('radius');if(center2centerDistance<radiusSum)
{if((objectOffsets.get('leftCenter')<=selectOffsets.get('leftCenter')&&objectOffsets.get('right')<selectOffsets.get('left'))||(objectOffsets.get('leftCenter')>selectOffsets.get('leftCenter')&&objectOffsets.get('left')>selectOffsets.get('right'))||(objectOffsets.get('topCenter')<=selectOffsets.get('topCenter')&&objectOffsets.get('bottom')<selectOffsets.get('top'))||(objectOffsets.get('topCenter')>selectOffsets.get('topCenter')&&objectOffsets.get('top')>selectOffsets.get('bottom')))
{thisElement.hideList.remove(in_object.id);if(!thisElement.hideList.length)
{thisElement.style.visibility='visible';if(domLib_isKonq)
{thisElement.style.display='';}}}
else
{thisElement.hideList.set(in_object.id,true);thisElement.style.visibility='hidden';if(domLib_isKonq)
{thisElement.style.display='none';}}}}}
function domLib_getOffsets(in_object)
{var originalObject=in_object;var originalWidth=in_object.offsetWidth;var originalHeight=in_object.offsetHeight;var offsetLeft=0;var offsetTop=0;while(in_object)
{offsetLeft+=in_object.offsetLeft;offsetTop+=in_object.offsetTop;in_object=in_object.offsetParent;}
if(domLib_isMacIE){offsetLeft+=10;offsetTop+=10;}
return new Hash('left',offsetLeft,'top',offsetTop,'right',offsetLeft+originalWidth,'bottom',offsetTop+originalHeight,'leftCenter',offsetLeft+originalWidth/2,'topCenter',offsetTop+originalHeight/2,'radius',Math.max(originalWidth,originalHeight));}
function domLib_setTimeout(in_function,in_timeout,in_args)
{if(typeof(in_args)=='undefined')
{in_args=[];}
if(in_timeout==-1)
{return;}
else if(in_timeout==0)
{in_function(in_args);return 0;}
if(typeof(in_args.clone)!='function')
{in_args.clone=Object.clone;}
var args=in_args.clone();if(!domLib_hasBrokenTimeout)
{return setTimeout(function(){in_function(args);},in_timeout);}
else
{var id=domLib_timeoutStateId++;var data=new Hash();data.set('function',in_function);data.set('args',args);domLib_timeoutStates.set(id,data);data.set('timeoutId',setTimeout('domLib_timeoutStates.get('+id+').get(\'function\')(domLib_timeoutStates.get('+id+').get(\'args\')); domLib_timeoutStates.remove('+id+');',in_timeout));return id;}}
function domLib_clearTimeout(in_id)
{if(!domLib_hasBrokenTimeout)
{clearTimeout(in_id);}
else
{if(domLib_timeoutStates.has(in_id))
{clearTimeout(domLib_timeoutStates.get(in_id).get('timeoutId'))
domLib_timeoutStates.remove(in_id);}}}
function domLib_getEventPosition(in_eventObj)
{var eventPosition=new Hash('x',0,'y',0,'scrollX',0,'scrollY',0);if(domLib_isIE)
{var doc=(domLib_standardsMode?document.documentElement:document.body);if(doc)
{eventPosition.set('x',in_eventObj.clientX+doc.scrollLeft);eventPosition.set('y',in_eventObj.clientY+doc.scrollTop);eventPosition.set('scrollX',doc.scrollLeft);eventPosition.set('scrollY',doc.scrollTop);}}
else
{eventPosition.set('x',in_eventObj.pageX);eventPosition.set('y',in_eventObj.pageY);eventPosition.set('scrollX',in_eventObj.pageX-in_eventObj.clientX);eventPosition.set('scrollY',in_eventObj.pageY-in_eventObj.clientY);}
return eventPosition;}
function domLib_cancelBubble(in_event)
{var eventObj=in_event?in_event:window.event;eventObj.cancelBubble=true;}
function domLib_getIFrameReference(in_frame)
{if(domLib_isGecko||domLib_isIE)
{return in_frame.frameElement;}
else
{var name=in_frame.name;if(!name||!in_frame.parent)
{return;}
var candidates=in_frame.parent.document.getElementsByTagName('iframe');for(var i=0;i<candidates.length;i++)
{if(candidates[i].name==name)
{return candidates[i];}}}}
function domLib_getElementsByClass(in_class)
{var elements=domLib_isIE5?document.all:document.getElementsByTagName('*');var matches=[];var cnt=0;for(var i=0;i<elements.length;i++)
{if((" "+elements[i].className+" ").indexOf(" "+in_class+" ")!=-1)
{matches[cnt++]=elements[i];}}
return matches;}
function domLib_getElementsByTagNames(in_list)
{var elements=[];for(var i=0;i<in_list.length;i++)
{var matches=document.getElementsByTagName(in_list[i]);for(var j=0;j<matches.length;j++)
{elements[elements.length]=matches[j];}}
return elements;}
function makeTrue()
{return true;}
function makeFalse()
{return false;}
var domMenu_data=new Hash();var domMenu_settings=new Hash();domMenu_settings.set('global',new Hash('menuBarClass','domMenu_menuBar','menuElementClass','domMenu_menuElement','menuElementHoverClass','domMenu_menuElementHover','menuElementActiveClass','domMenu_menuElementHover','subMenuBarClass','domMenu_subMenuBar','subMenuElementClass','domMenu_subMenuElement','subMenuElementHoverClass','domMenu_subMenuElementHover','subMenuElementActiveClass','domMenu_subMenuElementHover','subMenuElementHeadingClass','domMenu_subMenuElementHeading','menuBarWidth','100%','subMenuMinWidth','inherit','distributeSpace',true,'axis','horizontal','verticalExpand','south','horizontalExpand','east','expandMenuArrowUrl','arrow.gif','subMenuWidthCorrection',0,'verticalSubMenuOffsetY',0,'verticalSubMenuOffsetX',0,'horizontalSubMenuOffsetX',0,'horizontalSubMenuOffsetY',0,'screenPadding',0,'openMouseoverMenuDelay',300,'openMousedownMenuDelay',-1,'closeMouseoutMenuDelay',800,'closeClickMenuDelay',-1,'openMouseoverSubMenuDelay',300,'openClickSubMenuDelay',-1,'closeMouseoutSubMenuDelay',300,'closeClickSubMenuDelay',-1,'baseZIndex',100,'baseUri',''));var domMenu_data;var domMenu_selectElements;var domMenu_scrollbarWidth=14;var domMenu_eventTo=domLib_isIE?'toElement':'relatedTarget';var domMenu_eventFrom=domLib_isIE?'fromElement':'relatedTarget';var domMenu_activeElement=new Hash();var domMenu_timeouts=new Array();domMenu_timeouts['open']=new Hash();domMenu_timeouts['close']=new Hash();var domMenu_pointerStyle=domLib_isIE?'hand':'pointer';function domMenu_activate(in_containerId,in_disableWarning)
{var container;var data;if(!domLib_useLibrary)
{if(!in_disableWarning)
{alert('domMenu: Browser not supported.  Menu will be disabled.');}
return;}
if(!(container=document.getElementById(in_containerId))||!(data=domMenu_data.get(in_containerId))||data.numericLength==0){if(!in_disableWarning){alert('domMenu: Menu failed to load.');}
return;}
if(window.attachEvent){window.attachEvent('onunload',domMenu_fixCircleRefs);}
if(!domMenu_settings.has(in_containerId)){domMenu_settings.set(in_containerId,new Hash());}
var settings=domMenu_settings.get(in_containerId);for(var i in domMenu_settings.get('global').elementData){if(!settings.has(i)){settings.set(i,domMenu_settings.get('global').get(i));}}
container.data=new Hash('parentElement',false,'numChildren',data.numericLength,'childElements',new Hash(),'level',0,'index',1);var distributeRatio=Math.round(100/container.data.get('numChildren'))+'%';var rootMenu=document.createElement('div');rootMenu.id=in_containerId+'-0';rootMenu.className=settings.get('menuBarClass');container.data.set('subMenu',rootMenu);var rootMenuTable=rootMenu.appendChild(document.createElement('table'));if(domLib_isKonq||domLib_isMacIE){rootMenuTable.cellSpacing=0;}
rootMenuTable.style.border=0;rootMenuTable.style.borderCollapse='collapse';rootMenuTable.style.width=settings.get('menuBarWidth');var rootMenuTableBody=rootMenuTable.appendChild(document.createElement('tbody'));var numSiblings=container.data.get('numChildren');for(var index=1;index<=numSiblings;index++){if(index==1||settings.get('axis')=='vertical'){var rootMenuTableRow=rootMenuTableBody.appendChild(document.createElement('tr'));}
var rootMenuTableCell=rootMenuTableRow.appendChild(document.createElement('td'));rootMenuTableCell.style.padding=0;rootMenuTableCell.id=in_containerId+'-'+index;container.data.get('childElements').set(rootMenuTableCell.id,rootMenuTableCell);rootMenuTableCell.data=data.get(index);rootMenuTableCell.data.merge(new Hash('basename',in_containerId,'parentElement',container,'numChildren',rootMenuTableCell.data.numericLength,'childElements',new Hash(),'offsets',new Hash(),'level',container.data.get('level')+1,'index',index));rootMenuTableCell.style.cursor='default';if(settings.get('axis')=='horizontal'){if(settings.get('distributeSpace')){rootMenuTableCell.style.width=distributeRatio;}}
rootMenuTableCell.style.verticalAlign='top';var rootElement=rootMenuTableCell.appendChild(document.createElement('div'));rootElement.className=settings.get('menuElementClass');var spanElement=rootElement.appendChild(document.createElement('span'));spanElement.innerHTML=rootMenuTableCell.data.get('contents').replace(/\/\/\//,settings.get('baseUri'));if(rootMenuTableCell.data.has('contentsHover')){spanElement=rootElement.appendChild(document.createElement('span'));spanElement.style.display='none';spanElement.innerHTML=rootMenuTableCell.data.get('contentsHover').replace(/\/\/\//,settings.get('baseUri'));}
if(domLib_isMacIE){rootMenuTableCell.appendChild(document.createTextNode("\n"));}
rootMenuTableCell.onmouseover=domMenu_runMouseoverOpenEvent;rootMenuTableCell.onmouseout=domMenu_runCloseEvent;if(settings.get('openMousedownMenuDelay')>=0&&rootMenuTableCell.data.get('numChildren')){rootMenuTableCell.onmousedown=domMenu_runMousedownOpenEvent;rootMenuTableCell.onmouseup=domLib_cancelBubble;if(domLib_isIE){rootMenuTableCell.ondblclick=domMenu_runMousedownOpenEvent;}}
else if(rootMenuTableCell.data.get('uri')){rootMenuTableCell.style.cursor=domMenu_pointerStyle;rootMenuTableCell.onclick=domMenu_runResolveLink;}
if(domLib_isIE){rootMenuTableCell.onselectstart=makeFalse;}
rootMenuTableCell.oncontextmenu=makeFalse;}
rootMenu=container.appendChild(rootMenu);domLib_detectCollisions(rootMenu,false,false);}
function domMenu_activateSubMenu(in_parentElement)
{if(domLib_isMacIE){return;}
if(in_parentElement.data.has('subMenu')){domMenu_toggleSubMenu(in_parentElement,'visible');return;}
var settings=domMenu_settings.get(in_parentElement.data.get('basename'));var menu=document.createElement('div');menu.id=in_parentElement.id+'-0';menu.className=settings.get('subMenuBarClass');menu.style.zIndex=settings.get('baseZIndex');menu.style.position='absolute';menu.style.visibility='hidden';menu.style.top=0;menu.style.left=0;in_parentElement.data.set('subMenu',menu);var menuTable=menu.appendChild(document.createElement('table'));if(domLib_isOpera){menuTable.style.width='1px';menuTable.style.whiteSpace='nowrap';}
if(domLib_isKonq||domLib_isMacIE){menuTable.cellSpacing=0;}
menuTable.style.border=0;menuTable.style.borderCollapse='collapse';var menuTableBody=menuTable.appendChild(document.createElement('tbody'));var numSiblings=in_parentElement.data.get('numChildren');for(var index=1;index<=numSiblings;index++){var dataIndex=in_parentElement.data.get('level')==1&&settings.get('verticalExpand')=='north'&&settings.get('axis')=='horizontal'?numSiblings+1-index:index;var menuTableCell=menuTableBody.appendChild(document.createElement('tr')).appendChild(document.createElement('td'));menuTableCell.style.padding=0;menuTableCell.id=in_parentElement.id+'-'+dataIndex;in_parentElement.data.get('childElements').set(menuTableCell.id,menuTableCell);menuTableCell.data=in_parentElement.data.get(dataIndex);menuTableCell.data.merge(new Hash('basename',in_parentElement.data.get('basename'),'parentElement',in_parentElement,'numChildren',menuTableCell.data.numericLength,'childElements',new Hash(),'offsets',new Hash(),'level',in_parentElement.data.get('level')+1,'index',index));menuTableCell.style.cursor='default';var element=menuTableCell.appendChild(document.createElement('div'));var outerElement=element;outerElement.className=settings.get('subMenuElementClass');if(menuTableCell.data.get('numChildren')){element=outerElement.appendChild(document.createElement('div'));element.style.backgroundImage='url('+settings.get('expandMenuArrowUrl')+')';element.style.backgroundRepeat='no-repeat';element.style.backgroundPosition='right center';element.style.paddingRight='12px';}
if(domLib_isMacIE){element.appendChild(document.createTextNode(menuTableCell.data.get('contents')));menuTableCell.appendChild(document.createTextNode("\n"));}
else{element.innerHTML=menuTableCell.data.get('contents');}
menuTableCell.onmouseover=domMenu_runMouseoverSubOpenEvent;menuTableCell.onmouseout=domMenu_runCloseEvent;if(settings.get('openClickSubMenuDelay')>=0&&menuTableCell.data.get('numChildren')){menuTableCell.onmousedown=domMenu_runClickSubOpenEvent;menuTableCell.onmouseup=domLib_cancelBubble;if(domLib_isIE){menuTableCell.ondblclick=domMenu_runClickSubOpenEvent;}}
else if(menuTableCell.data.get('uri')){menuTableCell.style.cursor=domMenu_pointerStyle;menuTableCell.onclick=domMenu_runResolveLink;}
else if(!menuTableCell.data.get('numChildren')){outerElement.className+=' '+settings.get('subMenuElementHeadingClass');}
if(domLib_isIE){menuTableCell.onselectstart=makeFalse;}
menuTableCell.oncontextmenu=makeFalse;}
menu=document.body.appendChild(menu);domMenu_toggleSubMenu(in_parentElement,'visible');}
function domMenu_changeActivePath(in_newActiveElement,in_oldActiveElement,in_closeDelay)
{if(!in_oldActiveElement&&!in_newActiveElement){return false;}
for(var i in domMenu_timeouts['open'].elementData){domLib_clearTimeout(domMenu_timeouts['open'].get(i));}
var basename=in_oldActiveElement?in_oldActiveElement.data.get('basename'):in_newActiveElement.data.get('basename');var settings=domMenu_settings.get(basename);var oldActivePath=new Hash();if(in_oldActiveElement){var tmp_newActiveLevel=in_newActiveElement?in_newActiveElement.data.get('level'):-1;var tmp_oldActivePathElement=in_oldActiveElement;do{oldActivePath.elementData[tmp_oldActivePathElement.id]=tmp_oldActivePathElement;if(tmp_newActiveLevel>=0&&tmp_oldActivePathElement.data.get('level')==tmp_newActiveLevel){domMenu_toggleHighlight(tmp_oldActivePathElement,false);}}while((tmp_oldActivePathElement=tmp_oldActivePathElement.data.get('parentElement'))&&tmp_oldActivePathElement.id!=basename);if(!in_oldActiveElement.data.get('subMenu')||in_oldActiveElement.data.get('subMenu').style.visibility=='hidden'){domMenu_toggleHighlight(in_oldActiveElement,false);}}
var newActivePath=new Hash();var intersectPoint;if(in_newActiveElement){var actualActiveElement=in_newActiveElement;window.status=in_newActiveElement.data.get('statusText')+' ';if(!in_oldActiveElement){domLib_clearTimeout(domMenu_timeouts['close'].get(in_newActiveElement.id));domMenu_toggleHighlight(in_newActiveElement,true);return false;}
else if(oldActivePath.has(in_newActiveElement.id)){in_newActiveElement=in_oldActiveElement;}
var tmp_newActivePathElement=in_newActiveElement;do{if(!intersectPoint&&oldActivePath.has(tmp_newActivePathElement.id)){intersectPoint=tmp_newActivePathElement;}
newActivePath.set(tmp_newActivePathElement.id,tmp_newActivePathElement);domLib_clearTimeout(domMenu_timeouts['close'].get(tmp_newActivePathElement.id));if(tmp_newActivePathElement!=in_oldActiveElement||actualActiveElement==in_oldActiveElement){domMenu_toggleHighlight(tmp_newActivePathElement,true);}}while((tmp_newActivePathElement=tmp_newActivePathElement.data.get('parentElement'))&&tmp_newActivePathElement.id!=basename);if(in_newActiveElement.data.get('parentElement')==in_oldActiveElement){return in_newActiveElement;}
else if(in_newActiveElement==in_oldActiveElement){return in_newActiveElement;}
var intersectSibling;if(intersectPoint&&oldActivePath.length>0){for(var i in oldActivePath.elementData){if(oldActivePath.get(i).data.get('parentElement')==intersectPoint){intersectSibling=oldActivePath.get(i);break;}}}
var isRootLevel=in_newActiveElement.data.get('level')==1?true:false;var closeDelay=isRootLevel?settings.get('closeMouseoutMenuDelay'):settings.get('closeMouseoutSubMenuDelay');}
else{var isRootLevel=false;var closeDelay=settings.get('closeMouseoutMenuDelay');window.status=window.defaultStatus;}
if(typeof(in_closeDelay)!='undefined'){closeDelay=in_closeDelay;}
if(intersectSibling){if(!isRootLevel){domMenu_toggleHighlight(intersectSibling,false);}
else{for(var i in domMenu_timeouts['close'].elementData){if(!oldActivePath.has(i)){var tmp_element=document.getElementById(i);if(tmp_element.data.get('basename')==basename){oldActivePath.set(i,tmp_element);}}}}}
for(var i in oldActivePath.elementData){if(newActivePath.has(i)){continue;}
domLib_clearTimeout(domMenu_timeouts['close'].get(i));if(isRootLevel){domMenu_toggleHighlight(oldActivePath.get(i),false);domMenu_toggleSubMenu(oldActivePath.get(i),'hidden');}
else{domMenu_timeouts['close'].set(i,domLib_setTimeout(domMenu_runCloseMenu,closeDelay,[oldActivePath.get(i),basename]));}}
return in_newActiveElement;}
function domMenu_deactivate(in_basename,in_delay)
{if(!in_delay){in_delay=0;}
domMenu_changeActivePath(false,domMenu_activeElement.get(in_basename),in_delay);}
function domMenu_openEvent(in_this,in_event,in_delayType)
{if(domLib_isGecko){window.getSelection().removeAllRanges();}
var eventObj=domLib_isIE?event:in_event;var currentTarget=domLib_isIE?in_this:eventObj.currentTarget;var basename=currentTarget.data.get('basename');var settings=domMenu_settings.get(basename);if(eventObj.type!='mousedown'&&domMenu_getElement(eventObj[domMenu_eventFrom],basename)==currentTarget){return;}
if(eventObj.type=='mousedown'&&domMenu_activeElement.get(basename)){domMenu_changeActivePath(false,domMenu_activeElement.get(basename),currentTarget.data.get('level')==1?settings.get('closeClickMenuDelay'):settings.get('closeClickSubMenuDelay'));return;}
if(currentTarget.data.get('numChildren')){if(currentTarget.data.get('level')==1&&domMenu_activeElement.get(basename)){domMenu_activateSubMenu(currentTarget);domMenu_activeElement.set(basename,domMenu_changeActivePath(currentTarget,domMenu_activeElement.get(basename)));}
else{domMenu_activeElement.set(basename,domMenu_changeActivePath(currentTarget,domMenu_activeElement.get(basename)));domMenu_timeouts['open'].set(currentTarget.id,domLib_setTimeout(domMenu_runOpenMenu,settings.get(in_delayType),[currentTarget,basename]));}}
else{domMenu_activeElement.set(basename,domMenu_changeActivePath(currentTarget,domMenu_activeElement.get(basename)));}}
function domMenu_closeEvent(in_this,in_event)
{var eventObj=domLib_isIE?event:in_event;var currentTarget=domLib_isIE?in_this:eventObj.currentTarget;var basename=currentTarget.data.get('basename');var relatedTarget=domMenu_getElement(eventObj[domMenu_eventTo],basename);if(domMenu_activeElement.get(basename)){if(!relatedTarget){domMenu_changeActivePath(false,domMenu_activeElement.get(basename));}}
else{if(currentTarget!=relatedTarget){domLib_clearTimeout(domMenu_timeouts['open'].get(currentTarget.id));domMenu_toggleHighlight(currentTarget,false);}}}
function domMenu_getElement(in_object,in_basename)
{while(in_object){try{if(in_object.id&&in_object.id.search(new RegExp('^'+in_basename+'(\\[[0-9]\\])*\\[[1-9]\\]$'))==0){return in_object;}
else{in_object=in_object.parentNode;}}
catch(e){return false;}}
return false;}
function domMenu_correctEdgeBleed(in_width,in_height,in_x,in_y,in_padding,in_axis)
{if(domLib_isIE&&!domLib_isIE5&&!domLib_isMacIE){var pageHeight=document.documentElement.clientHeight;}
else if(!domLib_isKonq){var pageHeight=document.body.clientHeight;}
else{var pageHeight=window.innerHeight;}
var pageYOffset=domLib_isIE?document.body.scrollTop:window.pageYOffset;var pageXOffset=domLib_isIE?document.body.scrollLeft:window.pageXOffset;if(in_axis=='horizontal'){var bleedRight=(in_x-pageXOffset)+in_width-(document.body.clientWidth-in_padding);var bleedLeft=(in_x-pageXOffset)-in_padding;if(bleedRight>0){in_x-=bleedRight;}
if(bleedLeft<0){in_x+=bleedLeft;}}
else{var bleedTop=(in_y-pageYOffset)-in_padding;var bleedBottom=(in_y-pageYOffset)+in_height-(pageHeight-in_padding);if(bleedBottom>0){in_y-=bleedBottom;}
if(bleedTop<0){in_y+=bleedTop;}}
return new Array(in_x,in_y);}
function domMenu_toggleSubMenu(in_parentElement,in_style)
{var subMenu=in_parentElement.data.get('subMenu');if(subMenu&&subMenu.style.visibility!=in_style){var settings=domMenu_settings.get(in_parentElement.data.get('basename'));var prefix=in_parentElement.data.get('level')==1?'menu':'subMenu';var className=settings.get(prefix+'ElementClass');if(in_style=='visible'){className+=' '+settings.get(prefix+'Element'+(in_style=='visible'?'Active':'Hover')+'Class');}
in_parentElement.firstChild.className=className;if(in_style=='visible'){var tmp_offsets=domLib_getOffsets(in_parentElement);if(in_parentElement.data.get('level')==1){tmp_offsets.set('top',tmp_offsets.get('top')+settings.get('verticalSubMenuOffsetY'));tmp_offsets.set('bottom',tmp_offsets.get('bottom')+settings.get('verticalSubMenuOffsetY'));tmp_offsets.set('left',tmp_offsets.get('left')+settings.get('verticalSubMenuOffsetX'));tmp_offsets.set('right',tmp_offsets.get('right')+settings.get('verticalSubMenuOffsetX'));}
if(!in_parentElement.data.get('offsets').compare(tmp_offsets)){in_parentElement.data.set('offsets',tmp_offsets);if(settings.get('axis')=='horizontal'&&in_parentElement.data.get('level')==1){var xCoor=tmp_offsets.get('left');if(settings.get('verticalExpand')=='north'){var yCoor=tmp_offsets.get('top')-subMenu.offsetHeight-settings.get('verticalSubMenuOffsetY');}
else{var yCoor=tmp_offsets.get('bottom');}}
else{var xCoor=tmp_offsets.get('right')+settings.get('horizontalSubMenuOffsetX');var yCoor=tmp_offsets.get('top')+settings.get('horizontalSubMenuOffsetY');if(domLib_isOpera||domLib_isSafari){var marginLeft=parseInt(document.defaultView.getComputedStyle(document.body,'').getPropertyValue('margin-left'));var marginTop=parseInt(document.defaultView.getComputedStyle(document.body,'').getPropertyValue('margin-top'));xCoor-=marginLeft;yCoor-=marginTop;}}
var minWidth=settings.get('subMenuMinWidth');var renderedWidth=subMenu.offsetWidth;if(minWidth=='inherit'){minWidth=in_parentElement.offsetWidth+settings.get('subMenuWidthCorrection');}
else if(minWidth=='auto'){minWidth=renderedWidth;}
if(domLib_isKonq){subMenu.firstChild.firstChild.firstChild.firstChild.style.width=Math.max(minWidth,renderedWidth)+'px';}
else{subMenu.firstChild.style.width=Math.max(minWidth,renderedWidth)+'px';}
var coordinates=domMenu_correctEdgeBleed(subMenu.offsetWidth,subMenu.offsetHeight,xCoor,yCoor,settings.get('screenPadding'),settings.get('axis'));subMenu.style.left=coordinates[0]+'px';subMenu.style.top=coordinates[1]+'px';if(settings.get('axis')=='horizontal'&&settings.get('subMenuMinWidth')=='inherit'){subMenu.firstChild.style.width=Math.max(in_parentElement.offsetWidth+settings.get('subMenuWidthCorrection'),renderedWidth)+'px';}}}
if(domLib_isKonq){in_parentElement.firstChild.style.display='none';in_parentElement.firstChild.style.display='';}
subMenu.style.visibility=in_style;domLib_detectCollisions(subMenu,(in_style=='hidden'),true);}}
function domMenu_toggleHighlight(in_element,in_status)
{if(!in_element.data.get('numChildren')&&!in_element.data.get('uri')){return;}
var settings=domMenu_settings.get(in_element.data.get('basename'));var prefix=in_element.data.get('level')==1?'menu':'subMenu';var className=settings.get(prefix+'ElementClass');var highlightElement=in_element.firstChild;var pseudoClass;if(in_status){if(in_element.data.has('subMenu')&&in_element.data.get('subMenu').style.visibility=='visible'){pseudoClass='Active';}
else if(in_element.data.get('numChildren')||in_element.data.get('uri')){pseudoClass='Hover';}}
if(pseudoClass){className+=' '+settings.get(prefix+'Element'+pseudoClass+'Class');if(highlightElement.childNodes.length==2){}
if(highlightElement.childNodes.length==2&&highlightElement.lastChild.style.display=='none'){highlightElement.firstChild.style.display='none';highlightElement.lastChild.style.display='';}}
else{if(highlightElement.childNodes.length==2&&highlightElement.firstChild.style.display=='none'){highlightElement.lastChild.style.display='none';highlightElement.firstChild.style.display='';}}
highlightElement.className=className;if(domLib_isKonq){highlightElement.style.display='none';highlightElement.style.display='';}}
function domMenu_resolveLink(in_this,in_event)
{var eventObj=domLib_isIE?event:in_event;var currentTarget=domLib_isIE?in_this:eventObj.currentTarget;var basename=currentTarget.data.get('basename');domMenu_changeActivePath(false,domMenu_activeElement.get(basename),0);var uri=currentTarget.data.get('uri');if(uri){window.status='Resolving Link...';uri=uri.replace(/\/\/\//,domMenu_settings.get(basename).get('baseUri'));if(!currentTarget.data.get('target')||currentTarget.data.get('target')=='_self'){window.location=uri;}
else{window.open(uri,currentTarget.data.get('target'));}}}
function domMenu_fixCircleRefs()
{var clearElementProps=['data','onmouseover','onmouseout','onmousedown','onmouseup','ondblclick','onclick','onselectstart','oncontextmenu'];var el;for(var d=document.all.length;d--;){el=document.all[d];for(var c=clearElementProps.length;c--;){el[clearElementProps[c]]=null;}}}
function domMenu_runMouseoverOpenEvent(in_event){domMenu_openEvent(this,in_event,'openMouseoverMenuDelay');}
function domMenu_runMousedownOpenEvent(in_event){domMenu_openEvent(this,in_event,'openMousedownMenuDelay');}
function domMenu_runMouseoverSubOpenEvent(in_event){domMenu_openEvent(this,in_event,'openMouseoverSubMenuDelay');}
function domMenu_runClickSubOpenEvent(in_event){domMenu_openEvent(this,in_event,'openClickSubMenuDelay');}
function domMenu_runCloseEvent(in_event){domMenu_closeEvent(this,in_event);}
function domMenu_runResolveLink(in_event){domMenu_resolveLink(this,in_event);};function domMenu_runCloseMenu(argv)
{domMenu_toggleHighlight(argv[0],false);domMenu_toggleSubMenu(argv[0],'hidden');if(argv[0].data.get('level')==1){domMenu_activeElement.set(argv[1],false);}}
function domMenu_runOpenMenu(argv)
{if(!domMenu_activeElement.get(argv[1])){domMenu_activeElement.set(argv[1],argv[0]);}
domMenu_activateSubMenu(argv[0]);}