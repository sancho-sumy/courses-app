import { modalActionTypes } from './actionTypes';

const modalInitialState = {
	isVisible: false,
};

export const modalReducer = (state = modalInitialState, { type, payload }) => {
	switch (type) {
		case modalActionTypes.OPEN_MODAL:
			return {
				...state,
				isVisible: true,
			};
		case modalActionTypes.CLOSE_MODAL:
			return {
				...state,
				isVisible: false,
			};
		default:
			return state;
	}
};
