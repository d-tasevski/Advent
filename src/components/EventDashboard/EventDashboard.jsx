import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { Grid, Button, Loader } from 'semantic-ui-react';

import { getEventsForDashboard } from '../../actions/events';
import EventList from '../EventList/EventList';
import LoadingComponent from '../common/LoadingComponent';
import EventActivity from '../EventActivity/EventActivity';
import { toastr } from 'react-redux-toastr';

export class EventDashboard extends Component {
	static propTypes = {
		events: PropTypes.arrayOf(PropTypes.shape({})),
	};

	state = { moreEvents: false, isLoadingInit: true, loadedEvents: [] };

	async componentDidMount() {
		const next = await this.props.getEventsForDashboard();
		console.log(next);
		if (next && next.docs && next.docs.length > 1) {
			this.setState({ moreEvents: true, isLoadingInit: false });
		}
	}

	componentWillReceiveProps = nextProps => {
		if (this.props.events !== nextProps.events) {
			this.setState({ loadedEvents: [...this.state.loadedEvents, ...nextProps.events] });
		}
	};

	getNextEvents = async () => {
		const { events } = this.props;
		// This will give us the last document received
		const lastEvent = events && events[events.length - 1];
		let next = await this.props.getEventsForDashboard(lastEvent);
		console.log('DOCS', next.docs);
		if (next && !next.docs) {
			this.setState({ moreEvents: false });
			toastr.info('Info', 'There are no more events currently');
		}
	};

	render() {
		const { isLoading } = this.props;
		const { moreEvents, loadedEvents } = this.state;

		if (this.state.isLoadingInit) return <LoadingComponent inverted={true} />;

		return (
			<Grid>
				<Grid.Column width={10}>
					<EventList
						isLoading={isLoading}
						moreEvents={moreEvents}
						getMoreEvents={this.getNextEvents}
						events={loadedEvents}
					/>
				</Grid.Column>
				<Grid.Column width={6}>
					<EventActivity />
				</Grid.Column>
				<Grid.Column width={10} style={{ padding: '2rem' }}>
					<Loader active={isLoading} />
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
