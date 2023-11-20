import React from "react";

const Card = (props) => {
  return (
    <label for={props.for} id={props.id}>
      <div className="bard">
        <div className="image">
          <img src={props.img} alt="" />
          <div className="dots">
            <div></div>
            <div></div>
            <div></div>
          </div>
        </div>
        <div className="infos">
          <span className="name">{props.day}</span>
          <span className="lorem">{props.food}</span>
        </div>
        <a href="/contact" className="btn-contact">
          {props.details}
        </a>
        <div className="socials">
          <i class="fa-solid fa-star"></i>
          <i class="fa-solid fa-star"></i>
          <i class="fa-solid fa-star"></i>
          <i class="fa-solid fa-star"></i>
          <i class="fa-solid fa-star"></i>
        </div>
      </div>
    </label>
  );
};

export default Card;
