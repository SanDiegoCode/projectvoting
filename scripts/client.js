import React from "react";
import ReactDOM from "react-dom";

import Layout from "./components/Layout";

let app = document.getElementById("app");

if(!localStorage.getItem("votes")) {
  localStorage.setItem("votes", 0);
}

ReactDOM.render(<Layout/>, app);
