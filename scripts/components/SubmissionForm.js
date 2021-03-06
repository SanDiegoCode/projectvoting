import React from "react";
import firebase from "../Firebase";

export default class SubmissionForm extends React.Component {
  constructor() {
    super();
  }

  componentDidMount() {
    var form = document.getElementById("submission-form");

    form.addEventListener("submit", function(e) {
      if(localStorage.getItem("submitted")) {
        alert("Sorry bud, you can only submit once!");
        return;
      }
      e.preventDefault();
      var data = {
        name: document.getElementById("name").value,
        age: document.getElementById("age").value,
        gender: document.getElementById("gender").value,
        url: document.getElementById("url").value,
        email: firebase.auth().currentUser.email,
      };
      firebase.database().ref("submissions").push().set({
        name: data.name,
        age: data.age,
        gender: data.gender,
        url: data.url,
        email: data.email,
      });
      console.log(data);
      localStorage.setItem("submitted", "true");
    });
  }

  render() {
    return (
      <div className="submission-form-view">
        <form action="/" id="submission-form">
          <label className="submission-label" for="name">
            Name
          </label>
          <input className="standard-input" type="text" name="name" id="name" required/>

          <label className="submission-label" for="age">
            Age
          </label>
          <input className="standard-input" type="number" name="age" id="age" required/>

          <label className="submission-label" for="gender">
            Gender
          </label>
          <input className="standard-input" type="text" name="gender" id="gender" required/>

          <label className="submission-label" for="penurl">
            URL
          </label>
          <input className="standard-input" type="url" name="url" id="url" required/>

          <input className="standard-input-button" type="submit" value="Submit"/>
        </form>
      </div>
    );
  }
}
