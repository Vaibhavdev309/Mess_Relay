const mongoose = require("mongoose");

const complaintSchema = new mongoose.Schema({
  name: { type: String, required: true },
  regNo: { type: Number, required: true },
  createdAt: { type: Number, required: true },
});
