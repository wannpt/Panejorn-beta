import React from 'react';
import './Navbar.css';

import { Icon, InlineIcon } from '@iconify/react';
import home4Fill from '@iconify/icons-ri/home-4-fill';

function Navbar() {
  return (
    <div className="navbar">
        <div className='row'>
            <div className='col'>
                <Icon icon={home4Fill} style={{color: '#E66973', fontSize: '20px'}} />
            </div>
            <div className='col'>
                <p> Plan collections</p>
            </div>
        </div>
    </div>
  );
}

export default Navbar;
