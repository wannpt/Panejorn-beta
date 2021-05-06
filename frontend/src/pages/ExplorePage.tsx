import React from 'react';
import { Icon } from '@iconify/react';
import emotionSadLine from '@iconify-icons/ri/emotion-sad-line';

function ExplorePage() {
	return (
		<div className='d-flex align-items-center justify-content-center' style={{ width: '100vw', height: '100vh' }}>
			<div className=''>
				<div className='d-flex justify-content-center'>
					<Icon icon={emotionSadLine} color='#dbdbdb' width='120' height='120' />
				</div>
				<div className='d-block'>
					<span style={{color:'#dbdbdb'}} className='big-title'>ขออภัย ฟีเจอร์นี้ยังไม่พร้อมใช้งาน</span>
				</div>
			</div>
		</div>
	);
}

export default ExplorePage;
