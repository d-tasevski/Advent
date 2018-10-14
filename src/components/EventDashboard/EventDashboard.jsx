import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Grid, Button } from 'semantic-ui-react';

import { events } from '../../fixtures';
import EventList from '../EventList/EventList';
import EventForm from '../EventForm/EventForm';

export class EventDashboard extends Component {
	static propTypes = {};

	render() {
		return (
			<Grid>
				<Grid.Column width={10}>
					<EventList events={events} />
				</Grid.Column>
				<Grid.Column width={6}>
					<Button content="Create Event" positive />
					<EventForm />
				</Grid.Column>
			</Grid>
		);
	}
}

export default EventDashboard;
