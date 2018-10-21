import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Segment, Grid, Icon, Button } from 'semantic-ui-react';
import format from 'date-fns/format';

import EventMap from './EventMap';

class EventInfo extends Component {
	static propTypes = {
		event: PropTypes.shape({
			description: PropTypes.string,
			date: PropTypes.string,
			venue: PropTypes.string,
		}),
	};

	state = {
		mapVisible: false,
	};

	componentWillUnmount = () => {
		this.setState({ mapVisible: false });
	};

	toggleMap = () => this.setState(prevState => ({ mapVisible: !prevState.mapVisible }));

	render() {
		const { event } = this.props;

		return (
			<Segment.Group>
				<Segment attached="top">
					<Grid>
						<Grid.Column width={1}>
							<Icon size="large" color="teal" name="info" />
						</Grid.Column>
						<Grid.Column width={15}>
							<p>{event.description}</p>
						</Grid.Column>
					</Grid>
				</Segment>
				<Segment attached>
					<Grid verticalAlign="middle">
						<Grid.Column width={1}>
							<Icon name="calendar" size="large" color="teal" />
						</Grid.Column>
						<Grid.Column width={15}>
							<span>
								{format(event.date.toDate(), 'dddd Do MMMM')} at{' '}
								{format(event.date.toDate(), 'h:mm A')}
							</span>
						</Grid.Column>
					</Grid>
				</Segment>
				<Segment attached>
					<Grid verticalAlign="middle">
						<Grid.Column width={1}>
							<Icon name="marker" size="large" color="teal" />
						</Grid.Column>
						<Grid.Column width={11}>
							<span>{event.venue}</span>
						</Grid.Column>
						<Grid.Column width={4}>
							<Button
								onClick={this.toggleMap}
								color="teal"
								size="tiny"
								content={this.state.mapVisible ? 'Hide Map' : 'Show Map'}
							/>
						</Grid.Column>
					</Grid>
				</Segment>
				{this.state.mapVisible && (
					<EventMap lat={event.venueLatLng.lat} lng={event.venueLatLng.lng} />
				)}
			</Segment.Group>
		);
	}
}

export default EventInfo;
