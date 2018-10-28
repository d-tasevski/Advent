import React from 'react';
import PropTypes from 'prop-types';
import { Segment, Image, Item, Header, Button, Label } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import format from 'date-fns/format';

import styles from './EventHeader.module.css';

const EventHeader = ({
	event,
	isLoading,
	isGoing,
	isHost,
	goingToEvent,
	cancelGoingToEvent,
	openModal,
	isAuthenticated,
}) => (
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
							<Header size="huge" content={event.title} style={{ color: 'white' }} />
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
			{!isHost && (
				<div>
					{isGoing &&
						!event.cancelled && (
							<Button onClick={() => cancelGoingToEvent(event)}>
								Cancel My Place
							</Button>
						)}

					{!isGoing &&
						isAuthenticated &&
						!event.cancelled && (
							<Button
								loading={isLoading}
								onClick={() => goingToEvent(event)}
								color="teal"
							>
								JOIN THIS EVENT
							</Button>
						)}

					{!isAuthenticated &&
						!event.cancelled && (
							<Button
								loading={isLoading}
								onClick={() => openModal('GuestModal')}
								color="teal"
							>
								JOIN THIS EVENT
							</Button>
						)}
					{event.cancelled &&
						!isHost && (
							<Label
								size="large"
								color="red"
								content="This event has been cancelled"
							/>
						)}
				</div>
			)}

			{isHost && (
				<Button as={Link} to={`/manage/${event.id}`} color="orange">
					Manage Event
				</Button>
			)}
		</Segment>
	</Segment.Group>
);

EventHeader.propTypes = {
	event: PropTypes.shape({
		title: PropTypes.string,
		hostedBy: PropTypes.string,
		venue: PropTypes.string,
	}),
};

export default EventHeader;
