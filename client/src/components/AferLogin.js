import React, { useEffect, useState } from "react";
import "./AfterLogin.css";
import axios from "axios";
import Card from "./Card";
import Error from "./Error";
import { useNavigate } from "react-router-dom";

const AfterLogin = () => {
  const [meals, setMeals] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("/daymeal")
      .then((response) => {
        setMeals(response.data); // Assuming response.data is an array of meals
      })
      .catch((error) => {
        setError("Error fetching meals");
        return <div>No way</div>;
        console.error("Error fetching meals:", error);
      });
  }, []);

  return (
    <div className="gojobro">
      <div className="gojo">
        <div className="slider">
          <input type="radio" name="testimonial" id="t-1" />
          <input type="radio" name="testimonial" id="t-2" />
          <input type="radio" name="testimonial" id="t-3" checked />
          <input type="radio" name="testimonial" id="t-4" />
          {/* <input type="radio" name="testimonial" id="t-5" /> */}
          <div className="testimonials">
            <Card
              day={meals.day}
              for="t-1"
              img="https://images.healthshots.com/healthshots/en/uploads/2022/07/25101436/breakfast1.jpg"
              id="slide4"
              time="Breakfast"
              details={meals.breakfast}
            />
            <Card
              day={meals.day}
              for="t-2"
              img="https://s3-ap-south-1.amazonaws.com/betterbutterbucket-silver/chitra-sendhil1453210035569e39b33b9db.jpeg"
              id="slide4"
              time="Lunch"
              details={meals.lunch}
            />
            <Card
              day={meals.day}
              for="t-3"
              img="https://media.istockphoto.com/id/1263686908/photo/mixed-salty-snack-flat-lay-table-scene-on-a-wood-background.webp?b=1&s=170667a&w=0&k=20&c=jwScZKWlgykwVi2pykyXsW-j6MlrahqMA_kapECwcEE="
              id="slide4"
              time="Snacks"
              details={meals.snacks}
            />
            <Card
              day={meals.day}
              for="t-4"
              img="https://static.toiimg.com/thumb/msid-46173052,imgsize-92109,width-400,resizemode-4/46173052.jpg"
              id="slide4"
              time="Dinner"
              details={meals.dinner}
            />
            {/* <label className="item" htmlFor="t-2">
            <img src="https://dummyimage.com/150" alt="picture" />
            <p>
              "Raw denim you probably haven't heard of them jean short austin.
              Nesciunt tofu stumptown aliqua, retro synth master cleanse."
            </p>
            <h2>- Princy, Web Developer</h2>
          </label>
          <label className="item" htmlFor="t-3">
            <img src="https://dummyimage.com/150" alt="picture" />
            <p>
              "Raw denim you probably haven't heard of them jean short austin.
              Nesciunt tofu stumptown aliqua, retro synth master cleanse."
            </p>
            <h2>- Princy, Web Developer</h2>
          </label>
          <label className="item" htmlFor="t-4">
            <img src="https://dummyimage.com/150" alt="picture" />
            <p>
              "Raw denim you probably haven't heard of them jean short austin.
              Nesciunt tofu stumptown aliqua, retro synth master cleanse."
            </p>
            <h2>- Princy, Web Developer</h2>
          </label>
          <label className="item" htmlFor="t-5">
            <img src="https://dummyimage.com/150" alt="picture" />
            <p>
              "Raw denim you probably haven't heard of them jean short austin.
              Nesciunt tofu stumptown aliqua, retro synth master cleanse."
            </p>
            <h2>- Princy, Web Developer</h2>
          </label> */}
          </div>
          <div className="dots">
            <label htmlFor="t-1"></label>
            <label htmlFor="t-2"></label>
            <label htmlFor="t-3"></label>
            <label htmlFor="t-4"></label>
            {/* <label htmlFor="t-5"></label> */}
          </div>
        </div>
        <p></p>
      </div>
      <h2>Total Calorie</h2>
      <p></p>
    </div>
  );
};

export default AfterLogin;

{
  /* <Card
            for="t-4"
            img="https://static.toiimg.com/thumb/msid-46173052,imgsize-92109,width-400,resizemode-4/46173052.jpg"
            id="slide4"
            day="Dinner"
            details={meals.dinner}
          /> */
}
