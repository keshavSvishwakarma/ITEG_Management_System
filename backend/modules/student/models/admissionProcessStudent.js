const mongoose = require('mongoose');

const StudentAdmissionProcessSchema = new mongoose.Schema({
  // Central datafirstName: { type: String, required: true },
  prkey: { type: String, required: true, unique: true },
  lastName: { type: String, required: true },
  fatherName: { type: String, required: true },
  studentMobile: { type: String, required: true },
  parentMobile: { type: String, required: true },
  gender: { type: String, required: true },
  dob: { type: Date, required: true },
  aadharCard: { type: String, required: true, unique: true },
  address: { type: String, required: true },
  stream: { type: String, required: true },
  course: { type: String, required: true },
  category: { type: String, required: true },
  subject12: { type: String, required: true },
  year12: { type: String, required: true },
  percent12: { type: String }, // not required

  // App-side tracking
  onlineTest: {
    date: Date,
    testLink: String,
    result: { type: String, enum: ["Pass", "Fail", "Pending"], default: "Pending" }
  },

  // Next stage interview (can be array of attempts)
  interviews: [
    {
      date: Date,
      remark: String,
      result: { type: String, enum: ["Pass", "Fail", "Pending"], default: "Pending" }
    }
  ],

  admissionFlag: { type: Boolean, default: false }, // For account dept
}, { timestamps: true });

module.exports = mongoose.model('StudentAdmissionProcess', StudentAdmissionProcessSchema);



