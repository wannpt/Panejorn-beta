import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router';
import './PlanSelection.scss';

const PlanSelectionPage = (props: any) => {
	const location = useLocation();
	const payload = location.state;

	const [data, setData] = useState(payload);

	return (
		<div>
			<div className='selectplan-topbar container-fluid'>
				<div className='row'>
                    <div className='col-2'> X </div>
                    <div className='col-8 color-text text-center'> เลือกแผนเที่ยว </div>
                    <div className='col-2'> icon</div>
                </div>
			</div>
		</div>
	);
};

export default PlanSelectionPage;
