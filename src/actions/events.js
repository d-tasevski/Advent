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

export const createEvent = event => ({
	type: types.CREATE_EVENT,
	payload: {
		event,
	},
});

export const updateEvent = event => ({
	type: types.UPDATE_EVENT,
	payload: {
		event,
	},
});

export const deleteEvent = eventID => ({
	type: types.DELETE_EVENT,
	payload: {
		eventID,
	},
});
