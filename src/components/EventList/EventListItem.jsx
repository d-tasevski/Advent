import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Segment, Item, Icon, List, Button } from 'semantic-ui-react';
import format from 'date-fns/format';
import { Link } from 'react-router-dom';

import { deleteEvent } from '../../actions/events';
import EventListAttendee from './EventListAttendee';

const EventListItem = ({ event, deleteEvent }) => {
	const onDelete = () => deleteEvent(event.id);

	return (
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
					<Icon name="clock" /> {format(event.date.toDate(), 'dddd Do MMMM')} at{' '}
					{format(event.date.toDate(), 'HH:mm')} |<Icon name="marker" /> {event.venue}
				</span>
			</Segment>
			<Segment secondary>
				<List horizontal>
					{Object.values(event.attendees).map((a, i) => (
						<EventListAttendee key={i} attendee={a} />
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
				<Button
					onClick={onDelete}
					size="tiny"
					as="a"
					color="red"
					floated="right"
					content="Delete"
				/>
			</Segment>
		</Segment.Group>
	);
};

EventListItem.propTypes = {
	event: PropTypes.shape({}).isRequired,
	deleteEvent: PropTypes.func.isRequired,
};

export default connect(
	null,
	{ deleteEvent }
)(EventListItem);
