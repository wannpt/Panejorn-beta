import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { useHistory } from 'react-router';
import './Profile.scss';
import Image1 from '../../Images/cover_kbank-850x567.jpg';
import { User } from '../../constant/Types/UserTypes';
import { UserConst } from '../../constant/constantVar/UserConst';

const Profile = () => {
	const history = useHistory();
	const [user, setUser] = useState<User>(UserConst);
	const [isLoading, setIsLoading] = useState<Boolean>(true);

	const getUser = () => {
		let temp: any;
		try {
			temp = localStorage.getItem('user');
			temp = JSON.parse(temp);
			setUser(temp.result);
		} catch (error) {
			console.log(error);
		}
		return setIsLoading(false)
	};

	const LogOutHandler = () => {
		fetch('http://localhost:8000/user/logout', {
			method: 'GET',
		}).then(() => {
			localStorage.clear();
			history.push('/profile');
		});
	};

	useEffect(() => {
		getUser();
	});

	if (!isLoading) {
		return (
			<>
				<div className='default-padding container-fluid'>
					{/* Profile */}
					<div className='row justify-content-center text-center'>
						<div className='col-12'>
							<img className='profile-img' src={Image1}></img>
						</div>
						<div className='col-12'>
							<span className='big-title'> {user.username} </span>
						</div>
						<div className='col-12 py-4'>
							<Button className='black-text submit-btn'> แก้ไขโปรไฟล์ </Button>
						</div>
					</div>

					{/* Stats */}
					<div className='row justify-content-center text-center'>
						<div className='col-12'>
							<span className='small-title'>ประเภทความสนใจ</span>
						</div>
						<div className='col-12 py-4'>
							<Button className='black-text submit-btn'> สรุปการเดินทาง </Button>
						</div>
					</div>
					{/* <p>{user.username}</p> */}

					<Button className='gradient-background submit-btn btn' onClick={LogOutHandler}>
						ลงชื่อออก
					</Button>
				</div>
			</>
		);
	} else {
		return <></>;
	}
};

export default Profile;
