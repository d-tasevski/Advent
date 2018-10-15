import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Segment, Form, Button } from 'semantic-ui-react';

const initialState = {
	title: '',
	date: '',
	city: '',
	venue: '',
	hostedBy: '',
};

export class EventForm extends Component {
	static propTypes = {
		selectedEvent: PropTypes.shape({}),
		createEvent: PropTypes.func.isRequired,
		updateEvent: PropTypes.func,
	};

	static defaultProps = {
		selectedEvent: {},
		updateEvent: () => {},
	};

	state = {
		event: initialState,
		isUpdate: false,
	};

	componentDidMount() {
		if (Object.keys(this.props.selectedEvent).length) {
			this.setState({ event: this.props.selectedEvent, isUpdate: true });
		}
	}

	componentWillReceiveProps = nextProps => {
		if (nextProps.selectedEvent !== this.props.selectedEvent) {
			this.setState({ event: nextProps.selectedEvent, isUpdate: true });
		}
	};

	onChange = e => {
		const { name, value } = e.target;
		return this.setState({ event: { ...this.state.event, [name]: value } });
	};

	onSubmit = e => {
		e.preventDefault();
		const { event, isUpdate } = this.state;
		return isUpdate ? this.props.updateEvent(event) : this.props.createEvent(event);
	};

	render() {
		const {
			event: { title, date, city, venue, hostedBy },
		} = this.state;

		return (
			<Segment>
				<Form onSubmit={this.onSubmit}>
					<Form.Field>
						<label>Event Title</label>
						<input
							name="title"
							onChange={this.onChange}
							value={title}
							placeholder="First Name"
						/>
					</Form.Field>
					<Form.Field>
						<label>Event Date</label>
						<input
							name="date"
							onChange={this.onChange}
							value={date}
							type="date"
							placeholder="Event Date"
						/>
					</Form.Field>
					<Form.Field>
						<label>City</label>
						<input
							name="city"
							onChange={this.onChange}
							value={city}
							placeholder="City event is taking place"
						/>
					</Form.Field>
					<Form.Field>
						<label>Venue</label>
						<input
							name="venue"
							value={venue}
							onChange={this.onChange}
							placeholder="Enter the Venue of the event"
						/>
					</Form.Field>
					<Form.Field>
						<label>Hosted By</label>
						<input
							name="hostedBy"
							value={hostedBy}
							onChange={this.onChange}
							placeholder="Enter the name of person hosting"
						/>
					</Form.Field>
					<Button positive fluid type="submit">
						Submit
					</Button>
				</Form>
			</Segment>
		);
	}
}

export default EventForm;
