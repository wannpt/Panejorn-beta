import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { useHistory } from 'react-router';
import './Profile.scss';
import { User, UserStats } from '../../constant/Types/UserTypes';
import { UserConst, UserStatsConst } from '../../constant/constantVar/UserConst';
import { Doughnut, Radar } from 'react-chartjs-2';
// import ContentLoader from 'react-content-loader/dist/web/ContentLoader';
import ContentLoader from 'react-content-loader';

const Profile = () => {
	const history = useHistory();
	const [user, setUser] = useState<User>(UserConst);
	const [chartData, setChartData] = useState<UserStats>(UserStatsConst);
	const [isLoading, setIsLoading] = useState<Boolean>(true);
	const [data, setData] = useState<any>();

	useEffect(() => {
		setIsLoading(true);
		fetch('/user/profile', {
			method: 'GET',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
				'Access-Control-Allow-Origin': '*',
			},
			credentials: 'include',
		})
			.then((res) => res.json())
			.then((result) => {
				setUser(result);
				setData(result.image);
				setChartData({
					datasets: [
						{
							label: 'ความสนใจ',
							data: [result.tag1, result.tag2, result.tag3, result.tag4, result.tag5],
							backgroundColor: 'rgba(255, 99, 132, 0.2)',
							borderColor: 'rgba(255, 99, 132, 1)',
							borderWidth: 1,
						},
					],
					labels: ['ธรรมชาติ', 'วัฒนธรรม', 'นันทนาการ', 'ศิลปะวิทยาการ', 'ประวัติศาตร์'],
				});
				setIsLoading(false);
			});
	}, []);

	const LogOutHandler = () => {
		fetch('/user/logout', {
			method: 'GET',
		}).then(() => {
			localStorage.clear();
			history.push('/profile');
		});
	};
	if (isLoading) {
		return (
			<ContentLoader viewBox='0 0 400 160' height={'100vh'} width={'100vw'} backgroundColor='transparent'>
				<circle cx='150' cy='86' r='8' />
				<circle cx='194' cy='86' r='8' />
				<circle cx='238' cy='86' r='8' />
			</ContentLoader>
		);
	}

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
							<Radar data={chartData} height={175} />
						</div>
						{/* <div className='col-12 py-4'>
							<Button className='black-text submit-btn'> สรุปการเดินทาง </Button>
						</div> */}
					</div>

					<Button
						className='gradient-background submit-btn btn mt-4'
						style={{ marginBottom: 60 }}
						onClick={LogOutHandler}
					>
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
