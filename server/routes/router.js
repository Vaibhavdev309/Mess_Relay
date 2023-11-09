const express = require("express");
const userdb = require("../models/userSchema");
const bcrypt = require("bcryptjs");
const router = new express.Router();
const authenticate = require("../middleware/authenticate");

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
        const expirationTime = new Date(Date.now() + 9000000);
        res.cookie("userCookie", token, {
          expires: expirationTime,
          httpOnly: true,
        });
        const result = { userValid, token };
        res.status(201).json({ status: 201, result });
      }
    }
  } catch (error) {
    console.log("Error in login click", error);
  }
});

router.get("/validUser", authenticate, async (req, res) => {
  try {
    const validUserOne = await userdb.findOne({ _id: req.userId });
    res.status(201).json({ status: 201, validUserOne });
  } catch (error) {
    res.status(401).json({ status: 401, error });
  }
});

router.get("/logout", authenticate, async (req, res) => {
  try {
    req.rootUser.tokens = req.rootUser.tokens.filter((curelem) => {
      return curelem.token !== req.token;
    });
    res.clearCookie("userCookie", { path: "/" });
    req.rootUser.save();
    res.status(201).json({ status: 201 });
  } catch (error) {
    res.status(201).json({ status: 401, error });
  }
});

module.exports = router;
