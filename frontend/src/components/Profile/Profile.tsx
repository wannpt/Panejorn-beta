import React from 'react';
import { Button } from 'react-bootstrap';
import { useHistory } from 'react-router';

const Profile = () => {
	const history = useHistory();

	const LogOutHandler = () => {
		fetch('http://localhost:8000/user/logout', {
			method: 'GET',
		})
			.then(() => {
				localStorage.clear();
				history.push('/login');
			});
	};

	return (
		<>
			<div className='default-padding container-fluid'>
				<p> LogOut ?</p>
				<Button className='gradient-background submit-btn btn' onClick={LogOutHandler}>ลงชื่อออก</Button>
			</div>
		</>
	);
};

export default Profile;
