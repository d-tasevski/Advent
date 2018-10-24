import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { firestoreConnect, isLoaded, isEmpty } from 'react-redux-firebase';
import { Grid } from 'semantic-ui-react';

import { getEventsForDashboard } from '../../actions/events';
import EventList from '../EventList/EventList';
import LoadingComponent from '../common/LoadingComponent';
import EventActivity from '../EventActivity/EventActivity';

export class EventDashboard extends Component {
	static propTypes = {
		events: PropTypes.arrayOf(PropTypes.shape({})),
	};

	componentDidMount() {
		this.props.getEventsForDashboard();
	}

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

const mapStateToProps = ({ events, async }) => ({
	events,
	isLoading: async.isLoading,
});

export default connect(
	mapStateToProps,
	{ getEventsForDashboard }
)(
	// Listen for 'events' collection
	firestoreConnect([{ collection: 'events' }])(EventDashboard)
);
