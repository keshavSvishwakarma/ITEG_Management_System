const mongoose = require('mongoose');


const levelSchema = new mongoose.Schema({
  levelNo: { type: String, required: true },
  noOfAttempts: { type: Number, default: 0 },
  marks: { type: Number, default: 0 },
  remark: { type: String },
  date: { type: Date },
  result: { type: String, enum: ['Pass', 'Fail', 'Pending'], default: 'Pending' }
});

const placedInfoSchema = new mongoose.Schema({
  companyName: { type: String },
  salary: { type: Number },
  location: { type: String }
});

const permissionSchema = new mongoose.Schema({
  reason: { type: String },
  approvedBy: { type: String, enum: ['Super Admin', 'Admin', 'Faculty'], 
    required: true  }
});

const interviewRecordSchema = new mongoose.Schema({
  companyName: { type: String },
  interviewDate: { type: Date },
  remark: { type: String },
  result: { type: String, enum: ['Selected', 'Rejected', 'Pending'], default: 'Pending' },
  location: { type: String },
  jobProfile: { type: String }
});

// const studentSchema = new mongoose.Schema({
//   fullName: { type: String, required: true },
//   stream: { type: String, required: true },
//   course: { type: String, required: true },
//   fatherName: { type: String, required: true },
//   motherName: { type: String, required: true },
//   mobileNo: { type: String, required: true, unique: true },
//   fatherNo: { type: String },
//   email: { type: String, required: true, unique: true },
//   track: { type: String, required: true },
//   address: { type: String, required: true },
//   year: { type: String, required: true },
//   level: [levelSchema],
//   techno: { type: String },
//   attendancePercentage: { type: Number, min: 0, max: 100 },
//   placedInfo: placedInfoSchema,
//   permission: permissionSchema,
//   permission: { type: Boolean, default: false },
//   interviewRecord: [interviewRecordSchema],
//   readinessStatus: { type: String, enum: ['Ready', 'Not Ready'], default: 'Not Ready' }
// });
const AdmittedStudentSchema = new mongoose.Schema({
  admissionRef: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "StudentAdmissionProcess",
    required: true,
    unique: true
  },

  fullName: { type: String, required: true },
  stream: { type: String, required: true },
  course: { type: String, required: true },
  fatherName: { type: String, required: true },
  mobileNo: { type: String, required: true },
  email: { type: String, required: true },

  level: [levelSchema],
  techno: { type: String },
  attendancePercentage: { type: Number, min: 0, max: 100 },
  placedInfo: placedInfoSchema,

  permissionRequired: { type: Boolean, default: false },
  permission: permissionSchema,
  interviewRecord: [interviewRecordSchema],
  readinessStatus: { type: String, enum: ['Ready', 'Not Ready'], default: 'Not Ready' }

}, { timestamps: true });
module.exports = mongoose.model("AdmittedStudent", AdmittedStudentSchema);
// module.exports = mongoose.model('Student', studentSchema);
