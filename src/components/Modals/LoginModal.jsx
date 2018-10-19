import React, { Component } from 'react';
import { Modal } from 'semantic-ui-react';
import { connect } from 'react-redux';

import { closeModal } from '../../actions/modals';
import LoginForm from '../Auth/Login/LoginForm';

class LoginModal extends Component {
	render() {
		return (
			<Modal size="mini" open={true} onClose={this.props.closeModal}>
				<Modal.Header>Login to Advent</Modal.Header>
				<Modal.Content>
					<Modal.Description>
						<LoginForm />
					</Modal.Description>
				</Modal.Content>
			</Modal>
		);
	}
}

export default connect(
	null,
	{ closeModal }
)(LoginModal);
