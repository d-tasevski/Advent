import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Grid } from 'semantic-ui-react';
import { Switch, Route, Redirect } from 'react-router-dom';

import { updatePassword } from '../../../actions/auth';
import About from './About';
import Basic from './Basic';
import Photos from './Photos';
import Account from './Account';
import SettingsNav from './SettingsNav';

const SettingsDashboard = ({ updatePassword, providerId }) => {
	return (
		<Grid>
			<Grid.Column width={12}>
				<Switch>
					<Redirect exact from="/settings" to="settings/basic" />
					<Route path="/settings/basic" component={Basic} />
					<Route path="/settings/about" component={About} />
					<Route path="/settings/photos" component={Photos} />
					<Route
						path="/settings/account"
						render={() => (
							<Account providerId={providerId} updatePassword={updatePassword} />
						)}
					/>
				</Switch>
			</Grid.Column>
			<Grid.Column width={4}>
				<SettingsNav />
			</Grid.Column>
		</Grid>
	);
};

SettingsDashboard.propTypes = {};

const mapStateToProps = state => ({
	providerId: state.firebase.auth.providerData[0].providerId,
});

export default connect(
	mapStateToProps,
	{ updatePassword }
)(SettingsDashboard);
