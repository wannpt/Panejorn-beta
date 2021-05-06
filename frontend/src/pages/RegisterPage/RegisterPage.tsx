import React, { useState } from 'react';
import { Button, Col, Form, Modal } from 'react-bootstrap';
import { useHistory } from 'react-router';
import Stepper from '../../components/Stepper/Stepper';
import { Select, CaretIcon, ModalCloseButton } from 'react-responsive-select';
// for default styles...
import 'react-responsive-select/dist/react-responsive-select.css';

import './register.scss';
import Loading from '../../components/Loading/Loading';

const monthOptions = [
	{ value: '01', text: 'มกราคม' },
	{ value: '02', text: 'กุมภาพันธ์' },
	{ value: '03', text: 'มีนาคม' },
	{ value: '04', text: 'เมษายน' },
	{ value: '05', text: 'พฤษภาคม' },
	{ value: '06', text: 'มิถุนายน' },
	{ value: '07', text: 'กรกฎาคม' },
	{ value: '08', text: 'สิงหาคม' },
	{ value: '09', text: 'กันยายน' },
	{ value: '10', text: 'ตุลาคม' },
	{ value: '11', text: 'พฤศจิกายน' },
	{ value: '12', text: 'ธันวาคม' },
];

const RegisterPage = () => {
	const [input, setInput] = useState<any>();
	const [valid, setValid] = useState<boolean>(false);
	const [confirmPasswordStatus, setConfirmPasswordStatus] = useState<boolean>(false);
	const [errorMessage, setErrorMessage] = useState<String>('');
	const [showError, setShowError] = useState<boolean>(false);
	const [confirm, setConfirm] = useState<boolean>(false);
	const [isLoading, setIsLoading] = useState<boolean>(false);

	const CloseHandler = () => {
		setConfirm(false);
		setShowError(false);
		setErrorMessage('');
	};
	const history = useHistory();
	let day = '';
	let month = '01';
	let year: number | string = '';

	const ConfirmHandler = (event: any) => {
		const form = event.currentTarget;
		event.preventDefault();
		if (form.checkValidity() === false && confirmPasswordStatus === true) {
			event.stopPropagation();
			setValid(false);
		} else {
			setConfirm(true);
		}

		setValid(true);
	};

	const OnChangeHandler = (e: any) => {
		const { target } = e;
		const { name } = target;
		let temp, year;
		let value = target.value;

		if (name === 'dob') {
			temp = value.split('/');
			year = Number(temp[2]) - 543;
			value = temp[0] + '/' + temp[1] + '/' + String(year);
			setInput({ ...input, [name]: value });
		} else {
			setInput({ ...input, [name]: value });
		}
	};

	const PasswordHandler = (password: string) => {
		let isNum = false;
		let isUpper = false;
		let isLower = false;
		let i = 0;

		while (i < password.length) {
			let char = password[i];

			if (char === password[i].toUpperCase()) {
				isUpper = true;
			}
			if (char === password[i].toLowerCase()) {
				isLower = true;
			}
			if (!isNaN(Number(char) * 1)) {
				isNum = true;
			}
			i++;
		}

		if (isNum && isUpper && isLower && password.length >= 8 && password.length <= 32) return true;
		else {
			if (!confirmPasswordStatus) {
				setErrorMessage(
					errorMessage +
						'⛔ความยาวของรหัสผ่านต้องมีจำนวน 8 - 32 ตัวอักษร และรหัสผ่านต้องมี a-z, A-Z, และ 0-9 อย่างน้อย 1 ตัวอักษร \n' +
						'⛔กรุณายืนยันรหัสผ่านให้ตรงกัน'
				);
			} else {
				setErrorMessage(
					errorMessage +
						'⛔ความยาวของรหัสผ่านต้องมีจำนวน 8 - 32 ตัวอักษร และรหัสผ่านต้องมี a-z, A-Z, และ 0-9 อย่างน้อย 1 ตัวอักษร \n'
				);
			}

			return false;
		}
	};

	const ConfrimPasswordValidation = (e: any) => {
		const { target } = e;
		let confirmPassword = target.value;

		if (confirmPassword === input.password) setConfirmPasswordStatus(true);
		else {
			setConfirmPasswordStatus(false);
		}
	};

	const DateHandler = (type: string, el: any) => {
		if (type === 'day') {
			let { target } = el;
			let value = target.value;
			day = value;
			if (day[0] !== '0') {
				day = '0' + day;
			}
		}
		if (type === 'month') month = el.value;
		if (type === 'year') {
			let { target } = el;
			let value = target.value;
			year = Number(value) - 543;
		}

		if (day !== '' && month !== '' && year !== '')
			setInput({ ...input, ['dob']: day + '/' + month + '/' + String(year) });
	};

	const SubmitHandler = () => {
		if (valid && PasswordHandler(input.password) && confirmPasswordStatus) {
			setIsLoading(true);
			const response = fetch('/user/registration', {
				method: 'POST',
				headers: {
					'Content-type': 'application/json',
				},
				body: JSON.stringify(input),
			})
				.then((res) => res.json())
				.then((result) => {
					setIsLoading(false);
					if (result.success === true) {
						return history.push('/register/tagscore');
					} else {
						setErrorMessage(errorMessage + '\n ⛔' + result.message);
						setShowError(true);
						return true;
					}
				});
		} else {
			setShowError(true);
		}
	};

	return (
		<>
			<Loading isLoading={isLoading} />
			<div className='default-padding'>
				<div className='row'>
					<div className='col text-center'>
						<span className='color-text' style={{ fontSize: 24, fontWeight: 600 }}>
							สมัครใช้บริการ
						</span>
					</div>
				</div>

				{/* stepper */}
				<Stepper title={'ข้อมูลส่วนตัว'} step={1} />

				{/* form */}
				<Form onSubmit={ConfirmHandler} validated={valid} noValidate>
					<Form.Group controlId='username'>
						<Form.Label>
							ชื่อผู้ใช้งาน <span style={{ color: 'red' }}>*</span>
						</Form.Label>
						<Form.Control
							required
							name='username'
							type='text'
							placeholder='ชื่อผู้ใช้งาน'
							className='input-textbox'
							onChange={OnChangeHandler}
						/>
					</Form.Group>
					<Form.Group controlId='email'>
						<Form.Label>
							อีเมลล์ <span style={{ color: 'red' }}>*</span>
						</Form.Label>
						<Form.Control
							required
							name='email'
							type='text'
							placeholder='อีเมลล์'
							className='input-textbox'
							onChange={OnChangeHandler}
						/>
					</Form.Group>
					<Form.Group controlId='password'>
						<Form.Label>
							รหัสผ่าน <span style={{ color: 'red' }}>*</span>
						</Form.Label>
						<Form.Control
							required
							name='password'
							type='password'
							placeholder='รหัสผ่าน'
							className='input-textbox'
							onChange={OnChangeHandler}
						/>
						<Form.Text className='pl-2' id='passwordHelpBlock' muted>
							ความยาวของรหัสผ่านต้องมีจำนวน 8 - 32 ตัวอักษร และรหัสผ่านต้องมี a-z, A-Z, และ 0-9 อย่างน้อย 1 ตัวอักษร
						</Form.Text>
					</Form.Group>
					<Form.Group controlId='password'>
						<Form.Label>
							ยืนยันรหัสผ่าน <span style={{ color: 'red' }}>*</span>
						</Form.Label>
						<Form.Control
							required
							name='confirmPassword'
							type='password'
							placeholder='ยืนยันรหัสผ่าน'
							className='input-textbox'
							onChange={ConfrimPasswordValidation}
						/>
						<Form.Control.Feedback className='pl-2' type='invalid'>
							{' '}
							กรุณาตรวจสอบอีกครั้ง{' '}
						</Form.Control.Feedback>
					</Form.Group>

					<Form.Group controlId='dob'>
						<Form.Label>
							วัน/เดือน/ปี (พุทธศักราช) เกิด <span style={{ color: 'red' }}>*</span>
						</Form.Label>
						<Form.Row>
							<Col xs={3}>
								<Form.Control
									required
									name='day'
									type='text'
									placeholder='วัน'
									className='input-textbox'
									onChange={(e) => DateHandler('day', e)}
								/>
							</Col>
							<Col xs={6}>
								<Select
									name='month'
									modalCloseButton={<ModalCloseButton />}
									options={monthOptions}
									caretIcon={<CaretIcon />}
									onChange={(newValue) => {
										DateHandler('month', newValue);
									}}
								/>
							</Col>
							<Col xs={3}>
								<Form.Control
									required
									name='confirmPassword'
									type='year'
									placeholder='ปี'
									className='input-textbox'
									onChange={(e) => DateHandler('year', e)}
								/>
							</Col>
						</Form.Row>
					</Form.Group>
					<Button type='submit' className='gradient-background submit-btn btn mb-2'>
						สมัคร
					</Button>
				</Form>

				<Modal show={confirm} onHide={CloseHandler} centered>
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

				<Modal show={showError} onHide={CloseHandler} centered>
					<Modal.Header className='big-title' closeButton>
						{' '}
						เกิดข้อผิดพลาด ❌
					</Modal.Header>
					<Modal.Body className='modal-body-lg'>
						<div className='row'>
							<div className='col-12' style={{whiteSpace:'pre-wrap'}}> {errorMessage}</div>
						</div>
					</Modal.Body>
				</Modal>
			</div>
		</>
	);
};

export default RegisterPage;
