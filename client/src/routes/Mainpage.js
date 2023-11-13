// Mainpage.js

import React from "react";
import Sidebar from "../components/Sidebar.js";
import { Outlet } from "react-router-dom";

import Header from "../components/Header.js";

const Mainpage = () => {
  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <div>
        <Header />
      </div>
      <div style={{ display: "flex" }}>
        <div>
          <Sidebar />
        </div>
        <Outlet />
      </div>
    </div>
  );
};

export default Mainpage;
