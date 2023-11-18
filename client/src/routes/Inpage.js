import React from "react";
import Sidebar from "../components/Sidebar.js";
// import { Outlet } from "react-router-dom";

import Header from "../components/Header.js";
import Comment from "../components/Comment.js";
import Complaint from "../components/Complaint.js";
import "./Inpage.css"; // Import the CSS file

const Inpage = () => {
  return (
    <div>
      <div className="header">
        <Header />
      </div>
      <div className="sidebar">
        <Sidebar />
      </div>
      <div className="complaintBox">
        <Complaint />
      </div>
    </div>
  );
};

export default Inpage;
