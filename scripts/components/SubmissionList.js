import React from "react";
import firebase from "../Firebase";

import Submission from "./Submission";

export default class SubmissionList extends React.Component {
  constructor() {
    super();
    this.updateList = this.updateList.bind(this);
    this.list = [];
    this.state = {
      renderList: [],
    };
  }

  componentDidMount() {
    var that = this;
    firebase.database().ref("submissions").on("child_added", (snapshot) => {
      var val = snapshot.val();
      val.ref = snapshot.key;
      that.updateList(val);
      that.listenForVoting(snapshot.key);
    }, (error) => {
      console.log(error);
    });
  }

  updateList(val) {
    val.key = "k" + Math.floor(Math.random() * 9999999999999);

    this.list.push(val);
    var renderList = this.state.renderList;
    renderList.push(<Submission key={val.key} data={val}/>);
    this.sortList();
  }

  listenForVoting(key) {
    var that = this;
    firebase.database().ref("submissions/" + key).on("child_changed", (snapshot) => {
      if(snapshot.key == "votes") {
        that.updateSubmission(snapshot.ref.getParent().getKey(), snapshot.val());
        that.sortList();
      }
    }, (error) => {
      console.log(error);
    })
  }

  updateSubmission(key, val) {
    for(var i = 0; i < this.list.length; i++) {
      if(this.list[i].ref == key) {
        this.list[i].votes = val;
      }
    }
  }

  sortList() {
    this.list = this.sort(this.list);
    console.log(this.list);
    var renderList = this.list.map((k) => {
      return (<Submission key={k.key} data={k}/>);
    });
    this.setState({
      renderList,
    });
    console.log("happened");
    console.log(renderList);
  }

  sort(l) {
    var sortedList = [];

    for(var i = 0; i < l.length; i++) {
      for(var k = i; k < l.length; k++) {
        if(compare(l[i], l[k]) < 0) {
          var m = l[k];
          l[k] = l[i];
          l[i] = m;
        }
      }
    }

    function compare(s1, s2) {
      if(!s1.votes && !s2.votes) {
        return 0;
      } else if(s1.votes && !s2.votes) {
        return 1;
      } else if(!s1.votes && s2.votes) {
        return -1;
      }
      return Object.keys(s1.votes).length - Object.keys(s2.votes).length;
    }

    return l;
  }

  render() {
    return (
      <div className="submission-list-view">
        {this.state.renderList}
      </div>
    );
  }
}
