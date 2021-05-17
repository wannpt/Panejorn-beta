import closeLine from '@iconify/icons-ri/close-line';
import { Icon } from '@iconify/react';
import React from 'react';
import { Carousel } from 'react-bootstrap';
import { useHistory } from 'react-router';

import defaultPic from '../../Images/futureworkmock.png';

const FutureWork = () => {
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
					<span style={{ fontSize: 22 }}> แผนพัฒนาในอนาคต </span>
				</div>
				<hr />

				<span className='big-title' role='img' aria-label='activities'>
					แผนต่อไป💹
				</span>

				<div id='facility' className='pt-2'>
					<span>ทางทีมผู้พัฒนาตั้งเป้าในการทำฟีเจอร์ต่าง ๆ ต่อไปนี้ในอนาคต</span>
					<span className='d-block'>👉 ผู้ใช้สามารถแก้ไขแผนจากระบบสร้างแผนอัตโนมัติ </span>
					<span className='d-block'>
						👉 ผู้ใช้สามารถเลือกเวลาเริ่มและจบทริปในแต่ละวันได้
						ระบบจะคำนึงถึงการเดินทางจากจังหวัดเริ่มต้นของผู้ใช้ไปยังจังหวัดเป้าหมาย
					</span>
					<span className='d-block '>👉 ผู้ใช้สามารถสร้างแผนด้วยตัวเองโดยไม่พึ่งระบบสร้างแผน </span>
					<span className='d-block'>👉 ผู้ใช้สามารถดูแผนอื่น ๆ จากที่เคยเสนอให้ผู้ใช้อื่นมาเป็นแผนของตัวเองได้ </span>
				</div>
			</div>
		</div>
	);
};

export default FutureWork;
