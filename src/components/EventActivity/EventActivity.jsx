import React from 'react';
import PropTypes from 'prop-types';
import { Header, Segment, Feed, Sticky } from 'semantic-ui-react';

import EventActivityItem from './EventActivityItem';

const EventActivity = ({ activities, ctxRef }) => {
	return (
		<Sticky context={ctxRef} offset={100}>
			<Header attached="top" content="Recent activity" />
			<Segment attached>
				<Feed>
					{activities &&
						activities.map(a => <EventActivityItem key={a.id} activity={a} />)}
				</Feed>
			</Segment>
		</Sticky>
	);
};

EventActivity.propTypes = {};

export default EventActivity;
