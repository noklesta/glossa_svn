// {{{ domMenu_main: data

domMenu_data.set('domMenu_main', new Hash(
    1, new Hash(
        'contents', 'Home',
        'contentsHover', 'Home',
        'uri', 'http://mojavelinux.com',
        'target', '_self',
        'statusText', 'Mojavelinux.com homepages',
        1, new Hash(
            'contents', 'News',
            'uri', 'http://mojavelinux.com',
            'target', '_blank',
            'statusText', 'Latest mojavelinux.com news'
        ),
        2, new Hash(
            'contents', 'Cooker',
            'uri', 'http://www.example.com',
            'statusText', 'Released open source programs',
            1, new Hash(
                'contents', 'Demos',
                'uri', 'http://www.example.com',
                'statusText', 'Program demos'
            ),
            2, new Hash(
                'contents', 'Beta',
                'uri', 'http://www.example.com',
                'statusText', 'Program betas'
            )
        ),
        3, new Hash(
            'contents', 'Pictures',
            'uri', 'http://www.example.com',
            'statusText', 'Pictureview picture catalog'
        ),
        4, new Hash(
            'contents', 'Tutorials',
            'uri', 'http://www.example.com',
            'statusText', 'Various tutorials I have put together'
        ),
        5, new Hash(
            'contents', 'Stats',
            'uri', 'http://www.example.com',
            'statusText', 'website statistics')),
    2, new Hash(
        'contents', 'Forums',
        'contentsHover', 'Forums',
        'uri', '',
        'statusText', 'Mojave forums',
        1, new Hash(
            'contents', 'Cooker',
            'uri', 'http://www.example.com',
            'statusText', 'Released programs'
        ),
        2, new Hash(
            'contents', 'phpBB Mods',
            'uri', 'http://www.example.com',
            'statusText', 'phpBB Forum Modifications'
        ),
        3, new Hash(
            'contents', 'MyCalendar Mod',
            'uri', 'http://www.example.com',
            'statusText', 'MyCalendar add-on for phpBB')),
    3, new Hash(
        'contents', 'Demos',
        'contentsHover', 'Demos',
        'uri', '',
        'statusText', 'Demo Sites',
        1, new Hash(
            'contents', 'DOM Menu',
            'uri', 'http://www.example.com',
            'statusText', 'Dynamic hierarchial menu using the DOM'
        ),
        2, new Hash(
            'contents', 'DOM Tooltip',
            'uri', 'http://www.example.com',
            'statusText', 'Dynamic tooltips using the DOM'
        ),
        3, new Hash(
            'contents', 'Popup Calendar',
            'uri', 'http://www.example.com',
            'statusText', 'Date selector popup calendar')),
    4, new Hash(
        'contents', 'Tutorials',
        'contentsHover', 'Tutorials',
        'uri', '',
        'statusText', 'Various tutorials',
        1, new Hash(
            'contents', 'Hash Tables',
            'uri', 'http://www.example.com',
            'statusText', 'Creating hash tables in javascript'
        ),
        2, new Hash(
            'contents', 'Understanding Events',
            'uri', 'http://www.example.com',
            'statusText', 'Understanding Events in javascript'
        ),
        3, new Hash(
            'contents', 'Using setTimeout',
            'uri', 'http://www.example.com',
            'statusText', 'Using the setTimeout method in javascript'
        ),
        4, new Hash(
            'contents', 'Tips & Tricks',
            'uri', 'http://www.example.com',
            'statusText', 'Random tips and tricks')),
    5, new Hash(
        'contents', 'Pictures',
        'contentsHover', 'Pictures',
        'uri', 'http://www.example.com',
        'statusText', 'Picture sites',
        1, new Hash(
            'contents', 'Pictureview',
            'uri', 'http://www.example.com',
            'statusText', 'Mojavelinux.com picture catalog'
        ),
        2, new Hash(
            'contents', 'Chintoons',
            'uri', 'http://www.example.com',
            'statusText', 'Chinchilla cartoons')),
    6, new Hash(
        'contents', 'Stats',
        'contentsHover', 'Stats',
        'uri', 'http://www.example.com',
        'statusText', 'Mojavelinux.com site statistics',
        1, new Hash(
            'contents', 'Overall Site Statistics for mojavelinux.com',
            'uri', 'http://www.example.com',
            'statusText', 'Overall statistics for mojavelinux.com'))
));

// }}}
// {{{ domMenu_main: settings

domMenu_settings.set('domMenu_main', new Hash(
    'subMenuWidthCorrection', -1,
    'verticalSubMenuOffsetX', -1,
    'verticalSubMenuOffsetY', -1,
    'horizontalSubMenuOffsetX', 1,
    'openMouseoverMenuDelay', 300,
    'closeMouseoutMenuDelay', 500,
    'expandMenuArrowUrl', 'arrow.gif'
));

// }}}
// {{{ domMenu_keramik: data

