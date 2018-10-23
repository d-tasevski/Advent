export const userDetailQuery = ({ auth, userUID }) => {
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
