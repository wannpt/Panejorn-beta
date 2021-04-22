import React, { useEffect, useState } from 'react';
import Card from '../../components/Card/Card';
import News from '../../components/News/News';
import Logo from '../../Images/Group 23.svg';
import { StatusCard } from '../../constant/Types/CardTypes';
import { useParams } from 'react-router';

const cardDefault: StatusCard = {
	planName: 'เที่ยวหนึ่งวันกับคนอย่างเธอ',
	dateRange: '18 ม.ค. 64',
	province: 'กรุงเทพมหานคร',
	planScore: 0,
	planID: 0,
	nextLoc: 'ซาฟารีเวิลด์',
	time: '10.00น. - 13.30น.',
};

function Homepage() {
	const [data, setData] = useState(cardDefault);
	// const params = useParams();
	// console.log(params);
	// useEffect(() => {
	// 	fetch('/currentLocation', {
	// 		method: 'GET',
	// 	})
	// 		.then((res) => res.json())
	// 		.then((result) => {
	// 			setData(result);
	// 			console.log(result);
	// 		});
	// }, []);

	return (
		<div>
			<div className='gradient-background default-padding'>
				<img src={Logo} className='app-logo' alt='app logo' />
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
