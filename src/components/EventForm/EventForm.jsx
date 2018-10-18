import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';
import { Segment, Form, Button, Grid, Header } from 'semantic-ui-react';
import { composeValidators, combineValidators, isRequired, hasLengthGreaterThan } from 'revalidate';
import cuid from 'cuid';
import moment from 'moment';

import { categories } from '../../constants';
import { createEvent, updateEvent } from '../../actions/events';
import TextInput from '../common/TextInput';
import TextArea from '../common/TextArea';
import SelectInput from '../common/SelectInput';

export class EventForm extends Component {
	static propTypes = {
		createEvent: PropTypes.func,
		updateEvent: PropTypes.func,
	};

	static defaultProps = {
		updateEvent: () => {},
	};

	onSubmit = values => {
		values.date = moment(values.date).format();
		if (this.props.initialValues.id) {
			this.props.updateEvent(values);
			return this.props.history.goBack();
		}
		const newEvent = {
			...values,
			id: cuid(),
			hostPhotoURL: '/assets/user.png',
			attendees: [],
		};
		this.props.createEvent(newEvent);
		this.props.history.push('/events');
	};

	render() {
		return (
			<Grid>
				<Grid.Column width={10}>
					<Segment>
						<Header sub color="teal" content="Event Details" />
						<Form onSubmit={this.props.handleSubmit(this.onSubmit)}>
							<Field
								name="title"
								type="text"
								component={TextInput}
								placeholder="Give your event a name"
							/>
							<Field
								name="category"
								type="text"
								options={categories}
								component={SelectInput}
								placeholder="What's your event about?"
							/>
							<Field
								name="description"
								rows={3}
								component={TextArea}
								placeholder="Tell us more about this event :)"
							/>
							<Header sub color="teal" content="Event Location Details" />
							<Field
								name="city"
								type="text"
								component={TextInput}
								placeholder="Event City"
							/>
							<Field
								name="venue"
								type="text"
								component={TextInput}
								placeholder="Enter the Venue of the event"
							/>
							<Field
								name="date"
								type="date"
								component={TextInput}
								placeholder="Event Date"
							/>
							<Button
								negative
								onClick={() => this.props.history.goBack()}
								type="button"
							>
								Cancel
							</Button>
							<Button positive type="submit">
								Submit
							</Button>
						</Form>
					</Segment>
				</Grid.Column>
			</Grid>
		);
	}
}

const mapStateToProps = (state, ownProps) => {
	const eventId = ownProps.match.params.id;
	let event = {};

	if (eventId && state.events.length > 0) {
		event = state.events.find(event => event.id === eventId);
	}

	return {
		initialValues: event,
	};
};

const validate = combineValidators({
	title: isRequired({ message: 'The event title is required' }),
	category: isRequired({ message: 'Please provide a category' }),
	description: composeValidators(
		isRequired({ message: 'Please enter a description' }),
		hasLengthGreaterThan(4)({ message: 'Description needs to be at least 5 characters' })
	)(),
	city: isRequired('city'),
	venue: isRequired('venue'),
	date: isRequired('date'),
});

export default connect(
	mapStateToProps,
	{ createEvent, updateEvent }
)(reduxForm({ form: 'eventForm', enableReinitialize: true, validate })(EventForm));
