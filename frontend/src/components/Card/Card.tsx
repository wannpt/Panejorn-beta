import React, { useState } from 'react';
import './Card.scss';

import { Icon } from '@iconify/react';
import calendarLine from '@iconify/icons-ri/calendar-line';
import mapPin2Line from '@iconify/icons-ri/map-pin-2-line';
import starFill from '@iconify/icons-ri/star-fill';
import pushpin2Fill from '@iconify/icons-ri/pushpin-2-fill';

type cardType = {
    type: string,
    title: string,
    details: cardDetail[],
    option?: any
}

type cardDetail = {
    icon?: any,
    detail: string
}

const cardDefault: cardType = {
    type: 'large',
    title: 'แพลนไปเที่ยวแบบจำลอง',
    details: [
        { icon: <Icon icon={calendarLine} style={{color: '#E66973', fontSize: '16px'}} />, detail: '09 พ.ย. 63 - 12 พ.ย. 63'},
        { icon: <Icon icon={mapPin2Line} style={{color: '#E66973', fontSize: '16px'}} />, detail: 'จังหวัดกาญจนบุรี'},
        { icon: <Icon icon={starFill} style={{color: '#FFE600', fontSize: '16px'}} />, detail: '4.8'},
    ],
    option: <Icon icon={pushpin2Fill} style={{color: '#C4C4C4', fontSize: '24px'}} />
}

const Card = () => {
    const [cardState, setCardState]= useState(cardDefault);

    return (
        <div className='card-container'>
            <div className='row align-items-center'>
                
                <div className='col-10'>
                    <div className='title'>
                        <span>{cardState.title}</span>
                    </div>

                    {cardState.details.map(el => {
                       return( 
                        <div className='card-detail'>
                            {el.icon}
                            <span className='ml-2'> {el.detail}</span>
                        </div>
                    )})}
                    
                </div>

                <div className='col-2 px-0'>
                    <div className='card-option'>
                        {cardState.option}
                    </div>
                </div>

            </div>
        </div>
    );
}


export default Card