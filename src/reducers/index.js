import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

import events from './events';

export default combineReducers({
	events,
	form: formReducer,
});
