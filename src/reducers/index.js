import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import { reducer as toastrReducer } from 'react-redux-toastr';
import { firebaseReducer } from 'react-redux-firebase';
import { firestoreReducer } from 'redux-firestore';

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
	toastr: toastrReducer,
	firebase: firebaseReducer,
	firestore: firestoreReducer,
});
