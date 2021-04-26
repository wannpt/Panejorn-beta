import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useHistory } from 'react-router';
import Stepper from '../../components/Stepper/Stepper';

import './register.scss';

const RegisterPage = () => {
	const [input, setInput] = useState<any>();
	const [valid, setValid] = useState<boolean | null>(null);
	const [errorMessage, setErrorMessage] = useState<String>('None');
	const [showModal, setShowModal] = useState<boolean>(false);
	const history = useHistory();

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

	const ConfrimPasswordValidation = (e: any) => {
		const { target } = e;
		let confirmPassword = target.value;

		if (confirmPassword === input.password) setValid(true);
		else {
			setValid(false);
			setErrorMessage('กรุณายืนยันรหัสผ่านให้ตรงกัน');
		}
	};

	const SubmitHandler = () => {
		if (valid) {
			const response = fetch('/user/registration', {
				method: 'POST',
				headers: {
					'Content-type': 'application/json',
				},
				body: JSON.stringify(input),
			})
				.then((res) => res.json())
				.then((result) => {
					if (result.success === true) return history.push('/profile/tagscore');
					else {
						setErrorMessage(result.message);
						setShowModal(true);
						return true;
					}
				});
		} else console.log(errorMessage);
	};

	return (
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
			<Form>
				<Form.Group controlId='username'>
					<Form.Label>ชื่อผู้ใช้งาน</Form.Label>
					<Form.Control
						name='username'
						type='text'
						placeholder='ชื่อผู้ใช้งาน'
						className='input-textbox'
						onChange={OnChangeHandler}
					/>
				</Form.Group>
				<Form.Group controlId='email'>
					<Form.Label>อีเมลล์</Form.Label>
					<Form.Control
						name='email'
						type='text'
						placeholder='อีเมลล์'
						className='input-textbox'
						onChange={OnChangeHandler}
					/>
				</Form.Group>
				<Form.Group controlId='password'>
					<Form.Label>รหัสผ่าน</Form.Label>
					<Form.Control
						name='password'
						type='password'
						placeholder='รหัสผ่าน'
						className='input-textbox'
						onChange={OnChangeHandler}
					/>
				</Form.Group>
				<Form.Group controlId='password'>
					<Form.Label>ยืนยันรหัสผ่าน</Form.Label>
					<Form.Control
						name='confirmPassword'
						type='password'
						placeholder='ยืนยันรหัสผ่าน'
						className='input-textbox'
						onChange={ConfrimPasswordValidation}
					/>
					{valid === false && (
						<span style={{ color: 'red', fontSize: 14, paddingLeft: 12 }}>*กรุณายืนยันรหัสผ่านให้ตรงกัน</span>
					)}
				</Form.Group>

				<Form.Group controlId='dob'>
					<Form.Label>วัน/เดือน/ปี (พุทธศักราช) เกิด</Form.Label>
					<Form.Control
						name='dob'
						type='text'
						placeholder='วว/ดด/ปปปป'
						className='input-textbox'
						onChange={OnChangeHandler}
					/>
				</Form.Group>
			</Form>

			<Button className='gradient-background submit-btn btn mb-2' onClick={SubmitHandler}>
				สมัคร
			</Button>
		</div>
	);
};

export default RegisterPage;
