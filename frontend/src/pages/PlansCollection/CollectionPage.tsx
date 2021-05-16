import emotionSadLine from '@iconify-icons/ri/emotion-sad-line';
import Icon from '@iconify/react';
import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import ContentLoader from 'react-content-loader';
import { useHistory } from 'react-router';
import Card from '../../components/Card/Card';
import { CardsDefault } from '../../constant/constantVar/PlansConst';

function PlansCollectionPage() {
	const [isLoading, setIsLoading] = useState(true);
	const [cardList, setCardList] = useState(CardsDefault);
	const history = useHistory();
	//Must fetch Plan collection here!
	useEffect(() => {
		setIsLoading(true);
		if (localStorage.status === '1') {
			fetch('/planCollection', {
				method: 'GET',
			})
				.then((res) => res.json())
				.then((result) => {
					setCardList(result);
					setIsLoading(false);
				});
		} else {
			setIsLoading(false);
		}
	}, []);

	const OnClickHandler = () => {
		history.push('/profile');
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
	}

	if (!isLoading) {
		if (localStorage.status === '1') {
			return (
				<>
					{!isLoading && (
						<div className='default-padding mb-4 pb-4'>
							<p className='big-title mb-2'>ที่ปักหมุดไว้ ({cardList.pinnedPlans.length})</p>
							{cardList.pinnedPlans.map((el) => {
								return <Card data={el} isPinned={true} isStatus={false} />;
							})}
							<p className='big-title mb-2 mt-4'>แผนทั้งหมด ({cardList.plans.length})</p>
							{cardList.plans.map((el) => {
								return <Card data={el} isPinned={false} isStatus={false} />;
							})}
						</div>
					)}
				</>
			);
		} else {
			return (
				<div className='d-flex align-items-center justify-content-center' style={{ width: '100vw', height: '100vh' }}>
					<div className=''>
						<div className='d-flex justify-content-center'>
							<Icon icon={emotionSadLine} color='#dbdbdb' width='120' height='120' />
						</div>
						<div className='d-block'>
							<span style={{ color: '#dbdbdb' }} className='big-title'>
								กรุณาลงชื่อเข้าใช้งานก่อนใช้ฟีเจอร์นี้
							</span>
						</div>
						<div className='d-block'>
							<Button className='gradient-background submit-btn btn mt-4' onClick={OnClickHandler}>
								ลงชื่อเข้าใช้
							</Button>
						</div>
					</div>
				</div>
			);
		}
	} else return <></>;
}

export default PlansCollectionPage;
