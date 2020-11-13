import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

import '../../App.scss';
import './Topbar.scss';

function Topbar() {
    
    let [topBarClass, setTopBarClass] =  useState('topbar')
    const location = useLocation();

    useEffect(() => {
        const path = location.pathname
        const pattern = new RegExp('^/' + '$')
        const selected = path.match(pattern);
        if(selected)
            setTopBarClass('topbar');
        else
            setTopBarClass('topbar gradient-background');
},[location.pathname]);

    
    return (
        <div className={topBarClass}>
            <p>หน้าแรก</p>
        </div>
    );

}

export default Topbar;