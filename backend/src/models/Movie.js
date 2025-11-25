import mongoose from "mongoose";

const movieSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      required: true,
      minlength: 20,
    },

    genre: {
      type: [String],
      required: true,
    },

    duration: {
      type: Number, // in minutes
      required: true,
    },

    releaseDate: {
      type: Date,
      required: true,
    },

    posterUrl: {
      type: String,
      required: true,
    },

    trailerUrl: {
      type: String,
      default: "",
    },

    cast: {
      type: [String],
      required: true,
    },
    status: {
      type: String,
      enum: ["now-showing", "coming-soon"],
      default: "now-showing",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Movie", movieSchema);
