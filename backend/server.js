// require("dotenv").config();
// const express = require("express");
// const cors = require("cors");
// const mongoose = require("mongoose");
// const bodyParser = require("body-parser");
// const setupSwagger = require("./swagger/swagger");
// // Import Routes
// const webhookRoutes = require("./routes/webhookRoutes");

// const studentAdmissionRoutes = require("./routes/studentAdmissionProcessRoutes");
// const protectedRoutes = require("./routes/protectedRoutes");

// const admittedStudentRoutes = require("./routes/studentRoutes");
// const userRoutes = require("./routes/userRoutes.js");
// const otpRoutes = require("./routes/otpRoutes.js");
// const passport = require("./config/passport.js");

// //expres object
// const app = express();
// // cors for frontend and backend communication
// setupSwagger(app);
// app.use(
//   cors({
//     // origin: https://iteg-management-system.vercel.app/, // replace with your frontend URL
//     origin: [
//     "https://iteg-management-system.vercel.app/",
//     "http://localhost:5173/api"
//   ],
//     origin: '*', // or '*' to allow all
//     // methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH"],
//     credentials: true, // only if you're using cookies or sessions
//   })
// );

// app.options("*", cors());
// app.use(express.json());

// // Middleware
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));

// // Routes
// app.use("/api/protected", protectedRoutes);

// // user routes
// app.use("/api/user", userRoutes);

// // admission process routes
// app.use("/api/admission/students", studentAdmissionRoutes);

// // admitted students routes
// app.use("/api/admitted/students", admittedStudentRoutes);

// // webhook routes
// app.use("/api/admission/students/webhook", webhookRoutes);

// app.use("/api/admitted/students/webhook", webhookRoutes);

// // in your main server.js / app.js
// app.use('/api/user/otp', otpRoutes);

// // passport.js
// app.use(passport.initialize());

// // MongoDB Connection
// module.exports = app;
// // Start Server only if this is the main module (not when testing)
// if (require.main === module) {
//   mongoose
//     .connect(process.env.MONGO_URI)
//     .then(() => console.log("✅ Connected to MongoDB"))
//     .catch((err) => console.error("❌ DB Connection Error:", err));

//   // 👈 Export the app for testing

//   const PORT = process.env.PORT || 5000;
//   app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
// }


require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const setupSwagger = require("./swagger/swagger");

// Routes
const webhookRoutes = require("./routes/webhookRoutes");
const studentAdmissionRoutes = require("./routes/studentAdmissionProcessRoutes");
const protectedRoutes = require("./routes/protectedRoutes");
const admittedStudentRoutes = require("./routes/studentRoutes");
const userRoutes = require("./routes/userRoutes.js");
const otpRoutes = require("./routes/otpRoutes.js");
const passport = require("./config/passport.js");

// Create express app
const app = express();

// Swagger
setupSwagger(app);

// ✅ CORS Setup (FIXED)
const allowedOrigins = process.env.FRONTEND_URL?.split(",") || [];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("CORS not allowed for: " + origin));
      }
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH"],
  })
);

// Handle preflight (OPTIONS) requests
app.options("*", cors());

// JSON parsing
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
app.use("/api/protected", protectedRoutes);
app.use("/api/user", userRoutes);
app.use("/api/admission/students", studentAdmissionRoutes);
app.use("/api/admitted/students", admittedStudentRoutes);
app.use("/api/admission/students/webhook", webhookRoutes);
app.use("/api/admitted/students/webhook", webhookRoutes);
app.use("/api/user/otp", otpRoutes);

// Passport.js
app.use(passport.initialize());

// MongoDB Connection
module.exports = app;

// Start server if run directly
if (require.main === module) {
  mongoose
    .connect(process.env.MONGO_URI)
    .then(() => console.log("✅ Connected to MongoDB"))
    .catch((err) => console.error("❌ DB Connection Error:", err));

  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
}
