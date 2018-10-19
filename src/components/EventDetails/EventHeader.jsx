import React from 'react';
import PropTypes from 'prop-types';
import { Segment, Image, Item, Header, Button } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import format from 'date-fns/format';

import styles from './EventHeader.module.css';

const EventHeader = ({ event }) => {
	return (
		<Segment.Group>
			<Segment basic attached="top" style={{ padding: '0' }}>
				<Image
					className={styles.EventImageStyle}
					src={`/assets/categoryImages/${event.category}.jpg`}
					fluid
				/>

				<Segment basic className={styles.EventImageTextStyle}>
					<Item.Group>
						<Item>
							<Item.Content>
								<Header
									size="huge"
									content={event.title}
									style={{ color: 'white' }}
								/>
								<p>{format(event.date, 'dddd Do MMMM')}</p>
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

				<Button as={Link} to={`/manage/${event.id}`} color="orange" floated="right">
					Manage Event
				</Button>
			</Segment>
		</Segment.Group>
	);
};

EventHeader.propTypes = {
	event: PropTypes.shape({
		title: PropTypes.string,
		hostedBy: PropTypes.string,
		venue: PropTypes.string,
	}),
};

export default EventHeader;
