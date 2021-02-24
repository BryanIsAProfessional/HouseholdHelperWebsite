import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
var firebaseConfig = {
apiKey: "AIzaSyA8UurwRNADFJFfJNuqj5wsd9naDORWZoY",
authDomain: "household-helper-2386a.firebaseapp.com",
databaseURL: "https://household-helper-2386a-default-rtdb.firebaseio.com",
projectId: "household-helper-2386a",
storageBucket: "household-helper-2386a.appspot.com",
messagingSenderId: "295043722321",
appId: "1:295043722321:web:991d58cc83902b42c41c70",
measurementId: "G-M7SK7NQ2V6"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();
firebase.firestore().settings({ timestampsInSnapshots: true })

export default firebase;