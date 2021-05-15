import React from 'react';
import Card from '../../components/Card/Card';
import News from '../../components/News/News';
import Logo from '../../Images/Group 23.svg';
import { StatusCard } from '../../constant/Types/CardTypes';
import Loading from '../../components/Loading/Loading';
import Icon from '@iconify/react';
import emotionSadLine from '@iconify-icons/ri/emotion-sad-line';

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
	return (
		<div>
			{/* <Loading/> */}
			<img src={Logo} className=' px-3 app-logo' alt='app logo' />
			<div className='gradient-background default-padding '>
				<div className='pb-4'>
					<p className='small-title white-text mb-2'>แผนเที่ยวปัจจุบัน</p>
					<div className='card-container ' style={{paddingTop:"36px", paddingBottom:"36px"}}>
						<div className='d-flex align-items-center justify-content-center'>
							<div className=''>
								<div className='d-flex justify-content-center'>
									<Icon icon={emotionSadLine} color='#dbdbdb' width='120' height='120' />
								</div>
								<div className='d-block'>
									<span style={{ color: '#dbdbdb' }} className='big-title'>
										ขออภัย ฟีเจอร์นี้ยังไม่พร้อมใช้งาน
									</span>
								</div>
							</div>
						</div>
					</div>
					{/* <Card data={cardDefault} isPinned={false} isStatus={true} /> */}
				</div>
			</div>
			<div className='px-3 py-4'>
				<News />
			</div>
		</div>
	);
}

export default Homepage;
