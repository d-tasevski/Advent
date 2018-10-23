import moment from 'moment';

export const createNewEvent = (user, photoURL, event) => {
	event.date = moment(event.date).toDate();

	return {
		...event,
		hostUID: user.uid,
		hostedBy: user.displayName,
		hostPhotoURL: photoURL || '/assets/user.png',
		createdAt: Date.now(),
		attendees: {
			[user.uid]: {
				isGoing: true,
				isHost: true,
				joinDate: Date.now(),
				photoURL: photoURL || '/assets/user.png',
				displayName: user.displayName,
			},
		},
	};
};

export const objectToArray = obj => {
	if (obj) {
		return Object.entries(obj).map(e => Object.assign(e[1], { id: e[0] }));
	}
};
