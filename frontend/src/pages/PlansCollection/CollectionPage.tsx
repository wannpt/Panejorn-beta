import React from 'react';
import Card from '../../components/Card/Card';

import { Icon } from '@iconify/react';
import calendarLine from '@iconify/icons-ri/calendar-line';
import mapPin2Line from '@iconify/icons-ri/map-pin-2-line';
import starFill from '@iconify/icons-ri/star-fill';
import pushpin2Fill from '@iconify/icons-ri/pushpin-2-fill';
import { CardCollections } from '../../constant/Types/CardTypes';

type cardType = {
	title: string;
	details: cardDetail[];
	option?: any;
	isPinned?: boolean;
	nextLoc?: any;
};

type cardDetail = {
	type: any;
	detail: string;
	style?: React.CSSProperties;
};

const CardsDefault: CardCollections = {
	pinnedPlans: [
		{
			planName: 'ก่อนสอบขอมอบให้ทริปนี้',
			dateRange: '09 ธ.ค. 63 - 12 ธ.ค. 63',
			province: 'กาญจนบุรี',
			planScore: 4.8,
		}
	],
	plans: [
		{
            "planName": "โซโล่เชียงใหม่",
            "dateRange": "12 ธ.ค. 63 - 14 ธ.ค. 63",
            "province": "เชียงใหม่",
            "planScore": 0
        },
        {
            "planName": "ทัวร์อีสาน",
            "dateRange": "10 ก.ค. 63 - 12 ก.ค. 63",
            "province": "ชัยภูมิ",
            "planScore": 4.8
        }
	]
}


function PlansCollectionPage() {
	//  const [cardList, setCardList] = useState(cardListDefault)
	//temp
	const cardList = CardsDefault;
	//endtemp

	return (
		<div className='default-padding'>
			<p className='title'>ที่ปักหมุดไว้ (1)</p>
			{
				cardList.pinnedPlans.map(el => {
					return <Card data={el} isPinned={true}/>
				})
			}
			<p className='title'>แผนทั้งหมด (3)</p>
			{
				cardList.plans.map(el =>{
					return <Card data={el} isPinned={false}/>
				})
			}
		</div>
	);
}

export default PlansCollectionPage;
