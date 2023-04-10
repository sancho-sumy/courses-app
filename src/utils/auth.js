import { redirect } from 'react-router-dom';

export function getAuthToken() {
	const token = localStorage.getItem('token');

	if (!token) {
		return null;
	}

	return token;
}

export function checkAuthToken() {
	const token = getAuthToken();

	if (!token) {
		return redirect('/login');
	}
	return null;
}
