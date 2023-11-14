import axios from "axios";
import { useState } from "react";
import React, { useEffect } from "react";
import "./CreateComplaint.css";
import { useNavigate } from "react-router-dom";

const CreateComplaint = () => {
  const [complaint, setComplaint] = useState("");
  const [subject, setSubject] = useState("");
  const navigate = useNavigate();

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
      navigate("/mainpage/createcomplaint");
    }
  };
  useEffect(() => {
    ComplaintValid();
  }, []);
  const subComp = (event) => {
    const fname = localStorage.getItem("usersdatafname");
    const user = localStorage.getItem("usersdataid");
    const regno = localStorage.getItem("usersdataregno");
    event.preventDefault();
    if (complaint === "" || subject === "") {
      console.log("Please enter valid subject and complaint before submitting");
    } else {
      axios
        .post("/subComp", { subject, complaint, user, regno, fname })
        .then(async (response) => {
          const res = response.data;
          if (res.status === 201) {
            navigate("/mainpage/createcomplaint");
            setComplaint("");
            setSubject("");
          }
        })
        .catch((error) => {
          console.log(error.response.data);
        });
    }
  };
  return (
    <div className="formContainer">
      <div className="container3">
        <div className="title">Mess Complaint Form</div>
        <div className="content">
          <form action="#">
            <div className="user-details">
              <div className="input-box">
                <span className="details">Name of Victim</span>
                <input
                  type="text"
                  placeholder="Enter the name of the victim"
                  required
                />
              </div>
              <div className="input-box">
                <span className="details">Date of Incident</span>
                <input type="date" required />
              </div>
              <div className="input-box">
                <span className="details">Name of Mess</span>
                <input
                  type="text"
                  placeholder="Enter the name of the mess"
                  required
                />
              </div>
              <div className="input-box">
                <span className="details">Situation</span>
                <select required>
                  <option value="critical">Critical</option>
                  <option value="intermediate">Intermediate</option>
                </select>
              </div>
              <div className="input-box">
                <span className="details">Complaint For</span>
                <select required>
                  <option value="accountant">Accountant</option>
                  <option value="chiefWarden">Chief Warden</option>
                  <option value="professor">Professor</option>
                  <option value="messManager">Mess Manager</option>
                </select>
              </div>
              <div className="input-box">
                <span className="details">Add Image</span>
                <input className="fileadd" type="file" accept="image/*" />
              </div>
            </div>
            <div className="input-box">
              <span className="details">Subject</span>
              <input
                className="subjectForm"
                type="text"
                placeholder="Enter the subject of the file"
                required
              />
            </div>
            <div className="input-box">
              <span className="details">Description</span>
              <textarea
                placeholder="Enter a detailed description of the incident"
                required
              ></textarea>
            </div>
            <div className="button">
              <input type="submit" value="Submit Complaint" />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateComplaint;
{
  /* <form action="">
  <input
    type="string"
    name="subject"
    id="subject"
    value={subject}
    onChange={(e) => setSubject(e.target.value)}
    placeholder="Type your Heading here"
  />
  <input
    type="string"
    name="complaint"
    id="complaint"
    value={complaint}
    onChange={(e) => setComplaint(e.target.value)}
    placeholder="Type your complaint here"
  />
  <button type="submit" onClick={subComp}>
    Submit
  </button>
</form>; */
}

// return (
//   <div className="container3">
//     <div className="title">Registration</div>
//     <div className="content">
//       <form action="#">
//         <div className="user-details">
//           <div className="input-box">
//             <span className="details">Full Name</span>
//             <input type="text" placeholder="Enter your name" required />
//           </div>
//           <div className="input-box">
//             <span className="details">Username</span>
//             <input type="text" placeholder="Enter your username" required />
//           </div>
//           <div className="input-box">
//             <span className="details">Email</span>
//             <input type="text" placeholder="Enter your email" required />
//           </div>
//           <div className="input-box">
//             <span className="details">Phone Number</span>
//             <input type="text" placeholder="Enter your number" required />
//           </div>
//           <div className="input-box">
//             <span className="details">Password</span>
//             <input
//               type="password"
//               placeholder="Enter your password"
//               required
//             />
//           </div>
//           <div className="input-box">
//             <span className="details">Confirm Password</span>
//             <input
//               type="password"
//               placeholder="Confirm your password"
//               required
//             />
//           </div>
//         </div>
//         <div className="gender-details">
//           <span className="gender-title">Gender</span>
//           <div className="category">
//             <label htmlFor="dot-1">
//               <input type="radio" name="gender" id="dot-1" />
//               <span className="dot one"></span>
//               <span className="gender">Male</span>
//             </label>
//             <label htmlFor="dot-2">
//               <input type="radio" name="gender" id="dot-2" />
//               <span className="dot two"></span>
//               <span className="gender">Female</span>
//             </label>
//             <label htmlFor="dot-3">
//               <input type="radio" name="gender" id="dot-3" />
//               <span className="dot three"></span>
//               <span className="gender">Prefer not to say</span>
//             </label>
//           </div>
//         </div>
//         <div className="button">
//           <input type="submit" value="Register" />
//         </div>
//       </form>
//     </div>
//   </div>
// );
