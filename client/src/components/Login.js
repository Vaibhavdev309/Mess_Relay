import React, { useState } from "react";
import "./mix.css";

const Login = () => {
  const [passShow, setPassShow] = useState(false);

  return (
    <section>
      <div className="form_data">
        <div className="form_heading">
          <h1>Welcome Back, Log in</h1>
          <p>Hi,we are glad you are back. Please Login</p>
        </div>
        <form action="">
          <div className="form_input">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              name="email"
              id="email"
              placeholder="Enter you Email address"
            />
          </div>
          <div className="form_input">
            <label htmlFor="password">Password</label>
            <div className="two">
              <input
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
          <button className="btn">Login</button>
          <p>Don't have an Account? Sign up</p>
        </form>
      </div>
    </section>
  );
};

export default Login;
