import { modalActionTypes } from './actionTypes';

export const openModalAction = () => {
	return {
		type: modalActionTypes.OPEN_MODAL,
	};
};

export const closeModalAction = () => {
	return {
		type: modalActionTypes.CLOSE_MODAL,
	};
};
