import React, { useEffect, useState } from 'react';
import ContentLoader from 'react-content-loader';
import Card from '../../components/Card/Card';
import { CardsDefault } from '../../constant/constantVar/PlansConst';

function PlansCollectionPage() {
	const [isLoading, setIsLoading] = useState(true);
	const [cardList, setCardList] = useState(CardsDefault);

	//Must fetch Plan collection here!
	useEffect(() => {
		setIsLoading(true);
		fetch('/planCollection', {
			method: 'GET',
		})
			.then((res) => res.json())
			.then((result) => {
				setCardList(result);
				setIsLoading(false);
			});
	}, []);

	if (isLoading) {
		return (
			<ContentLoader
				speed={1}
				viewBox='0 0 500 676'
				height={676}
				width={380}
			>
				<circle cx='70.2' cy='73.2' r='41.3' />
				<rect x='129.9' y='29.5' width='125.5' height='17' />
				<rect x='129.9' y='64.7' width='296' height='17' />
				<rect x='129.9' y='97.8' width='253.5' height='17' />
				<rect x='129.9' y='132.3' width='212.5' height='17' />

				<circle cx='70.7' cy='243.5' r='41.3' />
				<rect x='130.4' y='199.9' width='125.5' height='17' />
				<rect x='130.4' y='235' width='296' height='17' />
				<rect x='130.4' y='268.2' width='253.5' height='17' />
				<rect x='130.4' y='302.6' width='212.5' height='17' />

				<circle cx='70.7' cy='412.7' r='41.3' />
				<rect x='130.4' y='369' width='125.5' height='17' />
				<rect x='130.4' y='404.2' width='296' height='17' />
				<rect x='130.4' y='437.3' width='253.5' height='17' />
				<rect x='130.4' y='471.8' width='212.5' height='17' />

				<circle cx='70.7' cy='581.9' r='41.3' />
				<rect x='130.4' y='538.2' width='125.5' height='17' />
				<rect x='130.4' y='573.4' width='296' height='17' />
				<rect x='130.4' y='606.5' width='253.5' height='17' />
				<rect x='130.4' y='641' width='212.5' height='17' />
			</ContentLoader>
		);
	}

	if (!isLoading) {
		return (
			<>
				{!isLoading && (
					<div className='default-padding'>
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
	} else return <></>;
}

export default PlansCollectionPage;
