import authService from "../services/auth.service.js";
import { registerSchema, loginSchema } from "../validators/authValidator.js";
import User from "../models/User.js";
import bcrypt from "bcryptjs";
import { generateToken } from "../config/jwt.js";

// =============================
// USER REGISTER
// =============================
export const register = async (req, res, next) => {
  try {
    const { error } = registerSchema.validate(req.body);
    if (error) throw new Error(error.details[0].message);

    const result = await authService.register(req.body);

    res.status(201).json({
      success: true,
      message: "User registered successfully",
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

// =============================
// USER LOGIN
// =============================
export const login = async (req, res, next) => {
  try {
    const { error } = loginSchema.validate(req.body);
    if (error) throw new Error(error.details[0].message);

    const result = await authService.login(req.body);

    res.status(200).json({
      success: true,
      token: result.token,
      user: result.user,
    });
  } catch (err) {
    next(err);
  }
};

// =============================
// ADMIN REGISTER
// =============================
export const registerAdmin = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    // 1. Check if admin already exists
    const existingAdmin = await User.findOne({ email, role: "admin" });
    if (existingAdmin) {
      return res.status(400).json({
        success: false,
        message: "Admin with this email already exists",
      });
    }

    // 2. Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // 3. Create admin user
    const admin = await User.create({
      name,
      email,
      password: hashedPassword,
      role: "admin", // IMPORTANT
    });

    // 4. Generate token
    const token = generateToken(admin);

    return res.status(201).json({
      success: true,
      message: "Admin registered successfully",
      token,
      admin: {
        id: admin._id,
        name: admin.name,
        email: admin.email,
        role: admin.role,
      },
    });

  } catch (err) {
    next(err);
  }
};


// =============================
// ADMIN LOGIN
// =============================
export const loginAdmin = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // Find admin user
    const admin = await User.findOne({ email, role: "admin" });
    if (!admin) {
      return res.status(404).json({
        success: false,
        message: "Admin not found",
      });
    }

    // Compare passwords
    const match = await bcrypt.compare(password, admin.password);
    if (!match) {
      return res.status(400).json({
        success: false,
        message: "Invalid password",
      });
    }

    // Generate token
    const token = generateToken(admin);

    return res.json({
      success: true,
      token,
      admin: {
        id: admin._id,
        name: admin.name,
        email: admin.email,
        role: admin.role,
      },
    });
  } catch (error) {
    next(error);
  }
};

