import { types } from '../constants';
import { closeModal } from './modals';

export const login = credentials => async (dispatch, getState, { getFirebase }) => {
	const firebase = getFirebase();

	try {
		await firebase.auth().signInWithEmailAndPassword(credentials.email, credentials.password);
		return dispatch(closeModal());
	} catch (err) {
		console.log(err);
	}
};

export const logout = () => ({ type: types.SIGN_OUT_USER });
