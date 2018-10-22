import React from 'react';
import { Grid } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';

import UserDetailsHeader from './UserDetailsHeader';
import UserDetailsDescription from './UserDetailsDescription';
import UserDetailsPhotos from './UserDetailsPhotos';
import UserDetailsSidebar from './UserDetailsSidebar';
import UserDetailsEvents from './UserDetailsEvents';

const UserDetails = ({ profile, photos }) => (
	<Grid>
		<UserDetailsHeader profile={profile} />
		<UserDetailsDescription profile={profile} />
		<UserDetailsSidebar />
		{photos && photos.length > 0 && <UserDetailsPhotos photos={photos} />}
		<UserDetailsEvents />
	</Grid>
);

const query = ({ auth }) => [
	{
		collection: 'users',
		doc: auth.uid,
		subcollections: [{ collection: 'photos' }],
		storeAs: 'photos',
	},
];

const mapState = state => ({
	profile: state.firebase.profile,
	auth: state.firebase.auth,
	photos: state.firestore.ordered.photos,
});

export default compose(
	connect(mapState),
	firestoreConnect(auth => query(auth)) // Fetching user photos from firestore
)(UserDetails);
