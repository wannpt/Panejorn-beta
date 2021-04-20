import React from 'react';
import Login from '../../components/Login/Login';
import Profile from '../../components/Profile/Profile';

const LoginPage = () => {

	const selectedComponent = () => {
		if (localStorage.status === '1') return <Profile />;
		else return <Login />;
	};
	return <>{selectedComponent()}</>;
};

export default LoginPage;
