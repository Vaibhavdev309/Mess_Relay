import React, { useEffect, useState } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import "./AfterLogin.css";
import axios from "axios";
import Card from "./Card";
import Error from "./Error";
import { useNavigate } from "react-router-dom";

const AfterLogin = () => {
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  const hostel = localStorage.getItem("usersdatahostel");
  const user = localStorage.getItem("usersdataid");
  const [meals, setMeals] = useState([]);
  const [totalCalorie, setTotalCalorie] = useState(0);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const fetchData = () => {
    axios
      .get(`/addcalorie/${user}`)
      .then((res) => {
        setTotalCalorie(res.data.totalCalorie);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    axios
      .post("/daymeal", { hostel })
      .then((response) => {
        setMeals(response.data);
      })
      .catch((error) => {
        setError("Error fetching meals");
      });
  }, []);
  useEffect(fetchData, []);

  return (
    <div className="gojo">
      {meals[0] && (
        <>
          <Slider {...settings}>
            <Card
              day={meals[0].day}
              for="t-1"
              img="https://images.unsplash.com/photo-1542691457-cbe4df041eb2?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8YnJlYWtmYXN0fGVufDB8fDB8fHww"
              id="slide1"
              time="Breakfast"
              details={meals[0].breakfast}
              calorie={meals[0].breakfastCalorie}
            />
            <Card
              day={meals[0].day}
              for="t-2"
              img="https://images.unsplash.com/photo-1546793665-c74683f339c1?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGx1bmNofGVufDB8fDB8fHww"
              id="slide2"
              time="Lunch"
              details={meals[0].lunch}
              calorie={meals[0].lunchCalorie}
            />
            <Card
              day={meals[0].day}
              for="t-3"
              img="https://thumbs.dreamstime.com/b/variety-healthy-snacks-white-bowls-pretzels-nuts-73502345.jpg"
              id="slide3"
              time="Snacks"
              details={meals[0].snacks}
              calorie={meals[0].snacksCalorie}
            />
            <Card
              day={meals[0].day}
              for="t-4"
              img="https://media.istockphoto.com/id/867402312/photo/wineglasses-on-table-with-candles.jpg?s=612x612&w=0&k=20&c=aEAXuK2QGCST39MwWpXAssDwX4fD2vnlOsjWhSiEMd0="
              id="slide4"
              time="Dinner"
              details={meals[0].dinner}
              calorie={meals[0].dinnerCalorie}
            />
            <Card
              day="Total Calorie"
              for="t-5"
              img="https://www.shutterstock.com/shutterstock/photos/232258702/display_1500/stock-photo-frame-of-vegetables-herbs-harvest-autumn-background-copy-space-vertical-232258702.jpg"
              id="slide5"
              time="RealTime"
              calorei={totalCalorie}
            />
          </Slider>
        </>
      )}
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

// <div className="gojobro">
//   <div className="gojo">
//     <div className="slider">
//       <input type="radio" name="testimonial" id="t-1" />
//       <input type="radio" name="testimonial" id="t-2" />
//       <input type="radio" name="testimonial" id="t-3" checked />
//       <input type="radio" name="testimonial" id="t-4" />
//       {/* <input type="radio" name="testimonial" id="t-5" /> */}
//       <div className="testimonials">
//         {meals[0] && (
//           <>
//             <Card
//               day={meals[0].day}
//               for="t-1"
//               img="https://images.healthshots.com/healthshots/en/uploads/2022/07/25101436/breakfast1.jpg"
//               id="slide1"
//               time="Breakfast"
//               details={meals[0].breakfast}
//               calorie={meals[0].breakfastCalorie}
//             />
//             <Card
//               day={meals[0].day}
//               for="t-2"
//               img="https://s3-ap-south-1.amazonaws.com/betterbutterbucket-silver/chitra-sendhil1453210035569e39b33b9db.jpeg"
//               id="slide2"
//               time="Lunch"
//               details={meals[0].lunch}
//               calorie={meals[0].lunchCalorie}
//             />
//             <Card
//               day={meals[0].day}
//               for="t-3"
//               img="https://media.istockphoto.com/id/1263686908/photo/mixed-salty-snack-flat-lay-table-scene-on-a-wood-background.webp?b=1&s=170667a&w=0&k=20&c=jwScZKWlgykwVi2pykyXsW-j6MlrahqMA_kapECwcEE="
//               id="slide3"
//               time="Snacks"
//               details={meals[0].snacks}
//               calorie={meals[0].snacksCalorie}
//             />
//             <Card
//               day={meals[0].day}
//               for="t-4"
//               img="https://static.toiimg.com/thumb/msid-46173052,imgsize-92109,width-400,resizemode-4/46173052.jpg"
//               id="slide4"
//               time="Dinner"
//               details={meals[0].dinner}
//               calorie={meals[0].dinnerCalorie}
//             />
//             <Card
//               day="Total Calorie"
//               for="t-5"
//               img="https://blogs.farmingdale.edu/sites/rambassadors/wp-content/uploads/sites/9/2017/11/Melgar-1.png"
//               id="slide5"
//               time="RealTime"
//               calorei={totalCalorie}
//             />
//           </>
//         )}

//         {/* <label className="item" htmlFor="t-2">
//         <img src="https://dummyimage.com/150" alt="picture" />
//         <p>
//           "Raw denim you probably haven't heard of them jean short austin.
//           Nesciunt tofu stumptown aliqua, retro synth master cleanse."
//         </p>
//         <h2>- Princy, Web Developer</h2>
//       </label>
//       <label className="item" htmlFor="t-3">
//         <img src="https://dummyimage.com/150" alt="picture" />
//         <p>
//           "Raw denim you probably haven't heard of them jean short austin.
//           Nesciunt tofu stumptown aliqua, retro synth master cleanse."
//         </p>
//         <h2>- Princy, Web Developer</h2>
//       </label>
//       <label className="item" htmlFor="t-4">
//         <img src="https://dummyimage.com/150" alt="picture" />
//         <p>
//           "Raw denim you probably haven't heard of them jean short austin.
//           Nesciunt tofu stumptown aliqua, retro synth master cleanse."
//         </p>
//         <h2>- Princy, Web Developer</h2>
//       </label>
//       <label className="item" htmlFor="t-5">
//         <img src="https://dummyimage.com/150" alt="picture" />
//         <p>
//           "Raw denim you probably haven't heard of them jean short austin.
//           Nesciunt tofu stumptown aliqua, retro synth master cleanse."
//         </p>
//         <h2>- Princy, Web Developer</h2>
//       </label> */}
//       </div>

//       <div className="dots">
//         <label htmlFor="t-1"></label>
//         <label htmlFor="t-2"></label>
//         <label htmlFor="t-3"></label>
//         <label htmlFor="t-4"></label>
//         <label htmlFor="t-5"></label>
//         {/* <label htmlFor="t-5"></label> */}
//       </div>
//       {/* <h2>total Calorie</h2>
//       <h1>{totalCalorie}</h1> */}
//     </div>
//     <p></p>
//   </div>
//   <p></p>
// </div>
