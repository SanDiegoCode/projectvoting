import React from "react";
import firebase from "../Firebase";

export default class Submission extends React.Component {
  constructor() {
    super();
  }

  componentDidMount() {
    const ref = this.props.data.ref;
    var btn = document.getElementById(this.props.data.key);
    console.log(this.props.data.key);
    btn.addEventListener("mousedown", () => {
      if(localStorage.getItem("votes").length >= 4) {
        alert("Sorry bud, only three votes!");
        return;
      }
      firebase.database().ref("submissions/" + ref + "/votes").push().set({
        email: firebase.auth().currentUser.email,
        uid: firebase.auth().currentUser.uid,
      });
      firebase.database().ref("emails/" + firebase.auth().currentUser.uid).push().set({
        vote: true,
        ref,
      })
      var votes = localStorage.getItem("votes") + "1";
      localStorage.setItem("votes", votes);
      console.log(localStorage.getItem("votes"));
    });
  }

  render() {
    return (
      <div className="submission">
        <div className="submission-text">{this.props.data.name} submitted <a target="_blank" className="submission-link" href={this.props.data.url}>{this.props.data.url}</a></div>
        <input id={this.props.data.key} className="submission-upvote-button" type="button" value="Up Vote"/>
        <div className="submission-votes">{(this.props.data.votes) ? Object.keys(this.props.data.votes).length : 0}</div>
      </div>
    );
  }
}
