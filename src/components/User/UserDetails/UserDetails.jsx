import React from 'react';
import { Grid } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { firestoreConnect, isEmpty } from 'react-redux-firebase';
import { compose } from 'redux';

import { userDetailQuery as query } from '../../../queries/userQueries';
import UserDetailsHeader from './UserDetailsHeader';
import UserDetailsDescription from './UserDetailsDescription';
import UserDetailsPhotos from './UserDetailsPhotos';
import UserDetailsSidebar from './UserDetailsSidebar';
import UserDetailsEvents from './UserDetailsEvents';
import LoadingComponent from '../../common/LoadingComponent';

const UserDetails = ({ profile, photos, auth, match, requesting }) => {
	const isCurrentUser = auth.uid === match.params.id;
	const isLoading = Object.values(requesting).some(o => o === true);

	if (isLoading) return <LoadingComponent inverted={true} />;

	return (
		<Grid>
			<UserDetailsHeader profile={profile} />
			<UserDetailsDescription profile={profile} />
			<UserDetailsSidebar isCurrentUser={isCurrentUser} />
			{photos && photos.length > 0 && <UserDetailsPhotos photos={photos} />}
			<UserDetailsEvents />
		</Grid>
	);
};

const mapState = (state, ownProps) => {
	const { match } = ownProps;
	let userUID = null;
	let profile = {};

	if (match.params.id === state.auth.uid) {
		profile = state.firebase.profile;
	} else {
		profile = !isEmpty(state.firestore.ordered.profile) && state.firestore.ordered.profile[0];
		userUID = match.params.id;
	}

	return {
		profile,
		userUID,
		auth: state.firebase.auth,
		photos: state.firestore.ordered.photos,
		requesting: state.firestore.status.requesting,
	};
};

export default compose(
	connect(mapState),
	firestoreConnect((auth, userUID) => query(auth, userUID)) // Fetching user photos from firestore
)(UserDetails);
