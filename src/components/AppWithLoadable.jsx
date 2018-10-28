import React, { Component, Fragment } from 'react';
import { Container } from 'semantic-ui-react';
import { Switch, Route } from 'react-router-dom';
import Loadable from 'react-loadable';

import { withAuthWrapper } from './Auth/withAuthWrapper';
import LoadingComponent from './common/LoadingComponent';

const AsyncHomePage = Loadable({
	loader: () => import('./Home/Home'),
	loading: LoadingComponent,
});
const AsyncEventDashboard = Loadable({
	loader: () => import('./EventDashboard/EventDashboard'),
	loading: LoadingComponent,
});
const AsyncNavBar = Loadable({
	loader: () => import('./NavBar/NavBar'),
	loading: LoadingComponent,
});
const AsyncEventForm = Loadable({
	loader: () => import('./EventForm/EventForm'),
	loading: LoadingComponent,
});
const AsyncSettingsDashboard = Loadable({
	loader: () => import('./User/Settings/SettingsDashboard'),
	loading: LoadingComponent,
});
const AsyncUserDetails = Loadable({
	loader: () => import('./User/UserDetails/UserDetails'),
	loading: LoadingComponent,
});
const AsyncPeopleDashboard = Loadable({
	loader: () => import('./User/PeopleDashboard/PeopleDashboard'),
	loading: LoadingComponent,
});
const AsyncEventDetails = Loadable({
	loader: () => import('./EventDetails/EventDetails'),
	loading: LoadingComponent,
});
const AsyncModalManager = Loadable({
	loader: () => import('./Modals/ModalManager'),
	loading: LoadingComponent,
});
const AsyncNotFound = Loadable({
	loader: () => import('./common/NotFound'),
	loading: LoadingComponent,
});

class App extends Component {
	render() {
		return (
			<Fragment>
				<AsyncModalManager />
				<Switch>
					<Route exact path="/" component={AsyncHomePage} />
				</Switch>

				<Route
					path="/(.+)"
					render={() => (
						<Fragment>
							<AsyncNavBar />
							<Container className="main">
								<Switch>
									<Route path="/events" component={AsyncEventDashboard} />
									<Route path="/event/:id" component={AsyncEventDetails} />
									<Route
										path="/manage/:id"
										component={withAuthWrapper(AsyncEventForm)}
									/>
									<Route
										path="/people"
										component={withAuthWrapper(AsyncPeopleDashboard)}
									/>
									<Route
										path="/profile/:id"
										component={withAuthWrapper(AsyncUserDetails)}
									/>
									<Route
										path="/settings"
										component={withAuthWrapper(AsyncSettingsDashboard)}
									/>
									<Route
										path="/create-event"
										component={withAuthWrapper(AsyncEventForm)}
									/>
									<Route path="/error" component={AsyncNotFound} />
									<Route component={AsyncNotFound} />
								</Switch>
							</Container>
						</Fragment>
					)}
				/>
			</Fragment>
		);
	}
}

export default App;
