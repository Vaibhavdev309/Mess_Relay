import React from "react";
import Avatar from "@mui/material/Avatar";
import "./header.css";
import { useNavigate } from "react-router-dom";

const LogoutUser = async (history) => {
  // Pass useNavigate as a parameter
  let token = localStorage.getItem("usersdatatoken");
  const res = await fetch("/logout", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
      Accept: "application/json",
    },
    credentials: "include",
  });
  const data = await res.json();
  if (data.status === 201) {
    console.log("user Logout");
    localStorage.removeItem("usersdatatoken");
    history("/");
  } else {
    console.log("error");
  }
};

const Header = () => {
  const history = useNavigate(); // Get useNavigate function

  return (
    <header>
      <nav>
        <h1>Hp Cloud</h1>
        <div className="avtar">
          <Avatar
            onClick={() => {
              LogoutUser(history); // Pass history to LogoutUser
            }}
            style={{ backgroundColor: "blue" }}
          >
            H
          </Avatar>
        </div>
      </nav>
    </header>
  );
};

export default Header;
