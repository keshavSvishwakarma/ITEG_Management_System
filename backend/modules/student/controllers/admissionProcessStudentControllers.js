const axios = require("axios");
const AdmissionProcess = require("../models/admissionProcessStudent");
const admittedStudent = require("./admittedStudentController");

const crypto = require("crypto");
 const { sendEmail } = require('./emailController');
//  console.log('Student email:', updatedStudent.email);


// const axios = require('axios');
require("dotenv").config();
const WEBHOOK_SECRET = process.env.WEBHOOK_SECRET; // ✅ Also load this from .env

// ✅ Add New Admission Entry
// exports.addAdmission = async (req, res) => {
//    try {
//     const payload = req.body;

//     // const receivedSignature = req.headers["x-webhook-signature"];

//     // const expectedSignature = crypto
//     //   .createHmac("sha256", WEBHOOK_SECRET)
//     //   .update(JSON.stringify(payload))
//     //   .digest("hex");

//     // if (receivedSignature !== expectedSignature) {
//     //   console.log("❌ Invalid Signature");
//     //   return res.status(401).send("Unauthorized");
//     // }

//     const existingStudent = await AdmissionProcess.findOne({
//       prkey: payload.prkey,
//     });
//     if (existingStudent) {
//       // Update the existing document with new data
//       console.log(
//         "✅ Updating existing student admission process data:",
//         existingStudent
//       );
//       existingStudent.set(payload);
//       // await existingStudent.save();
//       return res
//         .status(200)
//         .json({ message: "Student already registered", data: existingStudent });
//     }
//     // Check if required fields are present
//     if (isNaN(Date.parse(req.body.dob))) {
//       return res.status(400).json({ message: "Invalid date format" });
//     }
//     const newAdmission = new AdmissionProcess(payload);

//     await newAdmission.save();
//     console.log("✅ New student admission process data saved:");
    
//     res
//       .status(201)
//       .json({ message: "Student admission initiated", data: newAdmission });
//    } catch (error) {
//     res.status(400).json({ message: "Error adding admission", error });
//    }
// };
exports.addAdmission = async (req, res) => {
  try {
    const payload = req.body;

    // 1) Check required fields
    const requiredFields = [
      'prkey','firstName','lastName','fatherName',
      'studentMobile','parentMobile','gender','dob',
      'aadharCard','address','stream','course',
      'category','subject12','year12'
    ];
    for (let field of requiredFields) {
      if (!payload[field]) {
        return res.status(400).json({ message: `Missing field: ${field}` });
      }
    }

    // 2) Validate date format
    if (isNaN(Date.parse(payload.dob))) {
      return res.status(400).json({ message: 'Invalid date format' });
    }

    // 3) Validate mobile & aadhar format
    const mobileRegex = /^\d{10}$/;
    if (!mobileRegex.test(payload.studentMobile) || !mobileRegex.test(payload.parentMobile)) {
      return res.status(400).json({ message: 'Invalid mobile number format' });
    }
    const aadharRegex = /^\d{12}$/;
    if (!aadharRegex.test(payload.aadharCard)) {
      return res.status(400).json({ message: 'Invalid aadhaar format' });
    }

    // 4) Duplicate check
    const existingStudent = await AdmissionProcess.findOne({ prkey: payload.prkey });
    if (existingStudent) {
      existingStudent.set(payload);
      return res.status(200).json({ message: 'Student already registered', data: existingStudent });
    }

    // 5) Save new
    const newAdmission = new AdmissionProcess(payload);
    await newAdmission.save();
    console.log("✅ New student admission process data saved:");
    return res.status(201).json({ message: 'Student admission initiated', data: newAdmission });

  } catch (error) {
    return res.status(500).json({ message: 'Error adding admission', error: error.message });
  }
};


exports.updateAdmissionFlag = async (req, res, next) => {
  try {
    const { prkey, admissionStatus } = req.body;

    if (!prkey || !admissionStatus) {
      return res.status(400).json({
        message: "Both prkey and admissionStatus are required",
      });
    }
    // Find the student by prkey and update the admissionStatus
    const updatedStudent = await AdmissionProcess.findOneAndUpdate(
      { prkey},
      { admissionStatus },
      { new: true }
    );
    // console.log(updatedStudent);
    

    if (!updatedStudent) {
      return res
        .status(404)
        .json({ message: "Student not found with the provided prkey" });
    }
         req.updatedStudent = updatedStudent;


         // // ✅ Send plain text email if admission confirmed
         if (admissionStatus === true && updatedStudent.email) {
          await sendEmail({
            to: updatedStudent.email,
            subject: 'Admission Confirmed',
            text: `Hi ${updatedStudent.firstName},\n\nYour admission has been successfully confirmed.\n\nRegards,\nAdmission Office`,
          });
         }
    // Now move to next controller
    next();
    // Call the next middleware or route handler
  } catch (error) {
    console.error("❌ Error updating admissionStatus:", error.message);
    return res
      .status(500)
      .json({ message: "Server error", error: error.message });
  }
};

