import React from 'react';
import PropTypes from 'prop-types';
import { Segment, Icon } from 'semantic-ui-react';
import GoogleMapReact from 'google-map-react';

const Marker = () => <Icon name="marker" size="big" color="red" />;

const EventMap = ({ lat, lng }) => {
	const center = [lat, lng];
	const zoom = 14;
	return (
		<Segment attached="bottom" style={{ padding: 0 }}>
			<div style={{ height: '300px', width: '100%' }}>
				<GoogleMapReact
					bootstrapURLKeys={{ key: process.env.REACT_APP_GOOGLE_MAPS_API_KEY }}
					defaultCenter={center}
					defaultZoom={zoom}
				>
					<Marker lat={lat} lng={lng} />
				</GoogleMapReact>
			</div>
		</Segment>
	);
};

EventMap.propTypes = {};

export default EventMap;
