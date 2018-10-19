import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

import events from './events';
import modals from './modals';
import auth from './auth';
import async from './async';

export default combineReducers({
	events,
	modals,
	auth,
	async,
	form: formReducer,
});
