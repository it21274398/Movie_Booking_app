import express from "express";
import multer from "multer";
import path from "path";
import {
  uploadPoster,
  createMovie,
  getAllMovies,
  getMovie,
  updateMovie,
  deleteMovie,
} from "../controllers/movieController.js";

const router = express.Router();

/* =========================================================
   MULTER STORAGE FIX — KEEP FILE EXTENSION
========================================================= */
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },

  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname); // .jpg / .png
    cb(null, Date.now() + ext);
  },
});

const upload = multer({ storage });

/* =========================================================
   ROUTES
========================================================= */
router.post("/upload", upload.single("poster"), uploadPoster);

router.post("/", createMovie);
router.get("/", getAllMovies);
router.get("/:id", getMovie);
router.put("/:id", updateMovie);
router.delete("/:id", deleteMovie);

export default router;
