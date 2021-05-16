import React from 'react';
import './Card.scss';

import { Icon, IconifyIcon } from '@iconify/react';
import restaurantLine from '@iconify/icons-ri/restaurant-line';
import navigationLine from '@iconify/icons-ri/navigation-line';
import mapPin2Line from '@iconify/icons-ri/map-pin-2-line';
import timeLine from '@iconify/icons-ri/time-line';
import roadMapLine from '@iconify-icons/ri/road-map-line';
import hotelBedLine from '@iconify-icons/ri/hotel-bed-line';
import appsLine from '@iconify/icons-ri/apps-line';
import { useHistory, useParams } from 'react-router';

const MapIconToType = [
	{ key: 'ATTRACTION', icon: roadMapLine },
	{ key: 'RESTAURANT', icon: restaurantLine },
	{ key: 'ACCOMMODATION', icon: hotelBedLine },
];

export const PlaceCard = (props: any) => {
	let selectedIcon: any;
	const history = useHistory();
    
    const GetIcon = () => {
		MapIconToType.map((el) => {
			if (el.key === props.type) selectedIcon = el.icon;
			selectedIcon = appsLine;
		});
	};

	const onCLickHandler = () => {
		history.push('/place?placeId=' + props.data.placeId)
	}
	
	return (
		<div className='card-container' onClick={props.type === 'RESTAURANT'? (()=>null) : onCLickHandler}>
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
						<span> { props.type !== 'RESTAURANT' ? props.data.placeName : 'พักทานอาหาร'} </span>
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
