import React, { Component, Fragment, lazy, Suspense } from 'react';
import { Container } from 'semantic-ui-react';
import { Switch, Route } from 'react-router-dom';

import { withAuthWrapper } from './Auth/withAuthWrapper';
import LoadingComponent from './common/LoadingComponent';

class WithSuspense extends Component {
	render() {
		const { component: Comp } = this.props;

		return (
			<Suspense fallback={<LoadingComponent />}>
				<Comp {...this.props} />
			</Suspense>
		);
	}
}

const withSuspense = Comp => (
	<Suspense fallback={<LoadingComponent />}>
		<Comp />
	</Suspense>
);

const AsyncHomePage = lazy(() => import('./EventDashboard/EventDashboard'));
const AsyncEventDashboard = lazy(() => import('./EventDashboard/EventDashboard'));
const AsyncNavBar = lazy(() => import('./NavBar/NavBar'));
const AsyncEventForm = lazy(() => import('./EventForm/EventForm'));
const AsyncSettingsDashboard = lazy(() => import('./User/Settings/SettingsDashboard'));
const AsyncUserDetails = lazy(() => import('./User/UserDetails/UserDetails'));
const AsyncPeopleDashboard = lazy(() => import('./User/PeopleDashboard/PeopleDashboard'));
const AsyncEventDetails = lazy(() => import('./EventDetails/EventDetails'));
const AsyncModalManager = lazy(() => import('./Modals/ModalManager'));
const AsyncNotFound = lazy(() => import('./common/NotFound'));

class App extends Component {
	render() {
		return (
			<Fragment>
				<AsyncModalManager />
				<Switch>
					<Route exact path="/" component={withSuspense(AsyncHomePage)} />
				</Switch>

				<Route
					path="/(.+)"
					render={() => (
						<Fragment>
							<AsyncNavBar />
							<Container className="main">
								<Switch>
									<Route
										path="/events"
										component={withSuspense(AsyncEventDashboard)}
									/>
									<Route
										path="/event/:id"
										component={withSuspense(AsyncEventDetails)}
									/>
									<Route
										path="/manage/:id"
										component={withAuthWrapper(withSuspense(AsyncEventForm))}
									/>
									<Route
										path="/people"
										component={withAuthWrapper(
											withSuspense(AsyncPeopleDashboard)
										)}
									/>
									<Route
										path="/profile/:id"
										component={withAuthWrapper(withSuspense(AsyncUserDetails))}
									/>
									<Route
										path="/settings"
										component={withAuthWrapper(
											withSuspense(AsyncSettingsDashboard)
										)}
									/>
									<Route
										path="/create-event"
										component={withAuthWrapper(withSuspense(AsyncEventForm))}
									/>
									<Route path="/error" component={withSuspense(AsyncNotFound)} />
									<Route component={withSuspense(AsyncNotFound)} />
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
