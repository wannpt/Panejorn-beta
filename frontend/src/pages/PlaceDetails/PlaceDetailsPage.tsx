import React, { useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { Carousel } from 'react-bootstrap';
import { Icon } from '@iconify/react';
import closeLine from '@iconify/icons-ri/close-line';
import { Place } from '../../constant/Types/PlaceTypes';

import './PlaceDetail.scss';

//temp
import Image1 from '../../Images/2017112653e674dd9043af67f22e0a40ce12149b142612.jpg';
import Image2 from '../../Images/563000006766601.jpg';
import { el } from 'date-fns/locale';

const PlacePage = () => {
	const params = useLocation();
	const history = useHistory();
	const [data, setData] = useState<Place>();

	console.log(params);
	console.log(history);

	useEffect(() => {
		fetch('/locations' + params.search, {
			method: 'GET',
		})
			.then((res) => res.json())
			.then((result) => {
				setData(result);
				console.log(result);
			});
	}, []);

	const goBackHandler = () => {
		history.goBack();
		console.log(history);
	};

	return (
		<div className='pt-0'>
			<button className='close-button' onClick={goBackHandler}>
				{' '}
				<Icon icon={closeLine} style={{ fontsize: '36px' }} />{' '}
			</button>

			<Carousel>
				<Carousel.Item>
					<img src={data?.thumbnalUrl} alt='img'/>
				</Carousel.Item>
				{/* <Carousel.Item>
					<img src={Image1} alt='img1' />
				</Carousel.Item>
				<Carousel.Item>
					<img src={Image2} alt='img2' />
				</Carousel.Item> */}
			</Carousel>
			<div className='p-3 pt-4'>
				<div className='big-title text-center'>
					<span>{data?.placeName}</span>
				</div>

				<div id='information' className='pt-2'>
					<span className='small-title'> รายละเอียด </span>
					<p>{data?.detail}</p>
				</div>

				<div id='facility' className='pt-2'>
					<span className='small-title'> กิจกรรม </span>
					<p> {data?.activities}</p>
				</div>

				<div id='telephone' className='pt-2'>
					<span className='small-title'> เวลาเปิด - ปิด </span>
					<span className='d-block'> วันจันทร์ : {data?.monday} </span>
					<span className='d-block'> วันอังคาร : {data?.tuesday} </span>
					<span className='d-block'> วันพุธ : {data?.wednesday} </span>
					<span className='d-block'> วันพฤหัส : {data?.thursday} </span>
					<span className='d-block'> วันศุกร์ : {data?.friday} </span>
					<span className='d-block'> วันเสาร์ : {data?.saturday} </span>
					<span className='d-block'> วันอาทิตย์ : {data?.sunday} </span>
				</div>

				<div id='telephone' className='pt-2'>
					<span className='small-title'> ช่องทางติดต่อ </span>
					<span className='d-block'> เบอร์โทรศัพท์ : {data?.telPhones} </span>
				</div>
			</div>
		</div>
	);
};

export default PlacePage;
