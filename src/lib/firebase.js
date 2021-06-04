import Firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

// here i want to import the seed file

// import { seedDatabase } from '../seed';

const config = {
  apiKey: 'AIzaSyB8VdIU4PGB1GhWl97xDH5l2Mjgo7okOi8',
  authDomain: 'mapstagram-team.firebaseapp.com',
  projectId: 'mapstagram-team',
  storageBucket: 'mapstagram-team.appspot.com',
  messagingSenderId: '872661978052',
  appId: '1:872661978052:web:68c4f4a14c69f8cd587291'
};

const firebase = Firebase.initializeApp(config);
const { FieldValue } = Firebase.firestore;

// here is where I want to call the seed file (only ONCE!)
// seedDatabase(firebase);

export { firebase, FieldValue };
