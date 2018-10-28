import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';
import Script from 'react-load-script';
import { withFirestore } from 'react-redux-firebase';
import { Segment, Form, Button, Grid, Header } from 'semantic-ui-react';
import { composeValidators, combineValidators, isRequired, hasLengthGreaterThan } from 'revalidate';
import { geocodeByAddress, getLatLng } from 'react-places-autocomplete';

import { categories } from '../../constants';
import { createEvent, updateEvent, cancelToggle } from '../../actions/events';
import TextInput from '../common/TextInput';
import TextArea from '../common/TextArea';
import SelectInput from '../common/SelectInput';
import DateInput from '../common/DateInput';
import PlacesInput from '../common/PlacesInput';

export class EventForm extends Component {
	static propTypes = {
		createEvent: PropTypes.func,
		updateEvent: PropTypes.func,
	};

	state = {
		cityLatLng: {},
		venueLatLng: {},
		scriptLoaded: false,
	};

	async componentDidMount() {
		const { firestore, match } = this.props;
		await firestore.setListener(`events/${match.params.id}`);
	}

	async componentWillUnmount() {
		const { firestore, match } = this.props;
		this.props.reset();
		await firestore.unsetListener(`events/${match.params.id}`);
	}

	onScriptLoaded = () => this.setState({ scriptLoaded: true });

	onCitySelect = async selectedCity => {
		const [results] = await geocodeByAddress(selectedCity);
		const latLng = await getLatLng(results);
		return this.setState({ cityLatLng: latLng }, () => {
			// fix issue with react-places, so that we have city name in input
			this.props.change('city', selectedCity);
		});
	};

	onVenueSelect = async selectedVenue => {
		const [results] = await geocodeByAddress(selectedVenue);
		const latLng = await getLatLng(results);
		return this.setState({ venueLatLng: latLng }, () => {
			// fix issue with react-places, so that we have city name in input
			this.props.change('venue', selectedVenue);
		});
	};

	onSubmit = async values => {
		values.venueLatLng = this.state.venueLatLng;
		// If is update
		if (this.props.initialValues.id) {
			if (Object.keys(values.venueLatLng).length === 0) {
				values.venueLatLng = this.props.initialValues.venueLatLng;
			}
			await this.props.updateEvent(values);
			return this.props.history.goBack();
		}
		// else create new event
		this.props.createEvent(values);
		return this.props.history.push('/events');
	};

	render() {
		const {
			invalid,
			submitting,
			pristine,
			initialValues: event,
			cancelToggle,
			isLoading,
		} = this.props;

		return (
			<Grid>
				<Script
					onLoad={this.onScriptLoaded}
					url={`https://maps.googleapis.com/maps/api/js?key=${
						process.env.REACT_APP_GOOGLE_MAPS_API_KEY
					}&libraries=places`}
				/>
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
								component={PlacesInput}
								options={{ types: ['(cities)'] }}
								placeholder="Event City"
								onSelect={this.onCitySelect}
							/>
							{this.state.scriptLoaded && (
								<Field
									name="venue"
									component={PlacesInput}
									options={{
										location: new window.google.maps.LatLng(
											this.state.cityLatLng
										),
										radius: 1000,
										types: ['establishment'],
									}}
									placeholder="Enter the Venue of the event"
									onSelect={this.onVenueSelect}
								/>
							)}
							<Field
								name="date"
								dateFormat="DD MMMM H:mm"
								timeFormat="H:mm"
								showTimeSelect
								component={DateInput}
								placeholder="Date and Time of event"
							/>
							<Button
								negative
								onClick={() => this.props.history.goBack()}
								type="button"
								disabled={isLoading}
							>
								Cancel
							</Button>
							<Button
								color={event.cancelled ? 'green' : 'orange'}
								floated="left"
								content={event.cancelled ? 'Reactivate Event' : 'Cancel Event'}
								onClick={() => cancelToggle(!event.cancelled, event.id)}
								type="button"
							/>
							<Button
								disabled={invalid || submitting || pristine}
								loading={isLoading}
								positive
								floated="right"
								type="submit"
							>
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
	let event = {};
	const { match } = ownProps;

	if (
		match.url !== '/create-event' &&
		state.firestore.ordered.events &&
		state.firestore.ordered.events[0]
	) {
		event = state.firestore.ordered.events[0];
	}

	return {
		initialValues: event,
		isLoading: state.async.isLoading,
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

export default withFirestore(
	connect(
		mapStateToProps,
		{ createEvent, updateEvent, cancelToggle }
	)(reduxForm({ form: 'eventForm', enableReinitialize: true, validate })(EventForm))
);
