import { setAlertAction } from '../alert/actionCreators';
import {
	addNewCourseAction,
	deleteCourseAction,
	updateCourseAction,
} from './actionCreators';
import {
	addItemRequest,
	deleteItemByIdRequest,
	updateItemByIdRequest,
} from '../../services';

export const addNewCourse = (newCourse) => {
	return async (dispatch, getState) => {
		const requestData = {
			route: 'courses',
			body: newCourse,
			token: getState().user.token,
		};
		try {
			const response = await addItemRequest(requestData);
			if (response.successful) {
				dispatch(addNewCourseAction(response.result));
				dispatch(
					setAlertAction({
						messages: ['New course successfully added!'],
						type: 'success',
					})
				);
				return true;
			} else {
				throw new Error(response.result);
			}
		} catch (error) {
			dispatch(
				setAlertAction({
					messages: ['Adding course failed!', error.message],
					type: 'error',
				})
			);
			return false;
		}
	};
};

export const updateCourse = (updatedCourse, courseId) => {
	return async (dispatch, getState) => {
		const requestData = {
			route: 'courses',
			body: updatedCourse,
			token: getState().user.token,
			id: courseId,
		};
		try {
			const response = await updateItemByIdRequest(requestData);
			if (response.successful) {
				dispatch(updateCourseAction(response.result));
				dispatch(
					setAlertAction({
						messages: ['Course successfully updated!'],
						type: 'success',
					})
				);
				return true;
			} else {
				throw new Error(response.result);
			}
		} catch (error) {
			dispatch(
				setAlertAction({
					messages: ['Updating course failed!', error.message],
					type: 'error',
				})
			);
			return false;
		}
	};
};

export const deleteCourse = (courseId) => {
	return async (dispatch, getState) => {
		const requestData = {
			route: 'courses',
			token: getState().user.token,
			id: courseId,
		};
		try {
			const response = await deleteItemByIdRequest(requestData);
			if (response.successful) {
				dispatch(deleteCourseAction(courseId));
				dispatch(
					setAlertAction({
						messages: ['Course successfully deleted!'],
						type: 'success',
					})
				);
				return true;
			} else {
				throw new Error(response.result);
			}
		} catch (error) {
			dispatch(
				setAlertAction({
					messages: ['Deleting course failed!', error.message],
					type: 'error',
				})
			);
			return false;
		}
	};
};
