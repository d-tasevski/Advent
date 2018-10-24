import { toastr } from 'react-redux-toastr';

import { types } from '../constants';
import { asyncActionStart, asyncActionEnd, asyncActionError } from './async';
import { fetchSampleData } from '../mockAPI';
import firebase from '../config/firebase';
import { createNewEvent } from '../helpers/eventHelpers';
import moment from 'moment';

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

export const getEventsForDashboard = () => async (dispatch, getState) => {
	// Get reference for todays date, so that we have something to compare against when sorting by date
	const today = new Date(Date.now());
	const firestore = firebase.firestore();
	const eventsQuery = firestore.collection('events').where('date', '>=', today);

	try {
		dispatch(asyncActionStart());
		const querySnapshot = await eventsQuery.get();
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
	} catch (err) {
		console.error(err);
		dispatch(asyncActionError());
	}
};
