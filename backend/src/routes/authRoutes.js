import express from "express";
import {
  register,
  login,
  loginAdmin,
  registerAdmin,
  getTotalUsers,
} from "../controllers/authController.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
// Admin login
router.post("/admin/login", loginAdmin);
router.post("/admin/register", registerAdmin);
router.get("/total-users", getTotalUsers);

export default router;
