import "./Inuser.css";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const Inuser = (props) => {
  // const user = localStorage.getItem("usersdataid");
  const [min, setMin] = useState(0);
  const [time, setTime] = useState(0);
  const [selectedFile, setSelectedFile] = useState(null);
  const fetchImage = () => {
    axios
      .get(`/getimage/${props.userId}`)
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
  const doBlock = () => {
    axios
      .post(`/blockUser/${props.userId}`, { time })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.error(err);
      });
  };
  useEffect(() => doBlock(), [time]);

  const user = localStorage.getItem("usersdataid");
  const [toggle, setToggle] = useState(true);

  // const [liked, setLiked] = useState(
  //   props.arr.includes(user) ? "fas fa-thumbs-up liked" : "fas fa-thumbs-up"
  // );
  const fixTime = (e) => {
    console.log(e.target.value);
    setTime(e.target.value);
  };
  const role = localStorage.getItem("usersdatarole");
  const hostel = localStorage.getItem("usersdatahostel");
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();
  const fetchData = async () => {
    try {
      const response = await axios.get(`/getuser/${hostel}`); // Replace with your actual API endpoint
      setUsers(response.data);
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
  // const doLike = (id) => {
  //   const user = localStorage.getItem("usersdataid");
  //   axios
  //     .post(`/comp/liked/${id}`, { user })
  //     .then((ans) => {
  //       console.log(ans);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // };

  const doDelete = async (id) => {
    try {
      await axios.delete(`/user/${id}`);
      setToggle(!toggle);
      fetchData(); // Fetch data after successful deletion
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    console.log("I rerender the page");
    fetchData(); // Fetch data on initial component mount
  }, [toggle]);
  // const doResolve = async (id) => {
  //   try {
  //     await axios.get(`/comp/resolved/${id}`);
  //   } catch (err) {
  //     throw err;
  //   }
  // };
  return (
    <div class="bigContainer">
      <div class="container1">
        <div>
          <img
            src={`http://localhost:8009/${selectedFile}`}
            alt=""
            style={{ width: "40px", height: "40px", borderRadius: "50%" }}
          />
        </div>
        <div className="regno">{props.regno}</div>
        <div className="name">{props.name}</div>
        <div className="name">{props.role}</div>
        {/* <div className="subject">{props.subject}</div> */}
        {/* <div className="complaint">{truncateText(props.complaint, 30)}</div> */}
        <div className="icon">
          {/* <Link>
            <i class="fa fa-star"></i>
          </Link> */}
          {/* <div class="like">
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
          </div> */}

          <div>
            {/* <Link onClick={() => doResolve(props.complaintId)}>
              <i
                class={
                  props.resolve === true
                    ? "fa-solid fa-check liked"
                    : "fa-solid fa-check"
                }
              ></i>
            </Link> */}
            <select
              onChange={fixTime}
              value={role}
              style={{
                flexShrink: "1",
                width: "40%",
                margin: "0px 30px",
              }}
              name="time"
              id="time"
              defaultValue=""
              required
            >
              <option value="" disabled selected>
                Duration
              </option>
              <option value="100000">100000</option>
              <option value="Accountant">Accountant</option>
              <option value="Chief Warden">Chief Warden</option>
              <option value="Admin">Admin</option>
            </select>
            <Link onClick={() => doBlock(props.userId)}>
              <i class="fa-regular fa-circle-xmark"></i>
            </Link>
            <Link onClick={() => doDelete(props.userId)}>
              <i class="fa-solid fa-trash"></i>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Inuser;
