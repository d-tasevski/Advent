import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { List, Image } from 'semantic-ui-react';

export class EventListAttendee extends Component {
	static propTypes = {
		attendee: PropTypes.shape({}).isRequired,
	};

	render() {
		const { attendee } = this.props;
		return (
			<List.Item>
				<Image as="a" size="mini" circular src={attendee.photoURL} title={attendee.name} />
			</List.Item>
		);
	}
}

export default EventListAttendee;
