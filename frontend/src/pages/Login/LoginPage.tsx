import React, { useEffect } from 'react';
import Login from '../../components/Login/Login';
import Profile from '../../components/Profile/Profile';

const LoginPage = () => {

	useEffect(() => {
		const script = document.createElement('script');

		script.src = 'https://apis.google.com/js/platform.js';
		script.async = true;

		document.body.appendChild(script);

		return () => {
			document.body.removeChild(script);
		};
	}, []);

	const selectedComponent = () => {
		console.log(localStorage.sid)
		if (localStorage.sid) return <Profile />;
		else return <Login />;
	};
	return <>{selectedComponent()}</>;
};

export default LoginPage;
