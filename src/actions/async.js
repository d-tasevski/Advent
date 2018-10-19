import { types } from '../constants';

export const asyncActionStart = () => ({ type: types.ASYNC_ACTION_START });

export const asyncActionEnd = () => ({ type: types.ASYNC_ACTION_END });

export const asyncActionError = () => ({ type: types.ASYNC_ACTION_ERROR });
