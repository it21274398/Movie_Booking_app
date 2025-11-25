import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import morgan from "morgan";
import connectDB from "./src/config/db.js";
import errorHandler from "./src/middleware/errorHandler.js";

// route imports
import authRoutes from "./src/routes/authRoutes.js";
import movieRoutes from "./src/routes/movieRoutes.js";
import showtimeRoutes from "./src/routes/showtimeRoutes.js";
import bookingRoutes from "./src/routes/bookingRoutes.js";

dotenv.config();
const app = express();

// middlewares
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

// connect DB
connectDB();

app.use("/uploads", express.static("uploads"));

// routes
app.use("/api/auth", authRoutes);
app.use("/api/movies", movieRoutes);
app.use("/api/showtimes", showtimeRoutes);
app.use("/api/bookings", bookingRoutes);

// error handler
app.use(errorHandler);

const PORT = process.env.PORT || 8000;
app.listen(PORT, () =>
  console.log(`🚀 Backend running on http://localhost:${PORT}`)
);
