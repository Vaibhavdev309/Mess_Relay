import React from "react";
import "./SidebarStyle.css";

const Sidebar = () => {
  const role = localStorage.getItem("usersdatarole");
  return (
    <div className="sidebar">
      <ul>
        <li>
          <a href="/mainpage/afterlogin">
            <span className="icon">
              <i class="fa-solid fa-house"></i>
            </span>
            <span className="text">Menu</span>
          </a>
        </li>
        <li>
          <a href="/mainpage/yourcomplaint">
            <span className="icon">
              <i class="fa-solid fa-person"></i>
            </span>
            <span className="text">Your Complaint</span>
          </a>
        </li>
        <li>
          <a href="/mainpage/createcomplaint">
            <span className="icon">
              <i class="fa-solid fa-plus"></i>
            </span>
            <span className="text">Add Complaint</span>
          </a>
        </li>
        <li>
          <a href="/mainpage/allcomplaint">
            <span className="icon">
              <i class="fa-solid fa-people-group"></i>
            </span>
            <span className="text">All Complaint</span>
          </a>
        </li>
        <li>
          <a href="/mainpage/allusers">
            <span className="icon">
              <i class="fa-solid fa-people-group"></i>
            </span>
            <span className="text">All Users</span>
          </a>
        </li>
        <li>
          <a href="/mainpage/timetable">
            <span className="icon">
              <i class="fa-solid fa-table"></i>
            </span>
            <span className="text">Time Table</span>
          </a>
        </li>
        {role === "Professor" && (
          <li>
            <a href="/mainpage/reviewchart">
              <span className="icon">
                <i class="fa-solid fa-chart-simple"></i>
              </span>
              <span className="text">Review Expense</span>
            </a>
          </li>
        )}
        {role === "Professor" && (
          <li>
            <a href="/mainpage/reviewchart">
              <span className="icon">
                <i class="fa-solid fa-chart-simple"></i>
              </span>
              <span className="text">Review Expense</span>
            </a>
          </li>
        )}
        <li>
          <a href="#">
            <span className="icon">
              <i class="fa-solid fa-check"></i>
            </span>
            <span className="text">Resolved Complaint</span>
          </a>
        </li>
        <li>
          <a href="/mainpage/myprofile">
            <span className="icon">
              <i class="fa-regular fa-user"></i>
            </span>
            <span className="text">My Profile</span>
          </a>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
