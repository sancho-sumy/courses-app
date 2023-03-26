import { redirect } from 'react-router-dom';
import { checkTokenRequest } from '../services';
import store from '../store';
import { loginUserAction } from '../store/user/actionCreators';

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
	const token = getAuthToken();

	const fetchResponse = await checkTokenRequest(token);

	if (fetchResponse.successful) {
		store.dispatch(loginUserAction({ ...fetchResponse.result, token: token }));
	} else {
		localStorage.removeItem('token');
	}

	return null;
};
