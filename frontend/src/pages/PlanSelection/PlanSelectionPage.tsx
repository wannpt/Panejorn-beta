import React, { useState } from 'react';
import { useHistory, useLocation } from 'react-router';
import './PlanSelection.scss';

import { Icon } from '@iconify/react';
import refreshLine from '@iconify-icons/ri/refresh-line';
import closeFill from '@iconify-icons/ri/close-fill';
import Slider from 'react-slick';
import PlaceCard from '../../components/Card/PlaceCard';
import { PlaceType, PlanChoices, PlanDetailType, PlanType } from '../../constant/Types/PlanTypes';
import { Button, Modal } from 'react-bootstrap';
import Loading from '../../components/Loading/Loading';

const defaultPlace: PlaceType = {
	placeId: '1',
	placeType: 'attraction',
	placeName: 'ดวงดาวแห่งความร้าก',
	timeRange: '10.00-12.00',
};

type planDetail = {
	day: number;
	detail: {
		Id: number;
		planId: number;
		placeId: string;
		placeName: string;
		day: number;
		startTime: number;
		endTime: number;
		status: number;
		tag1: number;
		tag2: number;
		tag3: number;
		tag4: number;
		tag5: number;
		creationTime: number;
		deletionTime: number;
		updatedTime: number;
	}[];
};

type planDetailNeeded = {
	Id: number;
	planId: number;
	placeId: string;
	placeName: string;
	day: number;
	startTime: number;
	endTime: number;
	status: number;
	tag1: number;
	tag2: number;
	tag3: number;
	tag4: number;
	tag5: number;
	creationTime: number;
	deletionTime: number;
	updatedTime: number;
}[];

const PlanSelectionPage = (props: any) => {
	const location = useLocation();
	const history = useHistory();
	const result = location.state;
	console.log(result);

	// const [data, setData] = useState<any>(payload);
	const [data, setData] = useState<PlanChoices | any>(result);
	const [selectIndex, setSelectIndex] = useState<number>(0);
	const [planDetail, setPlanDetail] = useState<PlanDetailType[] | any>(data.planDetail.display[0].planDetail);
	const [planInfo, setPlanInfo] = useState<any>(data.plan.information);
	const [planDetailInfo, setPlanDetailInfo] = useState<any>(data.planDetail.information[0]);
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [showModal, setShowModal] = useState<boolean>(false);

	const settings = {
		dots: false,
		infinite: false,
		speed: 500,
		slidesToShow: 1,
		slidesToScroll: 1,
		arrows: false,
	};

	const ChangeIndexHandler = (index: number) => {
		setSelectIndex(index);
		setPlanDetail(data.planDetail.display[index].planDetail);
		setPlanInfo(data.plan.information);
		setPlanDetailInfo(data.planDetail.information[index]);
	};

	const SubmitHandler = () => {
		setIsLoading(true);
		setShowModal(false);

		let planDetailInfoTemp: any[] = [];

		// Convert planDetail format to BE
		planDetailInfo.planDetail.map((el: planDetail) => {
			el.detail.map((dayDetail) => {
				planDetailInfoTemp.push(dayDetail);
			});
		});

		let payload = {
			plan: planInfo,
			planDetail: planDetailInfoTemp,
		};

		// console.log(payload)

		fetch('/planCollection/plans/selected', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			credentials: 'include',
			body: JSON.stringify(payload),
		})
			.then((res) => res.json())
			.then((result) => {
				setIsLoading(false);
				if (result.status) {
					history.push('collections');
					history.push('/plan?planId=' + result.planId);
				}
			});
	};

	// console.log(data);
	return (
		<div>
			<Loading isLoading={isLoading} />
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
							<span className='plan-title color-text'> {data.plan.display.planName} </span>
							<div className='plan-subtitle'>{data.plan.display.dateRange}</div>
							<div className='plan-subtitle'>{data.plan.display.province}</div>
							<hr
								style={{
									color: '#F5F2F2',
									backgroundColor: '#F5F2F2',
									height: 1,
									borderWidth: 1,
									borderColor: '#F5F2F2',
									width: '90%',
								}}
							/>
							<div className='col-12'>
								<div className='row'>
									<div className='col-12 '>
										<span className='small-title'> กรุณาเลือกแผนเที่ยว </span>
									</div>
								</div>
								<div className='row big-title  pt-4'>
									<div className='col-4 d-flex justify-content-center '>
										<Button
											className={'plan-index' + (selectIndex === 0 ? ' selected' : '')}
											onClick={() => {
												ChangeIndexHandler(0);
											}}
										>
											{' '}
											
											<span>แผน 1</span>{' '}
										</Button>
									</div>
									<div className='col-4 d-flex justify-content-center'>
										<Button
											className={'plan-index' + (selectIndex === 1 ? ' selected' : '')}
											onClick={() => {
												ChangeIndexHandler(1);
											}}
										>
											{' '}
											<span>แผน 2</span>{' '}
										</Button>
									</div>
									<div className='col-4 d-flex justify-content-center'>
										<Button
											className={'plan-index' + (selectIndex === 2 ? ' selected' : '')}
											onClick={() => {
												ChangeIndexHandler(2);
											}}
										>
											{' '}
											<span>แผน 3</span>{' '}
										</Button>
									</div>
								</div>
								<div className='row big-title text-center pt-4'>
									<div className='col-12'>
										<span className='color-text'> ค่าใช้จ่าย :</span>
										<span> {planDetailInfo.totalCost} บาท</span>
										<span className='d-block plan-subtitle'>
											* ค่าใช้จ่ายนี้ไม่รวมค่าที่พัก, ค่าเดินทาง, และค่าอาหาร
										</span>
									</div>
								</div>
							</div>
						</div>
					</div>
					<Slider {...settings} afterChange={(index) => ChangeIndexHandler(index)}>
						{data.planDetail.display.map(() => {
							return (
								<div className='px-4 mb-4'>
									{planDetail.map((el: any) => {
										return (
											<div className='row pt-2'>
												<div className='col-12 d-flex align-items-end mb-2'>
													<span className='date-index mr-2'>วันที่ {el.day}</span>
													<span className='date-title'> {el.date} </span>
												</div>

												{/* PlaceCard Mapping */}
												{el.detail.map((place: any) => {
													return (
														<div className='col-12'>
															<PlaceCard type={place.placeType} data={place} province={data.plan.display.province} />
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
							);
						})}
					</Slider>
					<div className='container-fluid px-2 '>
						<Button
							className='submit-btn select-this-plan-btn gradient-background text-white'
							onClick={() => {
								setShowModal(true);
							}}
						>
							เลือกแผนนี้
						</Button>
					</div>
				</>
			)}

			<Modal show={showModal} onHide={() => setShowModal(false)} centered>
				{/* <Modal.Header /> */}
				<Modal.Body className='modal-body-lg'>
					<div className='row text-center'>
						<div className='col-12 big-title mb-4'>ยืนยันแผนเที่ยว</div>
						<div className='col-12'>
							<div className='row justify-content-center'>
								<div className='col-6 pr-1'>
									<Button className='gradient-background submit-btn' onClick={SubmitHandler}>
										ยืนยัน
									</Button>
								</div>
								<div className='col-6 pl-1'>
									<Button className='color-text submit-btn' onClick={() => setShowModal(false)}>
										ยกเลิก
									</Button>
								</div>
							</div>
						</div>
					</div>
				</Modal.Body>
			</Modal>
		</div>
	);
};

export default PlanSelectionPage;
