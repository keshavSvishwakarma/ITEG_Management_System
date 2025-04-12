const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
require("dotenv").config();

// Import Routes
const adminRoutes = require("./routes/AdminRoutes");
const facultyRoutes = require("./routes/facultyRoutes");
// const studentAdmissionRoutes = require("./routes/student_admissionProcessRoutes");
const protectedRoutes = require("./routes/protectedRoutes");
const studentRoutes = require("./routes/studentRoutes");
const student_admissionProcessRoutes = require("./routes/student_admissionProcessRoutes");
const AdminRoutes = require("./routes/AdminRoutes");
const superAdminRoutes = require("./routes/SuperAdminRoutes");
const facultyRoutes= require("./routes/facultyRoutes");
// const swaggerUi = require('swagger-ui-express');
// const YAML = require('yamljs');
// const path = require('path');


// const superAdminRoutes = require("./routes/SuperAdminRoutes");
//expres object
const app = express();
// cors for frontend and backend communication
app.use(
  cors({
    origin: "http://localhost:5173", // or '*' to allow all
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    credentials: true, // only if you're using cookies or sessions
  })
);

app.options("*", cors());

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/api/admin", AdminRoutes);
app.use("/api/superAdmin", superAdminRoutes);
app.use("/api/faculty", facultyRoutes);
app.use("/api/protected", protectedRoutes);
app.use("/api/students", studentRoutes);
app.use("/api/studentAdmissionProcess", student_admissionProcessRoutes);



// app.use("/api/", studentAdmission);
app.use("/api/studentAdmission",student_admissionProcessRoutes);

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch((err) => console.error("❌ DB Connection Error:", err));

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
