import React, { Component } from 'react';
import { Grid } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { firestoreConnect, isEmpty } from 'react-redux-firebase';
import { compose } from 'redux';

import { userDetailQuery as query } from '../../../queries/userQueries';
import { getUserEvents, followUser, unfollowUser } from '../../../actions/user';
import UserDetailsHeader from './UserDetailsHeader';
import UserDetailsDescription from './UserDetailsDescription';
import UserDetailsPhotos from './UserDetailsPhotos';
import UserDetailsSidebar from './UserDetailsSidebar';
import UserDetailsEvents from './UserDetailsEvents';
import LoadingComponent from '../../common/LoadingComponent';

class UserDetails extends Component {
	async componentDidMount() {
		const events = await this.props.getUserEvents(this.props.userUID);
	}

	changeTab = (e, data) => this.props.getUserEvents(this.props.userUID, data.activeIndex);

	render() {
		const {
			profile,
			photos,
			auth,
			match,
			requesting,
			events,
			eventsLoading,
			followUser,
			following,
			unfollowUser,
		} = this.props;
		const isCurrentUser = auth.uid === match.params.id;
		const isLoading = Object.values(requesting).some(o => o === true);
		const isFollowing = !isEmpty(following);

		if (isLoading) return <LoadingComponent inverted={true} />;
		return (
			<Grid>
				<UserDetailsHeader profile={profile} />
				<UserDetailsDescription profile={profile} />
				<UserDetailsSidebar
					profile={profile}
					followUser={followUser}
					isCurrentUser={isCurrentUser}
					isFollowing={isFollowing}
					unfollowUser={unfollowUser}
				/>
				{photos && photos.length > 0 && <UserDetailsPhotos photos={photos} />}
				<UserDetailsEvents
					changeTab={this.changeTab}
					events={events}
					eventsLoading={eventsLoading}
				/>
			</Grid>
		);
	}
}

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
		events: state.events,
		eventsLoading: state.async.isLoading,
		auth: state.firebase.auth,
		photos: state.firestore.ordered.photos,
		requesting: state.firestore.status.requesting,
		following: state.firestore.ordered.following,
	};
};

export default compose(
	connect(
		mapState,
		{ getUserEvents, followUser, unfollowUser }
	),
	firestoreConnect((auth, userUID, match) => query(auth, userUID, match)) // Fetching user photos from firestore
)(UserDetails);
