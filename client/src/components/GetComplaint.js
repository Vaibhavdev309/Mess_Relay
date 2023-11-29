import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import Inbox from "./Inbox";

const GetComplaint = () => {
  const user = localStorage.getItem("usersdataid");
  const hostel = localStorage.getItem("usersdatahostel");
  const role = localStorage.getItem("usersdatarole");
  const [complaints, setComplaints] = useState([]);
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
      navigate("/mainpage/allcomplaint");
    }
  };
  useEffect(() => {
    ComplaintValid();
  }, []);
  useEffect(() => {
    axios
      .post(`${process.env.REACT_APP_API_URL}/showComplaints`, { hostel })
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
            <Inbox
              complaintId={complaint._id}
              name={complaint.fname}
              subject={complaint.subject}
              // complaint={complaint.complaint}
              arr={complaint.likedBy}
              situation={complaint.situation}
              user={complaint.user}
              resolve={complaint.resolved}
              regno={complaint.regno}
              hostel={complaint.hostel}
            />
          </div>
        );
      })}
    </div>
  );
};

export default GetComplaint;

// <div>
//   {complaints.map((complaint) => {
//     return (
//       <div key={complaint._id}>
//         <form onSubmit={doComment}>
//           <input
//             type="text"
//             onChange={(e) => {
//               setComment(e.target.value);
//             }}
//           />
//           <button>Submit</button>
//         </form>
//         {role === "Student" && <div>hello</div>}
//         <p key={complaint._id}>
//           {complaint.complaint}
//           {(role === "Accountant" || role === "Professor") && (
//             <div>
//               <Link onClick={() => doResolve(complaint._id)}>
//                 <i class="fa-solid fa-check"></i>
//               </Link>
//               <Link onClick={() => doDelete(complaint._id)}>
//                 <i class="fa-solid fa-trash"></i>
//               </Link>
//             </div>
//           )}
//         </p>
//       </div>
//     );
//   })}
// </div>
