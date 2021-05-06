import React, { useEffect, useState } from 'react';
import ContentLoader from 'react-content-loader';
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
		fetch('/planCollection/plans' + params.search, {
			method: 'GET',
		})
			.then((res) => res.json())
			.then((result) => {
				console.log(result);
				setPlanDetail(result);
				setIsLoading(false);
			});
	}, []);

	if (isLoading) {
		return (
			<ContentLoader
				width={376}
				height={667}
				viewBox='0 0 350 1000'
				backgroundColor='#f5f5f5'
				foregroundColor='#dbdbdb'
			>
				<rect x='4' y='258' rx='3' ry='3' width='8' height='570' />
				<rect x='5' y='823' rx='3' ry='3' width='331' height='7' />
				<rect x='329' y='259' rx='3' ry='3' width='8' height='570' />
				<rect x='102' y='319' rx='3' ry='3' width='102' height='7' />
				<rect x='92' y='297' rx='3' ry='3' width='178' height='6' />
				<circle cx='48' cy='313' r='18' />
				<rect x='95' y='445' rx='3' ry='3' width='178' height='6' />
				<rect x='105' y='419' rx='3' ry='3' width='102' height='7' />
				<rect x='95' y='397' rx='3' ry='3' width='178' height='6' />
				<circle cx='51' cy='413' r='18' />
				<rect x='98' y='445' rx='3' ry='3' width='178' height='6' />
				<rect x='107' y='515' rx='3' ry='3' width='102' height='7' />
				<rect x='97' y='493' rx='3' ry='3' width='178' height='6' />
				<circle cx='53' cy='509' r='18' />
				<rect x='100' y='541' rx='3' ry='3' width='178' height='6' />
				<rect x='108' y='615' rx='3' ry='3' width='102' height='7' />
				<rect x='98' y='593' rx='3' ry='3' width='178' height='6' />
				<circle cx='54' cy='609' r='18' />
				<rect x='101' y='641' rx='3' ry='3' width='178' height='6' />
				<rect x='110' y='708' rx='3' ry='3' width='102' height='7' />
				<rect x='100' y='686' rx='3' ry='3' width='178' height='6' />
				<circle cx='56' cy='702' r='18' />
				<rect x='103' y='734' rx='3' ry='3' width='178' height='6' />
				<rect x='114' y='757' rx='3' ry='3' width='102' height='7' />
				<rect x='103' y='784' rx='3' ry='3' width='178' height='6' />
				<rect x='5' y='258' rx='3' ry='3' width='331' height='7' />
			</ContentLoader>
		);
	} else {
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
	}
};

export default PlanDetailsPage;
