import React from "react";
import firebase from "../Firebase";

export default class LoginView extends React.Component {
  constructor() {
    super();
  }

  componentDidMount() {
    var createAccountForm = document.getElementsByClassName("create-account-form")[0];
        createAccountForm.addEventListener("submit", (e) => {
          e.preventDefault();
          var email = document.getElementsByClassName("create-email")[0].value;
          var password = document.getElementsByClassName("create-password")[0].value;
          firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
            alert(error.message);
          });
        });

    var loginForm = document.getElementsByClassName("login-view-form")[0];
        loginForm.addEventListener("submit", (e) => {
          e.preventDefault();
          var email = document.getElementsByClassName("login-email")[0].value;
          var password = document.getElementsByClassName("login-password")[0].value;
          firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
            alert(error.message);
          });
        });

    firebase.auth().onAuthStateChanged((user) => {
          if(user) {
            document.getElementsByClassName("backdrop-item")[0].style.display = "none";
            document.getElementsByClassName("login-view")[0].style.display = "none";
            updateDatabase();
          } else {
            document.getElementsByClassName("backdrop-item")[0].style.display = "block";
            document.getElementsByClassName("login-view")[0].style.display = "block";
            console.log("null user");
          }
    });

    function updateDatabase() {
      firebase.database().ref("emails/" + firebase.auth().currentUser.uid).push().update({
        email: firebase.auth().currentUser.email,
      });
    console.log("did it");
    }
  }

  render() {
    return (
      <div>
      <div className="backdrop-item"></div>
      <div className="login-view">
        Login Here
        <br></br>
        <form action="/" className="login-view-form">
          <label for="email">
            Email
          </label>
          <input type="email" className="login-email" required/>

          <label for="password">
            Password
          </label>
          <input type="password" className="login-password" required/>

          <input type="submit" value="Submit"/>
          </form>

          <br></br>
          or, Create and Account
          <br></br>

          <form action="/" className="create-account-form">
          <label for="email">
            Email
          </label>
          <input type="email" className="create-email" required/>

          <label for="password">
            Password
          </label>
          <input type="password" className="create-password" required/>

          <input type="submit" value="Submit"/>
          </form>
      </div>
      </div>
    );
  }
}
