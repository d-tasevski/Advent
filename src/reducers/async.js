import createReducer from '../helpers/reducerHelper';
import { types } from '../constants';

const initialState = {
	isLoading: false,
};

export const asyncActionStarted = state => ({
	...state,
	isLoading: true,
});

export const asyncActionFinished = state => ({
	...state,
	isLoading: false,
});

export const asyncActionFailed = state => ({
	...state,
	isLoading: false,
});

export default createReducer(initialState, {
	[types.ASYNC_ACTION_START]: asyncActionStarted,
	[types.ASYNC_ACTION_END]: asyncActionFinished,
	[types.ASYNC_ACTION_ERROR]: asyncActionFailed,
});
