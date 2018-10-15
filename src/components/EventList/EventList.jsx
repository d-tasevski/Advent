import React, { Component } from 'react';
import PropTypes from 'prop-types';

import EventListItem from './EventListItem';

const EventList = ({ events, selectEvent, deleteEvent }) => (
	<div>
		{events.map(e => (
			<EventListItem
				event={e}
				deleteEvent={deleteEvent}
				selectEvent={selectEvent}
				key={e.id}
			/>
		))}
	</div>
);

EventList.propTypes = {
	events: PropTypes.arrayOf(PropTypes.shape({})),
	selectEvent: PropTypes.func.isRequired,
	deleteEvent: PropTypes.func.isRequired,
};
EventList.defaultProps = {
	events: [],
};

export default EventList;
