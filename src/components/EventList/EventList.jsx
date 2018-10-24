import React from 'react';
import PropTypes from 'prop-types';
// Be careful when working with this lib, improper use can cause really nasty CPU spikes
import InfiniteScroll from 'react-infinite-scroller';

import EventListItem from './EventListItem';

const EventList = ({ events = [], deleteEvent, getMoreEvents, isLoading, moreEvents }) => (
	<div>
		{events.length && (
			<InfiniteScroll
				pageStart={0}
				loadMore={getMoreEvents}
				hasMore={!isLoading && moreEvents}
				initialLoad={false}
			>
				{events.map(e => (
					<EventListItem event={e} deleteEvent={deleteEvent} key={e.id} />
				))}
			</InfiniteScroll>
		)}
	</div>
);

EventList.propTypes = {
	events: PropTypes.arrayOf(PropTypes.shape({})),
};
EventList.defaultProps = {
	events: [],
};

export default EventList;
