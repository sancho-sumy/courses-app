import { json } from 'react-router-dom';
import store from './store';

import { backendURL } from './constants';
import { setAlertAction } from './store/alert/actionCreators';

export const authRequest = async (route, userData, method) => {
	const response = await fetch(`${backendURL}/${route}`, {
		method: method || 'POST',
		body: JSON.stringify(userData),
		headers: {
			'Content-Type': 'application/json',
		},
	});

	const resData = await response.json();

	if (response.status === 400) {
		const errorMessage = resData.result
			? [resData.result]
			: [...resData.errors];
		store.dispatch(
			setAlertAction({
				messages: errorMessage,
				type: 'error',
			})
		);
		return;
	}

	if (!response.ok) {
		throw json(
			{ message: 'Authorization problem! Try again later.' },
			{ status: 500 }
		);
	}

	return resData;
};

export const getAllCoursesRequest = async () => {
	const response = await fetch(`${backendURL}/courses/all`, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
		},
	});
	const resData = await response.json();
	if (response.ok) {
		return resData.result;
	} else {
		throw json({ message: 'Cannot load courses list.' }, { status: 500 });
	}
};

export const getAllAuthorsRequest = async () => {
	const response = await fetch(`${backendURL}/authors/all`, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
		},
	});
	const resData = await response.json();
	if (response.ok) {
		return resData.result;
	} else {
		throw json({ message: 'Cannot load authors list.' }, { status: 500 });
	}
};

export const checkTokenRequest = async (token) => {
	const response = await fetch(`${backendURL}/users/me`, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
			Authorization: token,
		},
	});
	const resData = await response.json();
	return resData;
};
