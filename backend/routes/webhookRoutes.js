// webhookRoutes.js or inside your main route file
const express = require("express");
const router = express.Router();
const admissionController = require('../modules/student/controllers/admissionProcessStudentControllers'); // adjust path
const studentAdmittedController= require('../modules/student/controllers/AdmittedStudentController'); // adjust path
const studentController = require('../modules/student/controllers/AdmittedStudentController'); // adjust path
const WEBHOOK_SECRET = process.env.WEBHOOK_SECRET;


router.post("/register",admissionController.addAdmission);
router.post("/admission_flag_update", admissionController.updateAdmissionFlag, studentAdmittedController.createAdmittedStudent);
router.patch('/update-admitted-student', studentController.updateAdmittedStudent);
module.exports = router;
 

