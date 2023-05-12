import { coursesReducer } from '../courses/reducer';
import { coursesActionTypes } from '../courses/actionTypes';

describe('coursesReducer', () => {
	const initialState = { courses: [] };
	const testCourse = { id: 1, title: 'Test Course' };
	const updatedCourse = { id: 1, title: 'Updated Test Course' };

	it('should return the initial state', () => {
		expect(coursesReducer(undefined, {})).toEqual(initialState);
	});

	it('should handle SAVE_NEW_COURSE and returns new state', () => {
		const action = {
			type: coursesActionTypes.SAVE_NEW_COURSE,
			payload: testCourse,
		};
		expect(coursesReducer(initialState, action)).toEqual({
			courses: [testCourse],
		});
	});

	it('should handle SET_COURSES and returns new state', () => {
		const courses = [
			{ id: 1, title: 'Test Course' },
			{ id: 2, title: 'Test Course 2' },
		];
		const action = { type: coursesActionTypes.SET_COURSES, payload: courses };
		expect(coursesReducer(initialState, action)).toEqual({ courses: courses });
	});

	it('should handle DELETE_COURSE action and retruns a new state (extra test)', () => {
		const courses = {
			courses: [
				{ id: 1, title: 'Test Course' },
				{ id: 2, title: 'Test Course 2' },
			],
		};
		const action = {
			type: coursesActionTypes.DELETE_COURSE,
			payload: testCourse.id,
		};
		expect(coursesReducer(courses, action)).toEqual({
			courses: [{ id: 2, title: 'Test Course 2' }],
		});
	});

	it('should handle UPDATE_COURSE action and retruns a new state (extra test)', () => {
		const courses = { courses: [testCourse] };
		const action = {
			type: coursesActionTypes.UPDATE_COURSE,
			payload: updatedCourse,
		};
		expect(coursesReducer(courses, action)).toEqual({
			courses: [updatedCourse],
		});
	});

	it('should return state for unknown action types (extra test)', () => {
		const action = { type: 'UNKNOWN_ACTION' };
		expect(coursesReducer(initialState, action)).toEqual(initialState);
	});
});
