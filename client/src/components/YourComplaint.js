import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import Inbox from "./Inbox";

const YourComplaint = () => {
  const [complaints, setComplaints] = useState([]);
  const navigate = useNavigate();
  const doLike = (id) => {
    const user = localStorage.getItem("usersdataid");
    axios
      .post(`${process.env.REACT_APP_API_URL}/comp/liked/${id}`, { user })
      .then((ans) => {
        console.log(ans);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const ComplaintValid = async () => {
    let token = localStorage.getItem("usersdatatoken");
    const res = await fetch(`${process.env.REACT_APP_API_URL}/validUser`, {
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
      .post(`${process.env.REACT_APP_API_URL}/mycomplaint`, { user })
      .then((response) => setComplaints(response.data))
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div>
      {complaints.map((complaint) => {
        return (
          <div key={complaint._id}>
            <Inbox
              complaintId={complaint._id}
              name={complaint.fname}
              subject={complaint.subject}
              // complaint={complaint.complaint}
              arr={complaint.likedBy}
              situation={complaint.situation}
              user={complaint.user}
              resolve={complaint.resolved}
            />
          </div>
        );
      })}
    </div>
    /*{ <div>
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
          </div> }*/
  );
};

export default YourComplaint;
