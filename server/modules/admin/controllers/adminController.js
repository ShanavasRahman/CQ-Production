const Admin = require('../model/adminModel');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { validationResult } = require('express-validator');

// Admin Controller to handle CRUD operations and authentication
const AdminController = {
  // Admin Registration
  register: async (req, res) => {
    console.log("req", req.body);
    const errors = validationResult(req.body);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { fullName, email, password, role } = req.body;

    try {
      // Check if admin already exists
      const existingAdmin = await Admin.findOne({ email });
      if (existingAdmin) {
        return res.status(400).json({ message: 'Admin with this email already exists' });
      }

      // Create new admin
      const newAdmin = new Admin({
        fullName,
        email,
        role,
        password
      });

      await newAdmin.save();
      res.status(201).json({ message: 'Admin registered successfully' });
    } catch (error) {
      console.error(error.message);
      res.status(500).json({ message: 'Server error' });
    }
  },

  login: async (req, res) => {
    try {
      console.log("hai")
      const { username, password, selectDepartment } = req.body;
      const admin = await Admin.findOne({ email: username });

      if (!admin || selectDepartment !== admin.role) {
        return res.status(404).json({ message: "User not found" });
      }

      const isPasswordMatch = await bcrypt.compare(password, admin.password);

      if (!isPasswordMatch) {
        return res.status(401).json({ message: "Invalid password" });
      }

      const token = jwt.sign({ id: username }, process.env.JWT_SECRET, {
        expiresIn: "24m",
      });
      console.log('token', token);

      res.cookie("authToken", token, {
        httpOnly: true,
        secure: false,
        maxAge: 60 * 1000
      });
      const adminData={
        username:admin.email,
        role:admin.role
      }

      return res.status(200).json({ message: "Login successfully" ,adminData});
    } catch (error) {
      return res.status(500).json(error.message);
    }
  },

  logOut: (req, res) => {
    try {
      res.clearCookie('authToken', { httpOnly: true });
      return res.json({ message: 'Logged out successfully' });

    } catch (error) {
      return res.status(500).json({ message: "Internal server error" });
    }
  },


    // Get Admin Profile (Secured route)
    getProfile: async (req, res) => {
      try {
        const admin = await Admin.findById(req.adminId).select('-password'); // Exclude password
        res.json(admin);
      } catch (error) {
        res.status(500).json({ message: 'Server error' });
      }
    },

      // Update Admin (Secured route)
      updateAdmin: async (req, res) => {
        try {
          const updates = req.body;
          const admin = await Admin.findByIdAndUpdate(req.adminId, updates, { new: true }).select('-password');
          res.json(admin);
        } catch (error) {
          res.status(500).json({ message: 'Server error' });
        }
      },

        // Delete Admin (Secured route)
        deleteAdmin: async (req, res) => {
          try {
            await Admin.findByIdAndDelete(req.adminId);
            res.json({ message: 'Admin deleted successfully' });
          } catch (error) {
            res.status(500).json({ message: 'Server error' });
          }
        }
  };

  module.exports = AdminController;
