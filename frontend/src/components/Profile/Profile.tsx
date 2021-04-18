import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { useHistory } from 'react-router';
import './Profile.scss';
import Image1 from '../../Images/cover_kbank-850x567.jpg';
import { User, UserStats } from '../../constant/Types/UserTypes';
import { UserConst, UserStatsConst } from '../../constant/constantVar/UserConst';
import { Doughnut } from 'react-chartjs-2';

const Profile = () => {
	const history = useHistory();
	const [user, setUser] = useState<User>(UserConst);
	const [chartData, setChartData] = useState<UserStats>(UserStatsConst);
	const [isLoading, setIsLoading] = useState<Boolean>(true);

	const getUser = () => {
		let temp: any;
		try {
			temp = localStorage.getItem('user');
			temp = JSON.parse(temp);
			setUser(temp.result);
			setChartData({
				datasets: [
					{
						data: [temp.result.tag1, temp.result.tag2, temp.result.tag3, temp.result.tag4, temp.result.tag5],
						backgroundColor: ['#E8B6A3', '#00F0CC', '#FF5C4A', '#6F35E0', '#00A7FF']
					},
				],
				labels: ['ธรรมชาติ', 'วัฒนธรรม', 'นันทนาการ', 'ศิลปะวิทยาการ', 'ประวัติศาตร์'],
			});
			setIsLoading(false);
		} catch (error) {
			console.log(error);
		}

		return false;
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
	}, []);

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
