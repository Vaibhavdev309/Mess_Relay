import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const GetComplaint = () => {
  const user = localStorage.getItem("usersdataid");
  const role = localStorage.getItem("usersdatarole");
  const [complaints, setComplaints] = useState([]);
  const [comment, setComment] = useState("");
  const navigate = useNavigate();
  const doComment = (event) => {
    event.preventDefault();
    // axios
    //   .post(`/comp/commented/${id}`, { user, comment })
    //   .then(() => {
    //     setComment("");
    //     console.log("successfully add the comment to database");
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });
  };

  const fetchData = async () => {
    try {
      const response = await axios.get("/showComplaints"); // Replace with your actual API endpoint
      setComplaints(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
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
      navigate("/mainpage/allcomplaint");
    }
  };
  useEffect(() => {
    ComplaintValid();
  }, []);
  useEffect(() => {
    axios
      .get("/showComplaints")
      .then((complaints) => setComplaints(complaints.data))
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div>
      {complaints.map((complaint) => {
        return (
          <div key={complaint._id}>
            <form onSubmit={doComment}>
              <input
                type="text"
                onChange={(e) => {
                  setComment(e.target.value);
                }}
              />
              <button>Submit</button>
            </form>
            {role === "Student" && <div>hello</div>}
            <p key={complaint._id}>{complaint.complaint}</p>
            {(role === "Accountant" || role === "Professor") && (
              <Link onClick={() => doDelete(complaint._id)}>
                <i class="fa-solid fa-trash"></i>
              </Link>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default GetComplaint;
