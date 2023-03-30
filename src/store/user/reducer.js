import { userActionTypes } from './actionTypes';

const userInitialState = {
	isAuth: false,
	name: '',
	email: '',
	token: '',
	role: '',
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
				role: payload.role,
			};
		case userActionTypes.LOGOUT:
			return {
				...state,
				...userInitialState,
			};
		default:
			return state;
	}
};
