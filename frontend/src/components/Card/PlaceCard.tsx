import React from 'react';
import './Card.scss';

import { Icon, IconifyIcon } from '@iconify/react';
import restaurantLine from '@iconify/icons-ri/restaurant-line';
import navigationLine from '@iconify/icons-ri/navigation-line';
import mapPin2Line from '@iconify/icons-ri/map-pin-2-line';
import timeLine from '@iconify/icons-ri/time-line';
import barricadeLine from '@iconify/icons-ri/barricade-line';
import appsLine from '@iconify/icons-ri/apps-line';

const MapIconToType = [
	{ key: 'ATTRACTION', icon: barricadeLine },
	{ key: 'RESTAURANT', icon: restaurantLine },
];

export const PlaceCard = (props: any) => {
	let selectedIcon: any;
    
    const GetIcon = () => {
		MapIconToType.map((el) => {
			if (el.key === props.type) selectedIcon = el.icon;
			selectedIcon = appsLine;
		});
	};

	return (
		<div className='card-container'>
			<div className='row align-items-center'>
				<div className='col-2 pl-4 pr-0'>
                    {
                        MapIconToType.map(el => {
                            if(el.key === props.type)
                                return <Icon icon={el.icon} style={{fontSize:'24px', color:'#E66976'}} />
                        })
                    }
					
				</div>
				<div className='col-8'>
					<div className='title'>
						<span> {props.data.placeName} </span>
					</div>

					<div className='subtitle'>
						<Icon icon={timeLine} style={{ color: '#E66973' }} />
						<span className='pl-2'> {props.data.timeRange}. </span>
					</div>

					<div className='subtitle'>
						<Icon icon={mapPin2Line} style={{ color: '#E66973' }} />
						<span className='pl-2'> {props.province} </span>
					</div>
				</div>
				<div className='col-2 pl-0 pr-4'>
					<Icon icon={navigationLine} style={{ color: '#E66973', fontSize: '24px' }} rotate='90deg' />
				</div>
			</div>
		</div>
	);
};

export default PlaceCard;
