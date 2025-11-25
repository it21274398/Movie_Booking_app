import bookingService from "../services/booking.service.js";
import { bookingSchema } from "../validators/bookingValidator.js";
import Booking from "../models/Booking.js"; // ✅ ADDED

export const createBooking = async (req, res, next) => {
  try {
    const { error } = bookingSchema.validate(req.body);
    if (error) throw new Error(error.details[0].message);

    const booking = await bookingService.createBooking(req.user.id, req.body);

    res.status(201).json({
      success: true,
      message: "Booking successful",
      data: booking,
    });
  } catch (err) {
    next(err);
  }
};

export const getMyBookings = async (req, res, next) => {
  try {
    const bookings = await bookingService.getUserBookings(req.user.id);
    res.json({ success: true, data: bookings });
  } catch (err) {
    next(err);
  }
};

export const getAllBookings = async (req, res, next) => {
  try {
    const bookings = await bookingService.getAllBookings();
    res.json({ success: true, data: bookings });
  } catch (err) {
    next(err);
  }
};

export const getBookingStats = async (req, res, next) => {
  try {
    const totalBookings = await Booking.countDocuments();

    const totalRevenueAgg = await Booking.aggregate([
      { $group: { _id: null, total: { $sum: "$totalPrice" } } },
    ]);

    const totalRevenue = totalRevenueAgg[0]?.total || 0;

    res.json({
      success: true,
      data: {
        bookings: totalBookings,
        revenue: totalRevenue,
      },
    });
  } catch (err) {
    next(err);
  }
};
