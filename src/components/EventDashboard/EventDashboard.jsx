import React, { Component, createRef } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { Grid, Loader } from 'semantic-ui-react';
import { toastr } from 'react-redux-toastr';

import { query } from '../../queries/eventQueries';
import { getEventsForDashboard } from '../../actions/events';
import EventList from '../EventList/EventList';
import LoadingComponent from '../common/LoadingComponent';
import EventActivity from '../EventActivity/EventActivity';

export class EventDashboard extends Component {
	static propTypes = {
		events: PropTypes.arrayOf(PropTypes.shape({})),
	};

	state = { moreEvents: false, isLoadingInit: true, loadedEvents: [] };

	listCtxRef = createRef();

	async componentDidMount() {
		const next = await this.props.getEventsForDashboard();

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

		if (next && !next.docs) {
			this.setState({ moreEvents: false });
			toastr.info('Info', 'There are no more events currently');
		}
	};

	render() {
		const { isLoading, activities } = this.props;
		const { moreEvents, loadedEvents } = this.state;

		if (this.state.isLoadingInit) return <LoadingComponent inverted={true} />;

		return (
			<Grid>
				<Grid.Column width={10}>
					<div ref={this.listCtxRef}>
						<EventList
							isLoading={isLoading}
							moreEvents={moreEvents}
							getMoreEvents={this.getNextEvents}
							events={loadedEvents}
						/>
					</div>
				</Grid.Column>
				<Grid.Column width={6}>
					<EventActivity activities={activities} ctxRef={this.listCtxRef.current} />
				</Grid.Column>
				<Grid.Column width={10} style={{ padding: '2rem' }}>
					<Loader active={isLoading} />
				</Grid.Column>
			</Grid>
		);
	}
}

const mapStateToProps = ({ events, async, firestore }) => ({
	events,
	isLoading: async.isLoading,
	activities: firestore.ordered.activity,
});

export default connect(
	mapStateToProps,
	{ getEventsForDashboard }
)(
	// Listen for 'events' collection
	firestoreConnect(query)(EventDashboard)
);
