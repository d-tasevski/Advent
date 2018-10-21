import moment from 'moment';
import { toastr } from 'react-redux-toastr';
import cuid from 'cuid';

import { asyncActionStart, asyncActionEnd, asyncActionError } from './async';

export const updateProfile = user => async (dispatch, getState, { getFirebase }) => {
	const firebase = getFirebase();

	const { isLoaded, isEmpty, ...updatedProfile } = user;
	if (updatedProfile.dateOfBirth !== getState().firebase.profile.dateOfBirth) {
		updatedProfile.dateOfBirth = moment(updatedProfile.dateOfBirth).toDate();
	}
	try {
		await firebase.updateProfile(updatedProfile);
		toastr.success('Success', 'Profile updated');
	} catch (err) {
		console.error(err);
		toastr.error('Oops', 'Something went wrong');
	}
};

export const uploadProfileImg = (file, fileName) => async (
	dispatch,
	getState,
	{ getFirebase, getFirestore }
) => {
	const imageName = cuid();
	const firebase = getFirebase();
	const firestore = getFirestore();
	const user = firebase.auth().currentUser;
	const path = `${user.uid}/user_images`;
	const options = {
		name: imageName,
	};

	try {
		dispatch(asyncActionStart());
		// Upload the file to firebase storage
		const uploadedFile = await firebase.uploadFile(path, file, null, options); // third argument here asks if we want to upload image to realtime db at firebase, but we are using firestore for that
		// get the url of the image
		const { downloadURL } = await uploadedFile.uploadTaskSnapshot;
		// get userDoc from firestore
		const userDoc = await firestore.get(`users/${user.uid}`);
		// check if user already have some photos inside
		if (!userDoc.data().photoURL) {
			// If no, update their profile pic to be uploaded pic
			// This will update firestore documents
			await firebase.updateProfile({
				photoURL: downloadURL,
			});
			// this will update the profile inside firebase auth. (Not confusing at all, wp google)
			await user.updateProfile({
				photoURL: downloadURL,
			});
		}
		// Add uploaded image to the user image collection
		await firestore.add(
			// find collection
			{
				collection: 'users',
				doc: user.uid,
				subcollections: [{ collection: 'photos' }],
			},
			// save this to found collection
			{
				name: imageName,
				url: downloadURL,
			}
		);
		dispatch(asyncActionEnd());
	} catch (err) {
		console.error(err);
		dispatch(asyncActionError());
		throw new Error('Problem with photo upload');
	}
};

export const deleteImage = img => async (dispatch, getState, { getFirestore, getFirebase }) => {
	const firebase = getFirebase();
	const firestore = getFirestore();
	const user = firebase.auth().currentUser;

	try {
		dispatch(asyncActionStart());
		await firebase.deleteFile(`${user.uid}/user_images/${img.name}`);
		await firestore.delete({
			collection: 'users',
			doc: user.uid,
			subcollections: [{ collection: 'photos', doc: img.id }],
		});
		dispatch(asyncActionEnd());
	} catch (err) {
		console.error(err);
		dispatch(asyncActionError());
		throw new Error('Problem deleting the photo');
	}
};

export const setMainPhoto = photo => async (dispatch, getState, { getFirebase }) => {
	const firebase = getFirebase();

	try {
		dispatch(asyncActionStart());
		await firebase.updateProfile({
			photoURL: photo.url,
		});
		dispatch(asyncActionEnd());
	} catch (err) {
		console.log(err);
		dispatch(asyncActionError());
		throw new Error('Problem setting main photo');
	}
};
