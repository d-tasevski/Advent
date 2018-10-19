import { sampleData } from './constants';

// Mock fetching data with delay of one second
const delay = ms => {
	return new Promise(resolve => setTimeout(resolve, ms));
};

export const fetchSampleData = () => {
	return delay(1000).then(() => {
		return Promise.resolve(sampleData);
	});
};
