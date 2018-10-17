import React from 'react';
import PropTypes from 'prop-types';
import { Grid } from 'semantic-ui-react';

import EventHeader from './EventHeader';
import EventChat from './EventChat';
import EventSidebar from './EventSidebar';
import EventInfo from './EventInfo';

const EventDetails = props => {
	return (
		<Grid>
			<Grid.Column width={10}>
				<EventHeader />
				<EventInfo />
				<EventChat />
			</Grid.Column>
			<Grid.Column width={6}>
				<EventSidebar />
			</Grid.Column>
		</Grid>
	);
};

EventDetails.propTypes = {};

export default EventDetails;
