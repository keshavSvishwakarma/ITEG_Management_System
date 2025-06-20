// config/multer.js
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/resumes/');
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  }
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype === 'application/pdf' || file.mimetype.includes('msword') || file.mimetype.includes('officedocument')) {
    cb(null, true);
  } else {
    cb(new Error('Only PDF or DOC files allowed!'), false);
  }
};

const upload = multer({ storage, fileFilter });

module.exports = upload;
