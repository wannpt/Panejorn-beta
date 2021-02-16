import React, { useEffect } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import { Carousel } from 'react-bootstrap'
import { Icon, InlineIcon } from '@iconify/react';
import closeLine from '@iconify/icons-ri/close-line';

import './PlaceDetail.scss';

//temp
import Image1 from '../../Images/2017112653e674dd9043af67f22e0a40ce12149b142612.jpg'
import Image2 from '../../Images/563000006766601.jpg'

const PlacePage = () => {

    const params = useParams();
    const history = useHistory();
    console.log(params)
    console.log(history)

    const goBackHandler = () => {
        history.goBack();
        console.log(history)
    }

    return (
        <div className="pt-0">

            <button className='close-button' onClick={goBackHandler}> <Icon icon={closeLine} style={{fontsize:'36px'}}/> </button>

            <Carousel>
                <Carousel.Item>
                    <img src={Image1}/>
                </Carousel.Item>
                <Carousel.Item>
                    <img src={Image2}/>
                </Carousel.Item>
            </Carousel>
            <div className='p-3 pt-4'>
                <div className="big-title text-center">
                    <span>อุทยานแห่งชาติเอราวัณ</span> 
                </div>

                <div id='information' className='pt-2'>
                    <span className='small-title'> รายละเอียด </span> 
                    <p>
                    น้ำตกเอราวัณ เป็นอีกน้ำตกหนึ่งที่ขึ้นชื่อของ จังหวัดกาญจนบุรี เป็นน้ำตกที่สวยงามบนฝั่งแม่น้ำแควใหญ่ มีระยะทางยาว  ประมาณ 1,500 เมตรติดต่อกัน เดิมมีชื่อว่า "น้ำตกสะด่อง ม่องลาย" ตามชื่อลำห้วยม่องลายซึ่งเป็นต้นน้ำ ของน้ำตก แต่ด้วยลักษณะน้ำตกชั้นที่ 7 ของที่นี่มีลักษณะคล้ายหัวช้าง เอราวัณ 3 เศียร จึงกลายเป็นที่มาของชื่อ น้ำตกเอราวัณ ซึ่งเป็นที่รู้จักของคนทั่วไปเป็นอย่างดี

น้ำตกเอราวัณ นี้มีด้วยกันทั้งหมด 7 ชั้น แต่ละชั้นจะมีชื่อที่คล้อง จองกัน เริ่มจาก...
ชั้นที่ 1 ไหลคืนรัง เป็นน้ำตกชั้นเล็ก ๆ ที่เหมาะกับการนั่งเล่นรับลมพักผ่อน
ชั้นที่ 2 วังมัจฉา เหมาะกับการลงเล่นน้ำ เพราะมีแอ่งให้ลงไปแวกว่ายได้ และมีฝูง "ปลาพลวง" อาศัยอยู่ในน้ำด้วย
ชั้นที่ 3 ผาน้ำตก ชั้นนี้น้ำตกจะตกลงมาในระดับสูง นักท่องเที่ยวสามารถไปยืนบริเวณน้ำตกเพื่อเล่นน้ำได้
ชั้นที่ 4 อกผีเสื้อ ชั้นนี้มีจุดเด่นในการเล่นสไลด์เดอร์ไหลลื่นตกลงมายังแอ่งน้ำด้านล่าง เหมาะสำหรับนักท่องเที่ยวที่ชอบความตื่นเต้น
ชั้นที่ 5 เบื่อไม่ลง เป็นชั้นที่กินพื้นที่กว้างสามารถเล่นน้ำได้
ชั้นที่ 6 ดงพฤกษา ชั้นนี้ถูกล้อมรอบด้วยแมกไม้นานาพันธุ์
ชั้นที่ 7 ภูผาเอราวัณ เป็นชั้นสุดท้ายซึ่งเป็นชั้นที่สวยงามมาก
น้ำใสสะท้อนแสงเป็นสีฟ้าอมเขียวมรกตคล้ายสระว่ายน้ำ ในแต่ละชั้นของน้ำตกจะมี ปลาพลวง (ปลาน้ำจืดในตระกูลปลาตะเพียน ลำตัวสีน้ำตาลเขียวเกล็ดโต มีหนวดยาว 2 คู่ ชอบอาศัยบริเวณธารน้ำตก ลำห้วย หรือลำธารที่ใสสะอาด) แหวกว่ายอยู่ แต่ในชั้นที่มีมากก็เห็นจะเป็นชั้นที่ 2 คือ วังมัจฉา
โดยแต่ละชั้นของ น้ำตกเอราวัณ จะมีลักษณะเป็นอ่างสามารถเล่นน้ำได้ และยังมีเส้นทางศึกษาธรรมชาติเอราวัณ มีระยะทางประมาณ 1,060 เมตร ใช้เวลาประมาณ 30 นาที เดินผ่านป่าดิบเขา จุดชมวิวและป่าผลัดใบที่สวยงาม ท่านจะได้รับความรู้และความเพลิดเพลินในการชื่นชมธรรมชาติที่สวยงามเป็นอย่างยิ่ง    
                    </p> 
                </div>

                <div id='facility' className='pt-2'>
                    <span className='small-title'> คุณสมบัติ </span>
                </div>
            </div>
        </div>
    )
}

export default PlacePage