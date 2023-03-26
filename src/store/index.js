import { createStore, combineReducers } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';

import { coursesReducer } from './courses/reducer';
import { authorsReducer } from './authors/reducer';
import { userReducer } from './user/reducer';
import { alertReducer } from './alert/reducer';

const rootReducer = combineReducers({
	courses: coursesReducer,
	authors: authorsReducer,
	user: userReducer,
	alert: alertReducer,
});

const store = createStore(rootReducer, composeWithDevTools());

export default store;
