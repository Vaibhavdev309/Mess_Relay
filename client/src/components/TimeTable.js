// TimeTable.js
import React, { useEffect, useState } from "react";
import "./TimeTable.css";
import TableRow from "./TableRow";
import axios from "axios";

const TimeTable = () => {
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
      const response = await axios.post("/finddaymeal", { day });
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
        setBreakfastCalorie(ans.calorie);
        setLunchCalorie(ans.calorie);
        setSnacksCalorie(ans.calorie);
        setDinnerCalorie(ans.calorie);
      }
    } catch (error) {
      console.error("Error fetching day meal data:", error);
    }
  };
  useEffect(() => {
    axios.get("/findmeal").then((response) => {
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
      .put("/mealupdate", {
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
      {role === "Admin" && (
        <>
          <form
            className="meal"
            style={{ display: "flex", flexDirection: "column" }}
            onSubmit={onFormSubmit}
          >
            <label className="day" for="day">Day</label>
            <select
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
              <label for="breakfast">Breakfast</label>
              <input
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
              <label for="lunch">Lunch</label>
              <input
                id="lunch"
                placeholder="Lunch"
                type="text"
                onChange={(e) => {
                  setLunch(e.target.value);
                }}
                value={lunch}
              />
              <input
                id="lunchExpense"
                placeholder="Lunch Expense"
                type="text"
                onChange={(e) => {
                  setLunchExpense(e.target.value);
                }}
                value={lunchExpense}
              />
              <input
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
              <label for="snacks">Snacks</label>
              <input
                placeholder="snacks"
                type="text"
                onChange={(e) => {
                  setSnacks(e.target.value);
                }}
                value={snacks}
              />
              <input
                placeholder="snacks Expense"
                type="text"
                onChange={(e) => {
                  setSnacksExpense(e.target.value);
                }}
                value={snacksExpense}
              />
              <input
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
              <label for="dinner">Dinner</label>
              <input
                id="dinner"
                placeholder="Dinner"
                type="text"
                onChange={(e) => {
                  setDinner(e.target.value);
                }}
                value={dinner}
              />
              <input
                id="dinnerExpense"
                placeholder="Dinner Expense"
                type="text"
                onChange={(e) => {
                  setDinnerExpense(e.target.value);
                }}
                value={dinnerExpense}
              />
              <input
                id="dinnerCalorie"
                placeholder="dinner calorie"
                type="number"
                onChange={(e) => {
                  setDinnerCalorie(e.target.value);
                }}
                value={dinnerCalorie}
              />
            </div>

            <button className="Buto" type="submit">Submit</button>
          </form>
        </>
      )}
    </div>
  );
};

export default TimeTable;
