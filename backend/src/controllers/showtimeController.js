import showtimeService from "../services/showtime.service.js";
import { showtimeSchema } from "../validators/showtimeValidator.js";
import Showtime from "../models/Showtime.js";

export const createShowtime = async (req, res, next) => {
  try {
    const { error } = showtimeSchema.validate(req.body);
    if (error) throw new Error(error.details[0].message);

    const showtime = await showtimeService.createShowtime(req.body);

    res.status(201).json({
      success: true,
      message: "Showtime created successfully",
      data: showtime,
    });
  } catch (err) {
    next(err);
  }
};

export const updateShowtime = async (req, res, next) => {
  try {
    const updated = await showtimeService.updateShowtime(
      req.params.id,
      req.body
    );

    res.json({
      success: true,
      message: "Showtime updated",
      data: updated,
    });
  } catch (err) {
    next(err);
  }
};

export const deleteShowtime = async (req, res, next) => {
  try {
    await showtimeService.deleteShowtime(req.params.id);
    res.json({ success: true, message: "Showtime deleted" });
  } catch (err) {
    next(err);
  }
};

export const getShowtimes = async (req, res, next) => {
  try {
    const showtimes = await showtimeService.getAllShowtimes();
    res.json({ success: true, data: showtimes });
  } catch (err) {
    next(err);
  }
};

export const getShowtime = async (req, res, next) => {
  try {
    const showtime = await showtimeService.getShowtime(req.params.id);
    res.json({ success: true, data: showtime });
  } catch (err) {
    next(err);
  }
};

export const getShowtimesByMovie = async (req, res, next) => {
  try {
    const showtimes = await Showtime.find({ movie: req.params.movieId });

    res.json({
      success: true,
      data: showtimes,
    });
  } catch (err) {
    next(err);
  }
};
