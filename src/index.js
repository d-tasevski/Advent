import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';

import 'semantic-ui-css/semantic.min.css';
import './index.css';

import App from './components/App';
import * as serviceWorker from './serviceWorker';
import configureStore from './store/store';
import ScrollToTop from './helpers/ScrollToTop';
import { loadEvents } from './actions/events';

const store = configureStore();
store.dispatch(loadEvents());

const rootEl = document.getElementById('root');
const Root = () => (
	<Provider store={store}>
		<BrowserRouter>
			<ScrollToTop>
				<App />
			</ScrollToTop>
		</BrowserRouter>
	</Provider>
);

const render = () => {
	ReactDOM.render(<Root />, rootEl);
};

// Enable hot reloading
if (module.hot) {
	module.hot.accept('./components/App', () => {
		setTimeout(render);
	});
}

render();

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
