import React, { useEffect, useState } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import Loading from '../Loading/Loading';


const LoginPage = () => {
	const [input, setInput] = useState<any>();
	const [showModal, setShowModal] = useState<boolean>(false);
	const handleClose = () => setShowModal(false);
	const [message, setMessage] = useState<string>('temp');
	const [isLoading, setIsLoading] = useState<boolean>(false);
	let history = useHistory();
	let resp: any;

	useEffect(() => {
		const script = document.createElement('script');

		script.src = 'https://apis.google.com/js/platform.js';
		script.async = true;

		document.body.appendChild(script);

		return () => {
			document.body.removeChild(script);
		};
	}, []);

	const onChangeHandler = (e: any) => {
		const { target } = e;
		const { name } = target;
		const value = target.value;

		setInput({ ...input, [name]: value });
	};

	//Click to login
	const SubmitHandler = async () => {
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
				resp = result
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
	};

	return (
		<>
			<Loading isLoading={isLoading} />
			<div className='default-padding container-fluid'>
				<div className='row'>
					<div className='col-12 text-center color-text big-title py-4'> เข้าสู่ระบบ </div>
				</div>
				<div className='row'>
					<div className='col-12 text-center'>
						<Form className='mb-4'>
							{/* Email */}

							<Form.Control
								name='email'
								type='email'
								placeholder='ชื่อผู้ใช้'
								className='input-textbox mb-2'
								onChange={onChangeHandler}
							/>

							{/* Password */}
							<Form.Control
								name='password'
								type='password'
								placeholder='รหัสผ่าน'
								className='input-textbox'
								onChange={onChangeHandler}
							/>
						</Form>
						<Button className='gradient-background submit-btn btn mb-2' onClick={SubmitHandler}>
							ลงชื่อเข้าใช้
						</Button>
					</div>
				</div>
				<div className='row'>
					<div className='col-12 text-center'>
						<span> หรือ </span>
						<div className='g-signin2' data-onsuccess='onSignIn'></div>
						<Button className='gradient-background submit-btn btn my-2' onClick={SubmitHandler}>
							Google
						</Button>
					</div>
					<div className='col-12'>
						<Button className='gradient-background submit-btn btn mb-2' onClick={SubmitHandler}>
							Facebook
						</Button>
					</div>
				</div>
				<div className='row'>
					<div className='col-12 text-center my-4'>
						<a>ลืมรหัสผ่าน?</a>
					</div>
					<div className='col-12 text-center' style={{paddingBottom:'32px'}}>
						<a onClick={() => history.push('/register')}>ยังไม่เป็นสมาชิก?</a>
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
