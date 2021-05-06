import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { useHistory } from 'react-router';
import './Profile.scss';
import { User, UserStats } from '../../constant/Types/UserTypes';
import { UserConst, UserStatsConst } from '../../constant/constantVar/UserConst';
import { Doughnut } from 'react-chartjs-2';
import Loading from '../Loading/Loading';
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
							data: [result.tag1, result.tag2, result.tag3, result.tag4, result.tag5],
							backgroundColor: ['#E8B6A3', '#00F0CC', '#FF5C4A', '#6F35E0', '#00A7FF'],
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
			<ContentLoader
				speed={1}
				width={300}
				height={667}
				viewBox='0 0 400 170'
				backgroundColor='#f3bb80'
				foregroundColor='#eb8778'
			>
				<circle cx='248' cy='59' r='49' />
				<circle cx='263' cy='66' r='8' />
				<rect x='175' y='120' rx='0' ry='0' width='156' height='8' />
				<rect x='204' y='137' rx='0' ry='0' width='100' height='8' />
				<rect x='248' y='128' rx='0' ry='0' width='0' height='1' />
				<rect x='247' y='126' rx='0' ry='0' width='1' height='8' />
				<rect x='252' y='166' rx='0' ry='0' width='1' height='0' />
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
							<Doughnut data={chartData} height={175} />
						</div>
						<div className='col-12 py-4'>
							<Button className='black-text submit-btn'> สรุปการเดินทาง </Button>
						</div>
					</div>

					<Button className='gradient-background submit-btn btn' style={{ marginBottom: 60 }} onClick={LogOutHandler}>
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
