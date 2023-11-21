const express = require("express");
const app = express();
const router = require("./routes/router");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const axios = require("axios");
const nodemailer = require("nodemailer");
import("./controller/mailer.js");
// const sendEmail = require("./controller/mailer.js");
import("./db/connection.js");

const PORT = 8009;

console.log("hello");
app.use(express.json());
app.use(cors());
app.use(cookieParser());
app.use(router);
app.use(express.static("uploads"));

app.listen(PORT, () => {
  console.log("Server is established successfully at port :- ", PORT);
});
