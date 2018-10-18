import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';

import rootReducer from '../reducers';

export default function(initialState) {
	const middlewares = [];
	const middlewareEnhancer = applyMiddleware(...middlewares);
	const storeEnhancer = [middlewareEnhancer];
	const composedEnhancer = composeWithDevTools(...storeEnhancer);
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
