import React, { Component } from 'react';
import { Form, Button } from 'semantic-ui-react';
import { Field, reduxForm } from 'redux-form';

import TextArea from './TextArea';

class ChatForm extends Component {
	handleCommentSubmit = values => {
		this.props.addEventComment(this.props.eventID, values, this.props.parentID);
		this.props.reset();
		if (this.props.parentID !== 0) {
			this.props.closeForm();
		}
	};
	render() {
		return (
			<Form reply onSubmit={this.props.handleSubmit(this.handleCommentSubmit)}>
				<Field name="comment" component={TextArea} rows={2} />
				<Button content="Add Reply" labelPosition="left" icon="edit" primary />
			</Form>
		);
	}
}

export default reduxForm({ Fields: 'comment' })(ChatForm);
