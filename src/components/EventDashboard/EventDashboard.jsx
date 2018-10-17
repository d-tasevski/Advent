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
		selectedEvent: {},
	};

	handleFormVisibility = () => this.setState({ isOpen: !this.state.isOpen, selectedEvent: {} });

	handleCreateEvent = event => {
		event.id = cuid();
		event.hostPhotoURL = '/assets/user.png';
		event.attendees = [];
		return this.setState({ events: [...this.state.events, event], isOpen: false });
	};

	handleSelectEvent = event => this.setState({ selectedEvent: event, isOpen: true });

	handleUpdateEvent = event => {
		const newEvents = this.state.events.map(e => (e.id === event.id ? event : e));
		return this.setState({ events: newEvents, isOpen: false, selectedEvent: {} });
	};

	handleDeleteEvent = eventID => {
		const newEvents = this.state.events.filter(e => e.id !== eventID);
		return this.setState({ events: newEvents, isOpen: false, selectedEvent: {} });
	};

	render() {
		const { events, isOpen, selectedEvent } = this.state;
		return (
			<Grid>
				<Grid.Column width={10}>
					<EventList
						deleteEvent={this.handleDeleteEvent}
						selectEvent={this.handleSelectEvent}
						events={events}
					/>
				</Grid.Column>
				<Grid.Column width={6}>
					<Button
						content={isOpen ? 'Cancel' : 'Create Event'}
						positive={!isOpen}
						onClick={this.handleFormVisibility}
					/>
					{isOpen && (
						<EventForm
							selectedEvent={selectedEvent}
							updateEvent={this.handleUpdateEvent}
							createEvent={this.handleCreateEvent}
						/>
					)}
				</Grid.Column>
			</Grid>
		);
	}
}

export default EventDashboard;
