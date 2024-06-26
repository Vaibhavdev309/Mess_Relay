// TimeTable.js
import React, { useEffect, useState } from "react";
import "./TimeTable.css";
import TableRow from "./TableRow";
import axios from "axios";

const TimeTable = () => {
  const hostel = localStorage.getItem("usersdatahostel");
  const [din, setDin] = useState(0);
  const [day, setDay] = useState("Monday");
  const [breakfast, setBreakfast] = useState("");
  const [lunch, setLunch] = useState("");
  const [snacks, setSnacks] = useState("");
  const [dinner, setDinner] = useState("");
  const [breakfastCalorie, setBreakfastCalorie] = useState("");
  const [lunchCalorie, setLunchCalorie] = useState("");
  const [snacksCalorie, setSnacksCalorie] = useState("");
  const [dinnerCalorie, setDinnerCalorie] = useState("");
  const [breakfastExpense, setBreakfastExpense] = useState();
  const [lunchExpense, setLunchExpense] = useState();
  const [snacksExpense, setSnacksExpense] = useState();
  const [dinnerExpense, setDinnerExpense] = useState();
  const [meals, setMeals] = useState([]);
  const checkData = async () => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/finddaymeal`,
        { day }
      );
      if (response.data.length === 0) {
        console.log("No data previously found");
        setBreakfast("");
        setLunch("");
        setSnacks("");
        setDinner("");
        setBreakfastExpense();
        setLunchExpense();
        setSnacksExpense();
        setDinnerExpense();
        setBreakfastCalorie();
        setLunchCalorie();
        setSnacksCalorie();
        setDinnerCalorie();
      } else {
        const ans = response.data[0];
        setBreakfast(ans.breakfast);
        setLunch(ans.lunch);
        setSnacks(ans.snacks);
        setDinner(ans.dinner);
        setBreakfastExpense(ans.breakfastExpense);
        setLunchExpense(ans.lunchExpense);
        setSnacksExpense(ans.snacksExpense);
        setDinnerExpense(ans.dinnerExpense);
        setBreakfastCalorie(ans.breakfastCalorie);
        setLunchCalorie(ans.lunchCalorie);
        setSnacksCalorie(ans.snacksCalorie);
        setDinnerCalorie(ans.dinnerCalorie);
      }
    } catch (error) {
      console.error("Error fetching day meal data:", error);
    }
  };
  useEffect(() => {
    axios
      .post(`${process.env.REACT_APP_API_URL}/findmeal`, { hostel })
      .then((response) => {
        setMeals(response.data);
      });
  }, []);
  useEffect(() => {
    const dayMap = {
      Monday: 1,
      Tuesday: 2,
      Wednesday: 3,
      Thursday: 4,
      Friday: 5,
      Saturday: 6,
      Sunday: 7,
    };
    setDin(dayMap[day]);
    checkData();
  }, [day]);

  const role = localStorage.getItem("usersdatarole");
  const onInputChange = (e) => {
    setDay(e.target.value);
  };
  const onFormSubmit = (e) => {
    e.preventDefault();
    axios
      .put(`${process.env.REACT_APP_API_URL}/mealupdate`, {
        hostel,
        day,
        breakfastCalorie,
        lunchCalorie,
        snacksCalorie,
        dinnerCalorie,
        breakfastExpense,
        lunchExpense,
        snacksExpense,
        dinnerExpense,
        din,
        breakfast,
        lunch,
        snacks,
        dinner,
      })
      .then((response) => {
        setBreakfastCalorie(0);
        setLunchCalorie(0);
        setSnacksCalorie(0);
        setDinnerCalorie(0);
        setBreakfastExpense(0);
        setLunchExpense(0);
        setSnacksExpense(0);
        setDinnerExpense(0);
        setBreakfast("");
        setLunch("");
        setSnacks("");
        setDinner("");
        console.log("Successfully updated the meal! Enjoy! ");
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div className="table-container">
      <h1 className="heading">
        <table className="table">
          <thead>
            <tr>
              <th>Day</th>
              <th>Breakfast</th>
              <th>Lunch</th>
              <th>Snacks</th>
              <th>Dinner</th>
            </tr>
          </thead>
          {meals.map((meal) => {
            return (
              <TableRow
                day={meal.day}
                breakfast={meal.breakfast}
                lunch={meal.lunch}
                snacks={meal.snacks}
                dinner={meal.dinner}
              />
            );
          })}
        </table>
      </h1>

      {(role === "Chief Warden" || role === "Admin") && (
        <>
          <form
            className="meal"
            style={{ display: "flex", flexDirection: "column" }}
            onSubmit={onFormSubmit}
          >
            <label for="day">Day</label>
            <select
              className="selecto"
              name="day"
              id="day"
              required
              onChange={onInputChange}
              value={day}
            >
              <option value="Monday">Monday</option>
              <option value="Tuesday">Tuesday</option>
              <option value="Wednesday">Wednesday</option>
              <option value="Thursday">Thursday</option>
              <option value="Friday">Friday</option>
              <option value="Saturday">Saturday</option>
              <option value="Sunday">Sunday</option>
            </select>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <label className="khana" for="breakfast">
                Breakfast
              </label>
              <input
                className="inputo"
                name="breakfast"
                id="breakfast"
                placeholder="Breakfast"
                type="text"
                onChange={(e) => {
                  setBreakfast(e.target.value);
                }}
                value={breakfast}
              />
              <input
                className="inputo"
                name="breakfastExpense"
                id="breakfastExpense"
                placeholder="Breakfast Expense"
                type="text"
                onChange={(e) => {
                  setBreakfastExpense(e.target.value);
                }}
                value={breakfastExpense}
              />
              <input
                className="inputo"
                id="breakfastCalorie"
                placeholder="Breakfast Calorie"
                type="number"
                onChange={(e) => {
                  setBreakfastCalorie(e.target.value);
                }}
                value={breakfastCalorie}
              />
            </div>

            <div style={{ display: "flex", justifyContent: "center" }}>
              <label className="khana" for="lunch">
                Lunch
              </label>
              <input
                className="inputo"
                id="lunch"
                placeholder="Lunch"
                type="text"
                onChange={(e) => {
                  setLunch(e.target.value);
                }}
                value={lunch}
              />
              <input
                className="inputo"
                id="lunchExpense"
                placeholder="Lunch Expense"
                type="text"
                onChange={(e) => {
                  setLunchExpense(e.target.value);
                }}
                value={lunchExpense}
              />
              <input
                className="inputo"
                id="lunchCalorie"
                placeholder="Lunch Calorie"
                type="number"
                onChange={(e) => {
                  setLunchCalorie(e.target.value);
                }}
                value={lunchCalorie}
              />
            </div>

            <div style={{ display: "flex", justifyContent: "center" }}>
              <label className="khana" for="snacks">
                Snacks
              </label>
              <input
                id="snacks"
                className="inputo"
                placeholder="Snacks"
                type="text"
                onChange={(e) => {
                  setSnacks(e.target.value);
                }}
                value={snacks}
              />
              <input
                className="inputo"
                placeholder="snacks Expense"
                type="text"
                onChange={(e) => {
                  setSnacksExpense(e.target.value);
                }}
                value={snacksExpense}
              />
              <input
                className="inputo"
                id="snacksCalorie"
                placeholder="Snacks calorie"
                type="number"
                onChange={(e) => {
                  setSnacksCalorie(e.target.value);
                }}
                value={snacksCalorie}
              />
            </div>

            <div style={{ display: "flex", justifyContent: "center" }}>
              <label className="khana" for="dinner">
                Dinner
              </label>
              <input
                className="inputo"
                id="dinner"
                placeholder="Dinner"
                type="text"
                onChange={(e) => {
                  setDinner(e.target.value);
                }}
                value={dinner}
              />
              <input
                className="inputo"
                id="dinnerExpense"
                placeholder="Dinner Expense"
                type="text"
                onChange={(e) => {
                  setDinnerExpense(e.target.value);
                }}
                value={dinnerExpense}
              />
              <input
                className="inputo"
                id="dinnerCalorie"
                placeholder="dinner calorie"
                type="number"
                onChange={(e) => {
                  setDinnerCalorie(e.target.value);
                }}
                value={dinnerCalorie}
              />
            </div>

            <button className="Buto" type="submit">
              Submit
            </button>
          </form>
        </>
      )}
    </div>
  );
};

export default TimeTable;
