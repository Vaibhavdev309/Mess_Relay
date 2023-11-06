const express = require("express");

const app = express();

const PORT = 8009;
app.get("/", (req, res) => {
  res.status(201).json("Server created");
});
app.listen(PORT, () => {
  console.log("Server is established successfully at port ", PORT);
});
