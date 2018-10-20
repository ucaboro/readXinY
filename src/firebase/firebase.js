import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyBKUwSuwQPjt3ZVraWQ6RvUvIiIaZWA6v8",
    authDomain: "readxiny.firebaseapp.com",
    databaseURL: "https://readxiny.firebaseio.com",
    projectId: "readxiny",
    storageBucket: "readxiny.appspot.com",
    messagingSenderId: "457587296501"
  };

  if (!firebase.apps.length) {
    firebase.initializeApp(config);
  }

  const auth = firebase.auth();
  const db = firebase.database();

  export {
    auth,
    db
  };
