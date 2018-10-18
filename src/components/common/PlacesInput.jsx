import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Form, Label } from 'semantic-ui-react';
import Script from 'react-load-script';
import PlacesAutocomplete from 'react-places-autocomplete';

export class PlacesInput extends Component {
	static propTypes = {};
	state = {
		scriptLoaded: false,
	};

	handleScriptLoaded = () => this.setState({ scriptLoaded: true });

	render() {
		const {
			input,
			width,
			onSelect,
			placeholder,
			options,
			meta: { touched, error },
		} = this.props;

		return (
			<Form.Field error={touched && !!error} width={width}>
				<Script
					url={`https://maps.googleapis.com/maps/api/js?key=${
						process.env.REACT_APP_GOOGLE_MAPS_API_KEY
					}&libraries=places`}
					onLoad={this.handleScriptLoaded}
				/>
				{this.state.scriptLoaded && (
					<PlacesAutocomplete
						inputProps={{ ...input, placeholder }}
						options={options}
						onSelect={onSelect}
						styles={styles}
					/>
				)}
				{touched &&
					error && (
						<Label basic color="red">
							{error}
						</Label>
					)}
			</Form.Field>
		);
	}
}

const styles = {
	autocompleteContainer: {
		zIndex: 1000,
	},
};

export default PlacesInput;
