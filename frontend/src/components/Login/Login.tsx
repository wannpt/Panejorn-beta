import React, { useState } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import Loading from '../Loading/Loading';

const LoginPage = () => {
	const [input, setInput] = useState<any>();
	const [showModal, setShowModal] = useState<boolean>(false);
	const handleClose = () => setShowModal(false);
	const [message, setMessage] = useState<string>('temp');
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [valid, setValid] = useState<boolean>(false);
	let history = useHistory();
	let resp: any;

	const onChangeHandler = (e: any) => {
		const { target } = e;
		const { name } = target;
		const value = target.value;

		setInput({ ...input, [name]: value });
	};

	//Click to login
	const SubmitHandler = (event: any) => {
		const form = event.currentTarget;
		event.preventDefault();
		if (form.checkValidity() === false) {
			event.stopPropagation();
			setValid(false);
		} else {
			setIsLoading(true);

			fetch('/user/login', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				credentials: 'include',
				body: JSON.stringify(input),
			})
				.then((res) => res.json())
				.then((result) => {
					resp = result;
					setMessage(result.message);

					if (result.success) {
						setIsLoading(false);
						localStorage.setItem('status', '1');
						history.push('/profile');
					}

					if (result.success === false) {
						setIsLoading(false);
						return setShowModal(true);
					}
				});
		}
		setValid(true);
	};

	return (
		<>
			<Loading isLoading={isLoading} />
			<div className='default-padding container-fluid full-height'>
				<div className='row'>
					<div className='col-12 text-center color-text py-4' style={{fontSize:'2em', fontWeight:600}}> เข้าสู่ระบบ </div>
				</div>
				<div className='row'>
					<div className='col-12'>
						<Form className='mb-4' onSubmit={SubmitHandler} validated={valid} noValidate>
							{/* Email */}

							<Form.Group controlId='email'>
								<Form.Label>
									อีเมลล์ <span style={{ color: 'red' }}>*</span>
								</Form.Label>
								<Form.Control
									required
									name='email'
									type='email'
									placeholder='อีเมลล์'
									className='input-textbox mb-2'
									onChange={onChangeHandler}
								/>
								<Form.Text className='pl-2' id='passwordHelpBlock' muted>
									ตัวอย่าง: testuser@panejorn.com
								</Form.Text>
							</Form.Group>

							{/* Password */}
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
									onChange={onChangeHandler}
								/>
							</Form.Group>

							<Button className='gradient-background submit-btn btn mb-2 mt-2' type='submit'>
								ลงชื่อเข้าใช้
							</Button>
						</Form>
					</div>
				</div>

				<div className='row pt-4'>
					<div className='col-12 text-center' style={{ paddingBottom: '32px' }}>
						<Button onClick={() => history.push('/register')} style={{ textDecoration: 'underline', color: 'black' }}>
							สมัครสมาชิก
						</Button>
					</div>
				</div>

				<Modal show={showModal} onHide={handleClose}>
					<Modal.Header className='' closeButton>
						<Modal.Title className='col text-center color-text big-title'> เกิดข้อผิดพลาด </Modal.Title>
					</Modal.Header>
					<Modal.Body className='modal-body-bg'>{message}</Modal.Body>
				</Modal>
			</div>
		</>
	);
};

export default LoginPage;
