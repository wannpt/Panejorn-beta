import React, { useEffect, useState } from 'react';
import { useHistory, useLocation, useParams } from 'react-router-dom';
import PlaceCard from '../../components/Card/PlaceCard';
import { PlanType } from '../../constant/Types/PlanTypes';
import './PlanDetails.scss';

const PlanDetailConstant = {
	planId: 2,
	planName: 'เที่ยวหนึ่งวันกับคนอย่างเธอ',
	dateRange: '09 พ.ย. 63',
	province: 'กรุงเทพมหานคร',
	budget: 5000,
	planDetail: [
		{
			day: 1,
			date: '09 พฤศจิกายน 2563',
			detail: [
				{
					placeType: 'attraction', // attraction, restaurant, accommodation
					placeId: 'P03013237',
					placeName: 'ซาฟารีเวิร์ล',
					timeRange: '10.00 - 12.00 น.',
				},
				{
					placeType: 'attraction',
					placeId: 'P03013148',
					placeName: 'MOCA',
					timeRange: '10.00 - 12.00 น.',
				},
			],
		},
	],
};

export const PlanDetailsPage = (props: any) => {
	const [planDetail, setPlanDetail] = useState<PlanType>(PlanDetailConstant);
	const [isLoading, setIsLoading] = useState(true);

    const params = useLocation();

	useEffect(() => {
		console.log('getting...');
		fetch('http://localhost:8000/getPlanDetail' + params.search, {
			method: 'GET',
		})
			.then((res) => res.json())
			.then((result) => {
				console.log(result);
				setPlanDetail(result);
				setIsLoading(false);
			});
	}, []);

	return (
		<>
			{!isLoading && (
				<div className='default-padding'>
					{/* Header section  */}
					<div className='row justify-content-center text-center'>
						<div className='col-12 title-container'>
							<span className='plan-title color-text'> {planDetail.planName} </span>
							<div className='plan-subtitle'>{planDetail.dateRange}</div>
							<div className='plan-subtitle'>{planDetail.province}</div>

							{/* slider ที่ยังไม่มี */}
							<div className='slider-container'></div>
						</div>
					</div>

					{/* Details section */}
					{planDetail.planDetail.map((el) => {
						return (
							<div className='row pt-2'>
								<div className='col-12 d-flex align-items-end mb-2'>
									<span className='date-index mr-2'> วันที่ {el.day} </span>
									<span className='date-title'> {el.date} </span>
								</div>
								{/* PlaceCard map */}
								{el.detail.map((place) => {
									return (
										<div className='col-12'>
											<PlaceCard type={place.placeType} data={place} province={planDetail.province} />
										</div>
									);
								})}
								<hr
									style={{
										color: '#F5F2F2',
										backgroundColor: '#F5F2F2',
										height: 0.5,
										borderColor: '#F5F2F2',
										width: '90%',
									}}
								/>
							</div>
						);
					})}
				</div>
			)}
		</>
	);
};

export default PlanDetailsPage;
