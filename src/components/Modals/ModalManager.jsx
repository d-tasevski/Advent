import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import LoginModal from './LoginModal';
import RegisterModal from './RegisterModal';

const modalLookup = {
	LoginModal,
	RegisterModal,
};

const ModalManager = ({ currentModal }) => {
	let renderedModal;

	if (currentModal) {
		const { modalType, modalProps } = currentModal;
		const ModalComponent = modalLookup[modalType];
		renderedModal = <ModalComponent {...modalProps} />;
	}
	return <span>{renderedModal}</span>;
};

ModalManager.propTypes = {
	currentModal: PropTypes.shape({
		modalType: PropTypes.string,
		modalProps: PropTypes.shape({}),
	}),
};

const mapStateToProps = state => ({
	currentModal: state.modals,
});

export default connect(mapStateToProps)(ModalManager);
