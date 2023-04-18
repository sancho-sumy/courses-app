import { userActionTypes } from './actionTypes';

export const loginUserAction = (loginData) => {
	return {
		type: userActionTypes.LOGIN,
		payload: loginData,
	};
};

export const logoutUserAction = () => {
	return {
		type: userActionTypes.LOGOUT,
	};
};
