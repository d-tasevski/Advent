import React, { Component } from 'react';
import { Form, Button } from 'semantic-ui-react';
import { Field, reduxForm } from 'redux-form';

import TextArea from './TextArea';

class ChatForm extends Component {
	handleCommentSubmit = values => {
		this.props.addEventComment(this.props.eventID, values);
		this.props.reset();
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

export default reduxForm({ form: 'eventChat' })(ChatForm);
