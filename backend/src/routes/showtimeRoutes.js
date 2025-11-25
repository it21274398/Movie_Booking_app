import express from "express";
import auth from "../middleware/authMiddleware.js";
import admin from "../middleware/adminMiddleware.js";

import {
  createShowtime,
  updateShowtime,
  deleteShowtime,
  getShowtimes,
  getShowtime,
  getShowtimesByMovie,
} from "../controllers/showtimeController.js";
import Showtime from "../models/Showtime.js";

const router = express.Router();
router.get("/details/:id", async (req, res, next) => {
  try {
    const showtime = await Showtime.findById(req.params.id);

    if (!showtime) {
      return res.status(404).json({ success: false, message: "Showtime not found" });
    }

    res.json(showtime);
  } catch (err) {
    next(err);
  }
});

// Admin create/edit/delete
router.post("/", auth, createShowtime);
router.put("/:id", auth, updateShowtime);
router.delete("/:id", auth, deleteShowtime);

// Public
router.get("/movie/:movieId", getShowtimesByMovie); // <-- NEW
router.get("/", getShowtimes);
router.get("/:id", getShowtime);

export default router;
