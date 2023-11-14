import React from "react";
import Sidebar from "../components/Sidebar.js";
import { Outlet } from "react-router-dom";

import Header from "../components/Header.js";
import "./Mainpage.css"; // Import the CSS file

const Mainpage = () => {
  return (
    <div>
      <div className="header">
        <Header />
      </div>
      <div className="sidebar">
        <Sidebar />
      </div>
      <div className="outlet">
        <Outlet />
      </div>
    </div>
  );
};

export default Mainpage;
