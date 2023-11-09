import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const history = useNavigate();
  const DashboardValid = async () => {
    let token = localStorage.getItem("usersdatatoken");
    const res = await fetch("/validUser", {
      method: "GET",
      headers: { "Content-Type": "application/json", Authorization: token },
    });
    const data = await res.json();
    if (data.status == 401 || !data) {
      history("*");
    } else {
      history("/dash");
    }
  };

  useEffect(() => {
    console.log("i reached here");
    DashboardValid();
  }, []);
  return <div>hello You are on the dashboard page</div>;
};

export default Dashboard;
