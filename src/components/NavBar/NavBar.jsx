import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Menu, Container, Button } from 'semantic-ui-react';

export class NavBar extends Component {
	static propTypes = {};

	render() {
		return (
			<Menu inverted>
				<Container>
					<Menu.Item header>
						<img src="assets/logo.png" alt="logo" className="h-mr-sm" />
						<h1>Advent</h1>
					</Menu.Item>
					<Menu.Item name="Events" />
					<Menu.Item>
						<Button floated="right" positive inverted content="Create Event" />
					</Menu.Item>
					<Menu.Item position="right">
						<Button basic inverted content="Login" />
						<Button basic inverted content="Sign Out" style={{ marginLeft: '0.5em' }} />
					</Menu.Item>
				</Container>
			</Menu>
		);
	}
}

export default NavBar;
