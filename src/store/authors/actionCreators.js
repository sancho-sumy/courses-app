import { authorsActionTypes } from './actionTypes';

export const setAuthorsAction = (authors) => {
	return {
		type: authorsActionTypes.SET_AUTHORS,
		payload: authors,
	};
};

export const addNewAuthorAction = (author) => {
	return {
		type: authorsActionTypes.SAVE_NEW_AUTHOR,
		payload: author,
	};
};
