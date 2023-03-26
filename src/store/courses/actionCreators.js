import { coursesActionTypes } from './actionTypes';

export const setCoursesAction = (courses) => {
	return {
		type: coursesActionTypes.SET_COURSES,
		payload: courses,
	};
};

export const addNewCourseAction = (course) => {
	return {
		type: coursesActionTypes.SAVE_NEW_COURSE,
		payload: course,
	};
};

export const deleteCourseAction = (courseId) => {
	return {
		type: coursesActionTypes.DELETE_COURSE,
		payload: courseId,
	};
};

export const updateCourseAction = (courseId) => {
	return {
		type: coursesActionTypes.UPDATE_COURSE,
		payload: courseId,
	};
};
