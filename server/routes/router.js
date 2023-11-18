const express = require("express");
const userdb = require("../models/userSchema");
const usercomp = require("../models/complaintSchema");
const bcrypt = require("bcryptjs");
const router = new express.Router();
const authenticate = require("../middleware/authenticate");
const nodemailer = require("nodemailer");
const usermela = require("../models/MealSchema");
const usermeal = require("../models/MealSchema");

//Post request to register a new user with validation
router.post("/register", async (req, res) => {
  const { fName, email, regNo, password, cPassword, role, hostel } = req.body;
  if (
    !fName ||
    !email ||
    !regNo ||
    !password ||
    !cPassword ||
    !hostel ||
    !role
  ) {
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
        hostel,
        role,
      });
      const storeData = await finalUser.save();
      res.status(201).json({ status: 201, storeData });
    }
  } catch (error) {
    console.log(error);
  }
});

//Post request to login a existed user with validation
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

router.post("/subComp", async (req, res) => {
  const {
    complaint,
    user,
    fname,
    regno,
    subject,
    victim,
    situation,
    authority,
  } = req.body;
  try {
    const newComp = new usercomp({
      subject,
      complaint,
      user,
      fname,
      regno,
      victim,
      situation,
      authority,
    });
    const storeData = await newComp.save();
    res.status(201).json({ status: 201, storeData });
  } catch (error) {
    console.log(error);
  }
});

router.post("/mycomplaint", async (req, res) => {
  const { user } = req.body;
  await usercomp
    .find({ user })
    .then((data) => res.json(data))
    .catch((err) => {
      res.json(err);
    });
});
router.get("/showComplaints", async (req, res) => {
  usercomp
    .find()
    .then((complaints) => res.json(complaints))
    .catch((err) => {
      res.json(err);
    });
});
// Route to delete a specific complaint
router.delete("/comp/:id", async (req, res) => {
  try {
    // Delete the complaint with the given ID
    const _id = req.params.id;
    const deleted = await usercomp.deleteOne({ _id });
    res.json(deleted);
  } catch (err) {
    res.json(err);
  }
});

// Route to delete a specific user
router.delete("/user/:id", async (req, res) => {
  try {
    // Delete the user with the given ID
    const _id = req.params.id;
    const deleted = await userdb.deleteOne({ _id });
    await userdb.save();
    res.json(deleted);
  } catch (err) {
    res.json(err);
  }
});

router.post("/comp/liked/:id", async (req, res) => {
  const _id = req.params.id;
  const { user } = req.body;

  try {
    // Find the complaint by ID
    const complaint = await usercomp.findById(_id);
    if (!complaint) {
      return res.status(404).json({ error: "Complaint not found" });
    }

    // Check if the user ID is already in the liked array
    if (!complaint.likedBy.includes(user)) {
      // If not, push the user ID into the liked array
      complaint.likedBy.push(user);

      // Save the updated complaint
      await complaint.save();

      return res.status(201).json("The liked person is added to the list");
    } else {
      const index = complaint.likedBy.indexOf(user);
      complaint.likedBy.splice(index, 1);
      await complaint.save();
      return res.status(201).json({ message: "Like removed" });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});
router.post("/comp/commented/:id", async (req, res) => {
  const _id = req.params.id;
  const { user, comment, fname } = req.body;
  try {
    const complaint = await usercomp.findById(_id);
    if (!complaint) {
      return res.status(404).json({ error: "Complaint not found" });
    }
    if (!complaint.commentedBy.includes(user)) {
      // If not, push the user ID into the liked array
      complaint.liked.push(user);

      // Save the updated complaint
      await complaint.save();

      return res.status(201).json("The liked person is added to the list");
    } else {
      const index = complaint.liked.indexOf(user);
      complaint.liked.splice(index, 1);
      await complaint.save();
      return res.status(201).json({ message: "Like removed" });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/comp/resolved/:id", async (req, res) => {
  try {
    const _id = req.params.id;
    const complaint = await usercomp.findOne({ _id });

    if (!complaint) {
      return res.status(404).json({ message: "Complaint not found" });
    }

    // Toggle the resolved property
    complaint.resolved = !complaint.resolved;

    // Save the updated document
    await complaint.save();

    res.status(201).json({ message: "Toggled the resolved" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

router.get("/complaintbox/:id", async (req, res) => {
  const _id = req.params.id;
  try {
    const complaint = await usercomp
      .find({ _id })
      .then((complaint) => res.json(complaint));
    if (!complaint) {
      return res.status(404).json({ message: "Complaint not found" });
    }
  } catch (error) {
    throw error;
  }
});

router.put("/mealupdate", async (req, res) => {
  try {
    const { day, breakfast, lunch, snacks, dinner, calorie, expense, din } =
      req.body;
    console.log("I am coming till here");

    let mealfound = await usermeal.findOne({ day });

    if (!mealfound) {
      const newMeal = new usermeal({
        day,
        calorie,
        expense,
        din,
        breakfast,
        lunch,
        snacks,
        dinner,
      });

      const ans = await newMeal.save();

      return res
        .status(201)
        .json({ message: "New meal created successfully", ans });
    }

    mealfound.breakfast = breakfast;
    mealfound.lunch = lunch;
    mealfound.snacks = snacks;
    mealfound.dinner = dinner;
    mealfound.calorie = calorie;
    mealfound.expense = expense;

    const ans = await mealfound.save();

    res.status(200).json({ message: "Meal updated successfully", ans });
  } catch (error) {
    console.error("Error updating/creating meal:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/findmeal", async (req, res) => {
  const ans = await usermeal.find().sort({ din: 1 });
  res.json(ans);
});

router.post("/finddaymeal", async (req, res) => {
  const { day } = req.body; // Destructure day from the request body
  try {
    const ans = await usermeal.find({ day: day }); // Use the extracted day
    console.log(ans);
    res.json(ans);
  } catch (error) {
    console.error("Error fetching day meal data:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});
module.exports = router;
