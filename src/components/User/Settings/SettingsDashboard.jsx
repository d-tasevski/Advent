import React from 'react';
import PropTypes from 'prop-types';
import { Grid } from 'semantic-ui-react';
import { Switch, Route, Redirect } from 'react-router-dom';

import About from './About';
import Basic from './Basic';
import Photos from './Photos';
import Account from './Account';
import SettingsNav from './SettingsNav';

const SettingsDashboard = props => {
	return (
		<Grid>
			<Grid.Column width={12}>
				<Switch>
					<Redirect exact from="/settings" to="settings/basic" />
					<Route path="/settings/basic" component={Basic} />
					<Route path="/settings/about" component={About} />
					<Route path="/settings/photos" component={Photos} />
					<Route path="/settings/account" component={Account} />
				</Switch>
			</Grid.Column>
			<Grid.Column width={4}>
				<SettingsNav />
			</Grid.Column>
		</Grid>
	);
};

SettingsDashboard.propTypes = {};

export default SettingsDashboard;
