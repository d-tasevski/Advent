import React, { Component } from 'react';
import { Modal } from 'semantic-ui-react';
import { connect } from 'react-redux';

import { closeModal } from '../../actions/modals';
import RegisterForm from '../Auth/Register/RegisterForm';

class RegisterModal extends Component {
	render() {
		return (
			<Modal size="mini" open={true} onClose={this.props.closeModal}>
				<Modal.Header>Sign Up to Advent!</Modal.Header>
				<Modal.Content>
					<Modal.Description>
						<RegisterForm />
					</Modal.Description>
				</Modal.Content>
			</Modal>
		);
	}
}

export default connect(
	null,
	{ closeModal }
)(RegisterModal);
