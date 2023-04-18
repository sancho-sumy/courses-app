import { alertActionTypes } from './actionTypes';

export const setAlertAction = (alertData) => {
	return {
		type: alertActionTypes.SET_ALERT,
		payload: alertData,
	};
};

export const deleteAlertAction = () => {
	return {
		type: alertActionTypes.DELETE_ALERT,
	};
};
