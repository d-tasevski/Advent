import createReducer from '../helpers/reducerHelper';
import { types } from '../constants';

const initialState = [];

export const fetchEvents = (state, payload) => payload;

export const createEvent = (state, payload) => [...state, payload.event];

export const updateEvent = (state, payload) =>
	state.map(e => (e.id === payload.event.id ? payload.event : e));

export const deleteEvent = (state, payload) => state.filter(e => e.id !== payload.eventID);

export default createReducer(initialState, {
	[types.FETCH_EVENTS]: fetchEvents,
	[types.CREATE_EVENT]: createEvent,
	[types.UPDATE_EVENT]: updateEvent,
	[types.DELETE_EVENT]: deleteEvent,
});
