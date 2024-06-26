import "./LoginStyle.css";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "./Navbar";

const LoginPage = () => {
  const navigate = useNavigate();
  const [passShow, setPassShow] = useState(false);
  const [cPassShow, setCPassShow] = useState(false);
  const [fName, setFName] = useState("");
  const [email, setEmail] = useState("");
  const [regNo, setRegNo] = useState("");
  const [hostel, setHostel] = useState("");
  const [role, setRole] = useState("");
  const [password, setPassword] = useState("");
  const [cPassword, setCPassword] = useState("");

  const onInputChange1 = (event) => setFName(event.target.value);
  const onInputChange2 = (event) => setEmail(event.target.value);
  const onInputChange3 = (event) => setRegNo(event.target.value);
  const onInputChange4 = (event) => setPassword(event.target.value);
  const onInputChange5 = (event) => setCPassword(event.target.value);
  const onInputChange6 = (event) => setRole(event.target.value);
  const onInputChange7 = (event) => setHostel(event.target.value);

  const addUserData = (event) => {
    event.preventDefault();
    if (fName === "") {
      alert("Please enter your first name");
    } else if (!email.includes("@") || !email.includes(".")) {
      alert("Please enter a valid email ID");
    } else if (regNo === "" || regNo.length < 7) {
      alert("Please enter a valid registration number");
    } else if (password.length < 7) {
      alert("Password must be greater than 7 characters");
    } else if (password !== cPassword) {
      alert("Password should match confirm password");
    } else {
      axios
        .post(`${process.env.REACT_APP_API_URL}/register`, {
          fName,
          email,
          regNo,
          password,
          cPassword,
          role,
          hostel,
        })
        .then(async (response) => {
          alert("Registration Successfully Done");
          const res = response.data.result;
          if (response.status === 201) {
            localStorage.setItem("usersdatatoken", res.token);
            localStorage.setItem("usersdatafname", res.data.fName);
            localStorage.setItem("usersdataregno", res.data.regNo);
            localStorage.setItem("usersdataemail", res.data.email);
            localStorage.setItem("usersdataid", res.data._id);
            localStorage.setItem("usersdatarole", res.data.role);
            localStorage.setItem("usersdatahostel", res.data.hostel);
            setFName("");
            setRegNo("");
            setEmail("");
            setPassword("");
            setCPassword("");
            setRole("");
            setHostel("");
            console.log("paar ho gye");
            navigate("/mainpage/afterlogin");
          }
        })
        .catch((error) => {
          console.error("Error:", error);
          alert(error.response.data.message);
        });
    }
  };
  useEffect(() => {
    if (role === "Admin") {
      setHostel("All");
    }
  }, [onInputChange6]);

  const loginUser = (event) => {
    event.preventDefault();
    if (regNo === "" || regNo.length < 7) {
      alert("Please enter a valid registration number");
    } else if (password.length < 7) {
      alert("Password must be greater than 7 characters");
    } else {
      axios
        .post(`${process.env.REACT_APP_API_URL}/login`, { regNo, password })
        .then(async (response) => {
          setRegNo("");
          setPassword("");
          const res = response.data;
          if (res.status === 201) {
            localStorage.setItem("usersdatatoken", res.result.token);
            localStorage.setItem("usersdatafname", res.result.userValid.fName);
            localStorage.setItem("usersdataregno", res.result.userValid.regNo);
            localStorage.setItem("usersdataemail", res.result.userValid.email);
            localStorage.setItem("usersdataid", res.result.userValid._id);
            localStorage.setItem("usersdatarole", res.result.userValid.role);
            localStorage.setItem(
              "usersdatahostel",
              res.result.userValid.hostel
            );
            navigate("/mainpage/afterlogin");
          }
        })
        .catch((error) => {
          alert(error.response.data.error);
        });
    }
  };

  return (
    <>
      <Navbar />
      <div className="border">
        <div className="container">
          <input type="checkbox" id="flip" />
          <div className="cover">
            <div className="front">
              <img
                src="https://i.pinimg.com/originals/1c/2c/b6/1c2cb61593096ae24c03a8434ec337c2.gif"
                alt=""
              />
              <div className="text">
                <span className="text-1">
                  Every new friend is a <br /> new adventure
                </span>
                <span className="text-2">Let's get connected</span>
              </div>
            </div>
            <div className="back">
              <div className="text">
                <span className="text-1">
                  Complete miles of journey <br /> with one step
                </span>
                <span className="text-2">Let's get started</span>
              </div>
            </div>
          </div>
          <div className="forms">
            <div className="form-content">
              <div className="login-form">
                <div className="title">Login</div>
                <form action="#">
                  <div className="input-boxes">
                    <div className="input-box">
                      <i className="fas fa-envelope"></i>
                      <input
                        type="number"
                        name="regNo"
                        id="regNo"
                        value={regNo}
                        onChange={(e) => setRegNo(e.target.value)}
                        placeholder="Enter your Reg. Number"
                      />
                    </div>
                    <div className="input-box">
                      <i className="fas fa-lock"></i>
                      <input
                        type={!passShow ? "password" : "text"}
                        name="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Enter your password"
                      />
                      <div
                        className="showpass"
                        onClick={() => {
                          setPassShow(!passShow);
                        }}
                      >
                        {!passShow ? "Show" : "Hide"}
                      </div>
                    </div>
                    <div className="text">
                      <a href="/forget">Forgot password?</a>
                    </div>
                    <div className="button input-box">
                      <button className="btn" onClick={loginUser}>
                        Login
                      </button>
                    </div>
                    <div className="text sign-up-text">
                      Don't have an account?{" "}
                      <label htmlFor="flip">Sign up now</label>
                    </div>
                  </div>
                </form>
              </div>
              <div className="signup-form">
                <div className="title">Signup</div>
                <form action="#">
                  <div className="input-boxes">
                    <div className="input-box">
                      <i className="fas fa-user"></i>
                      <input
                        onChange={onInputChange1}
                        value={fName}
                        type="text"
                        name="fname"
                        id="fname"
                        placeholder="Enter Your Name"
                      />
                    </div>
                    <div className="input-box">
                      <i className="fas fa-envelope"></i>
                      <input
                        onChange={onInputChange2}
                        value={email}
                        type="email"
                        name="email"
                        id="email"
                        placeholder="Enter your Email address"
                      />
                    </div>
                    <div className="input-box">
                      <i className="fas fa-user"></i>
                      <input
                        onChange={onInputChange3}
                        value={regNo}
                        type="number"
                        name="regNo"
                        id="regNo"
                        placeholder="Enter your Reg. No."
                      />
                    </div>
                    <div
                      style={{
                        display: "flex",
                        width: "100%",
                        margin: "10px auto",
                        color: "#5b13b9",
                      }}
                      className="input-box"
                    >
                      <i className="fas fa-user" style={{ width: "10%" }}></i>

                      <select
                        onChange={onInputChange6}
                        value={role}
                        style={{
                          flexShrink: "1",
                          width: "40%",
                          margin: "0px 30px",
                        }}
                        name="role"
                        id="role"
                        defaultValue=""
                        required
                      >
                        <option value="" disabled selected>
                          Role
                        </option>
                        <option value="Student">Student</option>
                        <option value="Accountant">Accountant</option>
                        <option value="Chief Warden">Chief Warden</option>
                        <option value="Admin">Admin</option>
                      </select>
                      <select
                        style={{ flexShrink: "1", width: "40%" }}
                        onChange={onInputChange7}
                        name="role"
                        id="role"
                        value={hostel}
                        defaultValue=""
                        required
                      >
                        <option value="" disabled selected>
                          Hostel
                        </option>
                        <option value="SVBH">SVBH</option>
                        <option value="Patel">Patel</option>
                        <option value="Tilak">Tilak</option>
                        <option value="Tandon">Tandon</option>
                        <option value="Tandon">Tagore</option>
                        <option value="Tandon">Malviya</option>
                        <option value="Tandon">Raman</option>
                        <option value="Tandon">KNGH</option>
                        <option value="All">All</option>
                      </select>
                    </div>
                    <div className="input-box">
                      <div className="two">
                        <i className="fas fa-lock"></i>
                        <input
                          onChange={onInputChange4}
                          value={password}
                          type={!passShow ? "password" : "text"}
                          name="password"
                          id="password"
                          placeholder="Enter your password"
                        />
                        <div
                          className="showpass"
                          onClick={() => {
                            setPassShow(!passShow);
                          }}
                        >
                          {!passShow ? "Show" : "Hide"}
                        </div>
                      </div>
                    </div>
                    <div className="input-box">
                      <div className="two">
                        <i className="fas fa-lock"></i>
                        <input
                          onChange={onInputChange5}
                          value={cPassword}
                          type={!cPassShow ? "password" : "text"}
                          name="cPassword"
                          id="cPassword"
                          placeholder="Confirm your password"
                        />
                        <div
                          className="showpass"
                          onClick={() => {
                            setCPassShow(!cPassShow);
                          }}
                        >
                          {!cPassShow ? "Show" : "Hide"}
                        </div>
                      </div>
                    </div>
                    <div className="button input-box">
                      <button className="btn" onClick={addUserData}>
                        Submit
                      </button>
                    </div>
                    <div className="text sign-up-text">
                      Already have an account?{" "}
                      <label htmlFor="flip">Login now</label>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
