import React from 'react';
import PropTypes from 'prop-types';
import { Segment, Grid, Icon, Button } from 'semantic-ui-react';
import moment from 'moment';

const EventInfo = ({ event }) => {
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
						<span>{moment(event.date).format('DD MMMM H:mm')}</span>
					</Grid.Column>
				</Grid>
			</Segment>
			<Segment attached>
				<Grid verticalAlign="middle">
					<Grid.Column width={1}>
						<Icon name="marker" size="large" color="teal" />
					</Grid.Column>
					<Grid.Column width={11}>
						<span>{event.venue}e</span>
					</Grid.Column>
					<Grid.Column width={4}>
						<Button color="teal" size="tiny" content="Show Map" />
					</Grid.Column>
				</Grid>
			</Segment>
		</Segment.Group>
	);
};

EventInfo.propTypes = {
	event: PropTypes.shape({
		description: PropTypes.string,
		date: PropTypes.string,
		venue: PropTypes.string,
	}),
};

export default EventInfo;
