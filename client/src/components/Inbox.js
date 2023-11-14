import "./Inbox.css";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const Inbox = (props) => {
  const user = localStorage.getItem("usersdataid");
  const role = localStorage.getItem("usersdatarole");
  const [complaints, setComplaints] = useState([]);
  const [comment, setComment] = useState("");
  const navigate = useNavigate();
  const fetchData = async () => {
    try {
      const response = await axios.get("/showComplaints"); // Replace with your actual API endpoint
      setComplaints(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  const truncateText = (text, maxLength) => {
    if (text.length > maxLength) {
      return text.slice(0, maxLength) + "...";
    } else {
      return text;
    }
  };

  const doDelete = async (id) => {
    try {
      await axios.delete(`/comp/${id}`);
      fetchData(); // Fetch data after successful deletion
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchData(); // Fetch data on initial component mount
  }, []);
  const doResolve = async (id) => {
    try {
      await axios.get(`/comp/resolved/${id}`);
    } catch (err) {
      throw err;
    }
  };
  return (
    <div class="bigContainer">
      <div class="container1">
        <div className="name">{props.name}</div>
        <div className="subject">{props.subject}</div>
        <div className="complaint">{truncateText(props.complaint, 30)}</div>
        <div className="icon">
          <i class="fa fa-star"></i>
          <i class="fa fa-paperclip"></i>
          <i class="fas fa-thumbs-up"></i>
          {(role === "Accountant" || role === "Professor") && (
            <div>
              <Link onClick={() => doResolve(props.complaintId)}>
                <i class="fa-solid fa-check"></i>
              </Link>
              <Link onClick={() => doDelete(props.complaintId)}>
                <i class="fa-solid fa-trash"></i>
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Inbox;

{
  /* <div class="mail-box">
  <table class="table table-inbox table-hover">
    <tbody>
      <tr class="unread">
        <input type="checkbox" class="mail-checkbox" />
        {props.heading}
        {props.description}
        <td class="inbox-small-cells view-message inbox-small-cells">
          <i class="fa fa-star"></i>
        </td>
        <td class="view-message inbox-small-cells">
          <i class="fa fa-paperclip"></i>
        </td>
        <td class="view-message inbox-small-cells">
          <i class="fas fa-thumbs-up"></i>
        </td>
        <td class="view-message text-right">{props.date}</td>
      </tr>
    </tbody>
  </table>
</div>; */
}
