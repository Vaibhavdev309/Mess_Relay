// const mongoose = require("mongoose");
// const User = require("./models/User"); // Update the path accordingly

// const removeExpiredBlocks = async () => {
//   try {
//     const currentTime = new Date();
//     await User.updateMany(
//       { blockedUntil: { $lt: currentTime } },
//       { $unset: { blockedUntil: 1 } }
//     );
//     console.log("Expired blocks removed.");
//   } catch (error) {
//     console.error("Error removing expired blocks:", error);
//   }
// };

// // Run the task every hour
// setInterval(removeExpiredBlocks, 60 * 60 * 1000);
