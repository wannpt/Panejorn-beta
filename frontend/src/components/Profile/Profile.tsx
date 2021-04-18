import React from 'react';
import { Button } from 'react-bootstrap';
import { useHistory } from 'react-router';
import './Profile.scss'
import Image1 from '../../Images/cover_kbank-850x567.jpg';

const Profile = () => {
	const history = useHistory();
	let user = JSON.parse(JSON.stringify(localStorage.getItem('user')))
	console.log(user)
	const LogOutHandler = () => {
		fetch('http://localhost:8000/user/logout', {
			method: 'GET',
		})
			.then(() => {
				localStorage.clear();
				history.push('/profile');
			});
	};

	return (
		<>
			<div className='default-padding container-fluid'>
				{/* Profile */}
				<div className='row justify-content-center text-center'>
					<div className='col-12'>
						<img className='profile-img' src={Image1}></img>
					</div>
					<div className='col-12'>
						<span> Username </span>
					</div>
					<div className='col-12 py-4'>
						<Button className='black-text submit-btn'> แก้ไขโปรไฟล์ </Button>
					</div>
				</div>
				
				{/* Stats */}
				<div className='row justify-content-center text-center'>
					<div className='col-12'>

					</div>
					<div className='col-12 py-4'>
						<Button className='black-text submit-btn'> สรุปการเดินทาง </Button>
					</div>
				</div>
				{/* <p>{user.username}</p> */}
				
				<Button className='gradient-background submit-btn btn' onClick={LogOutHandler}>ลงชื่อออก</Button>
			</div>
		</>
	);
};

export default Profile;
