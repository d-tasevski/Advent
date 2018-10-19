import React from 'react';
import PropTypes from 'prop-types';
import { Dimmer, Loader } from 'semantic-ui-react';

const LoadingComponent = ({ inverted }) => {
	return (
		<Dimmer className="backdrop" inverted={inverted} active={true}>
			<Loader content="Loading..." />
		</Dimmer>
	);
};

LoadingComponent.propTypes = {};

export default LoadingComponent;
