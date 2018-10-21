import React, { Component } from 'react';
import { Segment, Form, Header, Divider, Button } from 'semantic-ui-react';
import { Field, reduxForm } from 'redux-form';
import moment from 'moment';

import DateInput from '../../common/DateInput';
import PlacesInput from '../../common/PlacesInput';
import TextInput from '../../common/TextInput';
import RadioInput from '../../common/RadioInput';

class Basic extends Component {
	render() {
		const { pristine, submitting, updateProfile, handleSubmit } = this.props;
		return (
			<Segment>
				<Header dividing size="large" content="Basics" />
				<Form onSubmit={handleSubmit(updateProfile)}>
					<Field
						width={8}
						name="displayName"
						type="text"
						component={TextInput}
						placeholder="Known As"
					/>
					<Form.Group inline>
						<label>Gender: </label>
						<Field
							width={10}
							type="radio"
							name="gender"
							label="Male"
							value="male"
							component={RadioInput}
						/>
						<Field
							width={10}
							type="radio"
							name="gender"
							label="Female"
							value="female"
							component={RadioInput}
						/>
					</Form.Group>
					<Field
						width={8}
						name="dateOfBirth"
						component={DateInput}
						placeholder="Date of Birth"
						dateFormat="YYYY-MM-DD"
						showYearDropdown
						showMonthDropdown
						dropdownMode="select"
						maxDate={moment().subtract(16, 'years')}
					/>
					<Field
						name="city"
						placeholder="Home Town"
						options={{ types: ['(cities)'] }}
						label="Female"
						component={PlacesInput}
						width={8}
					/>
					<Divider />
					<Button
						disabled={pristine || submitting}
						size="large"
						positive
						content="Update Profile"
					/>
				</Form>
			</Segment>
		);
	}
}
// https://redux-form.com/7.4.2/docs/api/reduxform.md/#-code-enablereinitialize-boolean-code-optional-
// enableReinitialize: When set to true, the form will reinitialize every time the initialValues prop changes.
export default reduxForm({
	form: 'userProfile',
	enableReinitialize: true,
	destroyOnUnmount: false, // Persist data, so that we can switch between forms
})(Basic);
