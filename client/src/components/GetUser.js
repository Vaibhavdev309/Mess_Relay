import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import Inuser from "./Inuser";
import "./Inbox.css";

const GetUser = () => {
  const user = localStorage.getItem("usersdataid");
  const role = localStorage.getItem("usersdatarole");
  const hostel = localStorage.getItem("usersdatahostel");
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();
  //   const doComment = (event) => {
  // event.preventDefault();
  // axios
  //   .post(`/comp/commented/${id}`, { user, comment })
  //   .then(() => {
  //     setComment("");
  //     console.log("successfully add the comment to database");
  //   })
  //   .catch((err) => {
  //     console.log(err);
  //   });
  //   };
  // const fetchDataAndSetComplaints = async () => {
  //   try {
  //     const response = await axios.get("/showComplaints");
  //     setComplaints(response.data);
  //   } catch (error) {
  //     console.error("Error fetching data:", error);
  //   }
  // };

  // const doDelete = async (id) => {
  //   try {
  //     await axios.delete(`/comp/${id}`);
  //     fetchDataAndSetComplaints(); // Fetch data after successful deletion
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  // useEffect(() => {
  //   // Fetch data on initial component mount
  //   fetchDataAndSetComplaints();
  // }, []);

  // const doResolve = async (id) => {
  //   try {
  //     await axios.get(`/comp/resolved/${id}`);
  //   } catch (err) {
  //     throw err;
  //   }
  // };
  // const doDelete = (id) => {
  //   axios
  //     .delete(`/comp/${id}`)
  //     .then(() => {
  //       navigate("/mainpage/allcomplaint");
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // };
  const UserValid = async () => {
    let token = localStorage.getItem("usersdatatoken");
    const res = await fetch("/validUser", {
      method: "GET",
      headers: { "Content-Type": "application/json", Authorization: token },
    });
    const data = await res.json();
    if (data.status === 401 || !data) {
      navigate("*");
    } else {
      navigate("/mainpage/allusers");
    }
  };
  useEffect(() => {
    UserValid();
  }, []);
  useEffect(() => {
    axios
      .post(`/getuser`, { hostel, role })
      .then((users) => setUsers(users.data))
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div>
      {users.map((user) => {
        return (
          <div key={user._id}>
            <Inuser
              userId={user._id}
              name={user.fName}
              regno={user.regNo}
              role={user.role}
              hostel={user.hostel}
              //   subject={user.subject}
              // user={user.user}
              //   arr={user.likedBy}
              //   situation={user.situation}
              //   resolve={user.resolved}
            />
          </div>
        );
      })}
    </div>
  );
};

export default GetUser;
