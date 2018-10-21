import React from 'react';
import PropTypes from 'prop-types';
import { Form, Label } from 'semantic-ui-react';

const TextInput = ({ input, width, type, placeholder, meta: { touched, error } }) => {
	return (
		<Form.Field error={touched && !!error} width={width}>
			<input {...input} type={type} placeholder={placeholder} />
			{touched &&
				error && (
					<Label basic color="red">
						{error}
					</Label>
				)}
		</Form.Field>
	);
};

TextInput.propTypes = {
	input: PropTypes.shape({}),
	width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
	type: PropTypes.string,
	placeholder: PropTypes.string,
};

export default TextInput;
