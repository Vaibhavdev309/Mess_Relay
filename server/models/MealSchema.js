const mongoose = require("mongoose");

const mealSchema = new mongoose.Schema({
  day: { type: String, required: true },
  hostel: { type: String, required: true },
  din: { type: Number, required: true },
  breakfast: { type: String, required: true },
  lunch: { type: String, required: true },
  snacks: { type: String, required: true },
  dinner: { type: String, required: true },
  breakfastCalorie: { type: Number },
  breakfastExpense: { type: Number },
  lunchCalorie: { type: Number },
  lunchExpense: { type: Number },
  snacksCalorie: { type: Number },
  snacksExpense: { type: Number },
  dinnerCalorie: { type: Number },
  dinnerExpense: { type: Number },
  food: { type: String },
});

const usermeal = new mongoose.model("meals", mealSchema);
module.exports = usermeal;
