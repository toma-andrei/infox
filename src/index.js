import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import Layout from "./components/Layout/Layout";
import { BrowserRouter } from "react-router-dom";

ReactDOM.render(
  <Layout>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Layout>,
  document.getElementById("root")
);
