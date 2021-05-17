import React from 'react';
import Card from '../../components/Card/Card';
import News from '../../components/News/News';
import Logo from '../../Images/Group 23.svg';
import { StatusCard } from '../../constant/Types/CardTypes';
import { Button } from 'react-bootstrap';
import { useHistory } from 'react-router';

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

	const history = useHistory();

	const StartHandler = () => {
		if(localStorage.status)
			history.push('/collections');
		else
			history.push('/profile');
	}

	return (
		<div>
			{/* <Loading/> */}
			<img src={Logo} className=' px-3 app-logo' alt='app logo' />
			<div className='gradient-background default-padding '>
				<div className='pb-4'>
					<p className='small-title white-text mb-2'></p>
					<div className='card-container ' style={{paddingTop:"36px", paddingBottom:"36px"}}>
						<div className='d-flex align-items-center justify-content-center'>
							<div className='row'>
								<div className='col-12'>
									<span className='' style={{fontSize:"2em", fontWeight:'bold'}}> ยินดีต้อนรับ! </span>
									<span className='d-block'> เรามาช่วยให้การวางแผนเที่ยวเป็นเรื่องง่าย 😊 </span>
									<span className='d-block mb-4' style={{color:'grey', fontSize:'80%' }}> แอปพลิเคชันนี้เป็นเวอร์ชันทดลองเท่านั้น </span>
									<Button className='submit-btn gradient-background' onClick={StartHandler}>เริ่มต้นใช้งาน</Button>
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
