import { setAlertAction } from '../alert/actionCreators';
import { addNewAuthorAction } from './actionCreators';
import { addItemRequest } from '../../services';

export const addNewAuthor = (newAuthor) => {
	return async (dispatch, getState) => {
		const requestData = {
			route: 'authors',
			body: newAuthor,
			token: getState().user.token,
		};
		try {
			const response = await addItemRequest(requestData);
			if (response.successful) {
				dispatch(addNewAuthorAction(response.result));
				dispatch(
					setAlertAction({
						messages: ['New author successfully added!'],
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
					messages: ['Adding author failed!', error.message],
					type: 'error',
				})
			);
			return false;
		}
	};
};
