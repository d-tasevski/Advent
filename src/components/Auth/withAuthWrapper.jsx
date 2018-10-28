import { connectedReduxRedirect } from 'redux-auth-wrapper/history4/redirect';
import { openModal } from '../../actions/modals';

export const withAuthWrapper = connectedReduxRedirect({
	wrapperDisplayName: 'UserIsAuthenticated',
	allowRedirectBack: true,
	redirectPath: '/events',
	authenticatedSelector: ({ firebase: { auth } }) => auth.isLoaded && !auth.isEmpty,
	redirectAction: newLoc => dispatch => dispatch(openModal('GuestModal')),
});
