import moment from 'moment';
import { toastr } from 'react-redux-toastr';

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
