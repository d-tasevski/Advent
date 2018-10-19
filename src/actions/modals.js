import { types } from '../constants';

export const openModal = (modalType, modalProps) => ({
	type: types.MODAL_OPEN,
	payload: {
		modalType,
		modalProps,
	},
});

export const closeModal = () => ({
	type: types.MODAL_CLOSE,
});
