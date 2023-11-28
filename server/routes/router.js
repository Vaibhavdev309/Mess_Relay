const express = require("express");
const userdb = require("../models/userSchema");
const usercomp = require("../models/complaintSchema");
const bcrypt = require("bcryptjs");
const router = new express.Router();
const authenticate = require("../middleware/authenticate");
const nodemailer = require("nodemailer");
const usermela = require("../models/MealSchema");
const usermeal = require("../models/MealSchema");
const multer = require("multer");
const path = require("path");
const isUserBlocked = require("../middleware/blockedUser");

//hello this is the new commit
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadsPath = path.join(__dirname, "../uploads/");
    cb(null, uploadsPath);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});
const upload = multer({ storage: storage });
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
    return res.status(422).json({ error: "Fill all the details" });
  }

  try {
    const preUser = await userdb.findOne({ regNo });

    if (preUser) {
      return res
        .status(422)
        .json({ message: "This Registration no. is Already Registered" });
    }
    const finalUser = new userdb({
      fName,
      email,
      regNo,
      password,
      cPassword,
      hostel,
      role,
    });

    const token = await finalUser.generateAuthtoken();
    const expirationTime = new Date(Date.now() + 9000000);

    // Consider using the "Secure" attribute for HTTPS
    res.cookie("userCookie", token, {
      expires: expirationTime,
      httpOnly: true,
      // secure: true, // Uncomment this line if your site is served over HTTPS
    });
    const data = await finalUser.save();
    const result = { data, token };
    res.status(201).json({ status: 201, result });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
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

router.post("/subComp", upload.single("compimg"), async (req, res) => {
  console.log(req.body);
  const {
    hostel,
    complaint,
    user,
    fname,
    regno,
    subject,
    victim,
    situation,
    authority,
  } = req.body;
  console.log(req.file);
  // const img = { data: req.file.finename, contentType: "image/png" };
  try {
    const newComp = new usercomp({
      image: { data: req.file.filename, contentType: req.file.mimetype },
      subject,
      hostel,
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
router.post("/showComplaints", async (req, res) => {
  try {
    const { hostel } = req.body;
    const query = hostel !== "All" ? { hostel } : {};

    const complaints = await usercomp.find(query);
    res.json(complaints);
  } catch (err) {
    res.json(err);
  }
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
  try {
    const _id = req.params.id;
    const { user, comment, fname } = req.body;
    const complaint = await usercomp.findById(_id);
    if (!complaint) {
      return res.status(404).json({ error: "Complaint not found" });
    }
    const userAlreadyCommented = complaint.commentedBy.some(
      (c) => c.user === user
    );

    // if (!userAlreadyCommented) {
    complaint.commentedBy.push({ user, text: comment, fname });
    await complaint.save();
    return res
      .status(201)
      .json({ message: "Successfully added the comment to the complaint" });
    // } else {
    // return res
    // .status(400)
    // .json({ error: "User has already commented on this complaint" });
    // }
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
    const {
      hostel,
      day,
      breakfast,
      lunch,
      snacks,
      dinner,
      breakfastCalorie,
      breakfastExpense,
      lunchCalorie,
      lunchExpense,
      snacksCalorie,
      snacksExpense,
      dinnerCalorie,
      dinnerExpense,
      din,
    } = req.body;
    let mealfound = await usermeal.findOne({ day, hostel });
    if (!mealfound) {
      const newMeal = new usermeal({
        hostel,
        day,
        breakfastCalorie,
        breakfastExpense,
        lunchCalorie,
        lunchExpense,
        snacksCalorie,
        snacksExpense,
        dinnerCalorie,
        dinnerExpense,
        din,
        breakfast,
        lunch,
        snacks,
        dinner,
      });
      console.log(dinnerExpense);
      const ans = await newMeal.save();
      return res
        .status(201)
        .json({ message: "New meal created successfully", ans });
    }

    mealfound.breakfast = breakfast;
    mealfound.lunch = lunch;
    mealfound.snacks = snacks;
    mealfound.dinner = dinner;
    mealfound.breakfastCalorie = breakfastCalorie;
    mealfound.breakfastExpense = breakfastExpense;
    mealfound.lunchCalorie = lunchCalorie;
    mealfound.lunchExpense = lunchExpense;
    mealfound.snacksCalorie = snacksCalorie;
    mealfound.snacksExpense = snacksExpense;
    mealfound.dinnerCalorie = dinnerCalorie;
    mealfound.dinnerExpense = dinnerExpense;
    console.log(mealfound);

    const ans = await mealfound.save();

    res.status(200).json({ message: "Meal updated successfully", ans });
  } catch (error) {
    console.error("Error updating/creating meal:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.post("/findmeal", async (req, res) => {
  const { hostel } = req.body;
  const ans = await usermeal.find({ hostel }).sort({ din: 1 });
  res.json(ans);
});

router.post("/finddaymeal", async (req, res) => {
  const { day } = req.body; // Destructure day from the request body
  try {
    const ans = await usermeal.find({ day: day }); // Use the extracted day
    res.json(ans);
  } catch (error) {
    console.error("Error fetching day meal data:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.post("/daymeal", async (req, res) => {
  const { hostel } = req.body;
  try {
    const now = new Date();
    let day = now.getDay();
    din = day;
    if (day === 0) {
      din = 7;
    }
    const meal = await usermeal.find({ din, hostel });

    if (meal.length === 0) {
      res.status(404).json({ message: "No meal found for the current day" });
    } else {
      console.log(meal);
      res.json(meal);
    }
  } catch (error) {
    console.error("Error fetching daymeal:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/getdata", async (req, res) => {
  try {
    const meal = await usermeal.find().sort({ din: 1 });
    res.json(meal);
  } catch (error) {
    console.log("Error", error);
  }
});
router.get("/getlength", async (req, res) => {
  try {
    const data = await userdb.find();
    res.json(data);
  } catch (err) {
    console.log(error);
  }
});

router.post("/upload", upload.single("image"), async (req, res) => {
  try {
    const { user } = req.body;
    console.log(req.file);
    const person = await userdb.findById({ _id: user });
    person.image = req.file.filename;
    await person.save();
    res.json(person);
  } catch (error) {
    console.error("Error uploading file:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});
// router.post("/compimg", upload.single("image"), async (req, res) => {
//   cont newImage = new usercomp({})
// });
router.get("/getimage/:userId", async (req, res) => {
  try {
    const user = await userdb
      .findById({ _id: req.params.userId })
      .select("image");
    if (!user || !user.image) {
      return res.status(404).send("Image not found");
    }
    // console.log("The ans is ", user);
    res.json(user);
  } catch (error) {
    console.error("Error fetching image:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});
router.get("/fetchimage/:id", async (req, res) => {
  try {
    const comp = await usercomp
      .findById({ _id: req.params.id })
      .select("image");
    console.log(comp);
    if (!comp || !comp.image) {
      return res.status(404).send("Image not found");
    }
    // console.log("The ans is ", comp);
    res.json(comp);
  } catch (error) {
    console.error("Error fetching image:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

router.put("/users/:userId/block", async (req, res) => {
  const userId = req.params.userId;

  try {
    // Find the user by ID
    const user = await userdb.findById({ _id: userId });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Toggle the blocked status
    user.blocked = !user.blocked;

    // Save the updated user
    await user.save();

    res.json({ message: "User blocked/unblocked successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});
router.delete("/users/:userId", async (req, res) => {
  const userId = req.params.userId;
  try {
    const deletedUser = await userdb.findByIdAndDelete({ _id: userId });

    if (!deletedUser) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json({ message: "User deleted successfully", deletedUser });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});
router.post("/getuser", async (req, res) => {
  try {
    const { hostel, role } = req.body;
    let users;

    if (hostel === "All") {
      users = await userdb.find();
    } else {
      users = await userdb.find({ hostel });
    }

    if (!users || users.length === 0) {
      return res.status(404).json({ message: "No user found in the database" });
    }

    res.json(users);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
});

router.delete("/user/:id", async (req, res) => {
  try {
    const _id = req.params.id;
    const deleted = await userdb.deleteOne({ _id });
    res.json(deleted);
  } catch (err) {
    res.json(err);
  }
});
router.post("/blockUser/:id", async (req, res) => {
  try {
    const _id = req.params.id;
    const user = await userdb.findOne(_id);
    const duration = req.params.time;
    const blockedUntil = new Date(Date.now() + duration);
    user.blockedUntil = blockedUntil;
    await user.save();
  } catch (error) {
    res.status(404).json({ message: "Inter" });
  }
});
router.get("/listRecord");
router.post("/givereview", async (req, res) => {
  try {
    const { user, num, mealType, mealCalorie } = req.body;

    const now = new Date();
    let date = now.getDate();
    const [person] = await userdb.find({ _id: user });

    if (!person) {
      console.log("The user does not exist");
      return res.status(404).json({ error: "User not found" });
    }
    console.log("I reached here");

    // Check if the user has already given a rating for the specified meal type on the current day
    const existingReview = person.reviews.find(
      (review) => review.day === date && review.time === mealType
    );
    console.log("I don't reach here");
    console.log(existingReview);

    if (existingReview !== undefined) {
      console.log("User has already given a rating for this meal type today");
      return res
        .status(400)
        .json({ message: "You have already rated this meal type today" });
    }

    const data = {
      day: date,
      time: mealType,
      rating: num,
      calorie: mealCalorie,
    };

    person.reviews.push(data);
    await person.save();
    res.json(person);
  } catch (error) {
    console.log("Error", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/addcalorie/:id", async (req, res) => {
  const _id = req.params.id;

  try {
    // Find the user by id
    const user = await userdb.findById(_id);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    let totalCalorie = 0;

    // Sum up the calories from each review
    user.reviews.forEach((review) => {
      totalCalorie += review.calorie;
    });

    // Send the total calorie count in the response
    res.json({ totalCalorie });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.post("/userRating", async (req, res) => {
  const date = new Date().getDate();
  try {
    const { user, time } = req.body;
    const meal = await userdb.findOne({ _id: user }).select("reviews");

    if (!meal) {
      console.log("User not found");
      return res.status(404).json({ error: "User not found" });
    }

    console.log("The meal that I am searching for is ", meal);

    // Use find to get the specific review for the specified day and time
    const specificReview = meal.reviews.find(
      (mea) => mea.day === date && mea.time === time
    );

    if (specificReview) {
      console.log(specificReview.rating);
      res.json({ rating: specificReview.rating });
    } else {
      console.log("Review not found for the specified day and time");
      res
        .status(404)
        .json({ error: "Review not found for the specified day and time" });
    }
  } catch (error) {
    console.log("The error is", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});
router.post("/sendmessage", async (req, res) => {
  try {
    const { name, email, message } = req.body;
    console.log("I reached here", name, email, message);
    const transporter = nodemailer.createTransport({
      service: "gmail",
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      auth: {
        user: "sudosusenpai@gmail.com",
        pass: "ffqd hwwr hgof oxax",
      },
    });
    console.log("i reached here");
    const receiver = "pranavkashikey93@gmail.com";

    const info = await transporter.sendMail({
      from: `${name} <${email}>`,
      to: `${receiver}`,
      subject: "Contact Us Email",
      text: message,
    });
    {
      res.status(201).json({ message: "Email send successfully" });
    }
  } catch (error) {
    res.status(401).json({ message: error });
  }
});

module.exports = router;
