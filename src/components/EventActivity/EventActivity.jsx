import React from 'react';
import PropTypes from 'prop-types';
import { Header, Segment } from 'semantic-ui-react';

const EventActivity = props => {
	return (
		<div>
			<Header attached="top" content="Recent activity" />
			<Segment attached>
				<p>Recent activity</p>
			</Segment>
		</div>
	);
};

EventActivity.propTypes = {};

export default EventActivity;
