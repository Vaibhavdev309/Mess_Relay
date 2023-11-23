import React from "react";
import "./HeroStyle.css";

const Hero = () => {
  return (
    <div class="hero">
      <div class="container2">
        <div class="info">
          <h1>Imperial Mess Administration</h1>
          <h2>
            "Global Cleanup Initiative: <br />
            Uniting Against Mess,
            <br /> One Complaint at a Time!"
          </h2>
          {/* <p>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Voluptatem
            vero ratione vitae dicta explicabo perferendis amet quis provident
            molestiae magni!
          </p> */}
          <a class="click" href="/login">
            Login
          </a>
        </div>
      </div>
    </div>
  );
};

export default Hero;
