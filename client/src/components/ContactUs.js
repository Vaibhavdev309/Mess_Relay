import React, { useEffect, useState } from "react";
import axios from "axios";
import "./ContactUs.css";

const ContactUs = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const messageSubmit = async (event) => {
    event.preventDefault();
    axios
      .post(`${process.env.REACT_APP_API_URL}/sendmessage`, {
        name,
        email,
        message,
      })
      .then((res) => {
        console.log(res.data).catch((err) => {
          console.log(err);
        });
      });
    // setName("");
    // setEmail("");
    // setMessage("");
  };

  return (
    <div id="ContactUs">
      <div class="container7">
        <div class="content">
          <div class="left-side">
            <div class="address details">
              <i class="fas fa-map-marker-alt"></i>
              <div class="topic">Address</div>
              <div class="text-one">Patel Hostel</div>
              <div class="text-two">MNNIT Allahabad</div>
            </div>
            <div class="phone details">
              <i class="fas fa-phone-alt"></i>
              <div class="topic">Phone</div>
              <div class="text-one">+91 6394529807</div>
              <div class="text-two">+91 9335038656</div>
            </div>
            <div class="email details">
              <i class="fas fa-envelope"></i>
              <div class="topic">Email</div>
              <div class="text-one">pranavkashikey0001@gmail.com</div>
              <div class="text-two">gauravxxxx@gmail.com</div>
            </div>
          </div>
          <div class="right-side">
            <div class="topic-text">Send us a message</div>
            <p>
              If you have any types of queries related to login or filing
              complaint or to give any feedback, you can send me a message from
              here. It's my pleasure to help you.
            </p>
            <form action="#" onSubmit={messageSubmit}>
              <div class="input-box">
                <input
                  type="text"
                  placeholder="Enter your name"
                  onChange={(e) => {
                    setName(e.target.value);
                  }}
                  value={name}
                />
              </div>
              <div class="input-box">
                <input
                  type="text"
                  placeholder="Enter your email"
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                  value={email}
                />
              </div>
              <div class="input-box message-box">
                <textarea
                  name="message-box"
                  id="message-box"
                  cols="30"
                  rows="10"
                  placeholder="Enter your message"
                  onChange={(e) => {
                    setMessage(e.target.value);
                  }}
                  value={message}
                ></textarea>
              </div>
              <div class="button">
                <button type="submit">Send Now</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
