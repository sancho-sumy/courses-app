import { redirect } from 'react-router-dom';
import store from '../store';
import { checkToken } from '../store/user/thunk';

export const getAuthToken = () => {
	const token = localStorage.getItem('token');
	if (!token) {
		return null;
	}
	return token;
};

export const checkAuthToken = () => {
	const token = getAuthToken();

	if (!token) {
		return redirect('/login');
	}
	return null;
};

export const checkTokenValidity = async () => {
	await store.dispatch(checkToken());
	return null;
};
