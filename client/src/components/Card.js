import axios from "axios";
import React, { useEffect, useState } from "react";
import "./Card.css";

const Card = (props) => {
  const user = localStorage.getItem("usersdataid");
  const [star1, setStar1] = useState("fa-solid fa-star fa-beat"); // Initial class
  const [star2, setStar2] = useState("fa-solid fa-star fa-beat");
  const [star3, setStar3] = useState("fa-solid fa-star fa-beat");
  const [star4, setStar4] = useState("fa-solid fa-star fa-beat");
  const [star5, setStar5] = useState("fa-solid fa-star fa-beat");

  const giveRating = async (num) => {
    axios
      .post(`${process.env.REACT_APP_API_URL}/givereview`, {
        num,
        user,
        mealType: props.time,
        mealCalorie: props.calorie,
      })
      .then((res) => {
        console.log("You successfully rated the user");
      })
      .catch((err) => {
        alert("You already rated the dish");
      });
  };

  useEffect(() => {
    axios
      .post(`${process.env.REACT_APP_API_URL}/userRating`, {
        user,
        time: props.time,
      })
      .then((res) => {
        const rating = res.data.rating;

        // Update the star styles based on the rating
        setStar1(
          rating >= 1
            ? "fa-solid fa-star fa-beat golden"
            : "fa-solid fa-star fa-beat"
        );
        setStar2(
          rating >= 2
            ? "fa-solid fa-star fa-beat golden"
            : "fa-solid fa-star fa-beat"
        );
        setStar3(
          rating >= 3
            ? "fa-solid fa-star fa-beat golden"
            : "fa-solid fa-star fa-beat"
        );
        setStar4(
          rating >= 4
            ? "fa-solid fa-star fa-beat golden"
            : "fa-solid fa-star fa-beat"
        );
        setStar5(
          rating === 5
            ? "fa-solid fa-star fa-beat golden"
            : "fa-solid fa-star fa-beat"
        );
      })
      .catch((err) => {
        console.log(props.time);
        console.log(err);
      });
  }, [user, props.time]);

  return (
    <div>
      <div class="card">
        <div class="wrapper">
          <img src={props.img} class="cover-image" />
        </div>
        <div className="details">
          <h2>{props.time}</h2>
          <p>{props.day}</p>
          <p>{props.details}</p>
          <h1>{props.calorei}</h1>
        </div>
        <img
          src="https://images.creativemarket.com/0.1.0/ps/2132205/910/1364/m1/fpnw/wm1/1601_vegetables5screen-.jpg?1&s=009bf384a9aae2a16d783f7d34cd9c0c"
          class="character"
        />
      </div>
    </div>
    // <label className="item" htmlFor={props.for}>
    //   <img src={props.img} alt="picture" />
    //   <h2>{props.time}</h2>
    //   <p>{props.day}</p>
    //   <p>{props.details}</p>
    //   <h1>{props.calorei}</h1>
    //   <div className="star">
    //     <i
    //       onClick={() => giveRating(1)}
    //       className={star1}
    //       style={{ color: star1.includes("golden") ? "#ffd700" : "#e3e3e3" }}
    //     ></i>
    //     <i
    //       onClick={() => giveRating(2)}
    //       className={star2}
    //       style={{ color: star2.includes("golden") ? "#ffd700" : "#e3e3e3" }}
    //     ></i>
    //     <i
    //       onClick={() => giveRating(3)}
    //       className={star3}
    //       style={{ color: star3.includes("golden") ? "#ffd700" : "#e3e3e3" }}
    //     ></i>
    //     <i
    //       onClick={() => giveRating(4)}
    //       className={star4}
    //       style={{ color: star4.includes("golden") ? "#ffd700" : "#e3e3e3" }}
    //     ></i>
    //     <i
    //       onClick={() => giveRating(5)}
    //       className={star5}
    //       style={{ color: star5.includes("golden") ? "#ffd700" : "#e3e3e3" }}
    //     ></i>
    //   </div>
    // </label>
  );
};

export default Card;
