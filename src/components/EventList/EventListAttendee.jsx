import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { List, Image } from 'semantic-ui-react';

const EventListAttendee = ({ attendee }) => (
	<List.Item>
		<Image
			as={Link}
			to={`/profile/${attendee.id}`}
			size="mini"
			circular
			src={attendee.photoURL}
			title={attendee.name}
		/>
	</List.Item>
);

EventListAttendee.propTypes = {
	attendee: PropTypes.shape({}).isRequired,
};

export default EventListAttendee;
