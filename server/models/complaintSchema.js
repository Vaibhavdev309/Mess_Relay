const mongoose = require("mongoose");

const complaintSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "userdb",
    required: true,
  },
  regno: { type: Number, required: true },
  fname: { type: String, required: true },
  victim: { type: String, required: true },
  submittedon: { type: Date, required: true, default: Date.now },
  subject: { type: String, required: true },
  complaint: { type: String, required: true },
  situation: { type: String, required: true },
  resolved: { type: Boolean, default: false },
  image: { data: { type: String }, contentType: { type: String } },
  likedBy: { type: [mongoose.Schema.Types.ObjectId], default: [] }, // Initialize liked as an empty array
  commentedBy: [
    {
      user: mongoose.Schema.Types.ObjectId,
      text: String,
      createdOn: { type: Date, default: Date.now },
      fname: String,
    },
  ],
});

const usercomp = new mongoose.model("complaint", complaintSchema);
module.exports = usercomp;
