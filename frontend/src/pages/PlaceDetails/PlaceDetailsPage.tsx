import React, { useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { Carousel } from 'react-bootstrap';
import { Icon } from '@iconify/react';
import closeLine from '@iconify/icons-ri/close-line';

import './PlaceDetail.scss';
import defaultPic from '../../Images/nologo.png';
import ContentLoader from 'react-content-loader';
import { AccommodationPlace, AttractionPlace } from '../../constant/Types/PlaceTypes';

const PlacePage = () => {
	const params = useLocation();
	const history = useHistory();
	const [data, setData] = useState<AttractionPlace | AccommodationPlace | any>();
	const [type, setType] = useState<string>();
	const [isLoading, setIsLoading] = useState<Boolean>(true);

	useEffect(() => {
		fetch('/locations' + params.search, {
			method: 'GET',
		})
			.then((res) => res.json())
			.then((result) => {
				if (result !== null) {
					setData(result);

					if (result.activities !== undefined) {
						setType('attraction');
					} else if (result.hotelStar !== undefined) {
						setType('accommodation');
					}
					setIsLoading(false);
				} else {
				}
			});
	}, []);

	const goBackHandler = () => {
		history.goBack();
	};

	if (isLoading) {
		return (
			<ContentLoader viewBox='0 0 400 160' height={'100vh'} width={'100vw'} backgroundColor='transparent'>
				<circle cx='150' cy='86' r='8' />
				<circle cx='194' cy='86' r='8' />
				<circle cx='238' cy='86' r='8' />
			</ContentLoader>
		);
	} else {
		if (type === 'attraction') {
			return (
				<div className='pt-0'>
					<button className='close-button' onClick={goBackHandler}>
						{' '}
						<Icon icon={closeLine} style={{ fontsize: '36px' }} />{' '}
					</button>

					<Carousel>
						<Carousel.Item>
							{data?.thumbnalUrl === '' ? (
								<img src={defaultPic} alt='img' />
							) : (
								<img src={data?.thumbnalUrl} alt='img' />
							)}
						</Carousel.Item>
					</Carousel>
					<div className='p-3 py-4'>
						<div className='color-text big-title text-center'>
							<span style={{ fontSize: 22 }}>{data?.placeName}</span>
						</div>
						<hr />
						<div id='facility' className='pt-2'>
							<span className='big-title' role='img' aria-label='activities'>
								{' '}
								🏃‍♂️ กิจกรรม{' '}
							</span>

							{data?.activities === '' ? (
								<span className='d-block'> ไม่มีข้อมูล </span>
							) : (
								<span className='d-block'> {data?.activities}</span>
							)}
						</div>
						<hr />
						<div id='telephone' className='pt-2'>
							<span className='big-title' role='img' aria-label='opentime'>
								{' '}
								⏰ เวลาเปิด - ปิด{' '}
							</span>
							<span className='d-block'> วันจันทร์ : {data?.monday ? data?.monday : 'ไม่มีข้อมูล'} </span>
							<span className='d-block'> วันอังคาร : {data?.tuesday ? data?.tuesday : 'ไม่มีข้อมูล'} </span>
							<span className='d-block'> วันพุธ : {data?.wednesday ? data?.wednesday : 'ไม่มีข้อมูล'} </span>
							<span className='d-block'> วันพฤหัส : {data?.thursday ? data?.thursday : 'ไม่มีข้อมูล'} </span>
							<span className='d-block'> วันศุกร์ : {data?.friday ? data?.friday : 'ไม่มีข้อมูล'} </span>
							<span className='d-block'> วันเสาร์ : {data?.saturday ? data?.saturday : 'ไม่มีข้อมูล'} </span>
							<span className='d-block'> วันอาทิตย์ : {data?.sunday ? data?.sunday : 'ไม่มีข้อมูล'} </span>
						</div>
						<hr />
						<div id='facility' className='pt-2'>
							<span className='big-title' role='img' aria-label='facility'>
								{' '}
								🏠 สิ่งอำนวยความสะดวก{' '}
							</span>
							{data?.facilities.map((el: any) => {
								return (
									<span className='d-block' role='img' aria-label='facility-items'>
										{' '}
										✅ {el.description}
									</span>
								);
							})}
							{data?.facilities.length === 0 ? <span className='d-block'> ไม่มีข้อมูล </span> : ''}
						</div>
						<hr />

						<div id='telephone' className='pt-2'>
							<span className='big-title' role='img' aria-label='contacts'>
								📞 ช่องทางติดต่อ{' '}
							</span>
							{data?.telPhones === '' ? (
								<span className='d-block'> ไม่มีข้อมูล </span>
							) : (
								<span className='d-block'> เบอร์โทรศัพท์ : {data?.telPhones} </span>
							)}
						</div>
						<hr />
						<div id='information' className='pt-2'>
							<span className='big-title' role='img' aria-label='detail'>
								📄 รายละเอียด{' '}
							</span>
							{data?.detail === '' ? <span className='d-block'> ไม่มีข้อมูล </span> : <p>{data?.detail}</p>}
						</div>
					</div>
				</div>
			);
		} else if (type === 'accommodation') {
			return (
				<div className='pt-0'>
					<button className='close-button' onClick={goBackHandler}>
						{' '}
						<Icon icon={closeLine} style={{ fontsize: '36px' }} />{' '}
					</button>

					<Carousel>
						<Carousel.Item>
							{data?.thumbnalUrl === '' ? (
								<img src={defaultPic} alt='img' />
							) : (
								<img src={data?.thumbnalUrl} alt='img' />
							)}
						</Carousel.Item>
					</Carousel>
					<div className='p-3 py-4'>
						<div className='color-text big-title text-center'>
							<span style={{ fontSize: 22 }}>{data?.placeName}</span>
						</div>
						<hr />
						<div id='facility' className='pt-2'>
							<span className='big-title' role='img' aria-label='facility'>
								{' '}
								🏠 สิ่งอำนวยความสะดวก{' '}
							</span>
							{data?.facility.map((el: any) => {
								return (
									<span className='d-block' role='img' aria-label='facility-items'>
										{' '}
										✅ {el.description}
									</span>
								);
							})}
							{data?.facility.length === 0 ? <span className='d-block'> ไม่มีข้อมูล </span> : ''}
						</div>
						<hr />
						<div id='service' className='pt-2'>
							<span className='big-title' role='img' aria-label='service'>
								{' '}
								💁‍♂️ บริการ{' '}
							</span>
							{data?.service.map((el: any) => {
								return (
									<span className='d-block' role='img' aria-label='service-items'>
										{' '}
										✅ {el.description}
									</span>
								);
							})}
							{data?.service.length === 0 ? <span className='d-block'> ไม่มีข้อมูล </span> : ''}
						</div>
						<hr />
						<div id='telephone' className='pt-2'>
							<span className='big-title' role='img' aria-label='contacts'>
								📞 ช่องทางติดต่อ{' '}
							</span>
							{data?.telPhones === '' ? (
								<span className='d-block'> ไม่มีข้อมูล </span>
							) : (
								<span className='d-block'> เบอร์โทรศัพท์ : {data?.telPhones} </span>
							)}
						</div>
						<hr />
						<div id='location' className='pt-2'>
							<span className='big-title' role='img' aria-label='location'>
								📍 ที่อยู่{' '}
							</span>
							<span className='d-block'>
								{' '}
								{data?.addressDetail +
									' ' +
									data.subDistrict +
									' ' +
									data.district +
									' ' +
									data.province +
									' ' +
									data.postcode}{' '}
							</span>
							{data?.addressDetail === '' ? <span className='d-block'> ไม่มีข้อมูล </span> : ''}
						</div>
						<hr />
						<div id='information' className='pt-2'>
							<span className='big-title' role='img' aria-label='detail'>
								📄 รายละเอียด{' '}
							</span>
							{data?.detail === '' ? <span className='d-block'> ไม่มีข้อมูล </span> : <p>{data?.detail}</p>}
						</div>
					</div>
				</div>
			);
		} else return <></>;
	}
};

export default PlacePage;
