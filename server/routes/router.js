const express = require("express");
const userdb = require("../models/userSchema");
const bcrypt = require("bcrypt");
const router = new express.Router();

router.post("/register", async (req, res) => {
  const { fName, email, regNo, password, cPassword } = req.body;
  if (!fName || !email || !regNo || !password || !cPassword) {
    res.status(422).json({ error: "Fill all the details" });
  }
  try {
    const preUser = await userdb.findOne({ email });
    if (preUser) {
      res.status(422).json({ error: "This Email is Already Exist" });
    } else {
      const finalUser = new userdb({
        fName,
        email,
        regNo,
        password,
        cPassword,
      });
      const storeData = await finalUser.save();
      res.status(201).json({ status: 201, storeData });
    }
  } catch (error) {
    console.log(error);
  }
});

router.post("/login", async (req, res) => {
  const { regNo, password } = req.body;
  await userdb.findOne({ regNo });
  if (!regNo || !password) {
    res.status(422).json({ error: "Fill all the details" });
  }
  try {
    const userValid = await userdb.findOne({ regNo });
    console.log("The response from the findOne is ", userValid);
    if (userValid) {
      const isMatch = await bcrypt.compare(password, userValid.password);
      if (!isMatch) {
        res.status(422).json({ error: "Password Not matched" });
      } else {
        const token = await userValid.generateAuthtoken();
        console.log("The final response from the findOne is ", userValid);
        console.log(token);
      }
    }
  } catch (error) {
    console.log("Error in login click", error);
  }
});

module.exports = router;
