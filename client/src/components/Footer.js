import React from "react";
import "./FooterStyle.css";

const Footer = () => {
  return (
    <section id="Footer" class="footer">
      <div class="footer-row">
        <div class="footer-col">
          <h4>Info</h4>
          <ul class="links">
            <li>
              <a href="#">About Us</a>
            </li>
            <li>
              <a href="#">Hostels</a>
            </li>
            <li>
              <a href="#">Contact us</a>
            </li>
            <li>
              <a href="#"> Our Services</a>
            </li>
            
          </ul>
        </div>

        <div class="footer-col">
          <h4>Connect with us</h4>
          <ul class="links">
            <li>
              <a href="#">Facebook</a>
            </li>
            <li>
              <a href="#">Linkedin</a>
            </li>
           
            <li>
              <a href="#">Instagram</a>
            </li>
            <li>
              <a href="#">Twitter</a>
            </li>
            
          </ul>
        </div>

        <div class="footer-col">
          <h4>Help</h4>
          <ul class="links">
            <li>
              <a href="#">Customer support</a>
            </li>
            <li>
              <a href="#">Privacy Policy</a>
            </li>
            <li>
              <a href="#">Quick solutions</a>
            </li>
            <li>
              <a href="#">Security</a>
            </li>
            <li>
              <a href="#">24/7 Support</a>
            </li>
           
          </ul>
        </div>

        <div class="footer-col">
          <h4>Mail us</h4>
          <p>
            vaibhav.dev.309@gmail.com
          </p>
         
          <div class="icons">
            <i class="fa-brands fa-facebook-f"></i>
            <i class="fa-brands fa-twitter"></i>
            <i class="fa-brands fa-linkedin"></i>
            <i class="fa-brands fa-github"></i>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Footer;
