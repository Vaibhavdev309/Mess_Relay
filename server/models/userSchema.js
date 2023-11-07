const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const keysecret = "Vaibhavkumarmauryaisagoodboyasdflasfjlas";

const userSchema = new mongoose.Schema({
  fName: { type: String, required: true, trim: true },
  regNo: { type: Number, required: true, unique: true },
  email: {
    type: String,
    required: true,
    unique: true,
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error("Not valid Email");
      }
    },
  },
  password: { type: String, required: true, minLength: 6 },
  cPassword: { type: String, required: true, minLength: 6 },
  tokens: [{ token: { type: String, required: true } }],
});

userSchema.pre("save", async function (next) {
  this.password = await bcrypt.hash(this.password, 12);
  this.cPassword = await bcrypt.hash(this.cPassword, 12);
  next();
});

userSchema.methods.generateAuthtoken = async function () {
  try {
    let token = jwt.sign({ _id: this._id }, keysecret, { expiresIn: "1d" });
    this.tokens = this.tokens.concate({ token });
    console.log("I reched herer");
    await this.save();
    console.log(this.tokens);
    console.log("I reached here");
    return token;
  } catch (error) {
    console.log("Error in generating token", error);
  }
};

const userdb = new mongoose.model("users", userSchema);

module.exports = userdb;
