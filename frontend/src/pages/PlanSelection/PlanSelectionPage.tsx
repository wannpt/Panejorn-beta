import React, { useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router';
import './PlanSelection.scss';

import { Icon } from '@iconify/react';
import refreshLine from '@iconify-icons/ri/refresh-line';
import closeFill from '@iconify-icons/ri/close-fill';
import Slider from 'react-slick';
import PlaceCard from '../../components/Card/PlaceCard';
import { PlaceType } from '../../constant/Types/PlanTypes';

const defaultPlace:PlaceType = {
    placeId: '1',
    placeType: 'attraction',
    placeName: 'ดวงดาวแห่งความร้าก',
    timeRange: '10.00-12.00',
}


const PlanSelectionPage = (props: any) => {
	const location = useLocation();
	const history = useHistory();
	const payload = location.state;

	const [data, setData] = useState<any>(payload);
	const [selectIndex, setSelectIndex] = useState<number>(0);
	const [planDetail, setPlanDetail] = useState<any>();
	const [isLoading, setIsLoading] = useState<boolean>(true);

	const settings = {
		dots: false,
		infinite: false,
		speed: 500,
		slidesToShow: 1,
		slidesToScroll: 1,
		arrows: false,
	};

	useEffect(() => {
		console.log('getting...');
		fetch('http://localhost:8000/planCollection/plans?planId=1', {
			method: 'GET',
		})
			.then((res) => res.json())
			.then((result) => {
				console.log(result);
				setPlanDetail(result);
				setIsLoading(false);
			});
	}, []);

	console.log(data);
	return (
		<div>
			<div className='row mx-0'>
				<div className='selectplan-topbar'>
					<div className='row align-items-center'>
						<div className='col-2'>
							{' '}
							<button onClick={() => history.goBack()}>
								<Icon icon={closeFill} width='24' height='24' />{' '}
							</button>{' '}
						</div>
						<div className='col-8 color-text text-center'> เลือกแผนเที่ยว </div>
						<div className='col-2 btn refresh-btn'>
							{' '}
							<button className='black' onClick={() => window.location.reload()}>
								{' '}
								<Icon icon={refreshLine} width='24' height='24' />
							</button>
						</div>
					</div>
				</div>
			</div>

			{/* Header */}
			{!isLoading && (
				<>
					<div className='row mx-0 justify-content-center text-center'>
						<div className='col-12 title-container'>
							<span className='plan-title color-text'> {data.planName} </span>
							<div className='plan-subtitle'>{data.dateRange}</div>
							<div className='plan-subtitle'>{data.province}</div>
							<div className='col-12'>
								<div className='row big-title pt-4'>
									<div className='col d-flex justify-content-center'>
										<div className={'plan-index' + (selectIndex === 0 ? ' selected' : '')}>1</div>
									</div>
									<div className='col d-flex justify-content-center'>
										<div className={'plan-index' + (selectIndex === 1 ? ' selected' : '')}>2</div>
									</div>
									<div className='col d-flex justify-content-center'>
										<div className={'plan-index' + (selectIndex === 2 ? ' selected' : '')}>3</div>
									</div>
								</div>
							</div>
						</div>
					</div>
					<Slider {...settings} afterChange={(index) => setSelectIndex(index)}>
						<div className='px-2'>
                            <div className='my-2'>
                                <PlaceCard type={'ATTRACTION'} data={defaultPlace} province={data.province} />
                            </div>
                            <div className='my-2'>
                                <PlaceCard type={'ATTRACTION'} data={defaultPlace} province={data.province} />
                            </div>
                            <div className='my-2'>
                                <PlaceCard type={'ATTRACTION'} data={defaultPlace} province={data.province} />
                            </div>
                            <div className='my-2'>
                                <PlaceCard type={'ATTRACTION'} data={defaultPlace} province={data.province} />
                            </div>
						</div>
						<div>
							<h1>2</h1>
						</div>
						<div>
							<h1>3</h1>
						</div>
					</Slider>
				</>
			)}
		</div>
	);
};

export default PlanSelectionPage;
