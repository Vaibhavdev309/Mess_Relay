import React, { Component } from "react";
import axios from "axios";
import { NavLink } from "react-router-dom";

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      passShow: false,
      cPassShow: false,
      fName: "",
      email: "",
      regNo: "",
      password: "",
      cPassword: "",
    };
    this.onInputChange1 = this.onInputChange1.bind(this);
    this.onInputChange2 = this.onInputChange2.bind(this);
    this.onInputChange3 = this.onInputChange3.bind(this);
    this.onInputChange4 = this.onInputChange4.bind(this);
    this.onInputChange5 = this.onInputChange5.bind(this);
  }
  onInputChange1(event) {
    const { value } = event.target;
    this.setState({ fName: value });
  }
  onInputChange2(event) {
    const { value } = event.target;
    this.setState({ email: value });
  }
  onInputChange3(event) {
    const { value } = event.target;
    this.setState({ regNo: value });
  }
  onInputChange4(event) {
    const { value } = event.target;
    this.setState({ password: value });
  }
  onInputChange5(event) {
    const { value } = event.target;
    this.setState({ cPassword: value });
  }

  addUserData = (event) => {
    event.preventDefault();
    const { fName, email, regNo, password, cPassword } = this.state;
    if (fName === "") {
      console.log("Please enter your first name");
    } else if (!email.includes("@" && ".")) {
      console.log("Please enter a valid email ID");
    } else if (regNo === "" || regNo.length < 7) {
      console.log("Please enter a valid registration number");
    } else if (password.length < 7) {
      console.log("Password must be greater than 7 characters");
    } else if (password !== cPassword) {
      console.log("Password should match confirm password");
    } else {
      axios
        .post("/register", this.state)
        .then(() => {
          this.setState({
            fName: "",
            regNo: "",
            email: "",
            password: "",
            cPassword: "",
          });
          alert("Registration Successfully Done");
        })
        .catch((error) => {
          console.error("Error:", error.response.data);
        });
    }
  };
  render() {
    return (
      <>
        <section>
          <div className="form_data">
            <div className="form_heading">
              <h1>Sign Up</h1>
              <p style={{ textAlign: "center" }}>
                We are glad that you are using Project Cloud to manage
                <br /> your tasks! We hope that you will get like it.
              </p>
            </div>
            <form action="">
              <div className="form_input">
                <label htmlFor="fname">Name</label>
                <input
                  onChange={this.onInputChange1}
                  value={this.state.fName}
                  type="fname"
                  name="fname"
                  id="fname"
                  placeholder="Enter your name"
                />
              </div>
              <div className="form_input">
                <label htmlFor="email">Email</label>
                <input
                  onChange={this.onInputChange2}
                  value={this.state.email}
                  type="email"
                  name="email"
                  id="email"
                  placeholder="Enter you Email address"
                />
              </div>
              <div className="form_input">
                <label htmlFor="regNo">Registration No.</label>
                <input
                  onChange={this.onInputChange3}
                  value={this.state.regNo}
                  type="number"
                  name="regNo"
                  id="regNo"
                  placeholder="Enter you Registration No."
                />
              </div>
              <div className="form_input">
                <label htmlFor="password">Password</label>
                <div className="two">
                  <input
                    onChange={this.onInputChange4}
                    value={this.state.password}
                    type={!this.state.passShow ? "password" : "text"}
                    name="password"
                    id="password"
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
              <div className="form_input">
                <label htmlFor="cPassword">Confirm Password</label>
                <div className="two">
                  <input
                    onChange={this.onInputChange5}
                    value={this.state.cPassword}
                    type={!this.state.cPassShow ? "password" : "text"}
                    name="cPassword"
                    id="cPassword"
                    placeholder="Confirm your password"
                  />
                  <div
                    className="showpass"
                    onClick={() => {
                      this.setState({ cPassShow: !this.state.cPassShow });
                    }}
                  >
                    {!this.state.cPassShow ? "Show" : "Hide"}
                  </div>
                </div>
              </div>
              <button className="btn" onClick={this.addUserData}>
                Sign Up
              </button>
              <p>
                Already have an account? <NavLink to={"/"}>Log In</NavLink>
              </p>
            </form>
          </div>
        </section>
      </>
    );
  }
}

export default Register;
