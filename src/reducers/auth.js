import createReducer from '../helpers/reducerHelper';
import { types } from '../constants';

const initialState = {
	currentUser: {},
};

export const loginUser = (state, { credentials }) => ({
	...state,
	currentUser: credentials.email,
	authenticated: true,
});

export const signOutUser = (state, payload) => ({
	...state,
	authenticated: false,
	currentUser: {},
});

export default createReducer(initialState, {
	[types.LOGIN_USER]: loginUser,
	[types.SIGN_OUT_USER]: signOutUser,
});
