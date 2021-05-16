import React from 'react';
import Tagscore from '../../components/Profile/Tagscore';
import Stepper from '../../components/Stepper/Stepper';

const TagscorePage = () => {
	return (
		<div className='default-padding'>
			<div className='row'>
				<div className='col text-center'>
					<span className='color-text' style={{ fontSize: 24, fontWeight: 600 }}>
						สมัครใช้บริการ
					</span>
				</div>
			</div>
			{/* stepper */}
			<Stepper title={'ข้อมูลความสนใจ'} subtitle={'เลือกความสนใจของคุณ ความชอบเหล่านี้จะมีผลต่อการนำเสนอแผน'} step={2} />

			{/* Tagscore */}
			<Tagscore />
		</div>
	);
};

export default TagscorePage;
