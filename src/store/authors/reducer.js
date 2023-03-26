import { authorsActionTypes } from './actionTypes';

const authorsInitialState = [];

export const authorsReducer = (
	state = authorsInitialState,
	{ type, payload }
) => {
	switch (type) {
		case authorsActionTypes.SET_AUTHORS:
			return [...payload];
		case authorsActionTypes.SAVE_NEW_AUTHOR:
			return [...state, payload];
		default:
			return state;
	}
};
