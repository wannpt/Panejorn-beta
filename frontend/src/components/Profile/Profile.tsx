import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { useHistory } from 'react-router';
import './Profile.scss';
import { User, UserStats } from '../../constant/Types/UserTypes';
import { UserConst, UserStatsConst } from '../../constant/constantVar/UserConst';
import { Radar } from 'react-chartjs-2';
// import ContentLoader from 'react-content-loader/dist/web/ContentLoader';
import ContentLoader from 'react-content-loader';
import defaultProfilePics from '../../Images/ClipartKey_1520367.png';

const chartOptions = {
	scale: {
		ticks: {
			beginAtZero: true,
			max: 1,
			min: 0,
			stepSize: 0.2,
		}
	},
};

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
					<div className='row justify-content-center text-center my-3'>
						<div className='col-12'>
							{data === null ? (
								<img className='profile-img' src={defaultProfilePics} alt=''></img>
							) : (
								<img className='profile-img' src={`data:image/jpeg;base64,${data}`} alt=''></img>
							)}
						</div>
						<div className='col-12'>
							<span className='big-title'> {user.username} </span>
						</div>
					</div>

					{/* Stats */}
					<div className='row justify-content-center text-center'>
						<div className='col-12'>
							<span className='small-title'>ประเภทความสนใจ</span>
						</div>
						<div className='col-12'>
							<Radar data={chartData} height={175} options={chartOptions} />
						</div>
						<div className='col-12 pt-4 pb-3'>
							<Button
								className='black-text submit-btn'
								onClick={() => {
									history.push('/profile/tagscore');
								}}
							>
								{' '}
								แก้ไขความสนใจ{' '}
							</Button>
						</div>
					</div>

					<Button
						className='gradient-background submit-btn btn mt-0'
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
