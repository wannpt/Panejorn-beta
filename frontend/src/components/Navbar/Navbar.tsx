import React from 'react';
import './Navbar.css';

import { Icon } from '@iconify/react';
import home4Fill from '@iconify/icons-ri/home-4-fill';
import outlineCollectionsBookmark from '@iconify/icons-ic/outline-collections-bookmark';
import compass3line from '@iconify/icons-ri/compass-3-line';
import user3line from '@iconify/icons-ri/user-3-line';

function Navbar() {
  return (
    <div className="navbar text-center ">
        <div className='col-3'>
            <Icon icon={home4Fill} style={{color: '#E66973', fontSize: '20px'}} />
        </div>
        <div className='col-3'>
            <Icon icon={outlineCollectionsBookmark} style={{color: '#E66973', fontSize: '20px'}} />
        </div>
        <div className='col-3'>
            <Icon icon={compass3line} style={{color: '#E66973', fontSize: '20px'}} />
        </div>
        <div className='col-3'>
            <Icon icon={user3line} style={{color: '#E66973', fontSize: '20px'}} />
        </div>
    </div>
  );
}

export default Navbar;
