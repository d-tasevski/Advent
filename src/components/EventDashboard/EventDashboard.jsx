import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cuid from 'cuid';
import { Grid, Button } from 'semantic-ui-react';

import { events } from '../../fixtures';
import EventList from '../EventList/EventList';
import EventForm from '../EventForm/EventForm';

export class EventDashboard extends Component {
	static propTypes = {};

	state = {
		events,
		isOpen: false,
	};

	handleFormVisibility = () => this.setState({ isOpen: !this.state.isOpen });

	handleCreateEvent = event => {
		event.id = cuid();
		event.hostPhotoURL = '/assets/user.png';
		event.attendees = [];
		return this.setState({ events: [...this.state.events, event], isOpen: false });
	};

	render() {
		const { events, isOpen } = this.state;
		return (
			<Grid>
				<Grid.Column width={10}>
					<EventList events={events} />
				</Grid.Column>
				<Grid.Column width={6}>
					<Button
						content={isOpen ? 'Cancel' : 'Create Event'}
						positive={!isOpen}
						onClick={this.handleFormVisibility}
					/>
					{isOpen && <EventForm createEvent={this.handleCreateEvent} />}
				</Grid.Column>
			</Grid>
		);
	}
}

export default EventDashboard;
