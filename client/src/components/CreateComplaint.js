import axios from "axios";
import { useState } from "react";
import React, { useEffect } from "react";
import "./CreateComplaint.css";
import { useNavigate } from "react-router-dom";

const CreateComplaint = () => {
  const hostel = localStorage.getItem("usersdatahostel");
  const [victim, setVictim] = useState("");
  const [situation, setSituation] = useState("Intermediate");
  const [authority, setAuthority] = useState("");
  const [subject, setSubject] = useState("");
  const [complaint, setComplaint] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const navigate = useNavigate();

  const ImageUpload = async (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      console.log("File selected:", file);
    }

    // formData.append("user", user);
    // try {
    //   const response = await axios.post("/upload", formData);
    //   setSelectedFile(response.data.image);
    // } catch (error) {
    //   console.error("Error uploading file:", error);
    // }
  };
  // const handleUpload = async (event) => {
  //   event.preventDefault();
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
      navigate("/mainpage/createcomplaint");
    }
  };
  useEffect(() => {
    ComplaintValid();
  }, []);
  const subComp = (event) => {
    event.preventDefault();
    const fname = localStorage.getItem("usersdatafname");
    const user = localStorage.getItem("usersdataid");
    const regno = localStorage.getItem("usersdataregno");
    const formData = new FormData();
    formData.append("compimg", selectedFile);
    formData.append("subject", subject);
    formData.append("complaint", complaint);
    formData.append("user", user);
    formData.append("regno", regno);
    formData.append("fname", fname);
    formData.append("victim", victim);
    formData.append("situation", situation);
    formData.append("authority", authority);
    formData.append("hostel", hostel);
    console.log(formData);
    if (complaint === "" || subject === "" || victim === "") {
      console.log("Please enter valid subject and complaint before submitting");
    } else {
      axios
        .post("/subComp", formData)
        .then(async (response) => {
          // Handle the response
          const res = response.data;
          if (res.status === 201) {
            navigate("/mainpage/createcomplaint");
            setComplaint("");
            setSubject("");
            setAuthority("Mess Manager");
            setSituation("Intermediate");
            setVictim("");
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
          <form method="post" enctype="multipart/form-data">
            <div className="user-details">
              <div className="input-box">
                <span className="details">Name of Victim</span>
                <input
                  type="text"
                  name="victim"
                  id="victim"
                  value={victim}
                  onChange={(e) => {
                    setVictim(e.target.value);
                  }}
                  placeholder="Enter the name of the victim"
                  required
                />
              </div>
              {/* <div className="input-box">
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
              </div> */}
              <div className="input-box">
                <span className="details">Situation</span>
                <select
                  value={situation}
                  onChange={(e) => setSituation(e.target.value)}
                  required
                >
                  <option value="intermediate">Intermediate</option>
                  <option value="critical">Critical</option>
                </select>
              </div>
              <div className="input-box">
                <span className="details">Complaint For</span>
                <select
                  value={authority}
                  onChange={(e) => {
                    setAuthority(e.target.value);
                  }}
                  required
                >
                  <option value="messManager">Mess Manager</option>
                  <option value="accountant">Accountant</option>
                  <option value="chiefWarden">Chief Warden</option>
                  <option value="professor">Professor</option>
                </select>
              </div>
              <div className="input-box">
                <span className="details">Add Image</span>
                <input
                  className="fileadd"
                  type="file"
                  name="compimg"
                  onChange={ImageUpload}
                />
              </div>
            </div>
            <div className="input-box">
              <span className="details">Subject</span>
              <input
                className="subjectForm"
                type="text"
                value={subject}
                onChange={(e) => {
                  setSubject(e.target.value);
                }}
                placeholder="Enter the subject of the file"
                required
              />
            </div>
            <div className="input-box">
              <span className="details">Complaint</span>
              <textarea
                value={complaint}
                onChange={(e) => {
                  setComplaint(e.target.value);
                }}
                placeholder="Enter a detailed description of the incident"
                required
              ></textarea>
            </div>
            <div className="button">
              <button onClick={subComp}>Submit Complaint</button>
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
