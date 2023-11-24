import React, { useEffect, useState } from "react";
import Avatar from "@mui/material/Avatar";
import "./header.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const LogoutUser = async (history) => {
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
  const fName = localStorage.getItem("usersdatafname");
  // const [selectedImg, setSelectedImg] = useState("");
  const history = useNavigate();
  // const id = localStorage.getItem("usersdataid");
  const user = localStorage.getItem("usersdataid");
  const [selectedFile, setSelectedFile] = useState(null);
  const fetchImage = () => {
    axios
      .get(`/getimage/${user}`)
      .then((res) => {
        setSelectedFile(res.data.image);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    fetchImage();
  }, []);

  return (
    <header>
      <nav>
        <h1>{fName}</h1>
        <div className="avtar">
          <Avatar
            onClick={() => {
              LogoutUser(history); // Pass history to LogoutUser
            }}
            style={{ backgroundColor: "blue" }}
          >
            {selectedFile && (
              <img
                src={`http://localhost:8009/${selectedFile}`}
                style={{ width: "40px", height: "40px" }}
                alt=""
              />
            )}
          </Avatar>
        </div>
      </nav>
    </header>
  );
};

export default Header;
