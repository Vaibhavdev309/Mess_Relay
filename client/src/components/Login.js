import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import axios from "axios";
import "./mix.css";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      passShow: false,
      regNo: "",
      password: "",
    };
    this.onInputChange1 = this.onInputChange1.bind(this);
    this.onInputChange2 = this.onInputChange2.bind(this);
  }
  loginUser = (event) => {
    event.preventDefault();
    const { regNo, password } = this.state;
    if (regNo === "" || regNo.length < 7) {
      console.log("Please enter a valid registration number");
    } else if (password.length < 7) {
      console.log("Password must be greater than 7 characters");
    } else {
      axios
        .post("/login", this.state)
        .then(() => {
          console.log("Successfull login to the account");
        })
        .catch((error) => {
          console.log(error.response.data);
        });
    }
  };

  onInputChange1(event) {
    const { value } = event.target;
    this.setState({ regNo: value });
  }
  onInputChange2(event) {
    const { value } = event.target;
    this.setState({ password: value });
  }

  render() {
    return (
      <section>
        <div className="form_data">
          <div className="form_heading">
            <h1>Welcome Back, Log in</h1>
            <p>Hi,we are glad you are back. Please Login</p>
          </div>
          <form action="">
            <div className="form_input">
              <label htmlFor="regNo">Registration No.</label>
              <input
                type="number"
                name="regNo"
                id="regNo"
                value={this.state.regNo}
                onChange={this.onInputChange1}
                placeholder="Enter you Email address"
              />
            </div>
            <div className="form_input">
              <label htmlFor="password">Password</label>
              <div className="two">
                <input
                  type={!this.state.passShow ? "password" : "text"}
                  name="password"
                  id="password"
                  value={this.state.password}
                  onChange={this.onInputChange2}
                  placeholder="Enter your password"
                />
                <div
                  className="showpass"
                  onClick={() => {
                    this.setState({ passShow: !this.state.passShow });
                  }}
                >
                  {!this.state.passShow ? "Show" : "Hide"}
                </div>
              </div>
            </div>
            <button className="btn" onClick={this.loginUser}>
              Login
            </button>
            <p>
              Don't have an Account? <NavLink to={"/register"}>Sign up</NavLink>
            </p>
          </form>
        </div>
      </section>
    );
  }
}

export default Login;
