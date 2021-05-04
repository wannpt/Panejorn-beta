import React, { useState } from 'react';
import './Profile.scss';

import { Icon } from '@iconify/react';
import emotionHappyLine from '@iconify-icons/ri/emotion-happy-line';
import emotionUnhappyLine from '@iconify-icons/ri/emotion-unhappy-line';
import { Button, Modal } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';

const defaultTag = {
	tag1: 0,
	tag2: 0,
	tag3: 0,
	tag4: 0,
	tag5: 0,
};

const Tagscore = () => {
	const [input, setInput] = useState(defaultTag);
	const [errorMessage, setErrorMessage] = useState('');
	const [showErrorModal, setShowErrorModal] = useState(false);
	const [showConfirmModal, setShowConfirmModal] = useState(false);

	const history = useHistory();

	const CloseHandler = () => {
		setShowConfirmModal(false);
		setShowErrorModal(false);
	};

	const ConfirmHandler = () => {
		setShowConfirmModal(true);
	};

	const OnchangeHandler = (e: any) => {
		const { target } = e;
		const name = target.id;
		const value = target.value / 100;

		setInput({ ...input, [name]: value });
	};

	const SubmitHandler = () => {
		fetch('/user/tagScore', {
			method: 'PUT',
			headers: {
				'Content-type': 'application/json',
			},
			body: JSON.stringify(input),
		})
			.then((res) => res.json())
			.then((result) => {
				if (result.success === true) {
					localStorage.setItem('status', "1");
					history.push('/profile');
				} else {
					setErrorMessage(result.message);
					setShowErrorModal(true);
					return true;
				}
			});
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
					<Button className='gradient-background submit-btn btn mb-2' onClick={ConfirmHandler}>
						ยืนยันข้อมูล
					</Button>
				</div>
			</div>

			<Modal show={showConfirmModal} onHide={CloseHandler} centered>
				{/* <Modal.Header /> */}
				<Modal.Body className='modal-body-lg'>
					<div className='row text-center'>
						<div className='col-12 big-title mb-4'>ยืนยันข้อมูลของคุณ</div>
						<div className='col-12'>
							<div className='row justify-content-center'>
								<div className='col-6 pr-1'>
									<Button className='gradient-background submit-btn' onClick={SubmitHandler}>
										ข้อมูลถูกต้อง
									</Button>
								</div>
								<div className='col-6 pl-1'>
									<Button className='color-text submit-btn' onClick={CloseHandler}>
										ตรวจสอบอีกครั้ง
									</Button>
								</div>
							</div>
						</div>
					</div>
				</Modal.Body>
			</Modal>

			<Modal show={showErrorModal} onHide={CloseHandler} centered>
				<Modal.Header className='big-title' closeButton>
					{' '}
					เกิดข้อผิดพลาด ❌
				</Modal.Header>
				<Modal.Body className='modal-body-lg'>
					<div className='row'>
						<div className='col-12'> {errorMessage}</div>
					</div>
				</Modal.Body>
			</Modal>
		</>
	);
};

export default Tagscore;
