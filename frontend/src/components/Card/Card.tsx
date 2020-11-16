import React, { useEffect, useState } from 'react';
import './Card.scss';

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
    icon?: any,
    detail: string
    style?: React.CSSProperties
}

const cardDefault: cardType = {
    title: 'แพลนไปเที่ยวแบบจำลอง',
    details: [
        { icon: calendarLine, detail: '09 พ.ย. 63 - 12 พ.ย. 63', style:{color: '#E66973', fontSize: '16px'}},
        { icon: mapPin2Line, detail: 'จังหวัดกาญจนบุรี', style:{color: '#E66973', fontSize: '16px'}},
        { icon: starFill, detail: '4.8', style: {color: '#FFE600', fontSize:'16px'}},
    ],
    option: <Icon icon={pushpin2Fill} style={{color: '#C4C4C4', fontSize: '24px'}} />,
    isPinned : false,
}


const Card = (props : cardType) => {
    const [cardState, setCardState]= useState(props);

    // useEffect(() => {
    //     setCardState(prev => {
    //         if(prev.isPinned)
    //             return {...prev, isPinned: false, option: <Icon icon={pushpin2Fill} style={{color: '#FFFFFF', fontSize: '24px'}} /> }
    //         return {...prev, isPinned:true, option: <Icon icon={pushpin2Fill} style={{color: '#C4C4C4', fontSize: '24px'}} /> }
    //     })
    // },[cardState.isPinned])


    function PinnedCard(){
        setCardState(prev => {
            if(prev.isPinned){
                let newDetails = prev.details.map(el => {
                    if(el.icon !== starFill)
                        return {...el, style:{ color: '#E66973', fontSize: '16px'}}
                    return {...el}
                })
                return {...prev, isPinned: false, details: newDetails ,option: <Icon icon={pushpin2Fill} style={{color: '#C4C4C4', fontSize: '24px'}} />}
            }
            
            else {
                let newDetails =  prev.details.map(el => {
                    if(el.icon !== starFill)
                        return {...el, style:{ color: '#FFFFFF', fontSize: '16px'}}
                    return {...el}
                })
                return {...prev, isPinned: true, details: newDetails , option: <Icon icon={pushpin2Fill} style={{color: '#FFFFFF', fontSize: '24px'}} />}  
            }
        })
    }


    return (
        <div className={ cardState.isPinned ? 'card-container gradient-background white-text' : 'card-container'}>
            <div className='row align-items-center'>
                
                <div className='col-10'>
                    <div className='title'>
                        <span>{cardState.title}</span>
                    </div>

                    {cardState.details.map(el => {
                       return( 
                        <div className='card-detail'>
                            <Icon icon={el.icon} style={el.style} />
                            <span className='ml-2'> {el.detail}</span>
                        </div>
                    )})}
                    
                </div>

                <div className='col-2 px-0'>
                    <div className='card-option'>
                        <button onClick={PinnedCard}>
                            {cardState.option}
                        </button>
                    </div>
                </div>

            </div>
        </div>
    );
}


export default Card