import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const YourComplaint = () => {
  const [complaints, setComplaints] = useState([]);
  const navigate = useNavigate();
  const doLike = (id) => {
    const user = localStorage.getItem("usersdataid");
    axios
      .post(`/comp/liked/${id}`, { user })
      .then((ans) => {
        console.log(ans);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const ComplaintValid = async () => {
    let token = localStorage.getItem("usersdatatoken");
    const res = await fetch("/validUser", {
      method: "GET",
      headers: { "Content-Type": "application/json", Authorization: token },
    });
    const data = await res.json();
    if (data.status === 401 || !data) {
      navigate("*");
    } else {
      navigate("/mainpage/yourcomplaint");
    }
  };
  useEffect(() => {
    ComplaintValid();
  }, []);
  const user = localStorage.getItem("usersdataid");
  useEffect(() => {
    axios
      .post("/mycomplaint", { user })
      .then((complaints) => setComplaints(complaints.data))
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div>
      {complaints.map((complaint) => {
        return (
          <div>
            <p key={complaint._id}>
              <Link
                onClick={() => {
                  doLike(complaint._id);
                }}
              >
                <i class="fa-solid fa-heart"></i>
              </Link>
              {complaint.complaint}
            </p>
          </div>
        );
      })}
    </div>
  );
};

export default YourComplaint;
