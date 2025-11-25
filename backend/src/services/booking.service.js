import Booking from "../models/Booking.js";
import Showtime from "../models/Showtime.js";
import Movie from "../models/Movie.js";

class BookingService {
  async createBooking(userId, data) {
    const { showtime, seats } = data;

    const showtimeDoc = await Showtime.findById(showtime);
    if (!showtimeDoc) throw new Error("Showtime not found");

    // Check seat availability
    const unavailable = [];

    seats.forEach(seat => {
      const s = showtimeDoc.seats.find(x => x.seatNumber === seat);

      if (!s || s.isBooked) unavailable.push(seat);
    });

    if (unavailable.length)
      throw new Error(`Seats already booked: ${unavailable.join(", ")}`);

    // Mark seats as booked
    showtimeDoc.seats = showtimeDoc.seats.map(seatObj => {
      if (seats.includes(seatObj.seatNumber)) {
        return { ...seatObj, isBooked: true };
      }
      return seatObj;
    });

    // Update available seats
    showtimeDoc.totalSeats = showtimeDoc.seats.length;
    const bookedCount = showtimeDoc.seats.filter(s => s.isBooked).length;
    showtimeDoc.availableSeats = showtimeDoc.totalSeats - bookedCount;

    await showtimeDoc.save();

    // Calculate total price
    const totalPrice = seats.length * showtimeDoc.price;

    const movie = await Movie.findById(showtimeDoc.movie);

    return await Booking.create({
      user: userId,
      movie: movie._id,
      showtime,
      seats,
      totalPrice,
    });
  }

  async getUserBookings(userId) {
    return await Booking.find({ user: userId })
      .populate("movie", "title posterUrl")
      .populate("showtime", "showDate showTime cinemaHall");
  }

  async getAllBookings() {
    return await Booking.find()
      .populate("user", "name email")
      .populate("movie", "title")
      .populate("showtime", "showDate showTime");
  }
}

export default new BookingService();
