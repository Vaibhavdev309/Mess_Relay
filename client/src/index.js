import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";

const intervalInMilliseconds = 100000; // 1 hour
setInterval(() => {
  console.log("Email task executed");
}, intervalInMilliseconds);
console.log("hello");

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);
