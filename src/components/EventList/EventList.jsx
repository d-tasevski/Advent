import React, { Component } from 'react';
import PropTypes from 'prop-types';

import EventListItem from './EventListItem';

export class EventList extends Component {
	static propTypes = {
		events: PropTypes.arrayOf(PropTypes.shape({})),
	};
	static defaultProps = {
		events: [],
	};

	render() {
		const { events } = this.props;
		return (
			<div>
				{events.map(e => (
					<EventListItem event={e} key={e.id} />
				))}
			</div>
		);
	}
}

export default EventList;