// update the itegIntervieFlag 
exports.sendInterviewFlagToCentral = async (req, res) => {
  try {
    const { studentId } = req.params;

    // Step 1: Update interview flag locally
    const student = await AdmissionProcess.findByIdAndUpdate(
      studentId,
      { itegInterviewFlag: true },
      { new: true }
    )

    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }

   
     // // ✅ Send plain text email if admission confirmed


    // Step 2: Prepare payload (only relevant fields)
    const payload = {
      prkey: student.prkey,
      itegInterviewFlag: true
    };
    if (student.itegInterviewFlag === true && student.email) {
      await sendEmail({
        to: student.email,
        subject: 'Admission Confirmed',
        text: `Hi ${student.firstName},\n\n Now you are eligible.\n\nRegards,\nAdmission Office`,
      });
     }
    // Step 3: Send POST to Central System
     const response = await axios.post('http://localhost:5001/webhook/iteg-flag-update', payload); // Replace URL

    // Step 4: Respond
    res.status(200).json({
      message: 'Interview flag updated and sent to central',
      centralResponse: response.data
    });

  } catch (err) {
    console.error('Error sending interview flag:', err);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};


exports.createInterview = async (req, res) => {
  try {
    const { id } = req.params;
    const { round, attemptNo, marks, remark, date, result } = req.body;

    const student = await AdmissionProcess.findById(id);
    if (!student) {
      return res.status(404).json({ success: false, message: "Student not found" });
    }

    // Get the last interview (most recent)
    const interviews = student.interviews || [];
    const lastInterview = interviews[interviews.length - 1];

    // Validation rules
    if (lastInterview) {
      // Check if trying to skip to the next round without passing
      if (parseInt(round) > parseInt(lastInterview.round) && lastInterview.result !== "Passed") {
        return res.status(400).json({
          success: false,
          message: `Cannot proceed to round ${round} until round ${lastInterview.round} is passed.`,
        });
      }

      // Get attempts in the current round
      const sameRoundAttempts = interviews.filter(i => i.round === lastInterview.round);

      if (
        lastInterview.round === round &&
        sameRoundAttempts.length >= 4 &&
        lastInterview.result !== "Passed"
      ) {
        return res.status(400).json({
          success: false,
          message: `Maximum 4 attempts allowed for round ${round}. Student is rejected.`,
        });
      }

      // If already passed the round, can't add more interviews for that round
      if (lastInterview.round === round && lastInterview.result === "Passed") {
        return res.status(400).json({
          success: false,
          message: `Round ${round} is already passed. Please proceed to the next round.`,
        });
      }
    }

    const newInterview = {
      round: round || "1",
      attemptNo: attemptNo || 0,
      marks: marks || 0,
      remark: remark || "",
      date: date || new Date(),
      result: result || "Pending",
    };

    student.interviews.push(newInterview);
    await student.save();

    res.status(201).json({
      success: true,
      message: "Interview round added successfully",
      student,
    });
  } catch (error) {
    console.error("Error adding interview round:", error);
    res.status(500).json({ success: false, message: "Server Error", error });
  }
};


exports.getInterviewsByStudentId = async (req, res) => {
  try {
    const { id } = req.params;

    // Find student by ID
    const student = await AdmissionProcess.findById(id);

    if (!student) {
      return res.status(404).json({
        success: false,
        message: "Student not found"
      });
    }

    // Return only interviews array
    res.status(200).json({
      success: true,
      interviews: student.interviews
    });

  } catch (error) {
    console.error("Error fetching interviews:", error);
    res.status(500).json({
      success: false,
      message: "Server Error",
      error: error.message
    });
  }
};

exports.getAllStudents = async (req, res) => {
  try {
    const students = await AdmissionProcess.find(); // fetch all student records
    res.status(200).json(students); // send as JSON response
  } catch (error) {
    res.status(500).json({ message: 'Failed to retrieve students', error: error.message });
  }
};