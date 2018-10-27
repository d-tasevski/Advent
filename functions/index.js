const functions = require('firebase-functions');
const admin = require('firebase-admin');
// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
// 	response.send('Hello from Firebase!');
// });

admin.initializeApp(functions.config().firebase);

const newActivity = (type, activity, eventID) => ({
	type,
	eventID,
	eventDate: activity.date,
	hostedBy: activity.hostedBy,
	title: activity.title,
	photoURL: activity.photoURL ? activity.photoURL : '/assets/user.png',
	timestamp: admin.firestore.FieldValue.serverTimestamp(),
	hostUID: activity.hostUID,
});

exports.createActivity = functions.firestore.document('events/{eventID}').onCreate(event => {
	const newEvent = event.data();
	const activity = newActivity('newEvent', newEvent, event.id);

	return admin
		.firestore()
		.collection('activity')
		.add(activity)
		.then(docRef => {
			return console.log('Activity created with ID', docRef.id, docRef);
		})
		.catch(err => console.error('Error happened: ', err));
});

exports.cancelActivity = functions.firestore.document('events/{eventID}').onUpdate((event, ctx) => {
	let updatedEvent = event.after.data();
	let prevEventData = event.before.data();

	console.log({
		event,
		ctx,
		updatedEvent,
		prevEventData,
	});

	if (!updatedEvent.cancelled || updatedEvent.cancelled === prevEventData.cancelled) return false;

	const activity = newActivity('cancelledEvent', updatedEvent, ctx.params.eventID);
	console.log({ activity });

	return admin
		.firestore()
		.collection('activity')
		.add(activity)
		.then(docRef => {
			return console.log('Cancelled activity with ID', docRef.id, docRef);
		})
		.catch(err => console.error('Error happened: ', err));
});
