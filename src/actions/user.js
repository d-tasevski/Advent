import moment from 'moment';
import { toastr } from 'react-redux-toastr';
import cuid from 'cuid';
import firebase from '../config/firebase';

import { asyncActionStart, asyncActionEnd, asyncActionError } from './async';
import { types } from '../constants';

export const updateProfile = user => async (dispatch, getState, { getFirebase }) => {
	const firebase = getFirebase();

	const { isLoaded, isEmpty, ...updatedProfile } = user;
	if (updatedProfile.dateOfBirth !== getState().firebase.profile.dateOfBirth) {
		updatedProfile.dateOfBirth = moment(updatedProfile.dateOfBirth).toDate();
	}
	try {
		await firebase.updateProfile(updatedProfile);
		toastr.success('Success', 'Profile updated');
	} catch (err) {
		console.error(err);
		toastr.error('Oops', 'Something went wrong');
	}
};

export const uploadProfileImg = (file, fileName) => async (
	dispatch,
	getState,
	{ getFirebase, getFirestore }
) => {
	const imageName = cuid();
	const firebase = getFirebase();
	const firestore = getFirestore();
	const user = firebase.auth().currentUser;
	const path = `${user.uid}/user_images`;
	const options = {
		name: imageName,
	};

	try {
		dispatch(asyncActionStart());
		// Upload the file to firebase storage
		const uploadedFile = await firebase.uploadFile(path, file, null, options); // third argument here asks if we want to upload image to realtime db at firebase, but we are using firestore for that
		// get the url of the image
		const { downloadURL } = await uploadedFile.uploadTaskSnapshot;
		// get userDoc from firestore
		const userDoc = await firestore.get(`users/${user.uid}`);
		// check if user already have some photos inside
		if (!userDoc.data().photoURL) {
			// If no, update their profile pic to be uploaded pic
			// This will update firestore documents
			await firebase.updateProfile({
				photoURL: downloadURL,
			});
			// this will update the profile inside firebase auth. (Not confusing at all, wp google)
			await user.updateProfile({
				photoURL: downloadURL,
			});
		}
		// Add uploaded image to the user image collection
		await firestore.add(
			// find collection
			{
				collection: 'users',
				doc: user.uid,
				subcollections: [{ collection: 'photos' }],
			},
			// save this to found collection
			{
				name: imageName,
				url: downloadURL,
			}
		);
		dispatch(asyncActionEnd());
	} catch (err) {
		console.error(err);
		dispatch(asyncActionError());
		throw new Error('Problem with photo upload');
	}
};

export const deleteImage = img => async (dispatch, getState, { getFirestore, getFirebase }) => {
	const firebase = getFirebase();
	const firestore = getFirestore();
	const user = firebase.auth().currentUser;

	try {
		dispatch(asyncActionStart());
		await firebase.deleteFile(`${user.uid}/user_images/${img.name}`);
		await firestore.delete({
			collection: 'users',
			doc: user.uid,
			subcollections: [{ collection: 'photos', doc: img.id }],
		});
		dispatch(asyncActionEnd());
	} catch (err) {
		console.error(err);
		dispatch(asyncActionError());
		throw new Error('Problem deleting the photo');
	}
};

export const setMainPhoto = photo => async (dispatch, getState) => {
	dispatch(asyncActionStart());
	const firestore = firebase.firestore();
	const { currentUser } = firebase.auth();
	const today = new Date(Date.now());
	const userDocRef = firestore.collection('users').doc(currentUser.uid);
	const eventAttendeeRef = firestore.collection('event_attendee');

	try {
		let batch = firestore.batch();
		await batch.update(userDocRef, {
			photoURL: photo.url,
		});
		const eventQuery = await eventAttendeeRef
			.where('userUID', '==', currentUser.uid)
			.where('eventDate', '>', today);
		const eventQuerySnap = await eventQuery.get();
		for (let i = 0, len = eventQuerySnap.docs.length; i < len; i++) {
			const eventDocRef = await firestore
				.collection('events')
				.doc(eventQuerySnap.docs[i].data().eventID);
			const event = await eventDocRef.get();

			if (event.data().hostUID === currentUser.uid) {
				await batch.update(eventDocRef, {
					hostPhotoURL: photo.url,
					[`attendees.${currentUser.uid}.photoURL`]: photo.url,
				});
			} else {
				await batch.update(eventDocRef, {
					[`attendees.${currentUser.uid}.photoURL`]: photo.url,
				});
			}
		}
		await batch.commit();
		dispatch(asyncActionEnd());
	} catch (err) {
		console.log(err);
		dispatch(asyncActionError());
		throw new Error('Problem setting main photo');
	}
};

export const getUserEvents = (userUID, activeTab) => async (dispatch, getState) => {
	dispatch(asyncActionStart());
	const firestore = firebase.firestore();
	const today = new Date(Date.now());
	const eventsRef = firestore.collection('event_attendee');
	let query;

	switch (activeTab) {
		case 1: // past events
			query = eventsRef
				.where('userUID', '==', userUID)
				.where('eventDate', '<=', today)
				.orderBy('eventDate', 'desc');
			break;
		case 2: // future events
			query = eventsRef
				.where('userUID', '==', userUID)
				.where('eventDate', '>=', today)
				.orderBy('eventDate');
			break;
		case 3: // hosted events
			query = eventsRef
				.where('userUID', '==', userUID)
				.where('isHost', '==', true)
				.orderBy('eventDate', 'desc');
			break;
		default:
			query = eventsRef.where('userUID', '==', userUID).orderBy('eventDate', 'desc');
	}

	try {
		const querySnapshot = await query.get();
		let events = [];

		for (let i = 0; i < querySnapshot.docs.length; i++) {
			let evt = await firestore
				.collection('events')
				.doc(querySnapshot.docs[i].data().eventID)
				.get();
			events.push({ ...evt.data(), id: evt.id });
		}

		dispatch({ type: types.FETCH_EVENTS, payload: { events } });
		dispatch(asyncActionEnd());
		return events;
	} catch (err) {
		console.error(err);
		dispatch(asyncActionError());
	}
};

export const followUser = userToFollow => async (dispatch, getState, { getFirestore }) => {
	const firestore = getFirestore();
	const user = firestore.auth().currentUser;
	const following = {
		photoURL: userToFollow.photoURL || '/assets/user.png',
		city: userToFollow.city || 'unknown city',
		displayName: userToFollow.displayName,
	};

	try {
		await firestore.set(
			{
				collection: 'users',
				doc: user.uid,
				subcollections: [{ collection: 'following', doc: userToFollow.id }],
			},
			following
		);
	} catch (error) {
		console.log(error);
	}
};

export const unfollowUser = userToUnfollow => async (dispatch, getState, { getFirestore }) => {
	const firestore = getFirestore();
	const user = firestore.auth().currentUser;

	try {
		await firestore.delete({
			collection: 'users',
			doc: user.uid,
			subcollections: [{ collection: 'following', doc: userToUnfollow.id }],
		});
	} catch (error) {
		console.log(error);
	}
};
