import React from 'react';
import Card from '../../components/Card/Card';
import News from '../../components/News/News';
import { StatusCard } from '../../constant/Types/CardTypes';

const cardDefault: StatusCard = 
	{
		"planName": "โซโล่เชียงใหม่",
		"dateRange": "12 ธ.ค. 63 - 14 ธ.ค. 63",
		"province": "เชียงใหม่",
		"planScore": 0,
		planID: 0,
		nextLoc: 'สักที่นี่แหละ',
		time: '09.45น. - 10.30น.'
	};

type cardDetail = {
	type: any;
	detail: string;
	style?: React.CSSProperties;
};

function Homepage() {
	return (
		<div>
			<div className='gradient-background default-padding'>
				<div className='pb-4'>
					<p className='small-title white-text mb-2'>แผนเที่ยวปัจจุบัน</p>
					<Card data={cardDefault} isPinned={false} isStatus={true} />
				</div>
			</div>
			<div className='px-3 py-4'>
				<News />
			</div>
		</div>
	);
}

export default Homepage;
