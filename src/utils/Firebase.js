import firebase from 'firebase/app';
import algoliasearch from 'algoliasearch';
import 'firebase/auth';
import 'firebase/firestore';

const config = {   
    apiKey: "AIzaSyDtUozP43e9ygkqV0HpKYRFznePouI2zg0",
    authDomain: "verminbuilds.firebaseapp.com",
    databaseURL: "https://verminbuilds.firebaseio.com",
    projectId: "verminbuilds",
    storageBucket: "verminbuilds.appspot.com",
    messagingSenderId: "939733493836",
    appId: "1:939733493836:web:633eca15d156a09e3a2ce9"
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