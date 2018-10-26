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

export const createDataTree = dataset => {
	let hashTable = Object.create(null);
	dataset.forEach(a => (hashTable[a.id] = { ...a, childNodes: [] }));
	let dataTree = [];
	dataset.forEach(a => {
		if (a.parentID) hashTable[a.parentID].childNodes.push(hashTable[a.id]);
		else dataTree.push(hashTable[a.id]);
	});
	return dataTree;
};
