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
  const [calorie, setCalorie] = useState("");
  const [expense, setExpense] = useState("");
  const [meals, setMeals] = useState([]);
  const checkData = async () => {
    try {
      console.log("i am coming tillsdfla");
      const response = await axios.post("/finddaymeal", { day });
      if (response.data.length === 0) {
        console.log("No data previously found");
        setBreakfast("");
        setLunch("");
        setSnacks("");
        setDinner("");
      } else {
        const ans = response.data[0];
        setBreakfast(ans.breakfast);
        setLunch(ans.lunch);
        setSnacks(ans.snacks);
        setDinner(ans.dinner);
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
    console.log("I am coming till here very fastly");
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
        calorie,
        expense,
        din,
        breakfast,
        lunch,
        snacks,
        dinner,
      })
      .then((response) => {
        setCalorie("");
        setExpense("");
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
      {role === "Professor" && (
        <>
          <form
            className="meal"
            style={{ display: "flex", flexDirection: "column" }}
            onSubmit={onFormSubmit}
          >
            <label for="day">Day</label>
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
            <div style={{ display: "flex", justifyContent: "space-between" }}>
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
            </div>

            <div style={{ display: "flex", justifyContent: "space-between" }}>
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
            </div>

            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <label for="snacks">Snacks</label>
              <input
                placeholder="snacks"
                type="text"
                onChange={(e) => {
                  setSnacks(e.target.value);
                }}
                value={snacks}
              />
            </div>

            <div style={{ display: "flex", justifyContent: "space-between" }}>
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
            </div>

            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <label for="calorie">Calorie</label>
              <input
                id="calorie"
                placeholder="calorie"
                type="number"
                onChange={(e) => {
                  setCalorie(e.target.value);
                }}
                value={calorie}
              />
            </div>

            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <label for="expense">Expense</label>
              <input
                id="expense"
                placeholder="expense"
                type="number"
                onChange={(e) => {
                  setExpense(e.target.value);
                }}
                value={expense}
              />
            </div>

            <button type="submit">Submit</button>
          </form>
        </>
      )}
    </div>
  );
};

export default TimeTable;
