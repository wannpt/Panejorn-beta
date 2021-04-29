import React, { useState } from 'react';
import './Profile.scss';

import { Icon } from '@iconify/react';
import emotionHappyLine from '@iconify-icons/ri/emotion-happy-line';
import emotionUnhappyLine from '@iconify-icons/ri/emotion-unhappy-line';
import { Button } from 'react-bootstrap';

const defaultTag = {
	tag1: 0,
	tag2: 0,
	tag3: 0,
	tag4: 0,
	tag5: 0,
};

const Tagscore = () => {
	const [input, setInput] = useState(defaultTag);

	const OnchangeHandler = (e: any) => {
		const { target } = e;
		const name = target.id;
		const value = target.value / 50 - 1;

		setInput({ ...input, [name]: value });
	};

	const SubmitHandler = () => {
		console.log(input);
	};

	return (
		<>
			<div className='row'>
				<div className='col-12 text-center align-items-center mb-4'>
					<p className='small-title'> ธรรมชาติ </p>
					<div className='row'>
						<div className='col-2 text-center pr-0'>
							<Icon icon={emotionUnhappyLine} color='#FF0000' width='32' height='32' />
						</div>
						<div className='col-8 px-0'>
							<input type='range' className='form-range' id='tag1' onChange={OnchangeHandler} />
						</div>
						<div className='col-2 text-center pl-0'>
							<Icon icon={emotionHappyLine} color='#17BA09' width='32' height='32' />
						</div>
					</div>
				</div>

				<div className='col-12 text-center align-items-center mb-4'>
					<p className='small-title'> วัฒนธรรม </p>
					<div className='row'>
						<div className='col-2 text-center pr-0'>
							<Icon icon={emotionUnhappyLine} color='#FF0000' width='32' height='32' />
						</div>
						<div className='col-8 px-0'>
							<input type='range' className='form-range' id='tag2' onChange={OnchangeHandler} />
						</div>
						<div className='col-2 text-center pl-0'>
							<Icon icon={emotionHappyLine} color='#17BA09' width='32' height='32' />
						</div>
					</div>
				</div>

				<div className='col-12 text-center align-items-center mb-4'>
					<p className='small-title'> นันทนาการ </p>
					<div className='row'>
						<div className='col-2 text-center pr-0'>
							<Icon icon={emotionUnhappyLine} color='#FF0000' width='32' height='32' />
						</div>
						<div className='col-8 px-0'>
							<input type='range' className='form-range' id='tag3' onChange={OnchangeHandler} />
						</div>
						<div className='col-2 text-center pl-0'>
							<Icon icon={emotionHappyLine} color='#17BA09' width='32' height='32' />
						</div>
					</div>
				</div>

				<div className='col-12 text-center align-items-center mb-4'>
					<p className='small-title'> ศิลปะวิทยาการ </p>
					<div className='row'>
						<div className='col-2 text-center pr-0'>
							<Icon icon={emotionUnhappyLine} color='#FF0000' width='32' height='32' />
						</div>
						<div className='col-8 px-0'>
							<input type='range' className='form-range' id='tag4' onChange={OnchangeHandler} />
						</div>
						<div className='col-2 text-center pl-0'>
							<Icon icon={emotionHappyLine} color='#17BA09' width='32' height='32' />
						</div>
					</div>
				</div>

				<div className='col-12 text-center align-items-center mb-4'>
					<p className='small-title'> ประวัติศาสตร์ </p>
					<div className='row'>
						<div className='col-2 text-center pr-0'>
							<Icon icon={emotionUnhappyLine} color='#FF0000' width='32' height='32' />
						</div>
						<div className='col-8 px-0'>
							<input type='range' className='form-range' id='tag5' onChange={OnchangeHandler} />
						</div>
						<div className='col-2 text-center pl-0'>
							<Icon icon={emotionHappyLine} color='#17BA09' width='32' height='32' />
						</div>
					</div>
				</div>

				<div className='col-12 mt-3 mb-4'>
					<Button className='gradient-background submit-btn btn mb-2' onClick={SubmitHandler}>
						ยืนยันข้อมูล
					</Button>
				</div>
			</div>
		</>
	);
};

export default Tagscore;
