import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withFirebase } from 'react-redux-firebase';
import { NavLink, Link, withRouter } from 'react-router-dom';
import { Menu, Container, Button } from 'semantic-ui-react';

import { openModal } from '../../actions/modals';
import { registerUser } from '../../actions/auth';
import SignedOutMenu from './SignedOutMenu';
import SignedInMenu from './SignedInMenu';

export class NavBar extends Component {
	static propTypes = {
		openModal: PropTypes.func.isRequired,
		history: PropTypes.object,
	};

	handleSignIn = () => this.props.openModal('LoginModal');
	handleSignUp = () => this.props.openModal('RegisterModal');
	handleSignOut = () => {
		this.props.firebase.logout();
		return this.props.history.push('/');
	};

	render() {
		const { auth, profile } = this.props;
		const authenticated = auth.isLoaded && !auth.isEmpty;

		return (
			<Menu inverted>
				<Container>
					<Menu.Item as={Link} to="/" header>
						<img src="/assets/logo.png" alt="logo" className="h-mr-sm" />
						<h1>Advent</h1>
					</Menu.Item>
					<Menu.Item as={NavLink} to="/events" name="Events" />
					{authenticated && (
						<Fragment>
							<Menu.Item as={NavLink} to="/people" name="People" />
							<Menu.Item>
								<Button
									as={Link}
									to="/create-event"
									floated="right"
									positive
									inverted
									content="Create Event"
								/>
							</Menu.Item>
						</Fragment>
					)}
					{authenticated ? (
						<SignedInMenu profile={profile} signOut={this.handleSignOut} />
					) : (
						<SignedOutMenu signIn={this.handleSignIn} register={this.handleSignUp} />
					)}
				</Container>
			</Menu>
		);
	}
}

const mapStateToProps = (state, ownProps) => ({
	auth: state.firebase.auth,
	profile: state.firebase.profile,
});

export default withRouter(
	withFirebase(
		connect(
			mapStateToProps,
			{ openModal, registerUser }
		)(NavBar)
	)
);
