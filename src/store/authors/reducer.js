import { authorsActionTypes } from './actionTypes';

const authorsInitialState = { authors: [] };

export const authorsReducer = (
	state = authorsInitialState,
	{ type, payload }
) => {
	switch (type) {
		case authorsActionTypes.SET_AUTHORS:
			return { ...state, authors: [...payload] };
		case authorsActionTypes.SAVE_NEW_AUTHOR:
			return { ...state, authors: [...state.authors, payload] };
		default:
			return state;
	}
};
