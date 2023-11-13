import React from "react";
import "./SidebarStyle.css";

const Sidebar = () => {
  return (
    <div className="sidebar">
      <ul>
        <li>
          <a href="/mainpage/yourcomplaint">
            <span className="icon">
              <i class="fa-solid fa-house"></i>
            </span>
            <span className="text">Your Complaint</span>
          </a>
        </li>
        <li>
          <a href="/mainpage/createcomplaint">
            <span className="icon">
              <i class="fa-solid fa-building"></i>
            </span>
            <span className="text">Add Complaint</span>
          </a>
        </li>
        <li>
          <a href="/mainpage/allcomplaint">
            <span className="icon">
              <i class="fa-solid fa-house"></i>
            </span>
            <span className="text">All Complaint</span>
          </a>
        </li>
        <li>
          <a href="#">
            <span className="icon">
              <i class="fa-solid fa-check"></i>
            </span>
            <span className="text">Resolved Complaint</span>
          </a>
        </li>
        <li>
          <a href="#">
            <span className="icon">
              <i class="fa-solid fa-right-from-bracket"></i>
            </span>
            <span className="text">logout</span>
          </a>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
