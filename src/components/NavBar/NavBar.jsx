import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { NavLink, Link, withRouter } from 'react-router-dom';
import { Menu, Container, Button } from 'semantic-ui-react';

import SignedOutMenu from './SignedOutMenu';
import SignedInMenu from './SignedInMenu';

export class NavBar extends Component {
	static propTypes = {};

	state = {
		authenticated: false,
	};

	handleSignIn = () => this.setState({ authenticated: true });
	handleSignOut = () => {
		this.setState({ authenticated: false }, () => this.props.history.push('/'));
	};

	render() {
		const { authenticated } = this.state;
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
						<SignedInMenu signOut={this.handleSignOut} />
					) : (
						<SignedOutMenu signIn={this.handleSignIn} />
					)}
				</Container>
			</Menu>
		);
	}
}

export default withRouter(NavBar);
