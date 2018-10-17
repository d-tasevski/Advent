import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import cuid from 'cuid';
import { Grid, Button } from 'semantic-ui-react';

import { createEvent, updateEvent, deleteEvent } from '../../actions/events';
import EventList from '../EventList/EventList';
import EventForm from '../EventForm/EventForm';

export class EventDashboard extends Component {
	static propTypes = {};

	state = {
		isOpen: false,
		selectedEvent: {},
	};

	handleFormVisibility = () => this.setState({ isOpen: !this.state.isOpen, selectedEvent: {} });

	handleSelectEvent = event => this.setState({ selectedEvent: event, isOpen: true });

	handleDeleteEvent = eventID => this.props.deleteEvent(eventID);

	handleCreateEvent = event => {
		event.id = cuid();
		event.hostPhotoURL = '/assets/user.png';
		event.attendees = [];
		this.props.createEvent(event);
		return this.setState({ isOpen: false });
	};

	handleUpdateEvent = event => {
		this.props.updateEvent(event);
		return this.setState({ isOpen: false, selectedEvent: {} });
	};

	render() {
		const { isOpen, selectedEvent } = this.state;
		const { events } = this.props;

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

const mapStateToProps = ({ events }) => ({
	events,
});

export default connect(
	mapStateToProps,
	{ createEvent, updateEvent, deleteEvent }
)(EventDashboard);
