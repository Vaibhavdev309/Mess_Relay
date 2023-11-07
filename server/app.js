const express = require("express");
const app = express();
const router = require("./routes/router");
const cors = require("cors");
const cookieParser = require("cookie-parser");
import("./db/connection.js");

const PORT = 8009;

app.use(express.json());
app.use(cors());
app.use(cookieParser());
app.use(router);

app.listen(PORT, () => {
  console.log("Server is established successfully at port :- ", PORT);
});
