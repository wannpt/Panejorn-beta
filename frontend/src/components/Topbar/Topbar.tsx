import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

import '../../App.scss';
import './Topbar.scss';



type TopbarType = {
    title: string,
    path: string,
    canReturn: boolean,
    options?: React.FC[],
    isEdit: boolean
    styleClass: string,
   // active: boolean
}

const topbarConstant: TopbarType[] = [
    { title: 'หน้าแรก', path: '/' , canReturn: false, isEdit: false, styleClass: 'topbar'},
    { title: 'แผนของฉัน', path: '/collections', canReturn: false, isEdit: false, styleClass: 'topbar gradient-background'},
    { title: 'สำรวจ', path:'/explore',canReturn: false, isEdit: false, styleClass: 'topbar gradient-background'},
    { title: 'ตั้งค่า', path:'/setting',canReturn: false, isEdit: false, styleClass: 'topbar gradient-background'},
    ]



function Topbar() {
    
    let [topBar, setTopbar] =  useState<TopbarType>(topbarConstant[0])
    const location = useLocation();

    useEffect(() => {
        const path = location.pathname
        topbarConstant.map(el => {
            const pattern = new RegExp('^' + el.path + '$')
            const selected = path.match(pattern);
            if(selected)
                setTopbar(el)

        })
        // const pattern = new RegExp('^/' + '$')
        // const selected = path.match(pattern);
        // if(selected)
        //     setTopbar();

},[location.pathname]);

    
    return (
        <div className={topBar.styleClass}>
            <p>{topBar.title}</p>
        </div>
    );

}

export default Topbar;