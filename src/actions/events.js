import { toastr } from 'react-redux-toastr';

import { types } from '../constants';
import { asyncActionStart, asyncActionEnd, asyncActionError } from './async';
import { fetchSampleData } from '../mockAPI';

export const fetchEvents = events => ({
	type: types.FETCH_EVENTS,
	payload: events,
});

export const loadEvents = () => async dispatch => {
	try {
		dispatch(asyncActionStart());
		const events = await fetchSampleData();
		dispatch(fetchEvents(events));
		dispatch(asyncActionEnd());
	} catch (err) {
		console.log(err);
		dispatch(asyncActionError());
	}
};

export const createEvent = event => async dispatch => {
	try {
		dispatch({
			type: types.CREATE_EVENT,
			payload: {
				event,
			},
		});
		toastr.success('Success', 'Event has been created');
	} catch (err) {
		toastr.error('Oops', 'Something went wrong');
	}
};

export const updateEvent = event => async dispatch => {
	try {
		dispatch({
			type: types.UPDATE_EVENT,
			payload: {
				event,
			},
		});
		toastr.success('Success!', 'Event has been updated');
	} catch (err) {
		toastr.error('Oops', 'Something went wrong');
	}
};

export const deleteEvent = eventID => async dispatch => {
	try {
		dispatch({
			type: types.DELETE_EVENT,
			payload: {
				eventID,
			},
		});
		toastr.success('Success!', 'Event has been deleted');
	} catch (err) {
		toastr.error('Oops', 'Something went wrong');
	}
};
