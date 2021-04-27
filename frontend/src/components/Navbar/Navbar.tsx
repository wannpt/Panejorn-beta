import React, { useEffect, useState } from 'react';
import '../../App.scss';
import './Navbar.css';
import { NavLink as Link, useLocation } from 'react-router-dom';

import { Icon } from '@iconify/react';

import home4line from '@iconify/icons-ri/home-4-line';
import home4fill from '@iconify/icons-ri/home-4-fill';
import roundCollectionsBookmark from '@iconify/icons-ic/round-collections-bookmark';
import outlineCollectionsBookmark from '@iconify/icons-ic/outline-collections-bookmark';
import compass3fill from '@iconify/icons-ri/compass-3-fill';
import compass3line from '@iconify/icons-ri/compass-3-line';
import user3fill from '@iconify/icons-ri/user-3-fill';
import user3line from '@iconify/icons-ri/user-3-line';

type MapPathToIcon = {
    key: string,
    path: string,
    fill: any,
    line: any,
    active: boolean,
    style?: React.CSSProperties
}

const navbarConstant:MapPathToIcon[] = [
    {key: 'home', path: '/', fill: home4fill, line: home4line, active: true},
    {key: 'collections', path: '/collections', fill: roundCollectionsBookmark, line: outlineCollectionsBookmark, active: false},
    {key: 'explore', path: '/explore', fill: compass3fill, line: compass3line, active: false},
    {key: 'profile', path: '/profile', fill: user3fill, line: user3line, active: false},
    
].map(el => ({...el, style: {color: '#E66973', fontSize: '24px'}}))

const Navbar = () => {  


    const [icons, setIcons] = useState<MapPathToIcon[]>(navbarConstant);
    const [isHidden, setIsHidden] = useState(true)
    const location = useLocation();
    
    useEffect(() => {
            const path = location.pathname
            setIsHidden(true)
            setIcons(prev => {
                return prev.map(el => {
                    const pattern = new RegExp('^'+el.path + '$')
                    const selected = path.match(pattern)
                    if(selected)
                        return {...el, active: true}
                    return {...el, active: false}
                });
            });
            navbarConstant.map(el => {
                if(location.pathname === el.path)
                    setIsHidden(false);
            })
            
    },[location.pathname]);
    

    if(isHidden)
        return null

    return (
        <div className="app-tabbar text-center" data-testid='navbar-component'>
            {icons.map(el => {
                const icon = el.active ? el.fill : el.line;
                return (
                <Link to={el.path} className='col-3'>
                    <Icon icon={icon} style={el.style} />
                </Link>
                );
            })}
        </div>
    );
}

export default Navbar;
