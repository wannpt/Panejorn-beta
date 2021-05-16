import React, { useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';

import '../../App.scss';
import { TopbarType } from '../../constant/Types/TopbarOptionsTypes';
import CreatePlan from '../CreateModal/CreatePlan';
import './Topbar.scss';

const topbarConstant: TopbarType[] = [
	{ title: 'หน้าแรก', path: '/', canReturn: false, isEdit: false, isHidden: true },
	{
		title: 'แผนของฉัน',
		path: '/collections',
		canReturn: false,
		isEdit: false,
		isHidden: false,
		options: [<CreatePlan />],
	},
	{ title: 'สำรวจ', path: '/explore', canReturn: false, isEdit: false, isHidden: false, options:[<div style={{width:32, height:46}} />] },
	{ title: 'ตั้งค่า', path: '/setting', canReturn: false, isEdit: false, isHidden: false, options:[<div style={{width:32, height:46}} />] },
	{ title: 'รายละเอียดสถานที่', path: '/place', canReturn: true, isEdit: false, isHidden: true, options:[<div style={{width:32, height:46}} />] },
	{ title: 'แผนเที่ยว', path: '/plan', canReturn: true, isEdit: false, isHidden: false, options:[<div style={{width:32, height:46}} />] },
	{ title: 'เลือกแผนเที่ยว', path: '/planSelection', canReturn: true, isEdit: true, isHidden: true, options:[<div style={{width:32, height:46}} />] },
	{ title: 'ย้อนกลับ', path: '/register', canReturn: true, isEdit:false, isHidden: false, options:[<div style={{width:32, height:46}} />]},
	{ title: 'ย้อนกลับ', path: '/register/tagscore', canReturn: true, isEdit:false, isHidden: false, options:[<div style={{width:32, height:46}} />]},
	{ title: 'โปรไฟล์', path: '/profile', canReturn: false, isEdit: false, isHidden: false, options:[<div style={{width:32, height:46}} />]},
	{ title: 'โปรไฟล์', path: '/profile/tagscore', canReturn: true, isEdit: false, isHidden: false, options:[<div style={{width:32, height:46}} />]},

];

function Topbar() {
	let [topBar, setTopbar] = useState<TopbarType>(topbarConstant[0]);
	const location = useLocation();

	useEffect(() => {
		const path = location.pathname;
		topbarConstant.map((el) => {
			const pattern = new RegExp('^' + el.path + '$');
			const selected = path.match(pattern);
			if (selected) return setTopbar(el);
			return el;
		});
	}, [location.pathname]);

	const history = useHistory();

	const goBackHandler = () => {
		history.goBack();
	};

	if (topBar.isHidden) return null;

	return (
		<div className='topbar gradient-background'>
			<div className='row align-items-center'>
				<div className='col' onClick={goBackHandler}>
					{topBar.canReturn ? '<' : ''}
					<span> {topBar.title} </span>
				</div>
				<div className='col text-center'>
					<span> {topBar.isEdit ? 'เลือกแผนเที่ยว' : ''} </span>
				</div>
				<div className='col text-right d-flex justify-content-end'>
					{topBar.options?.map((el) => {
						if(localStorage.status)
							return el;
						else return <div style={{width:32, height:46}} />;
					})}
				</div>
			</div>
		</div>
	);
}

export default Topbar;
