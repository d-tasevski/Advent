import createReducer from '../helpers/reducerHelper';
import { types } from '../constants';

const initialState = null;

export const openModal = (state, { modalType, modalProps }) => ({ modalType, modalProps });

export const closeModal = (state, payload) => null;

export default createReducer(initialState, {
	[types.MODAL_OPEN]: openModal,
	[types.MODAL_CLOSE]: closeModal,
});
