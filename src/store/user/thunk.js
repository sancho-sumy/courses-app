import { setAlertAction } from '../alert/actionCreators';
import { logoutUserAction, loginUserAction } from './actionCreators';
import { logoutRequest, checkUserRequest } from '../../services';

export const logoutUser = () => {
	return async (dispatch, getState) => {
		const token = getState().user.token;
		try {
			await logoutRequest(token);
			dispatch(logoutUserAction());
			dispatch(
				setAlertAction({
					messages: ['Logout successfully!'],
					type: 'success',
				})
			);
			return true;
		} catch (error) {
			dispatch(
				setAlertAction({
					messages: ['Logout failed!', error.message],
					type: 'error',
				})
			);
			return false;
		}
	};
};

export const checkToken = () => {
	return async (dispatch) => {
		const token = localStorage.getItem('token');
		try {
			const response = await checkUserRequest(token);
			if (response.successful) {
				dispatch(loginUserAction({ ...response.result, token: token }));
			} else {
				localStorage.removeItem('token');
				return false;
			}
			return true;
		} catch (error) {
			dispatch(
				setAlertAction({
					messages: ['User check failed!'],
					type: 'error',
				})
			);
			return false;
		}
	};
};
