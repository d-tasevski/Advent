import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Grid } from 'semantic-ui-react';
import { Switch, Route, Redirect } from 'react-router-dom';

import { updatePassword } from '../../../actions/auth';
import { updateProfile } from '../../../actions/user';
import About from './About';
import Basic from './Basic';
import Photos from './Photos';
import Account from './Account';
import SettingsNav from './SettingsNav';

const SettingsDashboard = ({ updatePassword, providerId, user, updateProfile }) => {
	return (
		<Grid>
			<Grid.Column width={12}>
				<Switch>
					<Redirect exact from="/settings" to="settings/basic" />
					<Route
						path="/settings/basic"
						render={() => <Basic initialValues={user} updateProfile={updateProfile} />}
					/>
					<Route
						path="/settings/about"
						render={() => <About initialValues={user} updateProfile={updateProfile} />}
					/>
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
	user: state.firebase.profile,
});

export default connect(
	mapStateToProps,
	{ updatePassword, updateProfile }
)(SettingsDashboard);
