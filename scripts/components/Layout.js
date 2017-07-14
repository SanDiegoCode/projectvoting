import React from "react";

import SubmissionForm from "./SubmissionForm";
import SubmissionList from "./SubmissionList";

export default class Layout extends React.Component {
  constructor() {
    super();
  }

  render() {
    return (
      <div className="layout-view">
        <SubmissionForm/>
        <SubmissionList/>
      </div>
    );
  }
}
