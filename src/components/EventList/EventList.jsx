import React, { Component } from 'react';
import PropTypes from 'prop-types';

import EventListItem from './EventListItem';

const EventList = ({ events }) => (
	<div>
		{events.map(e => (
			<EventListItem event={e} key={e.id} />
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
