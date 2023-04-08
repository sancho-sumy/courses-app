import { coursesReducer } from '../courses/reducer';
import { coursesActionTypes } from '../courses/actionTypes';

describe('coursesReducer', () => {
	const initialState = [];
	const testCourse = { id: 1, title: 'Test Course' };
	const updatedCourse = { id: 1, title: 'Updated Test Course' };

	it('reducer should return the initial state', () => {
		expect(coursesReducer(undefined, {})).toEqual(initialState);
	});

	it('reducer should handle SAVE_NEW_COURSE and returns new state', () => {
		const action = {
			type: coursesActionTypes.SAVE_NEW_COURSE,
			payload: testCourse,
		};
		expect(coursesReducer(initialState, action)).toEqual([testCourse]);
	});

	it('reducer should handle SET_COURSES and returns new state', () => {
		const courses = [
			{ id: 1, title: 'Test Course' },
			{ id: 2, title: 'Test Course 2' },
		];
		const action = { type: coursesActionTypes.SET_COURSES, payload: courses };
		expect(coursesReducer(initialState, action)).toEqual(courses);
	});

	it('reducer should handle DELETE_COURSE action and retruns a new state (extra test)', () => {
		const courses = [
			{ id: 1, title: 'Test Course' },
			{ id: 2, title: 'Test Course 2' },
		];
		const action = {
			type: coursesActionTypes.DELETE_COURSE,
			payload: testCourse.id,
		};
		expect(coursesReducer(courses, action)).toEqual([
			{ id: 2, title: 'Test Course 2' },
		]);
	});

	it('reducer should handle UPDATE_COURSE action and retruns a new state (extra test)', () => {
		const courses = [testCourse];
		const action = {
			type: coursesActionTypes.UPDATE_COURSE,
			payload: updatedCourse,
		};
		expect(coursesReducer(courses, action)).toEqual([updatedCourse]);
	});

	it('reducer should return state for unknown action types (extra test)', () => {
		const action = { type: 'UNKNOWN_ACTION' };
		expect(coursesReducer(initialState, action)).toEqual(initialState);
	});
});
