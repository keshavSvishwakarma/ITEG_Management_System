const Student_Admission_process = require('../models/StudentAdmissionProcess');
const bcrypt = require('bcrypt');
const os = require('os'); // Get user home directory
const path = require('path');
const fs = require('fs');

const ExcelJS = require("exceljs");
exports.createStudent_Admission_process = async (req, res) => {
  try {
    const { First_name, Last_name, Father_name,
      //  Mother_name, 
      stream, percent12th, email, aadharCard, student_Mb_no, father_Mb_no, course, track, address, status, interviewAttempts ,feeStatus} = req.body;
    // const hashedPassword = await bcrypt.hash(password, 10);

    const studentAdmission = new Student_Admission_process({
      First_name,
      Last_name,
      Father_name,
      // Mother_name,
      stream,
      percent12th,
      email,
      aadharCard,
      student_Mb_no,
      father_Mb_no,
      course,
      track,
      status,
      address,
      interviewAttempts,
      feeStatus,
    });

    await studentAdmission.save();
    res.status(201).json({ message: 'Student Admission Process created successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};






// router.get('/admission-dashboard', async (req, res) => {
  exports.getAdmissionDashboard = async (req, res) => {
    try {
        // Total number of students who gave an interview
        const totalInterviewed = await Student_Admission_process.countDocuments({ interviewAttempts: { $gt: 0 } });

        // Student profile breakdown
        const rejectedCount = await Student_Admission_process.countDocuments({ status: 'Rejected' });
        const attemptedCount = await Student_Admission_process.countDocuments({ status: 'Attempted' });
        const roundAttemptCount = await Student_Admission_process.countDocuments({ status: 'Round Attempt' });

        // Track-wise student record
        const trackWiseStudents = await Student_Admission_process.aggregate([
            {
                $group: {
                    _id: '$track',
                    total: { $sum: 1 }
                }
            }
        ]);

        // Fee status breakdown
        const fullFeeCount = await Student_Admission_process.countDocuments({ feeStatus: 'Full' });
        const partialFeeCount = await Student_Admission_process.countDocuments({ feeStatus: 'Partial' });
        const notPaidCount = await Student_Admission_process.countDocuments({ feeStatus: 'Not Paid' });

        // Response
        res.json({
            totalInterviewed,
            profileBreakdown: {
                rejected: rejectedCount,
                attempted: attemptedCount,
                roundAttempt: roundAttemptCount
            },
            trackWiseStudents,
            feeStatus: {
                full: fullFeeCount,
                partial: partialFeeCount,
                notPaid: notPaidCount
            }
        });

    } catch (error) {
        console.error('Error fetching admission dashboard data:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};



// Update Specific Fields (course, status, interviewAttempts, feeStatus)
exports.updateStudent = async (req, res) => {
  try {
      const { id } = req.params;
      const { course, status, interviewAttempts, feeStatus } = req.body;

      const updatedStudent = await Student_Admission_process.findByIdAndUpdate(id, 
          { course, status, interviewAttempts, feeStatus },
          { new: true, runValidators: true }
      );

      if (!updatedStudent) {
          return res.status(404).json({ message: 'Student not found' });
      }

      res.status(200).json({ message: 'Student fields updated successfully', student: updatedStudent });
  } catch (error) {
      res.status(500).json({ message: 'Internal Server Error', error: error.message });
  }
};


// Delete Student
exports.deleteStudent = async (req, res) => {
  try {
      const { id } = req.params;
      const deletedStudent = await Student_Admission_process.findByIdAndDelete(id);

      if (!deletedStudent) {
          return res.status(404).json({ message: 'Student not found' });
      }

      res.status(200).json({ message: 'Student deleted successfully' });
  } catch (error) {
      res.status(500).json({ message: 'Internal Server Error', error: error.message });
  }
};


// Get Students by Track
exports.getStudentsByTrack = async (req, res) => {
  try {
      const { track } = req.params;
      const students = await Student_Admission_process.find({ track });

      if (students.length === 0) {
          return res.status(404).json({ message: 'No students found for this track' });
      }

      res.status(200).json({ students });
  } catch (error) {
      res.status(500).json({ message: 'Internal Server Error', error: error.message });
  }
};



exports.downloadStudentExcel = async (req, res) => {
    try {
        const students = await Student_Admission_process.find();
        if (students.length === 0) {
            return res.status(404).json({ message: "No student data available." });
        }

        const workbook = new ExcelJS.Workbook();
        const worksheet = workbook.addWorksheet('Student Data');

        worksheet.columns = [
            { header: 'First Name', key: 'First_name', width: 15 },
            { header: 'Last Name', key: 'Last_name', width: 15 },
            { header: 'Father Name', key: 'Father_name', width: 20 },
            { header: 'Email', key: 'email', width: 25 },
            { header: 'Aadhar Card', key: 'aadharCard', width: 20 },
            { header: 'Student Mobile', key: 'student_Mb_no', width: 15, type:'number'},
            { header: 'Father Mobile', key: 'father_Mb_no', width: 15, type:'number'},
            { header: 'Course', key: 'course', width: 20 },
            { header: 'Track', key: 'track', width: 20 },
            { header: 'Status', key: 'status', width: 15 },
            { header: 'Interview Attempts', key: 'interviewAttempts', width: 20, type:'number'},
            { header: 'Fee Status', key: 'feeStatus', width: 15 }
        ];

        students.forEach(student => worksheet.addRow(student));

        const downloadsFolder = path.join(os.homedir(), 'Downloads');
        const filePath = path.join(downloadsFolder, 'StudentData.xlsx');

        await workbook.xlsx.writeFile(filePath);

        // Set headers for file download
        res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
        res.setHeader('Content-Disposition', `attachment; filename=StudentData.xlsx`);

        // Stream the file directly
        const fileStream = fs.createReadStream(filePath);
        fileStream.pipe(res);

        fileStream.on('end', () => {
            console.log("File sent successfully. Deleting local file...");
            fs.unlinkSync(filePath); // Delete after sending
        });

    } catch (error) {
        console.error("Error generating Excel file:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};



