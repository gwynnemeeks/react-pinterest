import firebase from 'firebase/app';
import apiKeys from '../helpers/apiKeys.json';

const firebaseApp = () => {
  if (!firebase.apps.length) {
    firebase.initializeApp(apiKeys.firebaseConfig);
  }
};

export default { firebaseApp };
