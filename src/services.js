import { json } from 'react-router-dom';
import store from './store';

import { backendURL } from './constants';
import { setAlertAction } from './store/alert/actionCreators';

export const authRequest = async (route, userData) => {
	const response = await fetch(`${backendURL}/${route}`, {
		method: 'POST',
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

export const logoutRequest = async (token) => {
	const response = await fetch(`${backendURL}/logout`, {
		method: 'DELETE',
		headers: {
			Authorization: token,
		},
	});

	if (!response.ok) {
		throw json(
			{ message: 'Logout problem! Try again later.' },
			{ status: 500 }
		);
	}
};

export const getAllItemsRequest = async (route) => {
	const response = await fetch(`${backendURL}/${route}/all`, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
		},
	});
	const resData = await response.json();
	if (response.ok) {
		return resData.result;
	} else {
		throw json({ message: `Cannot load ${route} list.` }, { status: 500 });
	}
};

export const checkUserRequest = async (token) => {
	const response = await fetch(`${backendURL}/users/me`, {
		method: 'GET',
		headers: {
			Authorization: token,
		},
	});
	const resData = await response.json();
	return resData;
};

export const addItemRequest = async ({ route, body, token }) => {
	const response = await fetch(`${backendURL}/${route}/add`, {
		method: 'POST',
		body: JSON.stringify(body),
		headers: {
			'Content-Type': 'application/json',
			Authorization: token,
		},
	});

	if (!response.ok) {
		throw json({ message: 'Cannot add new item.' }, { status: 500 });
	}

	const data = await response.json();

	return data;
};

export const updateItemByIdRequest = async ({ route, id, body, token }) => {
	const response = await fetch(`${backendURL}/${route}/${id}`, {
		method: 'PUT',
		body: JSON.stringify(body),
		headers: {
			'Content-Type': 'application/json',
			Authorization: token,
		},
	});

	if (!response.ok) {
		throw json({ message: 'Cannot update item.' }, { status: 500 });
	}

	const data = await response.json();

	return data;
};

export const deleteItemByIdRequest = async ({ route, id, token }) => {
	const response = await fetch(`${backendURL}/${route}/${id}`, {
		method: 'DELETE',
		headers: {
			Authorization: token,
		},
	});

	if (!response.ok) {
		throw json({ message: 'Cannot delete item.' }, { status: 500 });
	}

	const data = await response.json();

	return data;
};
