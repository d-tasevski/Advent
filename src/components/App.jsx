import React, { Component, Fragment } from 'react';
import { Container } from 'semantic-ui-react';

import EventDashboard from './EventDashboard/EventDashboard';
import NavBar from './NavBar/NavBar';

class App extends Component {
	render() {
		return (
			<Fragment>
				<NavBar />
				<Container className="main">
					<EventDashboard />
				</Container>
			</Fragment>
		);
	}
}

export default App;
