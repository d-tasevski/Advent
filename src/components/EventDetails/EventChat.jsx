import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Segment, Header, Comment } from 'semantic-ui-react';
import distanceInWords from 'date-fns/distance_in_words';
import { Link } from 'react-router-dom';

import ChatForm from '../common/ChatForm';

class EventChat extends Component {
	state = {
		showReplyForm: false,
		selectedCommentID: null,
	};

	openReplyForm = id => () => {
		this.setState({ showReplyForm: true, selectedCommentID: id });
	};

	closeReplyForm = () => this.setState({ showReplyForm: false, selectedCommentID: null });

	render() {
		const { addEventComment, eventID, eventChat } = this.props;
		const { showReplyForm, selectedCommentID } = this.state;

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
											<div>
												{distanceInWords(comment.date, Date.now())} ago
											</div>
										</Comment.Metadata>
										<Comment.Text>{comment.text}</Comment.Text>
										<Comment.Actions>
											<Comment.Action
												onClick={this.openReplyForm(comment.id)}
											>
												Reply
											</Comment.Action>
											{showReplyForm && selectedCommentID === comment.id ? (
												<ChatForm
													addEventComment={addEventComment}
													eventID={eventID}
													form={`reply_${comment.id}`}
													closeForm={this.closeReplyForm}
													parentID={comment.id}
												/>
											) : null}
										</Comment.Actions>
									</Comment.Content>
									<Comment.Group>
										{comment.childNodes &&
											comment.childNodes.map(child => (
												<Comment key={child.id}>
													<Comment.Avatar src={child.photoURL} />
													<Comment.Content>
														<Comment.Author
															as={Link}
															to={`profile/${child.uid}`}
														>
															{child.displayName}
														</Comment.Author>
														<Comment.Metadata>
															<div>
																{distanceInWords(
																	child.date,
																	Date.now()
																)}{' '}
																ago
															</div>
														</Comment.Metadata>
														<Comment.Text>{child.text}</Comment.Text>
														<Comment.Actions>
															<Comment.Action
																onClick={this.openReplyForm(
																	child.id
																)}
															>
																Reply
															</Comment.Action>
															{showReplyForm &&
															selectedCommentID === child.id ? (
																<ChatForm
																	addEventComment={
																		addEventComment
																	}
																	eventID={eventID}
																	form={`reply_${child.id}`}
																	closeForm={this.closeReplyForm}
																	parentID={child.parentID}
																/>
															) : null}
														</Comment.Actions>
													</Comment.Content>
												</Comment>
											))}
									</Comment.Group>
								</Comment>
							))}
					</Comment.Group>
					<ChatForm
						addEventComment={addEventComment}
						eventID={eventID}
						form="newComment"
						parentID={0}
					/>
				</Segment>
			</div>
		);
	}
}

EventChat.propTypes = {};

export default EventChat;
