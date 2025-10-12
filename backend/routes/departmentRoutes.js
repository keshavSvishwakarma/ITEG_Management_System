const express = require('express');
const router = express.Router();
const {
  createDepartment,
  getAllDepartments,
  getDepartmentById,
  updateDepartment,
  deleteDepartment,
  getDepartmentByCode
} = require('../modules/department/controllers/departmentController');

// CREATE Department
router.post('/', createDepartment);

// GET ALL Departments
router.get('/', getAllDepartments);

// GET Department by ID
router.get('/:id', getDepartmentById);

// GET Department by Code
router.get('/code/:code', getDepartmentByCode);

// UPDATE Department
router.put('/:id', updateDepartment);

// DELETE Department
router.delete('/:id', deleteDepartment);

module.exports = router;