import React from 'react';
import { Card, Grid, Header, Image, Segment, Tab } from 'semantic-ui-react';
import format from 'date-fns/format';
import { Link } from 'react-router-dom';

const panels = [
	{ menuItem: 'All Events', panel: { key: 'allEvents' } },
	{ menuItem: 'Past Events', panel: { key: 'pastEvents' } },
	{ menuItem: 'Future Events', panel: { key: 'futureEvents' } },
	{ menuItem: 'Events Hosted', panel: { key: 'eventsHosted' } },
];

const UserDetailsEvents = ({ events, eventsLoading, changeTab }) => (
	<Grid.Column width={12}>
		<Segment loading={eventsLoading} attached>
			<Header icon="calendar" content="Events" />
			<Tab
				onTabChange={(e, data) => changeTab(e, data)}
				panes={panels}
				menu={{ secondary: true, pointing: true }}
			/>
			<Card.Group itemsPerRow={5}>
				{events &&
					events.map(e => (
						<Card as={Link} to={`/event/${e.id}`} key={e.id}>
							<Image src={`/assets/categoryImages/${e.category}.jpg`} />
							<Card.Content>
								<Card.Header textAlign="center">{e.title}</Card.Header>
								<Card.Meta textAlign="center">
									<div>{e.date && format(e.date.toDate(), 'DD MMM YYYY')}</div>
									<div>{e.date && format(e.date.toDate(), 'h:mm A')}</div>
								</Card.Meta>
							</Card.Content>
						</Card>
					))}
			</Card.Group>
		</Segment>
	</Grid.Column>
);

export default UserDetailsEvents;
