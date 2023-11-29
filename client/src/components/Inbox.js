import "./Inbox.css";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const Inbox = (props) => {
  // const fName = localStorage.getItem("usersdatafname");
  // const [selectedImg, setSelectedImg] = useState("");
  // const history = useNavigate();
  // const id = localStorage.getItem("usersdataid");
  const user = localStorage.getItem("usersdataid");
  const [selectedFile, setSelectedFile] = useState(null);
  const fetchImage = () => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/getimage/${props.user}`)
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

  const [liked, setLiked] = useState(
    props.arr.includes(user) ? "fas fa-thumbs-up liked" : "fas fa-thumbs-up"
  );

  const role = localStorage.getItem("usersdatarole");
  const [complaints, setComplaints] = useState([]);
  const navigate = useNavigate();
  const fetchData = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/showComplaints`
      ); // Replace with your actual API endpoint
      setComplaints(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  const truncateText = (text, maxLength) => {
    // if (text.length > maxLength) {
    //   return text.slice(0, maxLength) + "...";
    // } else {
    //   return text;
    // }
  };
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

  const doDelete = async (id) => {
    try {
      await axios.delete(`${process.env.REACT_APP_API_URL}/comp/${id}`);
      fetchData(); // Fetch data after successful deletion
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    console.log("I rerender the page");
    fetchData(); // Fetch data on initial component mount
  }, [liked, complaints]);
  const doResolve = async (id) => {
    try {
      await axios.get(`${process.env.REACT_APP_API_URL}/comp/resolved/${id}`);
    } catch (err) {
      throw err;
    }
  };
  return (
    <div class="bigContainer">
      <div class="container1">
        <div style={{ width: "100px" }}>
          <img
            src={`${process.env.REACT_APP_API_URL}/${selectedFile}`}
            alt=""
            style={{ width: "40px", height: "40px", borderRadius: "50%" }}
          />
        </div>
        <Link to={`../${props.complaintId}`}>
          <div className="name" style={{ width: "400px", margin: "auto" }}>
            {props.name}
          </div>
        </Link>
        <div className="subject">{props.subject}</div>
        <div className="regno">{props.regno}</div>
        <div className="hostel">{props.hostel}</div>
        <div className="complaint">{truncateText(props.complaint, 30)}</div>
        <div className="icon">
          <Link>
            <i class="fa fa-star"></i>
          </Link>
          <div class="like">
            <Link
              onClick={() => {
                doLike(props.complaintId);
                const isLiked = props.arr.includes(user);
                setLiked(
                  isLiked ? "fas fa-thumbs-up liked" : "fas fa-thumbs-up"
                );
              }}
            >
              <i className={liked}></i>
            </Link>
            <p>{props.arr.length}</p>
          </div>

          {(role === "Accountant" ||
            role === "Chief Warden" ||
            role === "Admin") && (
            <div>
              <Link onClick={() => doResolve(props.complaintId)}>
                <i
                  class={
                    props.resolve === true
                      ? "fa-solid fa-check liked"
                      : "fa-solid fa-check"
                  }
                ></i>
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
{
  /* <div class="container5">
      <h2>
        Responsive Tables Using LI <small>Triggers on 767px</small>
      </h2>
      <ul class="responsive-table">
        <li class="table-header">
          <div class="col col-1">Registration No.</div>
          <div class="col col-2">Name</div>
          <div class="col col-3">Subject</div>
          <div class="col col-3">Situation</div>
          <div class="col col-4">Created On</div>
        </li>
        <li class="table-row">
          <div class="col col-1" data-label="Job Id">
            {props.name}
          </div>
          <div class="col col-3" data-label="Amount">
            {props.Reg}
          </div>
          <div class="col col-2" data-label="Customer Name">
            <Link to={`../${props.name}`}>{props.subject}</Link>
          </div>
          <div class="col col-3" data-label="Amount">
            {props.situation}
          </div>
          <div class="col col-4" data-label="Payment Status">
            {props.date}
          </div>
          <Link>
            <i class="fa fa-star"></i>
          </Link>
          <div class="like">
            <Link onClick={doLike}>
              <i
                class={
                  props.arr.includes(user)
                    ? "fas fa-thumbs-up liked"
                    : "fas fa-thumbs-up"
                }
              ></i>
            </Link>
            <p>{props.arr.length}</p>
          </div>

          {(role === "Accountant" || role === "Professor") && (
            <div>
              <Link onClick={() => doResolve(props.complaintId)}>
                <i
                  class={
                    props.resolve === true
                      ? "fa-solid fa-check liked"
                      : "fa-solid fa-check"
                  }
                ></i>
              </Link>
              <Link onClick={() => doDelete(props.complaintId)}>
                <i class="fa-solid fa-trash"></i>
              </Link>
            </div>
          )}
        </li>
      </ul>
    </div> */
}
