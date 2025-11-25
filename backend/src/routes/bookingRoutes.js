import express from "express";
import auth from "../middleware/authMiddleware.js";
import admin from "../middleware/adminMiddleware.js";

import {
  createBooking,
  getMyBookings,
  getAllBookings,
  getBookingStats
} from "../controllers/bookingController.js";

const router = express.Router();

// User routes
router.post("/", auth, createBooking);
router.get("/me", auth, getMyBookings);

// Admin stats route  ✅ NEW
router.get("/stats", auth,  getBookingStats);

// Admin view all bookings
router.get("/",  getAllBookings);

export default router;