domMenu_data.set('domMenu_keramik', new Hash(
    1, new Hash(
        'contents', 'Home',
        'uri', '',
        'statusText', 'Home',
        1, new Hash(
            'contents', 'Main Page',
            'uri', 'http://www.example.com',
            'statusText', 'Mojave Page'
        ),
        2, new Hash(
            'contents', 'Contact mojavelinux.com',
            'uri', '',
            'statusText', 'Contact mojavelinux.com',
            1, new Hash(
                'contents', 'Dan',
                'uri', 'http://www.example.com',
                'statusText', 'Dan'
            ),
            2, new Hash(
                'contents', 'Sarah',
                'uri', 'http://www.example.com',
                'statusText', 'Sarah'
            )
        ),
        3, new Hash(
            'contents', 'Terms of Use',
            'uri', 'http://www.example.com',
            'statusText', 'Terms of Use'
        ),
        4, new Hash(
            'contents', 'Search this site',
            'uri', 'http://www.example.com',
            'statusText', 'Search this site'
        ),
        5, new Hash(
            'contents', 'Customize',
            'uri', '',
            'statusText', 'Customize',
            1, new Hash(
                'contents', 'Style Schemas',
                'uri', '',
                'statusText', 'Style Schemas'
            ),
            2, new Hash(
                'contents', 'Blue',
                'uri', 'http://example.com',
                'statusText', 'Blue'
            ),
            3, new Hash(
                'contents', 'Green',
                'uri', 'http://example.com',
                'statusText', 'Green',
                1, new Hash(
                    'contents', 'Green',
                    'uri', 'http://example.com',
                    'statusText', 'Green'
                )
            )
        )
    ),
    2, new Hash(
        'contents', 'CSS',
        'uri', '',
        'statusText', 'CSS',
        1, new Hash(
            'contents', 'Tutorials',
            'uri', '',
            'statusText', 'Tutorial Links'
        ),
        2, new Hash(
            'contents', 'Using Stylesheets',
            'uri', 'http://www.example.com',
            'statusText', ''
        ),
        3, new Hash(
            'contents', 'CSS Positioning',
            'uri', 'http://www.example.com',
            'statusText', 'Learning how to position elements with CSS'
        )
    ),
    3, new Hash(
        'contents', 'JavaScript',
        'uri', '',
        'statusText', 'JavaScript Section',
        1, new Hash(
            'contents', 'Tutorials',
            'uri', '',
            'statusText', 'JavaScript Tutorials'
        ),
        2, new Hash(
            'contents', 'Custom Hash() Class',
            'uri', 'http://www.example.com',
            'statusText', 'Making your own associative arrays in javascript'
        )
    ),
    4, new Hash(
        'contents', 'DHTML',
        'uri', '',
        'statusText', 'Dynamic HTML',
        1, new Hash(
            'contents', 'Tutorials',
            'uri', '',
            'statusText', 'Dynamic HTML Tutorials'
        ),
        2, new Hash(
            'contents', 'DOM Tooltip',
            'uri', 'http://www.example.com',
            'statusText', 'Making custom tooltips using the DOM'
        )
    ),
    5, new Hash(
        'contents', 'PHP',
        'uri', '',
        'statusText', 'PHP Section',
        1, new Hash(
            'contents', 'Tutorials',
            'uri', '',
            'statusText', 'PHP Tutorials'
        ),
        2, new Hash(
            'contents', 'Handling actions',
            'uri', 'http://www.example.com',
            'statusText', 'Form actions in PHP'
        )
    )
));

// }}}
// {{{ domMenu_keramik: settings

domMenu_settings.set('domMenu_keramik', new Hash(
    'menuBarWidth', '0%',
    'menuBarClass', 'keramik_menuBar',
    'menuElementClass', 'keramik_menuElement',
    'menuElementHoverClass', 'keramik_menuElementHover',
    'menuElementActiveClass', 'keramik_menuElementHover',
    'subMenuBarClass', 'keramik_subMenuBar',
    'subMenuElementClass', 'keramik_subMenuElement',
    'subMenuElementHoverClass', 'keramik_subMenuElementHover',
    'subMenuElementActiveClass', 'keramik_subMenuElementHover',
    'subMenuMinWidth', 'auto',
    'horizontalSubMenuOffsetX', -5,
    'horizontalSubMenuOffsetY', 3,
    'distributeSpace', false,
    'openMouseoverMenuDelay', -1,
    'openMousedownMenuDelay', 0,
    'closeClickMenuDelay', 0,
    'closeMouseoutMenuDelay', -1,
    'expandMenuArrowUrl', 'arrow.gif'
));

// }}}
// {{{ domMenu_BJ: data

domMenu_data.set('domMenu_BJ', domMenu_data.elementData['domMenu_keramik']);

// }}}
// {{{ domMenu_BJ: settings

