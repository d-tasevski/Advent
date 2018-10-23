import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Grid } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { withFirestore } from 'react-redux-firebase';

import { goingToEvent, cancelGoingToEvent } from '../../actions/events';
import { objectToArray } from '../../helpers/eventHelpers';
import EventHeader from './EventHeader';
import EventChat from './EventChat';
import EventSidebar from './EventSidebar';
import EventInfo from './EventInfo';

class EventDetails extends Component {
	static propTypes = {
		event: PropTypes.shape({}),
	};

	async componentDidMount() {
		const { firestore, match } = this.props;
		await firestore.setListener(`events/${match.params.id}`);
	}

	async componentWillUnmount() {
		const { firestore, match } = this.props;
		await firestore.unsetListener(`events/${match.params.id}`);
	}

	render() {
		const { event, auth, goingToEvent, cancelGoingToEvent } = this.props;
		const isHost = event.hostUID === auth.uid;
		const attendees = event && event.attendees && objectToArray(event.attendees);
		const isGoing = attendees && attendees.some(a => a.id === auth.uid);

		return (
			<Grid>
				<Grid.Column width={10}>
					<EventHeader
						goingToEvent={goingToEvent}
						cancelGoingToEvent={cancelGoingToEvent}
						event={event}
						isHost={isHost}
						isGoing={isGoing}
					/>
					<EventInfo event={event} />
					<EventChat />
				</Grid.Column>
				<Grid.Column width={6}>
					<EventSidebar attendees={attendees} />
				</Grid.Column>
			</Grid>
		);
	}
}

const mapStateToProps = state => {
	let event = {};

	if (state.firestore.ordered.events && state.firestore.ordered.events[0]) {
		event = state.firestore.ordered.events[0];
	}

	return {
		event,
		auth: state.firebase.auth,
	};
};

export default withFirestore(
	connect(
		mapStateToProps,
		{ goingToEvent, cancelGoingToEvent }
	)(EventDetails)
);
