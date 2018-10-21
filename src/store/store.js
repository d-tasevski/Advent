import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import { reactReduxFirebase, getFirebase } from 'react-redux-firebase';
import { reduxFirestore, getFirestore } from 'redux-firestore';

import rootReducer from '../reducers';
import firebase from '../config/firebase';

const rxFirebaseConfig = {
	// Tells rx-firebase where we are storing our user profiles
	userProfile: 'users',
	// Let us know when our auth from firebase is available
	attachAuthIsReady: true,
	useFirestoreForProfile: true,
	updateProfileOnLogin: false,
};

export default function(initialState) {
	// Make firebase & firestore available in redux actions
	const middlewares = [thunk.withExtraArgument({ getFirebase, getFirestore })];
	const middlewareEnhancer = applyMiddleware(...middlewares);
	const storeEnhancer = [middlewareEnhancer];
	const composedEnhancer = composeWithDevTools(
		...storeEnhancer,
		reactReduxFirebase(firebase, rxFirebaseConfig),
		reduxFirestore(firebase)
	);
	const store = createStore(rootReducer, initialState, composedEnhancer);

	// NOTE: Enable hot reloading for Redux
	if (process.env.NODE_ENV !== 'production') {
		if (module.hot) {
			module.hot.accept('../reducers/index.js', () => {
				const newRootReducer = require('../reducers/index.js').default;
				store.replaceReducer(newRootReducer);
			});
		}
	}

	return store;
}
