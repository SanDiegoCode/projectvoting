import * as firebase from "firebase";

var config = {
  apiKey: "AIzaSyBnZXORi9zQvtJrA9dHVwZA5bOnUG-Zoms",
  authDomain: "sdcodingpensubmission.firebaseapp.com",
  databaseURL: "https://sdcodingpensubmission.firebaseio.com",
  projectId: "sdcodingpensubmission",
  storageBucket: "",
  messagingSenderId: "744212460193"
};
const FBApp = firebase.initializeApp(config);

export default FBApp;
