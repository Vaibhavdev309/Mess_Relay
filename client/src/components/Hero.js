import React from "react";
import "./HeroStyle.css";

const Hero = () => {
  return (
    <div class="hero">
      <div class="container2">
        <div class="info">
          <h1>Title</h1>
          <h2>Lorem ipsum dolor sit amet consectetur.</h2>
          <p>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Voluptatem
            vero ratione vitae dicta explicabo perferendis amet quis provident
            molestiae magni!
          </p>
          <a class="click" href="/login">
            Login
          </a>
        </div>
      </div>
    </div>
  );
};

export default Hero;
