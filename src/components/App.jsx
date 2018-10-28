import React, { Component, Fragment } from 'react';
import { Container } from 'semantic-ui-react';
import { Switch, Route } from 'react-router-dom';

import EventDashboard from './EventDashboard/EventDashboard';
import NavBar from './NavBar/NavBar';
import Home from './Home/Home';
import EventDetails from './EventDetails/EventDetails';
import PeopleDashboard from './User/PeopleDashboard/PeopleDashboard';
import UserDetails from './User/UserDetails/UserDetails';
import SettingsDashboard from './User/Settings/SettingsDashboard';
import EventForm from './EventForm/EventForm';
import ModalManager from './Modals/ModalManager';
import NotFound from './common/NotFound';
import { withAuthWrapper } from './Auth/withAuthWrapper';

class App extends Component {
	render() {
		return (
			<Fragment>
				<ModalManager />
				<Switch>
					<Route exact path="/" component={Home} />
				</Switch>

				<Route
					path="/(.+)"
					render={() => (
						<Fragment>
							<NavBar />
							<Container className="main">
								<Switch>
									<Route path="/events" component={EventDashboard} />
									<Route path="/event/:id" component={EventDetails} />
									<Route
										path="/manage/:id"
										component={withAuthWrapper(EventForm)}
									/>
									<Route
										path="/people"
										component={withAuthWrapper(PeopleDashboard)}
									/>
									<Route
										path="/profile/:id"
										component={withAuthWrapper(UserDetails)}
									/>
									<Route
										path="/settings"
										component={withAuthWrapper(SettingsDashboard)}
									/>
									<Route
										path="/create-event"
										component={withAuthWrapper(EventForm)}
									/>
									<Route path="/error" component={NotFound} />
									<Route component={NotFound} />
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
