import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Grid } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { withFirestore, firebaseConnect, isEmpty } from 'react-redux-firebase';
import { compose } from 'redux';
import { toastr } from 'react-redux-toastr';

import { goingToEvent, cancelGoingToEvent, addEventComment } from '../../actions/events';
import { openModal } from '../../actions/modals';
import { objectToArray, createDataTree } from '../../helpers/eventHelpers';
import LoadingComponent from '../common/LoadingComponent';
import EventHeader from './EventHeader';
import EventChat from './EventChat';
import EventSidebar from './EventSidebar';
import EventInfo from './EventInfo';

class EventDetails extends Component {
	static propTypes = {
		event: PropTypes.shape({}),
	};

	state = {
		initialLoading: true,
	};

	async componentDidMount() {
		const { firestore, match, history } = this.props;
		const event = await firestore.get(`events/${match.params.id}`);
		if (!event.exists) {
			toastr.error('Not Found!', 'This is not the event you are looking for');
			history.push('/error');
		}
		await firestore.setListener(`events/${match.params.id}`);
		this.setState({ initialLoading: false });
	}

	async componentWillUnmount() {
		const { firestore, match } = this.props;
		await firestore.unsetListener(`events/${match.params.id}`);
	}

	render() {
		const {
			addEventComment,
			auth,
			cancelGoingToEvent,
			event,
			eventChat,
			goingToEvent,
			isLoading,
			match,
			openModal,
			requesting,
		} = this.props;
		const attendees =
			event &&
			event.attendees &&
			objectToArray(event.attendees).sort((a, b) => a.joinDate - b.joinDate);
		const isHost = event.hostUID === auth.uid;
		const isGoing = attendees && attendees.some(a => a.id === auth.uid);
		const isAuthenticated = auth.isLoaded && !auth.isEmpty;
		const isEventLoading = requesting[`events/${match.params.id}`];
		const chatTree = !isEmpty(eventChat) && createDataTree(eventChat);

		if (isEventLoading || this.state.initialLoading) {
			return <LoadingComponent inverted={true} />;
		}

		return (
			<Grid>
				<Grid.Column width={10}>
					<EventHeader
						goingToEvent={goingToEvent}
						cancelGoingToEvent={cancelGoingToEvent}
						event={event}
						openModal={openModal}
						isHost={isHost}
						isGoing={isGoing}
						isLoading={isLoading}
						isAuthenticated={isAuthenticated}
					/>
					<EventInfo event={event} />
					{isAuthenticated && (
						<EventChat
							eventChat={chatTree}
							addEventComment={addEventComment}
							eventID={event.id}
						/>
					)}
				</Grid.Column>
				<Grid.Column width={6}>
					<EventSidebar attendees={attendees} />
				</Grid.Column>
			</Grid>
		);
	}
}

const mapStateToProps = ({ firestore, firebase, async }, { match: { params } }) => {
	let event = {};

	if (firestore.ordered.events && firestore.ordered.events[0]) {
		event = firestore.ordered.events[0];
	}

	return {
		event,
		requesting: firestore.status.requesting,
		auth: firebase.auth,
		isLoading: async.isLoading,
		eventChat:
			!isEmpty(firebase.data.event_chat) &&
			objectToArray(firebase.data.event_chat[params.id]),
	};
};

export default compose(
	withFirestore,
	connect(
		mapStateToProps,
		{ goingToEvent, cancelGoingToEvent, addEventComment, openModal }
	),
	firebaseConnect(
		props =>
			props.auth.isLoaded && !props.auth.isEmpty && [`event_chat/${props.match.params.id}`]
	)
)(EventDetails);
