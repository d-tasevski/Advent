import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Grid } from 'semantic-ui-react';

import EventList from '../EventList/EventList';

export class EventDashboard extends Component {
	static propTypes = {
		events: PropTypes.arrayOf(PropTypes.shape({})),
	};

	render() {
		const { events } = this.props;

		return (
			<Grid>
				<Grid.Column width={10}>
					<EventList events={events} />
				</Grid.Column>
				<Grid.Column width={6}>
					<p />
				</Grid.Column>
			</Grid>
		);
	}
}

const mapStateToProps = ({ events }) => ({
	events,
});

export default connect(mapStateToProps)(EventDashboard);
