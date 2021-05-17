import closeLine from '@iconify/icons-ri/close-line';
import { Icon } from '@iconify/react';
import React from 'react';
import { Carousel } from 'react-bootstrap';
import { useHistory } from 'react-router';

import defaultPic from '../../Images/panejorn.png';

const AboutUs = () => {
	const history = useHistory();

	const goBackHandler = () => {
		history.goBack();
	};
	return (
		<div>
			<button className='close-button' onClick={goBackHandler}>
				{' '}
				<Icon icon={closeLine} style={{ fontsize: '36px' }} />{' '}
			</button>

			<Carousel>
				<Carousel.Item>
					<img className='carousel-img' src={defaultPic} alt='img' />
				</Carousel.Item>
			</Carousel>

			<div className='p-3 py-4'>
				<div className='color-text big-title text-center'>
					<span style={{ fontSize: 22 }}> เกี่ยวกับ พเนจร </span>
				</div>
				<hr />

				<div id='facility' className='pt-2'>
					<span className='big-title' role='img' aria-label='activities'>
						💁‍♂️ อะไรคือพเนจร 💁‍♀️
					</span>

					<p>
						พเนจร เป็นแอปพลิเคชันนำเสนอการท่องเที่ยวอัตโนมัติ
						เพื่อทำให้การวางแผนเที่ยวอันยุ่งยากกลับกลายเป็นเรื่องง่ายภายในไม่กี่นาที
						โดยที่ทุกท่านเห็นอยู่นี้เป็นเพียงเวอร์ชั่นทดลองเพื่อทดสอบความเหมาะสมของแผนเที่ยวที่นำเสนออัตโนมัติว่ามีความเหมาะสมและตรงกับเงื่อนไขผู้ใช้หรือไม่
					</p>
				</div>
				<hr />
				<div id='telephone' className='pt-2'>
					<span className='big-title' role='img' aria-label='activities'>
						👩‍💻 เกี่ยวกับผู้พัฒนา 👨‍💻
					</span>

					<p>
						ผลงานแอปพลิเคชัน พเนจร เป็นโปรเจ็คของทางทีมผู้พัฒนา 3 คน
						ผู้ชื่อชอบในการท่องเที่ยวและเข้าใจถึงความยากลำบากในการวางแผนเที่ยวแต่ละครั้ง
						ตัวแอปพลิเคชันนี้จึงเป็นสิ่งที่ผู้พัฒนาอยากปล่อยออกไปถึงมือทุกคนเพื่อทำให้การเที่ยวของคุณเป็นการพักผ่อนตั้งแต่เริ่มวางแผน
					</p>
				</div>
				<hr />
				<div id='facility' className='pt-2'>
					<span className='big-title' role='img' aria-label='activities'>
						📞 ติดต่อเรา
					</span>

					<span className='d-block'>
						สามารถติดต่อสอบถามถึงปัญหาหรือให้คำแนะนำเพิ่มเติมได้ตามจากฟอร์มที่แนบไปหรือที่
					</span>
					<span className='d-block'>Email: wattana.164@mail.kmutt.ac.th</span>
				</div>
			</div>
		</div>
	);
};

export default AboutUs;
