import React, { useEffect, useState } from 'react';
import Card from '../../components/Card/Card';
import { CardsDefault } from '../../constant/constantVar/PlansConst';
import { CardCollections } from '../../constant/Types/CardTypes';

function PlansCollectionPage() {
	const [isLoading, setIsLoading] = useState(true);
	const [cardList, setCardList] = useState(CardsDefault)

	//Must fetch Plan collection here!
	useEffect(() => {
		fetch('/planCollection', {
			method: 'GET',
		})
			.then((res) => res.json())
			.then((result) => {
				setCardList(result);
				setIsLoading(false);
			});
	}, []);

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
}

export default PlansCollectionPage;
