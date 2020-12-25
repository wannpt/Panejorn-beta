import React, { useEffect, useState } from 'react';
import './Card.scss';

import { Icon, IconifyIcon } from '@iconify/react';
import calendarLine from '@iconify/icons-ri/calendar-line';
import mapPin2Line from '@iconify/icons-ri/map-pin-2-line';
import starFill from '@iconify/icons-ri/star-fill';
import pushpin2Fill from '@iconify/icons-ri/pushpin-2-fill';
import navigationLine from '@iconify/icons-ri/navigation-line';

type cardType = {
    title: string,
    details: cardDetail[],
    option?: any,
    isPinned?: boolean, 
    nextLoc?: cardLocation,
}

type cardDetail = {
    type: any,
    detail: string
    style?: React.CSSProperties
}

type cardLocation = {
    nextLoc: string, 
    time: string
}

const cardDefault: cardType = {
    title: 'แพลนไปเที่ยวแบบจำลอง',
    details: [
        { type: 'date', detail: '09 พ.ย. 63 - 12 พ.ย. 63', style:{color: '#E66973', fontSize: '16px'}},
        { type: 'place', detail: 'จังหวัดกาญจนบุรี', style:{color: '#E66973', fontSize: '16px'}},
        { type: 'rate', detail: '4.8', style: {color: '#FFE600', fontSize:'16px'}},
    ],
    option: <Icon icon={pushpin2Fill} style={{color: '#C4C4C4', fontSize: '24px'}} />,
    isPinned : false,
}

const MapStringToIcon :any = {
    'date' : calendarLine,
    'place' : mapPin2Line,
    'rate' : starFill,
    'pin' : pushpin2Fill
}




const Card = (props : cardType) => {
    const [cardState, setCardState]= useState(props);
    
    let nextLocCard = () => {
        return (
            <div className='row'>
                <hr></hr>
                <p>test</p>
                <div className='card-title'>
                    <span>{cardState.nextLoc?.nextLoc}</span>
                </div>
                <div className='card-detail'>
                    <span>{cardState.nextLoc?.time}</span>
                </div>
            </div>
        )
    }

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
                    if(el.type !== 'rate')
                        return {...el, style:{ color: '#E66973', fontSize: '16px'}}
                    return {...el}
                })
                return {...prev, isPinned: false, details: newDetails ,option: <Icon icon={pushpin2Fill} style={{color: '#C4C4C4', fontSize: '24px'}} />}
            }
            
            else {
                let newDetails =  prev.details.map(el => {
                    if(el.type !== 'rate')
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
                            <Icon icon={(MapStringToIcon[el.type])} style={el.style} />
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
            {cardState.nextLoc && (
                    <div className='row align-items-center'>
                        <hr style={{
                            color: '#F5F2F2',
                            backgroundColor: '#F5F2F2',
                            height: .5,
                            borderColor : '#F5F2F2',
                            width: '90%'
                        }}/>
                        <div className='col-10'>

                            <p className='extra-small-title mb-2'> สถานที่ต่อไป </p>

                            <div className='title'>
                                <span>{cardState.nextLoc?.nextLoc}</span>
                            </div>
                        
                            <div className='card-detail'>
                                <span>{cardState.nextLoc?.time}</span>
                            </div>
                        </div>
                        <div className='col-2 px-0'>
                            <div className='card-option'>
                                <button>
                                    <Icon icon={navigationLine} style={{color: '#E66973', fontSize: '24px'}} rotate='90deg' />
                                </button>
                            </div>
                        </div>
                    </div>
                )}
        
        </div>
    );
}


export default Card