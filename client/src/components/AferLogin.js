import React, { useEffect, useState } from "react";
import "./AfterLogin.css";
import axios from "axios";
import Card from "./Card";

const AferLogin = () => {
  const [meals, setMeals] = useState([]);
  useEffect(() => {
    axios.get("/daymeal").then((response) => {
      console.log();
      setMeals(response.data[0]);
    });
  }, []);

  return (
    <div className="gojo">
      <div className="container6">
        <input type="radio" name="slider" className="d-none" id="s1" checked />
        <input type="radio" name="slider" className="d-none" id="s2" />
        <input type="radio" name="slider" className="d-none" id="s3" />
        <input type="radio" name="slider" className="d-none" id="s4" />
        <input type="radio" name="slider" className="d-none" id="s5" />

        <div className="bards">
          <Card
            for="s1"
            img="https://images.unsplash.com/photo-1538220856186-0be0e085984d?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGJyZWFrZmFzdHxlbnwwfHwwfHx8MA%3D%3D"
            id="slide1"
            day="Breakfast"
            food={meals.day}
            details={meals.breakfast}
          />
          <Card
            for="s2"
            img="https://img-global.cpcdn.com/recipes/af691d91b2468f78/680x482cq70/simple-lunch-recipe-main-photo.jpg"
            id="slide2"
            day="Lunch"
            food={meals.day}
            details={meals.lunch}
          />
          <Card
            for="s3"
            img="https://img-global.cpcdn.com/recipes/af691d91b2468f78/680x482cq70/simple-lunch-recipe-main-photo.jpg"
            id="slide3"
            day="Snacks"
            food={meals.day}
            details={meals.snacks}
          />
          <Card
            for="s4"
            img="https://static.toiimg.com/thumb/msid-46173052,imgsize-92109,width-400,resizemode-4/46173052.jpg"
            id="slide4"
            day="Dinner"
            food={meals.day}
            details={meals.dinner}
          />
        </div>
      </div>
    </div>
  );
};

export default AferLogin;
