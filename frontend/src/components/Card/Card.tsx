import React, { useState } from 'react';
import './Card.scss';
import { CardType, StatusCard } from '../../constant/Types/CardTypes';

import { Icon } from '@iconify/react';
import calendarLine from '@iconify/icons-ri/calendar-line';
import mapPin2Line from '@iconify/icons-ri/map-pin-2-line';
import starFill from '@iconify/icons-ri/star-fill';
import pushpin2Fill from '@iconify/icons-ri/pushpin-2-fill';
import navigationLine from '@iconify/icons-ri/navigation-line';
import { Link } from 'react-router-dom';

const Card = (props: any) => {
	const [cardState, setCardState] = useState<CardType | StatusCard>(props.data);

	function PinnedCard() {
		return true;
	}

	return (
		<div className={props.isPinned ? 'card-container gradient-background ' : 'card-container'}>
			<div className='row align-items-center'>
				<div className='col-10'>
					<Link to={'/plan?planId=' + cardState.planID}>
						<div className={props.isPinned ? 'row white-text': 'row'}>
							<div className='col-12'>
								<div className='title'>
									<span>{cardState.planName}</span>
								</div>

								<div className='subtitle'>
									<Icon icon={calendarLine} style={props.isPinned ? { color: '#FFFFFF' } : { color: '#E66973' }} />
									<span className='pl-2'> {cardState.dateRange} </span>
								</div>

								<div className='subtitle'>
									<Icon icon={mapPin2Line} style={props.isPinned ? { color: '#FFFFFF' } : { color: '#E66973' }} />
									<span className='pl-2'> {cardState.province} </span>
								</div>

								<div className='subtitle'>
									<Icon icon={starFill} style={{ color: '#FFE600' }} />
									<span className='pl-2'> {cardState.planScore} </span>
								</div>
							</div>
						</div>
					</Link>
				</div>
				<div className='col-2 px-0'>
					{!props.isStatus && (
						<div className='card-option'>
							<button onClick={PinnedCard}>
								<Icon
									icon={pushpin2Fill}
									style={
										props.isPinned ? { color: '#FFFFFF', fontSize: '24px' } : { color: '#C4C4C4', fontSize: '24px' }
									}
								/>
							</button>
						</div>
					)}
				</div>
			</div>

			{/* big card section */}
			{props.isStatus && (
				<div className='row align-items-center'>
					<hr
						style={{
							color: '#F5F2F2',
							backgroundColor: '#F5F2F2',
							height: 0.5,
							borderColor: '#F5F2F2',
							width: '90%',
						}}
					/>
					<div className='col-10'>
						<p className='extra-small-title mb-2    '> สถานที่ต่อไป </p>

						<div className='title'>
							<span>{props.data.nextLoc}</span>
						</div>

						<div className='card-detail'>
							<span>{props.data.time}</span>
						</div>
					</div>
					<div className='col-2 px-0'>
						<div className='card-option'>
							<button>
								<Icon icon={navigationLine} style={{ color: '#E66973', fontSize: '24px' }} rotate='90deg' />
							</button>
						</div>
					</div>
				</div>
			)}
		</div>
	);
};

export default Card;
