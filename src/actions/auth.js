import { types } from '../constants';

export const login = credentials => ({
	type: types.LOGIN_USER,
	payload: {
		credentials,
	},
});

export const logout = () => ({ type: types.SIGN_OUT_USER });
