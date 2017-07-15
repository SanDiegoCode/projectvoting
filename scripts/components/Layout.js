import React from "react";

import SubmissionForm from "./SubmissionForm";
import SubmissionList from "./SubmissionList";
import LoginView from "./LoginView";

export default class Layout extends React.Component {
  constructor() {
    super();
  }

  render() {
    return (
      <div className="layout-view">
        <LoginView/>
        <SubmissionForm/>
        <SubmissionList/>
      </div>
    );
  }
}
