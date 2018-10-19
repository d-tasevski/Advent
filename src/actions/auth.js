import { types } from '../constants';

import { closeModal } from './modals';

export const login = credentials => dispatch => {
	dispatch({
		type: types.LOGIN_USER,
		payload: {
			credentials,
		},
	});
	return dispatch(closeModal());
};

export const logout = () => ({ type: types.SIGN_OUT_USER });
