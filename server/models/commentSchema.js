const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
  user: mongoose.Schema.Types.ObjectId,
  fname: String,
  comment: String,
  createdOn: { type: Date, default: Date.now },
});

const usercomm = new mongoose.model("comments", commentSchema);
module.exports = usercomm;