domMenu_settings.set('domMenu_BJ', new Hash(
    'menuBarWidth', '0%',
    'menuBarClass', 'BJ_menuBar',
    'menuElementClass', 'BJ_menuElement',
    'menuElementHoverClass', 'BJ_menuElementHover',
    'menuElementActiveClass', 'BJ_menuElementActive',
    'subMenuBarClass', 'BJ_subMenuBar',
    'subMenuElementClass', 'BJ_subMenuElement',
    'subMenuElementHoverClass', 'BJ_subMenuElementHover',
    'subMenuElementActiveClass', 'BJ_subMenuElementHover',
    'subMenuMinWidth', 'auto',
    'distributeSpace', false,
    'openMouseoverMenuDelay', -1,
    'openMousedownMenuDelay', 0,
    'closeClickMenuDelay', 0,
    'closeMouseoutMenuDelay', -1,
    'expandMenuArrowUrl', 'arrow.gif'
));

// }}}
// {{{ domMenu_vertical: data

domMenu_data.set('domMenu_vertical', new Hash(
    1, new Hash(
        'contents', 'Home',
        'uri', 'http://mojavelinux.com',
        'target', '_self',
        'statusText', 'Mojavelinux.com homepages',
        1, new Hash(
            'contents', 'News',
            'uri', 'http://mojavelinux.com',
            'target', '_blank',
            'statusText', 'Latest mojavelinux.com news'
        ),
        2, new Hash(
            'contents', 'Cooker',
            'uri', 'http://www.example.com',
            'statusText', 'Released open source programs'
        ),
        3, new Hash(
            'contents', 'Demos',
            'uri', 'http://www.example.com',
            'statusText', 'Program demos'
        ),
        4, new Hash(
            'contents', 'Pictures',
            'uri', 'http://www.example.com',
            'statusText', 'Pictureview picture catalog'
        ),
        5, new Hash(
            'contents', 'Tutorials',
            'uri', 'http://www.example.com',
            'statusText', 'Various tutorials I have put together'
        ),
        6, new Hash(
            'contents', 'Stats',
            'uri', 'http://www.example.com',
            'statusText', 'website statistics'
        )
    ),
    2, new Hash(
        'contents', 'Forums',
        'uri', '',
        'statusText', 'Mojave forums',
        1, new Hash(
            'contents', 'Cooker',
            'uri', 'http://www.example.com',
            'statusText', 'Released programs'
        ),
        2, new Hash(
            'contents', 'phpBB Mods',
            'uri', 'http://www.example.com',
            'statusText', 'phpBB Forum Modifications'
        ),
        3, new Hash(
            'contents', 'MyCalendar Mod',
            'uri', 'http://www.example.com',
            'statusText', 'MyCalendar add-on for phpBB'
        )
    ),
    3, new Hash(
        'contents', 'Demos',
        'uri', '',
        'statusText', 'Demo Sites',
        1, new Hash(
            'contents', 'DOM Menu',
            'uri', 'http://www.example.com',
            'statusText', 'Dynamic hierarchial menu using the DOM'
        ),
        2, new Hash(
            'contents', 'DOM Tooltip',
            'uri', 'http://www.example.com',
            'statusText', 'Dynamic tooltips using the DOM'
        ),
        3, new Hash(
            'contents', 'Popup Calendar',
            'uri', 'http://www.example.com',
            'statusText', 'Date selector popup calendar'
        )
    ),
    4, new Hash(
        'contents', 'Tutorials',
        'uri', '',
        'statusText', 'Various tutorials',
        1, new Hash(
            'contents', 'Hash Tables',
            'uri', 'http://www.example.com',
            'statusText', 'Creating hash tables in javascript'
        ),
        2, new Hash(
            'contents', 'Understanding Events',
            'uri', 'http://www.example.com',
            'statusText', 'Understanding Events in javascript'
        ),
        3, new Hash(
            'contents', 'Using setTimeout',
            'uri', 'http://www.example.com',
            'statusText', 'Using the setTimeout method in javascript'
        ),
        4, new Hash(
            'contents', 'Tips & Tricks',
            'uri', 'http://www.example.com',
            'statusText', 'Random tips and tricks'
        )
    ),
    5, new Hash(
        'contents', 'Pictures',
        'uri', 'http://www.example.com',
        'statusText', 'Picture sites',
        1, new Hash(
            'contents', 'Pictureview',
            'uri', 'http://www.example.com',
            'statusText', 'Mojavelinux.com picture catalog'
        ),
        2, new Hash(
            'contents', 'Chintoons',
            'uri', 'http://www.example.com',
            'statusText', 'Chinchilla cartoons'
        )
    ),
    6, new Hash(
        'contents', 'Stats',
        'uri', 'http://www.example.com',
        'statusText', 'Mojavelinux.com site statistics',
        1, new Hash(
            'contents', 'Overall Site Statistics for mojavelinux.com',
            'uri', 'http://www.example.com',
            'statusText', 'Overall statistics for mojavelinux.com'
        )
    )
));

// }}}
// {{{ domMenu_vertical: settings

domMenu_settings.set('domMenu_vertical', new Hash(
    'axis', 'vertical',
    'subMenuWidthCorrection', -1,
    'verticalSubMenuOffsetX', -1,
    'verticalSubMenuOffsetY', -1,
    'horizontalSubMenuOffsetX', 0,
    'horizontalSubMenuOffsetY', 0,
    'expandMenuArrowUrl', 'arrow.gif'
));

// }}}
