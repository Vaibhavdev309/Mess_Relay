import React from "react";
import Avatar from "@mui/material/Avatar";
import "./header.css";

const Header = () => {
  return (
    <header>
      <nav>
        <h1>Hp Cloud</h1>
        <div className="avtar">
          <Avatar style={{ backgroundColor: "blue" }}>H</Avatar>
        </div>
      </nav>
    </header>
  );
};

export default Header;
