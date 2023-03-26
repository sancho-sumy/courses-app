import { userActionTypes } from './actionTypes';

const userInitialState = {
	isAuth: false,
	name: '',
	email: '',
	token: '',
};

export const userReducer = (state = userInitialState, { type, payload }) => {
	switch (type) {
		case userActionTypes.LOGIN:
			return {
				...state,
				isAuth: true,
				name: payload.name,
				email: payload.email,
				token: payload.token,
			};
		case userActionTypes.LOGOUT:
			return {
				...state,
				isAuth: false,
				name: '',
				email: '',
				token: '',
			};
		default:
			return state;
	}
};
