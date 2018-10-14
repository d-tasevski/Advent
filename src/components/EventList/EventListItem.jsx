import React from 'react';
import PropTypes from 'prop-types';
import { Segment, Item, Icon, List, Button } from 'semantic-ui-react';
import moment from 'moment';

import EventListAttendee from './EventListAttendee';

const EventListItem = ({ event }) => (
	<Segment.Group>
		<Segment>
			<Item.Group>
				<Item>
					<Item.Image size="tiny" circular src={event.hostPhotoURL} />
					<Item.Content>
						<Item.Header as="a">{event.title}</Item.Header>
						<Item.Description>
							Hosted by <a>{event.hostedBy}</a>
						</Item.Description>
					</Item.Content>
				</Item>
			</Item.Group>
		</Segment>
		<Segment>
			<span>
				<Icon name="clock" /> {moment(event.date).format('DD MMMM H:mm')} |
				<Icon name="marker" /> {event.venue}
			</span>
		</Segment>
		<Segment secondary>
			<List horizontal>
				{event.attendees.map(a => (
					<EventListAttendee key={a.id} attendee={a} />
				))}
			</List>
		</Segment>
		<Segment clearing>
			<span>{event.description}</span>
			<Button as="a" color="teal" floated="right" content="View" />
		</Segment>
	</Segment.Group>
);

EventListItem.propTypes = {
	event: PropTypes.shape({}).isRequired,
};

export default EventListItem;
