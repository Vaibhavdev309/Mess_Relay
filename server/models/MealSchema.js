const mongoose = require("mongoose");

const mealSchema = new mongoose.Schema({
  day: { type: String, required: true },
  din: { type: Number, required: true },
  breakfast: { type: String, required: true },
  lunch: { type: String, required: true },
  snacks: { type: String, required: true },
  dinner: { type: String, required: true },
  calorie: { type: Number },
  expense: { type: Number },
  food: { type: String },
});

const usermeal = new mongoose.model("meals", mealSchema);
module.exports = usermeal;
