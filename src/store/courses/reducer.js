import { coursesActionTypes } from './actionTypes';

const coursesInitialState = { courses: [] };

export const coursesReducer = (
	state = coursesInitialState,
	{ type, payload }
) => {
	switch (type) {
		case coursesActionTypes.SET_COURSES:
			return { ...state, courses: [...payload] };
		case coursesActionTypes.SAVE_NEW_COURSE:
			return { ...state, courses: [...state.courses, payload] };
		case coursesActionTypes.DELETE_COURSE:
			return {
				...state,
				courses: [...state.courses.filter((course) => course.id !== payload)],
			};
		case coursesActionTypes.UPDATE_COURSE:
			return {
				...state,
				courses: [
					...state.courses.map((course) =>
						course.id !== payload.id ? course : payload
					),
				],
			};
		default:
			return state;
	}
};
