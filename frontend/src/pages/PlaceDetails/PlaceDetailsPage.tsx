import React, { useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { Carousel } from 'react-bootstrap';
import { Icon } from '@iconify/react';
import closeLine from '@iconify/icons-ri/close-line';
import { Place } from '../../constant/Types/PlaceTypes';

import './PlaceDetail.scss';
import ContentLoader from 'react-content-loader';

const PlacePage = () => {
	const params = useLocation();
	const history = useHistory();
	const [data, setData] = useState<Place>();
	const [isLoading, setIsLoading] = useState<Boolean>(true);

	useEffect(() => {
		fetch('/locations' + params.search, {
			method: 'GET',
		})
			.then((res) => res.json())
			.then((result) => {
				setData(result);
				setIsLoading(false);
			});
	}, []);

	const goBackHandler = () => {
		history.goBack();
		console.log(history);
	};

	if (isLoading) {
		return (
			<ContentLoader
				width={376}
				height={667}
				viewBox='0 150 850 1200'
				backgroundColor='#eaeced'
				foregroundColor='#ffffff'
			>
				<circle cx='739' cy='109' r='9' />
				<circle cx='765' cy='109' r='9' />
				<rect x='217' y='157' rx='4' ry='4' width='433' height='291' />
				<rect x='359' y='457' rx='4' ry='4' width='150' height='10' />
				<rect x='48' y='515' rx='4' ry='4' width='720' height='15' />
				<rect x='49' y='547' rx='4' ry='4' width='598' height='15' />
				<rect x='48' y='581' rx='4' ry='4' width='720' height='15' />
				<rect x='49' y='612' rx='4' ry='4' width='520' height='15' />
				<rect x='48' y='652' rx='4' ry='4' width='720' height='15' />
				<rect x='48' y='684' rx='4' ry='4' width='598' height='15' />
				<rect x='48' y='718' rx='4' ry='4' width='720' height='15' />
				<rect x='49' y='748' rx='4' ry='4' width='419' height='15' />
				<circle cx='713' cy='810' r='9' />
				<circle cx='739' cy='810' r='9' />
				<rect x='41' y='836' rx='4' ry='4' width='720' height='3' />
				<rect x='122' y='880' rx='4' ry='4' width='320' height='11' />
				<circle cx='79' cy='900' r='26' />
				<rect x='135' y='901' rx='4' ry='4' width='120' height='10' />
				<rect x='123' y='949' rx='4' ry='4' width='320' height='11' />
				<circle cx='80' cy='969' r='26' />
				<rect x='136' y='970' rx='4' ry='4' width='120' height='10' />
				<rect x='124' y='1021' rx='4' ry='4' width='320' height='11' />
				<circle cx='81' cy='1041' r='26' />
				<rect x='137' y='1042' rx='4' ry='4' width='120' height='10' />
				<rect x='125' y='1090' rx='4' ry='4' width='320' height='11' />
				<circle cx='82' cy='1110' r='26' />
				<rect x='138' y='1111' rx='4' ry='4' width='120' height='10' />
			</ContentLoader>
		);
	} else {
		return (
			<div className='pt-0'>
				<button className='close-button' onClick={goBackHandler}>
					{' '}
					<Icon icon={closeLine} style={{ fontsize: '36px' }} />{' '}
				</button>

				<Carousel>
					<Carousel.Item>
						<img src={data?.thumbnalUrl} alt='img' />
					</Carousel.Item>
				</Carousel>
				<div className='p-3 py-4'>
					<div className='color-text big-title text-center'>
						<span style={{fontSize:22}}>{data?.placeName}</span>
					</div>

					<hr/>

					<div id='facility' className='pt-2'>
						<span className='big-title'> 🏃‍♂️ กิจกรรม </span>
						<span className='d-block'> {data?.activities}</span>
					</div>

					<hr/>

					<div id='telephone' className='pt-2'>
						<span className='big-title'> ⏰ เวลาเปิด - ปิด </span>
						<span className='d-block'> วันจันทร์ : {data?.monday} </span>
						<span className='d-block'> วันอังคาร : {data?.tuesday} </span>
						<span className='d-block'> วันพุธ : {data?.wednesday} </span>
						<span className='d-block'> วันพฤหัส : {data?.thursday} </span>
						<span className='d-block'> วันศุกร์ : {data?.friday} </span>
						<span className='d-block'> วันเสาร์ : {data?.saturday} </span>
						<span className='d-block'> วันอาทิตย์ : {data?.sunday} </span>
					</div>

					<hr/>

					<div id='telephone' className='pt-2'>
						<span className='big-title'>📞 ช่องทางติดต่อ </span>
						<span className='d-block'> เบอร์โทรศัพท์ : {data?.telPhones} </span>
					</div>

					<hr/>

					<div id='information' className='pt-2'>
						<span className='big-title'>📄 รายละเอียด </span>
						<p>{data?.detail}</p>
					</div>
				</div>
			</div>
		);
	}
};

export default PlacePage;
