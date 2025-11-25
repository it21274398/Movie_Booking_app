import express from "express";
import { register, login ,loginAdmin,registerAdmin } from "../controllers/authController.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
// Admin login
router.post("/admin/login", loginAdmin); 
router.post("/admin/register", registerAdmin);

export default router;
