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
			viewBox="0 0 400 160"
			height={'100vh'}
			width={'100vw'}
			backgroundColor="transparent"
		  >
			<circle cx="150" cy="86" r="8" />
			<circle cx="194" cy="86" r="8" />
			<circle cx="238" cy="86" r="8" />
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
