import React from "react";
import "./ServicesStyle.css";

const Services = () => {
  return (
    <section class="service-grid pb-5 pt-5">
      <div class="container">
        <div class="row">
          <div class="col-xl-12 text-center mb-4">
            <div class="service-title">
              <h4>Our Services</h4>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-lg-4 col-md-6 text-center mb-3">
            <div class="service-wrap">
              <div class="service-icon">
              <i class="fa-solid fa-phone"></i>
              </div>
              <h4>24/7 User support</h4>
              <p>
              At Sudosu senpai, we understand that questions and concerns can arise at any time. That's why our dedicated team is available 24/7  to ensure your needs are met efficiently.
              </p>
            </div>
          </div>
          <div class="col-lg-4 col-md-6 text-center mb-3">
            <div class="service-wrap">
              <div class="service-icon">
                <i class="far fa-chart-bar"></i>
              </div>
              <h4>User-Friendly Interface</h4>
              <p>
               Simple and easy to use.Our website has user-friendly interface which involves designing an intuitive, visually appealing, and easy-to-navigate layout.
              </p>
            </div>
          </div>
          <div class="col-lg-4 col-md-6 text-center mb-3">
            <div class="service-wrap">
              <div class="service-icon">
                <i class="fas fa-database"></i>
              </div>
              <h4>Responsive design</h4>
              <p>
              We have designed out interface to be responsive, so it adapts to different screen sizes and devices. This is essential for providing a seamless experience across desktops, tablets, and smartphones.
              </p>
            </div>
          </div>
          <div class="col-lg-4 col-md-6 text-center mb-3">
            <div class="service-wrap">
              <div class="service-icon">
              <i class="fa-solid fa-lock"></i>
              </div>
              <h4>Privacy support</h4>
              <p>
               We understand the importance of privacy so we have encrypted user information  for a  better user experience.
              </p>
            </div>
          </div>
          <div class="col-lg-4 col-md-6 text-center mb-3">
            <div class="service-wrap">
              <div class="service-icon">
                <i class="fas fa-chart-pie"></i>
              </div>
              <h4> User Feedback Mechanism</h4>
              <p>
              We Encourage our users to provide feedback on their support experience so we can improve the user experience.
              </p>
            </div>
          </div>
          <div class="col-lg-4 col-md-6 text-center mb-3">
            <div class="service-wrap">
              <div class="service-icon">
                <i class="fas fa-thumbs-up"></i>
              </div>
              <h4>Dedicated support</h4>
              <p>
                Our team is always dedicated to support and to provide services 24/7 for the users .
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;
