import React, { useState } from 'react';
import Card from '../../components/Card/Card'

import { Icon } from '@iconify/react';
import calendarLine from '@iconify/icons-ri/calendar-line';
import mapPin2Line from '@iconify/icons-ri/map-pin-2-line';
import starFill from '@iconify/icons-ri/star-fill';
import pushpin2Fill from '@iconify/icons-ri/pushpin-2-fill';


type cardType = {
    title: string,
    details: cardDetail[],
    option?: any,
    isPinned?: boolean, 
    nextLoc?: any,
}

type cardDetail = {
    type: any,
    detail: string
    style?: React.CSSProperties
}

const cardListDefault: cardType[] = [
    {
        title: 'กาญนะจ๊ะบุรีที่เรารัก',
        details: [
            { type: 'date', detail: '09 พ.ย. 63 - 12 พ.ย. 63', style:{color: '#FFFFFF', fontSize: '16px'}},
            { type: 'place', detail: 'จังหวัดกาญจนบุรี', style:{color: '#FFFFFF', fontSize: '16px'}},
            { type: 'rate', detail: '4.8', style: {color: '#FFE600', fontSize:'16px'}}
        ],
        option: <Icon icon={pushpin2Fill} style={{color: '#FFFFFF', fontSize: '24px'}} />,
        isPinned: true, 
    },
    {
        title: 'ทดสอบสักหน่อย',
        details: [
            { type: 'date', detail: '09 พ.ย. 63 - 12 พ.ย. 63', style:{color: '#E66973', fontSize: '16px'}},
            { type: 'place', detail: 'จังหวัดกาญจนบุรี', style:{color: '#E66973', fontSize: '16px'}},
            { type: 'rate', detail: '4.8', style: {color: '#FFE600', fontSize:'16px'}}
        ],
        option: <Icon icon={pushpin2Fill} style={{color: '#C4C4C4', fontSize: '24px'}} />,
        isPinned: false, 
        nextLoc: {
            nextLoc: 'สถานีดวงจันทร์',
            time: '09.00น - 19.00น',
        }
    },
    {
        title: 'ทดสอบสักหน่อย2',
        details: [
            { type: 'date', detail: '09 พ.ย. 63 - 12 พ.ย. 63', style:{color: '#E66973', fontSize: '16px'}},
            { type: 'place', detail: 'จังหวัดกาญจนบุรี', style:{color: '#E66973', fontSize: '16px'}},
            { type: 'rate', detail: '4.8', style: {color: '#FFE600', fontSize:'16px'}}
        ],
        option: <Icon icon={pushpin2Fill} style={{color: '#C4C4C4', fontSize: '24px'}} />,
        isPinned: false, 
    },
    {
        title: 'ทดสอบสักหน่อย3',
        details: [
            { type: calendarLine, detail: '09 พ.ย. 63 - 12 พ.ย. 63', style:{color: '#E66973', fontSize: '16px'}},
            { type: mapPin2Line, detail: 'จังหวัดกาญจนบุรี', style:{color: '#E66973', fontSize: '16px'}},
            { type: starFill, detail: '4.8', style: {color: '#FFE600', fontSize:'16px'}}
        ],
        option: <Icon icon={pushpin2Fill} style={{color: '#C4C4C4', fontSize: '24px'}} />,
        isPinned: false, 
    },
]


function PlansCollectionPage() {

    const [cardList, setCardList] = useState(cardListDefault)

    return (
        <div className='default-padding'>
            <p className='title'>ที่ปักหมุดไว้ (1)</p>
            {cardList.map(el => {
                if(el.isPinned)
                    return <Card {...el}/>
            })}
            <p className='title'>แผนทั้งหมด (3)</p>
            {cardList.map(el => {
                if(!el.isPinned)
                    return <Card {...el}/>
            })}
        </div>
    );
}

export default PlansCollectionPage;