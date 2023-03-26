import { coursesActionTypes } from './actionTypes';

const coursesInitialState = [];

export const coursesReducer = (
	state = coursesInitialState,
	{ type, payload }
) => {
	switch (type) {
		case coursesActionTypes.SET_COURSES:
			return [...payload];
		case coursesActionTypes.SAVE_NEW_COURSE:
			return [...state, payload];
		case coursesActionTypes.DELETE_COURSE:
			return [...state.filter((course) => course.id !== payload)];
		default:
			return state;
	}
};
