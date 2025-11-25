import mongoose from "mongoose";

const seatSchema = new mongoose.Schema({
  seatNumber: { type: String, required: true }, // e.g., A1, A2...
  isBooked: { type: Boolean, default: false },
});

const showtimeSchema = new mongoose.Schema(
  {
    movie: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Movie",
      required: true,
    },

    cinemaHall: {
      type: String,
      required: true,
    },

    showDate: {
      type: String,
      required: true,
    },

    showTime: {
      type: String,
      required: true,
    },

    price: {
      type: Number,
      required: true,
    },

    totalSeats: {
      type: Number,
      default: 100,
    },

    seats: [seatSchema],  // ⭐ NEW: Real seat map
  },
  { timestamps: true }
);

export default mongoose.model("Showtime", showtimeSchema);
