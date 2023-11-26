const mongoose = require("mongoose");

const DB =
"mongodb+srv://vaibhavdev309:MongoDB123@cluster0.pu1rrm9.mongodb.net/Messi?retryWrites=true&w=majority";
// const DB = "mongodb://localhost:27017/Messi";
mongoose
  .connect(DB)
  .then(() => {
    console.log("Database connected successfully");
  })
  .catch((error) => {
    console.log("Error in connecting Database to nodejs ", error);
  });

// "proxy": "https://mongodb+srv://vaibhavdev309:MongoDB123@cluster0.pu1rrm9.mongodb.net/Messi?retryWrites=true&w=majority",
