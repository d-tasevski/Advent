import { toastr } from 'react-redux-toastr';

import { types } from '../constants';
import { asyncActionStart, asyncActionEnd, asyncActionError } from './async';
import { fetchSampleData } from '../mockAPI';
import firebase from '../config/firebase';
import { createNewEvent } from '../helpers/eventHelpers';
import moment from 'moment';
import { values } from 'redux-form';

export const createEvent = event => async (dispatch, getState, { getFirestore }) => {
	const firestore = getFirestore();
	const user = firestore.auth().currentUser;
	const photoURL = getState().firebase.profile.photoURL;
	const newEvent = createNewEvent(user, photoURL, event);

	try {
		let createdEvent = await firestore.add('events', newEvent);
		await firestore.set(`event_attendee/${createdEvent.id}_${user.uid}`, {
			eventID: createdEvent.id,
			userUID: user.uid,
			eventDate: event.date,
			isHost: true,
		});
		toastr.success('Success', 'Event has been created');
	} catch (err) {
		console.error(err);
		toastr.error('Oops', 'Something went wrong');
	}
};

export const updateEvent = event => async (dispatch, getState, { getFirestore }) => {
	const firestore = getFirestore();
	if (event.date !== getState().firestore.ordered.events[0].date) {
		event.date = moment(event.date).toDate();
	}
	try {
		await firestore.update(`events/${event.id}`, event);
		toastr.success('Success!', 'Event has been updated');
	} catch (err) {
		toastr.error('Oops', 'Something went wrong');
	}
};

export const cancelToggle = (cancelled, eventID) => async (
	dispatch,
	getState,
	{ getFirestore }
) => {
	const firestore = getFirestore();
	const message = cancelled
		? 'Are you sure you want to cancel the event?'
		: 'This will reactivate the event - are you sure?';
	try {
		toastr.confirm(message, {
			onOk() {
				return firestore.update(`events/${eventID}`, { cancelled });
			},
		});
	} catch (err) {
		console.error(err);
	}
};

export const goingToEvent = event => async (dispatch, getState, { getFirestore }) => {
	const firestore = getFirestore();
	const user = firestore.auth().currentUser;
	const { photoURL } = getState().firebase.profile;
	const attendee = {
		photoURL: photoURL || '/assets/user.png',
		isGoing: true,
		isHost: false,
		joinDate: Date.now(),
		displayName: user.displayName,
	};

	try {
		await firestore.update(`events/${event.id}`, {
			[`attendees.${user.uid}`]: attendee,
		});
		await firestore.set(`event_attendee/${event.id}_${user.uid}`, {
			eventID: event.id,
			userUID: user.uid,
			eventDate: event.date,
			isHost: false,
		});
		toastr.success('Success', 'You have signed up for the event');
	} catch (error) {
		console.error(error);
		toastr.error('Oops', 'Something went wrong');
	}
};

export const cancelGoingToEvent = event => async (dispatch, getState, { getFirestore }) => {
	const firestore = getFirestore();
	const user = firestore.auth().currentUser;

	try {
		await firestore.update(`events/${event.id}`, {
			// This is how to delete individual field from firestore
			[`attendees.${user.uid}`]: firestore.FieldValue.delete(),
		});
		await firestore.delete(`event_attendee/${event.id}_${user.uid}`);
		toastr.success('Success', 'You have removed yourself from the event');
	} catch (err) {
		console.error(err);
		toastr.error('Oops', 'Something went wrong');
	}
};

export const getEventsForDashboard = lastEvent => async (dispatch, getState) => {
	// Get reference for todays date, so that we have something to compare against when sorting by date
	const today = new Date(Date.now());
	const firestore = firebase.firestore();
	const eventsRef = firestore.collection('events');

	try {
		dispatch(asyncActionStart());
		const startAfter =
			lastEvent &&
			(await firestore
				.collection('events')
				.doc(lastEvent.id)
				.get());
		let query;

		// Check if we're going to use pagination or non pagination query
		lastEvent
			? (query = eventsRef
					.where('date', '>=', today)
					.orderBy('date')
					.startAfter(startAfter)
					.limit(2))
			: (query = eventsRef
					.where('date', '>=', today)
					.orderBy('date')
					.limit(2));

		const querySnapshot = await query.get();

		if (!querySnapshot.docs.length) return dispatch(asyncActionEnd());
		let events = [];

		querySnapshot.docs.forEach(doc => {
			let event = { ...doc.data(), id: doc.id };
			events.push(event);
		});

		dispatch({
			type: types.FETCH_EVENTS,
			payload: { events },
		});
		dispatch(asyncActionEnd());
		return querySnapshot;
	} catch (err) {
		console.error(err);
		dispatch(asyncActionError());
	}
};

export const addEventComment = (eventID, values) => async (dispatch, getState, { getFirebase }) => {
	const firebase = getFirebase();
	const { profile } = getState().firebase;
	const user = firebase.auth().currentUser;
	let newComment = {
		displayName: profile.displayName,
		photoURL: profile.photoURL || '/assets/user.png',
		uid: user.uid,
		text: values.comment,
		date: Date.now(),
	};

	try {
		await firebase.push(`event_chat/${eventID}`, newComment);
	} catch (err) {
		console.error(err);
		toastr.error('Oops', 'Something went wrong');
	}
};
