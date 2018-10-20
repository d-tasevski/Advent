import { SubmissionError } from 'redux-form';

import { types } from '../constants';
import { closeModal } from './modals';

export const login = credentials => async (dispatch, getState, { getFirebase }) => {
	const firebase = getFirebase();

	try {
		await firebase.auth().signInWithEmailAndPassword(credentials.email, credentials.password);
		return dispatch(closeModal());
	} catch (err) {
		console.log(err);
		throw new SubmissionError({
			_error: err.message,
		});
	}
};

export const registerUser = user => async (dispatch, getState, { getFirebase, getFirestore }) => {
	const firebase = getFirebase();
	const firestore = getFirestore();

	try {
		// create user in auth
		let newUser = await firebase
			.auth()
			.createUserWithEmailAndPassword(user.email, user.password);
		console.log(newUser);
		// update the auth profile
		await newUser.updateProfile({
			displayName: user.displayName,
		});
		// create a new profile in firestore
		let newProfile = {
			displayName: user.displayName,
			createdAt: firestore.FieldValue.serverTimestamp(),
		};
		// We can also use add instead of set if we want to firestore generate id for us
		await firestore.set(`users/${newUser.uid}`, { ...newProfile });

		dispatch(closeModal());
	} catch (err) {
		throw new SubmissionError({
			_error: err.message,
		});
	}
};

export const socialLogin = selectedProvider => async (
	dispatch,
	getState,
	{ getFirebase, getFirestore }
) => {
	const firebase = getFirebase();
	const firestore = getFirestore();

	try {
		dispatch(closeModal());
		const user = await firebase.login({
			provider: selectedProvider,
			type: 'popup',
		});
		if (user.additionalUserInfo.isNewUser) {
			await firestore.set(`users/${user.user.uid}`, {
				displayName: user.profile.displayName,
				photoURL: user.profile.avatarUrl,
				createdAt: firestore.FieldValue.serverTimestamp(),
			});
		}
	} catch (err) {
		console.log(err);
	}
};
