import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Grid } from 'semantic-ui-react';
import { connect } from 'react-redux';

import EventHeader from './EventHeader';
import EventChat from './EventChat';
import EventSidebar from './EventSidebar';
import EventInfo from './EventInfo';
import { initialState as events } from '../../constants';

class EventDetails extends Component {
	static propTypes = {
		events: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
	};

	state = {
		event: {},
	};

	componentDidMount = () => {
		const { id } = this.props.match.params;
		const event = this.props.events.find(e => e.id === id);

		if (event) this.setState({ event });
	};

	render() {
		const { event } = this.state;

		return (
			<Grid>
				<Grid.Column width={10}>
					<EventHeader event={event} />
					<EventInfo event={event} />
					<EventChat />
				</Grid.Column>
				<Grid.Column width={6}>
					<EventSidebar attendees={event.attendees} />
				</Grid.Column>
			</Grid>
		);
	}
}

const mapStateToProps = ({ events }) => ({
	events,
});

export default connect(mapStateToProps)(EventDetails);
