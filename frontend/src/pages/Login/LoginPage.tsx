import React, { useEffect, useState } from 'react';
import { Button, Form } from 'react-bootstrap';

const LoginPage = () => {
	const [input, setInput] = useState<any>();

    useEffect(() => {
        const script = document.createElement('script');
      
        script.src = "https://apis.google.com/js/platform.js";
        script.async = true;
      
        document.body.appendChild(script);
      
        return () => {
          document.body.removeChild(script);
        }
      }, []);

	const onChangeHandler = (e: any) => {
		const { target } = e;
		const { name } = target;
		const value = target.value;

		setInput({ ...input, [name]: value });
	};

	const SubmitHandler = () => {
		console.log(input);
	};

	return (
		<div className='default-padding container-fluid'>
			<div className='row'>
				<div className='col-12 text-center color-text big-title py-4'> เข้าสู่ระบบ </div>
			</div>
			<div className='row'>
				<div className='col-12 text-center'>
					<Form className='mb-4'>
						{/* Email */}

						<Form.Control
							name='username'
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
                    <div className="g-signin2" data-onsuccess="onSignIn"></div>
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
                <div className='col-12 text-center'>
                    <a>ยังไม่เป็นสมาชิก?</a>
                </div>
            </div>
		</div>
	);
};

export default LoginPage;
