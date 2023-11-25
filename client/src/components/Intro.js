import React from "react";
import "./Intro.css";
const Pranav = require("./pranav.jpg");
const Vaibhav = require("./vaibhav.jpeg");
const Gaurav = require("./gaurav.jpg");

const Intro = () => {
  return (
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-md-3 col-sm-6">
          <div class="our-team">
            <div class="pic">
              <img src={Gaurav} />
              <ul class="social">
                <li>
                  <a href="#" class="fab fa-facebook"></a>
                </li>
                <li>
                  <a href="#" class="fab fa-twitter"></a>
                </li>
                <li>
                  <a href="#" class="fab fa-google-plus"></a>
                </li>
                <li>
                  <a href="#" class="fab fa-linkedin"></a>
                </li>
              </ul>
            </div>
            <div class="team-content">
              <div class="team-info">
                <h3 class="title">Gaurav singh</h3>
                <span class="post">Front-end Developer</span>
              </div>
            </div>
          </div>
        </div>

        <div class="col-md-3 col-sm-6">
          <div class="our-team">
            <div class="pic">
              <img src={Vaibhav} />
              <ul class="social">
                <li>
                  <a href="#" class="fab fa-facebook"></a>
                </li>
                <li>
                  <a href="#" class="fab fa-twitter"></a>
                </li>
                <li>
                  <a href="#" class="fab fa-google-plus"></a>
                </li>
                <li>
                  <a href="#" class="fab fa-linkedin"></a>
                </li>
              </ul>
            </div>
            <div class="team-content">
              <div class="team-info">
                <h3 class="title">Vaibhav Maurya</h3>
                <span class="post">Back-end Developer</span>
              </div>
            </div>
          </div>
        </div>
        <div class="col-md-3 col-sm-6">
          <div class="our-team">
            <div class="pic">
              <img src={Pranav} />
              <ul class="social">
                <li>
                  <a href="#" class="fab fa-facebook"></a>
                </li>
                <li>
                  <a href="#" class="fab fa-twitter"></a>
                </li>
                <li>
                  <a href="#" class="fab fa-google-plus"></a>
                </li>
                <li>
                  <a href="#" class="fab fa-linkedin"></a>
                </li>
              </ul>
            </div>
            <div class="team-content">
              <div class="team-info">
                <h3 class="title">Pranav Kashikey</h3>
                <span class="post">Front-end Developer</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Intro;

// <div>
//   <div class="carousel__container">
//     <div class="carousel__item">
//       <img src={Gaurav} class="carousel__image " id="gaurav" />

//       <div class="detail">
//         <h1>Gaurav Singh</h1>
//         <h3>Bachelor's Of Technology</h3>
//         <h3>2nd YeaR</h3>
//         <h3>Electronics and Communication Engineering</h3>
//         <div>
//           <ul class="social-icons">
//             <li>
//               <a href="#">
//                 <i class="fab fa-instagram"></i>
//               </a>
//             </li>
//             <li>
//               <a href="#">
//                 <i class="fa-brands fa-square-facebook"></i>
//               </a>
//             </li>
//             <li>
//               <a href="#">
//                 <i class="fa fa-linkedin"></i>
//               </a>
//             </li>
//             <li>
//               <a href="#">
//                 <i class="fa fa-codepen"></i>
//               </a>
//             </li>
//           </ul>
//         </div>
//       </div>
//     </div>
//     <div class="carousel__item">
//       <img src={Pranav} class="carousel__image" id="pranav" />
//       <div class="detail">
//         <h1>Pranav Kashikey</h1>
//         <h3>Bachelor's Of Technology</h3>
//         <h3>2nd YeaR</h3>
//         <h3>Mechanical Engineering</h3>
//         <div>
//           <ul class="social-icons">
//             <li>
//               <a href="#">
//                 <i class="fa fa-instagram"></i>
//               </a>
//             </li>
//             <li>
//               <a href="#">
//                 <i class="fa fa-twitter"></i>
//               </a>
//             </li>
//             <li>
//               <a href="#">
//                 <i class="fa fa-linkedin"></i>
//               </a>
//             </li>
//             <li>
//               <a href="#">
//                 <i class="fa fa-codepen"></i>
//               </a>
//             </li>
//           </ul>
//         </div>
//       </div>
//     </div>
//     <div class="carousel__item">
//       <img src={Vaibhav} class="carousel__image" id="vaibhav" />
//       <div class="detail">
//         <h1>Vaibhav Maurya</h1>
//         <h3>Bachelor's Of Technology</h3>
//         <h3>2nd YeaR</h3>
//         <h3>Electronics and Communication Engineering</h3>
//         <div>
//           <ul class="social-icons">
//             <li>
//               <a href="#">
//                 <i class="fa fa-instagram"></i>
//               </a>
//             </li>
//             <li>
//               <a href="#">
//                 <i class="fa fa-twitter"></i>
//               </a>
//             </li>
//             <li>
//               <a href="#">
//                 <i class="fa fa-linkedin"></i>
//               </a>
//             </li>
//             <li>
//               <a href="#">
//                 <i class="fa fa-codepen"></i>
//               </a>
//             </li>
//           </ul>
//         </div>
//       </div>
//     </div>
//   </div>
// </div>
