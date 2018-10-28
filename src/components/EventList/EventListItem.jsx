import React from 'react';
import PropTypes from 'prop-types';
import { Segment, Item, Icon, List, Button, Label } from 'semantic-ui-react';
import format from 'date-fns/format';
import { Link } from 'react-router-dom';

import { objectToArray } from '../../helpers/eventHelpers';
import EventListAttendee from './EventListAttendee';

const EventListItem = ({ event }) => (
	<Segment.Group>
		<Segment>
			<Item.Group>
				<Item>
					<Item.Image size="tiny" circular src={event.hostPhotoURL} />
					<Item.Content>
						<Item.Header as={Link} to={`/event/${event.id}`}>
							{event.title}
						</Item.Header>
						<Item.Description>
							Hosted by <Link to={`/profile/${event.hostUID}`}>{event.hostedBy}</Link>
						</Item.Description>
						{event.cancelled && (
							<Label
								style={{ top: '-40px' }}
								ribbon="right"
								color="red"
								content="This event has been cancelled"
							/>
						)}
					</Item.Content>
				</Item>
			</Item.Group>
		</Segment>
		<Segment>
			<span>
				<Icon name="clock" /> {format(event.date.toDate(), 'dddd Do MMMM')} at{' '}
				{format(event.date.toDate(), 'HH:mm')} |<Icon name="marker" /> {event.venue}
			</span>
		</Segment>
		<Segment secondary>
			<List horizontal>
				{objectToArray(event.attendees).map(a => (
					<EventListAttendee key={a.id} attendee={a} />
				))}
			</List>
		</Segment>
		<Segment clearing>
			<p>{event.description}</p>
			<Button
				size="tiny"
				as={Link}
				to={`/event/${event.id}`}
				color="teal"
				floated="right"
				content="View"
			/>
		</Segment>
	</Segment.Group>
);

EventListItem.propTypes = {
	event: PropTypes.shape({}).isRequired,
};

export default EventListItem;
