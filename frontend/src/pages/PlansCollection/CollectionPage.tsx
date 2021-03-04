import React, { useEffect, useState } from 'react';
import Card from '../../components/Card/Card';

import { Icon } from '@iconify/react';
import calendarLine from '@iconify/icons-ri/calendar-line';
import mapPin2Line from '@iconify/icons-ri/map-pin-2-line';
import starFill from '@iconify/icons-ri/star-fill';
import pushpin2Fill from '@iconify/icons-ri/pushpin-2-fill';
import { CardCollections } from '../../constant/Types/CardTypes';
import { GetPlanCollection } from '../../constant/api/PlansAPI/PlansAPI';

const CardsDefault: CardCollections = {
	pinnedPlans: [
		{
			planName: 'ก่อนสอบขอมอบให้ทริปนี้',
			dateRange: '09 ธ.ค. 63 - 12 ธ.ค. 63',
			province: 'กาญจนบุรี',
			planScore: 4.8,
		},
	],
	plans: [
		{
			planName: 'โซโล่เชียงใหม่',
			dateRange: '12 ธ.ค. 63 - 14 ธ.ค. 63',
			province: 'เชียงใหม่',
			planScore: 0,
		},
		{
			planName: 'ทัวร์อีสาน',
			dateRange: '10 ก.ค. 63 - 12 ก.ค. 63',
			province: 'ชัยภูมิ',
			planScore: 4.8,
		},
	],
};

function PlansCollectionPage() {
	const [isLoading, setIsLoading] = useState(true);
	const [cardList, setCardList] = useState(CardsDefault)

	//Must fetch Plan collection here!
	useEffect(() => {
		console.log('getting...');
		fetch('http://localhost:8000/getPlanCollection?userId=4', {
			method: 'GET',
		})
			.then((res) => res.json())
			.then((result) => {
				console.log(result);
				setCardList(result);
				setIsLoading(false);
			});
	}, []);

	return (
		<>
			{!isLoading && (
				<div className='default-padding'>
					<p className='title'>ที่ปักหมุดไว้ (1)</p>
					{cardList.pinnedPlans.map((el) => {
						return <Card data={el} isPinned={true} isStatus={false} />;
					})}
					<p className='title'>แผนทั้งหมด (3)</p>
					{cardList.plans.map((el) => {
						return <Card data={el} isPinned={false} isStatus={false} />;
					})}
				</div>
			)}
		</>
	);
}

export default PlansCollectionPage;
