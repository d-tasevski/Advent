import React from 'react';
import PropTypes from 'prop-types';
import { Segment, Image, Item, Header, Button } from 'semantic-ui-react';
import moment from 'moment';

const EventHeader = ({ event }) => {
	return (
		<Segment.Group>
			<Segment basic attached="top" style={{ padding: '0' }}>
				<Image
					style={eventImageStyle}
					src={`/assets/categoryImages/${event.category}.jpg`}
					fluid
				/>

				<Segment basic style={eventImageTextStyle}>
					<Item.Group>
						<Item>
							<Item.Content>
								<Header
									size="huge"
									content={event.title}
									style={{ color: 'white' }}
								/>
								<p>{moment(event.date).format('DD MMMM H:mm')}</p>
								<p>
									Hosted by <strong>{event.hostedBy}</strong>
								</p>
							</Item.Content>
						</Item>
					</Item.Group>
				</Segment>
			</Segment>

			<Segment attached="bottom">
				<Button>Cancel My Place</Button>
				<Button color="teal">JOIN THIS EVENT</Button>

				<Button color="orange" floated="right">
					Manage Event
				</Button>
			</Segment>
		</Segment.Group>
	);
};

const eventImageStyle = {
	filter: 'brightness(30%)',
};

const eventImageTextStyle = {
	position: 'absolute',
	bottom: '5%',
	left: '5%',
	width: '100%',
	height: 'auto',
	color: 'white',
};

EventHeader.propTypes = {
	event: PropTypes.shape({
		title: PropTypes.string,
		hostedBy: PropTypes.string,
		venue: PropTypes.string,
	}),
};

export default EventHeader;
