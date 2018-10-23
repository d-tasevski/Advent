import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Segment, Image, Item, Header, Button } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import format from 'date-fns/format';

import styles from './EventHeader.module.css';

const EventHeader = ({ event, isGoing, isHost, goingToEvent, cancelGoingToEvent }) => {
	const handleEventAttendance = () => {
		if (!isGoing) return goingToEvent(event);

		return cancelGoingToEvent(event);
	};

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
								<p>{event.date && format(event.date.toDate(), 'dddd Do MMMM')}</p>
								<p>
									Hosted by <strong>{event.hostedBy}</strong>
								</p>
							</Item.Content>
						</Item>
					</Item.Group>
				</Segment>
			</Segment>

			<Segment attached="bottom">
				{!isHost ? (
					<Fragment>
						<Button onClick={handleEventAttendance} color={isGoing ? 'orange' : 'teal'}>
							{isGoing ? 'Cancel My Place' : 'JOIN THIS EVENT'}
						</Button>
					</Fragment>
				) : (
					<Button as={Link} to={`/manage/${event.id}`} color="orange">
						Manage Event
					</Button>
				)}
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
