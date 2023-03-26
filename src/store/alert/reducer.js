import { alertActionTypes } from './actionTypes';

const alertInitialState = {
	messages: [],
	type: '',
};

export const alertReducer = (state = alertInitialState, { type, payload }) => {
	switch (type) {
		case alertActionTypes.SET_ALERT:
			return {
				...state,
				messages: payload.messages,
				type: payload.type,
			};
		case alertActionTypes.DELETE_ALERT:
			return {
				...state,
				messages: [],
				type: '',
			};
		default:
			return state;
	}
};
