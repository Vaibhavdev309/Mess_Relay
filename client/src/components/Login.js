import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
import "./mix.css";

const Login = () => {
  const navigate = useNavigate();
  const [passShow, setPassShow] = useState(false);
  const [regNo, setRegNo] = useState("");
  const [password, setPassword] = useState("");

  const loginUser = (event) => {
    event.preventDefault();
    if (regNo === "" || regNo.length < 7) {
      console.log("Please enter a valid registration number");
    } else if (password.length < 7) {
      console.log("Password must be greater than 7 characters");
    } else {
      axios
        .post("/login", { regNo, password })
        .then(async (response) => {
          const res = response.data;
          if (res.status === 201) {
            localStorage.setItem("usersdatatoken", res.result.token);
            navigate("/dash");
            setRegNo("");
            setPassword("");
          }
        })
        .catch((error) => {
          console.log(error.response.data);
        });
    }
  };

  return (
    <section>
      <div className="form_data">
        <div className="form_heading">
          <h1>Welcome Back, Log in</h1>
          <p>Hi, we are glad you are back. Please Login</p>
        </div>
        <form action="">
          <div className="form_input">
            <label htmlFor="regNo">Registration No.</label>
            <input
              type="number"
              name="regNo"
              id="regNo"
              value={regNo}
              onChange={(e) => setRegNo(e.target.value)}
              placeholder="Enter your Registration Number"
            />
          </div>
          <div className="form_input">
            <label htmlFor="password">Password</label>
            <div className="two">
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
          </div>
          <button className="btn" onClick={loginUser}>
            Login
          </button>
          <p>
            Don't have an Account? <NavLink to={"/register"}>Sign up</NavLink>
          </p>
        </form>
      </div>
    </section>
  );
};

export default Login;
