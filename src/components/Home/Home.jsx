import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const Home = props => {
	return (
		<div>
			<div className="ui inverted vertical masthead center aligned segment">
				<div className="ui text container">
					<h1 className="ui inverted stackable header">
						<img className="ui image massive" src="/assets/logo.png" alt="logo" />
						<div className="content">Advent</div>
					</h1>
					<h2>Do whatever you want to do</h2>
					<Link to="/events">
						<div className="ui huge white inverted button">
							Get Started
							<i className="right arrow icon" />
						</div>
					</Link>
				</div>
			</div>
			<div style={{ textAlign: 'center' }}>
				<small>
					Icons made by{' '}
					<a href="http://www.freepik.com" title="Freepik">
						Freepik
					</a>{' '}
					from{' '}
					<a href="https://www.flaticon.com/" title="Flaticon">
						www.flaticon.com
					</a>{' '}
					is licensed by{' '}
					<a
						href="http://creativecommons.org/licenses/by/3.0/"
						title="Creative Commons BY 3.0"
					>
						CC 3.0 BY
					</a>
				</small>
			</div>
		</div>
	);
};

Home.propTypes = {};

export default Home;
