export const userDetailQuery = ({ auth, userUID, match }) => {
	if (userUID !== null) {
		return [
			{
				collection: 'users',
				doc: userUID,
				storeAs: 'profile',
			},
			{
				collection: 'users',
				doc: userUID,
				subcollections: [{ collection: 'photos' }],
				storeAs: 'photos',
			},
			{
				collection: 'users',
				doc: auth.uid,
				subcollections: [{ collection: 'following', doc: match.params.id }],
				storeAs: 'following',
			},
		];
	} else {
		return [
			{
				collection: 'users',
				doc: auth.uid,
				subcollections: [{ collection: 'photos' }],
				storeAs: 'photos',
			},
		];
	}
};

export const peopleQuery = ({ auth }) => {
	return [
		{
			collection: 'users',
			doc: auth.uid,
			subcollections: [{ collection: 'following' }],
			storeAs: 'following',
		},
		{
			collection: 'users',
			doc: auth.uid,
			subcollections: [{ collection: 'followers' }],
			storeAs: 'followers',
		},
	];
};
