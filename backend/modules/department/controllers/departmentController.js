const Department = require('../models/Department');
const mongoose = require('mongoose');

// CREATE Department
exports.createDepartment = async (req, res) => {
  try {
    const { name, code, description, isActive } = req.body;

    if (!name || !code) {
      return res.status(400).json({ message: 'Name and code are required' });
    }

    const existingDepartment = await Department.findOne({ code: code.toUpperCase() });
    if (existingDepartment) {
      return res.status(400).json({ message: 'Department with this code already exists' });
    }

    const department = new Department({
      name,
      code: code.toUpperCase(),
      description,
      isActive
    });

    await department.save();

    res.status(201).json({
      success: true,
      message: 'Department created successfully',
      department
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// GET ALL Departments
exports.getAllDepartments = async (req, res) => {
  try {
    const { isActive, page = 1, limit = 10 } = req.query;
    
    const filter = {};
    if (isActive !== undefined) {
      filter.isActive = isActive === 'true';
    }

    const departments = await Department.find(filter)
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const total = await Department.countDocuments(filter);

    res.status(200).json({
      success: true,
      departments,
      pagination: {
        total,
        page: parseInt(page),
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// GET Department by ID
exports.getDepartmentById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid department ID' });
    }

    const department = await Department.findById(id);
    if (!department) {
      return res.status(404).json({ message: 'Department not found' });
    }

    res.status(200).json({
      success: true,
      department
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// UPDATE Department
exports.updateDepartment = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, code, description, isActive } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid department ID' });
    }

    const updateData = {};
    if (name) updateData.name = name;
    if (code) updateData.code = code.toUpperCase();
    if (description !== undefined) updateData.description = description;
    if (typeof isActive === 'boolean') updateData.isActive = isActive;

    if (code) {
      const existingDepartment = await Department.findOne({ 
        code: code.toUpperCase(), 
        _id: { $ne: id } 
      });
      if (existingDepartment) {
        return res.status(400).json({ message: 'Department with this code already exists' });
      }
    }

    const department = await Department.findByIdAndUpdate(
      id,
      updateData,
      { new: true, runValidators: true }
    );

    if (!department) {
      return res.status(404).json({ message: 'Department not found' });
    }

    res.status(200).json({
      success: true,
      message: 'Department updated successfully',
      department
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// DELETE Department
exports.deleteDepartment = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid department ID' });
    }

    const department = await Department.findByIdAndDelete(id);
    if (!department) {
      return res.status(404).json({ message: 'Department not found' });
    }

    res.status(200).json({
      success: true,
      message: 'Department deleted successfully'
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// GET Department by Code
exports.getDepartmentByCode = async (req, res) => {
  try {
    const { code } = req.params;

    const department = await Department.findOne({ code: code.toUpperCase() });
    if (!department) {
      return res.status(404).json({ message: 'Department not found' });
    }

    res.status(200).json({
      success: true,
      department
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};