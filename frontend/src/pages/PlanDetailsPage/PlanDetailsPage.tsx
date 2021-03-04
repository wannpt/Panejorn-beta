import React from 'react';

export const PlanDetailsPage = (props: any) => {
	return (
		<div className='default-padding'>
			{/* Header section  */}
			<div className='row justify-content-center text-center'>
				<div className='col-12'>
					<span className='plan-title'> ชื่อแผนเที่ยว </span>
					<div className='plan-subtitle'>วันที่แรก - วันที่สุดท้าย</div>
					<div className='plan-subtitle'>จังหวัด</div>
				</div>

				{/* slider ที่ยังไม่มี */}
			</div>

			{/* Details section */}
			<div className='row'>
				<div className='col-12 d-flex align-items-bottom'>
					<span className='date-index'> วันที่ </span>
					<span className='date-title'> วันที่แรก </span>
				</div>
				{/* PlaceCard map */}
			</div>
		</div>
	);
};

export default PlanDetailsPage;
