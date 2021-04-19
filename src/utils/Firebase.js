import firebase from 'firebase/app';
import algoliasearch from 'algoliasearch';
import 'firebase/auth';
import 'firebase/firestore';

const config = {   
    apiKey: "AIzaSyBD4fAmwgqETnUzgH3D7MLG08_nbH7FH8Y",
    authDomain: "ranaldsgift.firebaseapp.com",
    databaseURL: "https://ranaldsgift.firebaseio.com",
    projectId: "ranaldsgift",
    storageBucket: "ranaldsgift.appspot.com",
    messagingSenderId: "228473427597",
    appId: "1:228473427597:web:74d72aa23648fb1a5cf4c4",
    measurementId: "G-9LDVWJ6KT1"
};

const ALGOLIA_ID = "BLL3SVMO33";
const ALGOLIA_ADMIN_KEY = "69ae62ddcfb8a9866029a4d66cd6dada";
const ALGOLIA_SEARCH_KEY = "21ac76de7c9e5855688106fb64198b4c";

const client = algoliasearch(ALGOLIA_ID, ALGOLIA_ADMIN_KEY);

firebase.initializeApp(config);

const auth = firebase.auth();
const db = firebase.firestore();

const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
const emailAuthProvider = new firebase.auth.EmailAuthProvider();

export { auth, firebase, db, googleAuthProvider, emailAuthProvider, client, ALGOLIA_ID, ALGOLIA_SEARCH_KEY};