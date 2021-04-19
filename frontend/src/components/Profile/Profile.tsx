import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { useHistory } from 'react-router';
import './Profile.scss';
import { User, UserStats } from '../../constant/Types/UserTypes';
import { UserConst, UserStatsConst } from '../../constant/constantVar/UserConst';
import { Doughnut } from 'react-chartjs-2';

const Profile = () => {
	const history = useHistory();
	const [user, setUser] = useState<User>(UserConst);
	const [chartData, setChartData] = useState<UserStats>(UserStatsConst);
	const [isLoading, setIsLoading] = useState<Boolean>(true);
	const [data, setData] = useState<any>();

	useEffect(() => {
		fetch('/user/profile', {
			method: 'GET',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
				'Access-Control-Allow-Origin' : '*',
			},
			credentials: 'include',
		})
			.then((res) => res.json())
			.then((result) => {
				setUser(result);
				setData(result.image)
				setChartData({
					datasets: [
						{
							data: [
								result.tag1,
								result.tag2,
								result.tag3,
								result.tag4,
								result.tag5,
							],
							backgroundColor: ['#E8B6A3', '#00F0CC', '#FF5C4A', '#6F35E0', '#00A7FF'],
						},
					],
					labels: ['ธรรมชาติ', 'วัฒนธรรม', 'นันทนาการ', 'ศิลปะวิทยาการ', 'ประวัติศาตร์'],
				});
				setIsLoading(false);
			});
	}, []);

	const LogOutHandler = () => {
		fetch('http://localhost:8000/user/logout', {
			method: 'GET',
		}).then(() => {
			localStorage.clear();
			history.push('/profile');
		});
	};

	if (!isLoading) {
		return (
			<>
				<div className='default-padding container-fluid'>
					{/* Profile */}
					<div className='row justify-content-center text-center'>
						<div className='col-12'>
							<img className='profile-img' src={`data:image/jpeg;base64,${data}`}></img>
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
						<div className='col-12'>
							<Doughnut data={chartData} height={175} />
						</div>
						<div className='col-12 py-4'>
							<Button className='black-text submit-btn'> สรุปการเดินทาง </Button>
						</div>
					</div>

					<Button className='gradient-background submit-btn btn' onClick={LogOutHandler}>
						ลงชื่อออก
					</Button>
				</div>
			</>
		);
	} else {
		return <> </>;
	}
};

export default Profile;
