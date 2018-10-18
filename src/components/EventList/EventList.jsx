import React from 'react';
import PropTypes from 'prop-types';

import EventListItem from './EventListItem';

const EventList = ({ events = [], deleteEvent }) => (
	<div>
		{events.map(e => (
			<EventListItem event={e} deleteEvent={deleteEvent} key={e.id} />
		))}
	</div>
);

EventList.propTypes = {
	events: PropTypes.arrayOf(PropTypes.shape({})),
};
EventList.defaultProps = {
	events: [],
};

export default EventList;
