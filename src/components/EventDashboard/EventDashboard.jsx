import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { Grid } from 'semantic-ui-react';

import EventList from '../EventList/EventList';
import LoadingComponent from '../common/LoadingComponent';
import EventActivity from '../EventActivity/EventActivity';

export class EventDashboard extends Component {
	static propTypes = {
		events: PropTypes.arrayOf(PropTypes.shape({})),
		isLoading: PropTypes.bool,
	};

	render() {
		const { events, isLoading } = this.props;

		if (isLoading) return <LoadingComponent inverted={true} />;
		return (
			<Grid>
				<Grid.Column width={10}>
					<EventList events={events} />
				</Grid.Column>
				<Grid.Column width={6}>
					<EventActivity />
				</Grid.Column>
			</Grid>
		);
	}
}

const mapStateToProps = ({ firestore, async: { isLoading } }) => ({
	events: firestore.ordered.events,
	isLoading,
});

export default connect(mapStateToProps)(
	// Listen for 'events' collection
	firestoreConnect([{ collection: 'events' }])(EventDashboard)
);
