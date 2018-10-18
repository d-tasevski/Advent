import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Segment, Form, Button } from 'semantic-ui-react';
import { createEvent, updateEvent } from '../../actions/events';
import cuid from 'cuid';

const initialState = {
	title: '',
	date: '',
	city: '',
	venue: '',
	hostedBy: '',
};

export class EventForm extends Component {
	static propTypes = {
		createEvent: PropTypes.func,
		updateEvent: PropTypes.func,
	};

	static defaultProps = {
		updateEvent: () => {},
	};

	state = {
		event: initialState,
		isUpdate: false,
	};

	componentDidMount() {
		if (this.props.match.params.id) {
			const { id } = this.props.match.params;
			const event = this.props.events.find(e => e.id === id);
			if (event) this.setState({ event, isUpdate: true });
		}
	}

	clearState = () => this.setState({ event: initialState, isUpdate: false });

	onChange = e => {
		const { name, value } = e.target;
		return this.setState({ event: { ...this.state.event, [name]: value } });
	};

	onSubmit = e => {
		e.preventDefault();
		const { event, isUpdate } = this.state;
		if (isUpdate) {
			this.props.updateEvent(event);
			this.clearState();
			return this.props.history.goBack();
		}
		const newEvent = {
			...event,
			id: cuid(),
			hostPhotoURL: '/assets/user.png',
			attendees: [],
		};
		this.props.createEvent(newEvent);
		this.props.history.push('/events');
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
					<Button negative onClick={() => this.props.history.goBack()} type="button">
						Cancel
					</Button>
					<Button positive type="submit">
						Submit
					</Button>
				</Form>
			</Segment>
		);
	}
}

const mapStateToProps = ({ events }) => ({ events });

export default connect(
	mapStateToProps,
	{ createEvent, updateEvent }
)(EventForm);
