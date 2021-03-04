import React, { useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';

import '../../App.scss';
import './Topbar.scss';



type TopbarType = {
    title: string,
    path: string,
    canReturn: boolean,
    options?: React.FC[],
    isEdit: boolean
    isHidden: boolean,
}

const topbarConstant: TopbarType[] = [
    { title: 'หน้าแรก', path: '/' , canReturn: false, isEdit: false, isHidden: true},
    { title: 'แผนของฉัน', path: '/collections', canReturn: false, isEdit: true, isHidden: false},
    { title: 'สำรวจ', path:'/explore',canReturn: false, isEdit: false, isHidden: false},
    { title: 'ตั้งค่า', path:'/setting',canReturn: false, isEdit: false, isHidden: false},
    { title: 'รายละเอียดสถานที่', path:'/place', canReturn: true, isEdit:false, isHidden: true},
    { title: 'แผนเที่ยว', path:'/plan', canReturn: true, isEdit:false, isHidden: false}
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
                return setTopbar(el)
            return el
        })

},[location.pathname]);

    const history = useHistory();

    const goBackHandler = () => {
        history.goBack();
    };


    if( topBar.isHidden)
        return null
    
    return (
        <div className='topbar gradient-background'>
           <div className='row'>
                <div className='col' onClick={goBackHandler}>
                    {topBar.canReturn? '<' : ''}
                    <span> {topBar.title} </span>
                </div>
                <div className='col text-center'>
                    <span> {topBar.isEdit? 'edit': ''} </span>
                </div>
                <div className='col text-right'>
                    <span> options </span>
                </div>
            </div>
        </div>
    );

}

export default Topbar;