import createReducer from '../helpers/reducerHelper';
import { types, initialState } from '../constants';

export const createEvent = (state, payload) => [...state, payload.event];

export const updateEvent = (state, payload) =>
	state.map(e => (e.id === payload.event.id ? payload.event : e));

export const deleteEvent = (state, payload) => state.filter(e => e.id !== payload.eventID);

export default createReducer(initialState, {
	[types.CREATE_EVENT]: createEvent,
	[types.UPDATE_EVENT]: updateEvent,
	[types.DELETE_EVENT]: deleteEvent,
});
