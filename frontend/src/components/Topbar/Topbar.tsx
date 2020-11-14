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
}

const topbarConstant: TopbarType[] = [
    { title: 'หน้าแรก', path: '/' , canReturn: false, isEdit: false, styleClass: 'topbar'},
    { title: 'แผนของฉัน', path: '/collections', canReturn: false, isEdit: true, styleClass: 'topbar gradient-background'},
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

},[location.pathname]);

    
    return (
        <div className={topBar.styleClass}>
           <div className='row'>
                <div className='col'>
                    <span> {topBar.title} </span>
                </div>
                <div className='col text-center'>
                    <span> {topBar.isEdit? 'edit': 'not-edit'} </span>
                </div>
                <div className='col text-right'>
                    <span> options </span>
                </div>
            </div>
        </div>
    );

}

export default Topbar;