import React from "react";
import "./AboutStyle.css";

const About = () => {
  return (
    <div className="responsive-container-block bigContainer">
      <div className="responsive-container-block Container">
        <img
          className="mainImg"
          src="https://workik-widget-assets.s3.amazonaws.com/widget-assets/images/eaboutus1.svg"
          alt="Mission"
        />
        <div className="allText aboveText">
          <p className="text-blk headingText">Our Mission</p>
          <p className="text-blk subHeadingText">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          </p>
          <p className="text-blk description">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fermentum
            pulvinar ullamcorper suspendisse ac eget. Pellentesque tempus leo in
            ullamcorper quis vestibulum ligula elementum ut.
          </p>
          <button className="explore">Explore</button>
        </div>
      </div>

      {/* </div> */}
    </div>
  );
};

export default About;
