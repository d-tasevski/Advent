import { types } from '../constants';

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
