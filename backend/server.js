require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const setupSwagger = require("./swagger/swagger");

//expres object
const app = express();

// CORS configuration - allow all origins for webhook calls
app.use(cors({
  origin: true, // Allow all origins
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH"],
  credentials: true,
  allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"]
}));

app.options("*", cors()); // Handle preflight requests

// Body parsing middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));
// Import Routes
const webhookRoutes = require("./routes/webhookRoutes");

const studentAdmissionRoutes = require("./routes/studentAdmissionProcessRoutes");
const protectedRoutes = require("./routes/protectedRoutes");

const admittedStudentRoutes = require("./routes/studentRoutes");
const userRoutes = require("./routes/userRoutes.js");
const otpRoutes = require("./routes/otpRoutes.js");
const passport = require("./config/passport.js");


// cors for frontend and backend communication
setupSwagger(app);
// app.use(
//   cors({
//     origin: "http://localhost:5173",
//     // origin: '*', // or '*' to allow all
//     methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH"],
//     credentials: true, // only if you're using cookies or sessions
//   })
// );
// const allowedOrigins = process.env.FRONTEND_URL ? process.env.FRONTEND_URL.split(",") : ['http://localhost:5173'];



// Health Check Route
app.get('/api/health-check', (req, res) => {
  console.log("🔥 Health check hit!");
  res.status(200).send("Backend is alive 🚀");
});

// Routes
app.use("/api/protected", protectedRoutes);

// user routes
app.use("/api/user", userRoutes);

// admission process routes
app.use("/api/admission/students", studentAdmissionRoutes);

// admitted students routes
app.use("/api/admitted/students", admittedStudentRoutes);

// webhook routes
app.use("/api/admission/students/webhook", webhookRoutes);

app.use("/api/admitted/students/webhook", webhookRoutes);

// in your main server.js / app.js
app.use('/api/user/otp', otpRoutes);

// passport.js
app.use(passport.initialize());

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Unhandled error:', err);
  res.status(500).json({ 
    message: 'Internal server error', 
    error: process.env.NODE_ENV === 'development' ? err.message : 'Something went wrong'
  });
});

// MongoDB Connection
module.exports = app;
// Start Server only if this is the main module (not when testing)
if (require.main === module) {
  mongoose
    .connect(process.env.MONGO_URI)
    .then(() => console.log("✅ Connected to MongoDB"))
    .catch((err) => console.error("❌ DB Connection Error:", err));

  // 👈 Export the app for testing

  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}

