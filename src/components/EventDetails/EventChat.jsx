import React from 'react';
import PropTypes from 'prop-types';
import { Segment, Header, Comment } from 'semantic-ui-react';
import distanceInWords from 'date-fns/distance_in_words';
import { Link } from 'react-router-dom';

import ChatForm from '../common/ChatForm';

const EventChat = ({ addEventComment, eventID, eventChat }) => {
	console.log(eventChat);
	return (
		<div>
			<Segment
				textAlign="center"
				attached="top"
				inverted
				color="teal"
				style={{ border: 'none' }}
			>
				<Header>Chat about this event</Header>
			</Segment>

			<Segment attached>
				<Comment.Group>
					{eventChat &&
						eventChat.map(comment => (
							<Comment key={comment.id}>
								<Comment.Avatar src={comment.photoURL} />
								<Comment.Content>
									<Comment.Author as={Link} to={`profile/${comment.uid}`}>
										{comment.displayName}
									</Comment.Author>
									<Comment.Metadata>
										<div>{distanceInWords(comment.date, Date.now())} ago</div>
									</Comment.Metadata>
									<Comment.Text>{comment.text}</Comment.Text>
									<Comment.Actions>
										<Comment.Action>Reply</Comment.Action>
									</Comment.Actions>
								</Comment.Content>
							</Comment>
						))}
				</Comment.Group>
				<ChatForm addEventComment={addEventComment} eventID={eventID} />
			</Segment>
		</div>
	);
};

EventChat.propTypes = {};

export default EventChat;
