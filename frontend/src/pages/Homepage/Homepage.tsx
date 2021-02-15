
import React from 'react'
import Card from '../../components/Card/Card'
import News from '../../components/News/News'

const cardDefault: cardType =  {
    title: 'ทดสอบสักหน่อย',
    details: [
        { type: 'date', detail: '09 พ.ย. 63 - 12 พ.ย. 63', style:{color: '#E66973', fontSize: '16px'}},
        { type: 'place', detail: 'จังหวัดกาญจนบุรี', style:{color: '#E66973', fontSize: '16px'}},
        { type: 'rate', detail: '4.8', style: {color: '#FFE600', fontSize:'16px'}}
    ],
    isPinned: false, 
    nextLoc: {
        nextLoc: 'สถานีดวงจันทร์',
        time: '09.00น - 19.00น',
    }
}

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

function Homepage() {
   

     
    return (
        <div>
            <div className='gradient-background default-padding'>
                <div className='pb-4'>
                    <p className='small-title white-text mb-2'>แผนเที่ยวปัจจุบัน</p>
                    <Card   title={cardDefault.title}
                            details={cardDefault.details}
                            nextLoc={cardDefault.nextLoc} />
                </div>
            </div>
            <div className='px-3 py-4'>
                <News/>
            </div>
        </div>
    );
}

export default Homepage;