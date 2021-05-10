// import LoadingMask from 'react-loadingmask';

import React from 'react';
import { BallTriangle, Preloader } from 'react-preloader-icon';

const Loading = (props: any) => {
	if (props.isLoading) {
		return (
			<>
				<div className='loading-screen row px-0 mx-0 justify-content-center align-items-center'>
					<Preloader
						use={BallTriangle}
						size={60}
						strokeWidth={10}
						strokeColor={'#f3bb80'}
						duration={2000}
						className='pb-1 pr-2'
					/>
					กรุณารอสักครู่...
				</div>
			</>
		);
	} else {
		return <></>;
	}
};

export default Loading;
