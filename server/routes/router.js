const express = require("express");
const userdb = require("../models/userSchema");
const usercomp = require("../models/complaintSchema");
const bcrypt = require("bcryptjs");
const router = new express.Router();
const authenticate = require("../middleware/authenticate");
const nodemailer = require("nodemailer");

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
  const { complaint, user, fname, regno } = req.body;
  try {
    const newComp = new usercomp({
      complaint,
      user,
      fname,
      regno,
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
  const { user, comment } = req.body;

  try {
    // Find the complaint by ID
    const complaint = await usercomp.findById(_id);

    if (!complaint) {
      return res.status(404).json({ error: "Complaint not found" });
    }
    usercomp.commentedBy.push({ user: comment });
    await usercomp.save();
    return res.status(201).json({ message: "successfully added the message" });
    // Check if the user ID is already in the liked array
    // if (!complaint.commentedBy.includes(user)) {
    //   // If not, push the user ID into the liked array
    //   complaint.liked.push(user);

    //   // Save the updated complaint
    //   await complaint.save();

    //   return res.status(201).json("The liked person is added to the list");
    // } else {
    //   const index = complaint.liked.indexOf(user);
    //   complaint.liked.splice(index, 1);
    //   await complaint.save();
    //   return res.status(201).json({ message: "Like removed" });
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

router.get("/sendmail", async (req, res) => {
  try {
    const unresolved = await usercomp.find({ resolved: false });
    let hello = unresolved.map((complaint) => {
      return `${complaint.fname}: ${complaint.complaint}`;
    });
    hello = hello.join("\n");
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

    // send mail with defined transport object
    const info = await transporter.sendMail({
      from: '"Sudosu Senpai👻" <sudosusenpai@gmail.com>',
      to: "vaibhav.dev.309@gmail.com",
      subject: "List of unresolved complaints",
      text: hello,
    });

    res.status(200).json({ message: "Email sent successfully" });
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

module.exports = router;
