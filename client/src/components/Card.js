import axios from "axios";
import React from "react";

const Card = (props) => {
  const user = localStorage.getItem("usersdataid");
  const giveRating = async (num) => {
    axios
      .post("/givereview", { num, user, mealType: props.time })
      .then((res) => {
        console.log("You successfully rated the user");
      });
  };
  return (
    <label class="item" for={props.for}>
      <img src={props.img} alt="picture" />
      <h2>{props.time}</h2>
      <p>{props.day}</p>
      <p>{props.details}</p>
      <div className="star">
        <i
          onClick={() => {
            giveRating(1);
          }}
          class="fa-solid fa-star fa-beat"
        ></i>
        <i
          onClick={() => {
            giveRating(2);
          }}
          class="fa-solid fa-star fa-beat"
        ></i>
        <i
          onClick={() => {
            giveRating(3);
          }}
          class="fa-solid fa-star fa-beat"
        ></i>
        <i
          onClick={() => {
            giveRating(4);
          }}
          class="fa-solid fa-star fa-beat"
        ></i>
        <i
          onClick={() => {
            giveRating(5);
          }}
          class="fa-solid fa-star fa-beat"
        ></i>
      </div>
    </label>
  );
};

export default Card;

// <label className="item" htmlFor="t-1">
//       <img src="https://dummyimage.com/150" alt="picture" />
//       <p>
//         "Raw denim you probably haven't heard of them jean short austin.
//         Nesciunt tofu stumptown aliqua, retro synth master cleanse."
//       </p>
//       <h2>- Princy, Web Developer</h2>
//     </label>
