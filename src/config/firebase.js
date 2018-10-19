import firebase from 'firebase';
import 'firebase/firestore';

var config = {
	apiKey: process.env.REACT_APP_FSTORE_API_KEY,
	authDomain: process.env.REACT_APP_FSTORE_AUTH_DOMAIN,
	databaseURL: process.env.REACT_APP_FSTORE_DATABASE_URL,
	projectId: process.env.REACT_APP_FSTORE_PROJECT_ID,
	storageBucket: '',
	messagingSenderId: process.env.REACT_APP_FSTORE_MESSAGING_SENDER_ID,
};

firebase.initializeApp(config);
firebase.firestore();

export default firebase;
