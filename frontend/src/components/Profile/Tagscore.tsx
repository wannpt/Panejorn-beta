import React, { useState } from 'react';
import './Profile.scss';

import { Icon } from '@iconify/react';
import emotionHappyLine from '@iconify-icons/ri/emotion-happy-line';
import emotionUnhappyLine from '@iconify-icons/ri/emotion-unhappy-line';
import { Button, Modal } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import Loading from '../Loading/Loading';

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
	const [isLoading, setIsLoading] = useState<boolean>(false);

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
		setIsLoading(true);
		fetch('/user/tagScore', {
			method: 'PUT',
			headers: {
				'Content-type': 'application/json',
			},
			body: JSON.stringify(input),
		})
			.then((res) => res.json())
			.then((result) => {
				setIsLoading(false);
				if (result.success === true) {
					localStorage.setItem('status', '1');
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
			<Loading isLoading={isLoading} />

			<div className='row'>
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
				<div className='col-12 text-center align-items-center mb-4'>
					<p className='small-title mb-0 '> ธรรมชาติ </p>
					<span className='subtitle'> ตัวอย่าง: น้ำตก / ทะเล</span>
					<div className='row  pt-4'>
						<div className='col-2 text-center pr-0'>
							<Icon icon={emotionUnhappyLine} color='#FF0000' width='32' height='32' />
							<span> ไม่ชอบ </span>
						</div>
						<div className='col-8 px-0'>
							<input type='range' className='form-range' id='tag1' onChange={OnchangeHandler} />
						</div>
						<div className='col-2 text-center pl-0'>
							<Icon icon={emotionHappyLine} color='#17BA09' width='32' height='32' />
							<span> ชอบ </span>
						</div>
					</div>
				</div>
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
				<div className='col-12 text-center align-items-center mb-4'>
					<p className='small-title mb-0'> วัฒนธรรม </p>
					<span className='subtitle'> ตัวอย่าง: วัด / ชุมชน</span>
					<div className='row pt-4'>
						<div className='col-2 text-center pr-0'>
							<Icon icon={emotionUnhappyLine} color='#FF0000' width='32' height='32' />
							<span> ไม่ชอบ </span>
						</div>
						<div className='col-8 px-0'>
							<input type='range' className='form-range' id='tag2' onChange={OnchangeHandler} />
						</div>
						<div className='col-2 text-center pl-0'>
							<Icon icon={emotionHappyLine} color='#17BA09' width='32' height='32' />
							<span> ชอบ </span>
						</div>
					</div>
				</div>
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
				<div className='col-12 text-center align-items-center mb-4'>
					<p className='small-title mb-0'> นันทนาการ </p>
					<span className='subtitle'> ตัวอย่าง: สวนสนุก / สวนสัตว์ </span>
					<div className='row pt-4'>
						<div className='col-2 text-center pr-0'>
							<Icon icon={emotionUnhappyLine} color='#FF0000' width='32' height='32' />
							<span> ไม่ชอบ </span>
						</div>
						<div className='col-8 px-0'>
							<input type='range' className='form-range' id='tag3' onChange={OnchangeHandler} />
						</div>
						<div className='col-2 text-center pl-0'>
							<Icon icon={emotionHappyLine} color='#17BA09' width='32' height='32' />
							<span> ชอบ </span>
						</div>
					</div>
				</div>
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
				<div className='col-12 text-center align-items-center mb-4'>
					<p className='small-title mb-0'> ศิลปะวิทยาการ </p>
					<span className='subtitle'> ตัวอย่าง: พิพิธภัณฑ์ / หอศิลป์ </span>
					<div className='row pt-4'>
						<div className='col-2 text-center pr-0'>
							<Icon icon={emotionUnhappyLine} color='#FF0000' width='32' height='32' />
							<span> ไม่ชอบ </span>
						</div>
						<div className='col-8 px-0'>
							<input type='range' className='form-range' id='tag4' onChange={OnchangeHandler} />
						</div>
						<div className='col-2 text-center pl-0'>
							<Icon icon={emotionHappyLine} color='#17BA09' width='32' height='32' />
							<span> ชอบ </span>
						</div>
					</div>
				</div>
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
				<div className='col-12 text-center align-items-center mb-4'>
					<p className='small-title mb-0'> ประวัติศาสตร์ </p>
					<span className='subtitle'> ตัวอย่าง: อนุสรณ์สถาน / อุทยานประวัติศาสตร์ </span>
					<div className='row pt-4'>
						<div className='col-2 text-center pr-0'>
							<Icon icon={emotionUnhappyLine} color='#FF0000' width='32' height='32' />
							<span> ไม่ชอบ </span>
						</div>
						<div className='col-8 px-0'>
							<input type='range' className='form-range' id='tag5' onChange={OnchangeHandler} />
						</div>
						<div className='col-2 text-center pl-0'>
							<Icon icon={emotionHappyLine} color='#17BA09' width='32' height='32' />
							<span> ชอบ </span>
						</div>
					</div>
				</div>
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
