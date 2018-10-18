import React from 'react';
import PropTypes from 'prop-types';
import { Form, Label, Select } from 'semantic-ui-react';

const SelectInput = ({ input, type, placeholder, options, multiple, meta: { touched, error } }) => {
	return (
		<Form.Field error={touched && !!error}>
			<Select
				value={input.value || null}
				onChange={(e, data) => input.onChange(data.value)}
				placeholder={placeholder}
				multiple={multiple}
				options={options}
			/>
			{touched &&
				error && (
					<Label basic color="red">
						{error}
					</Label>
				)}
		</Form.Field>
	);
};

SelectInput.propTypes = {};

export default SelectInput;
