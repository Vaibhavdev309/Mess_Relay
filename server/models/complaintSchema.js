const mongoose = require("mongoose");

const complaintSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "userdb",
    required: true,
  },
  regno: { type: Number, required: true },
  fname: { type: String, required: true },
  submittedon: { type: Date, required: true, default: Date.now },
  subject: { type: String, required: true },
  complaint: { type: String, required: true },
  resolved: { type: Boolean, default: false },
  likedBy: { type: [mongoose.Schema.Types.ObjectId], default: [] }, // Initialize liked as an empty array
  commentedBy: [{ user: mongoose.Schema.Types.ObjectId, text: String }],
});

const usercomp = new mongoose.model("complaint", complaintSchema);
module.exports = usercomp;
