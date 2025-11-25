import Showtime from "../models/Showtime.js";
import Movie from "../models/Movie.js";
import { generateSeats } from "../utils/generateSeats.js";

class ShowtimeService {
  async createShowtime(data) {
    const movie = await Movie.findById(data.movie);
    if (!movie) throw new Error("Movie not found");

    // Auto-generate seats
    const seats = generateSeats(data.rows , data.seatsPerRow );

    const showtime = await Showtime.create({
      ...data,
      seats, // ⭐ SAVE GENERATED SEATS
      totalSeats: seats.length,
      availableSeats: seats.length,
    });

    return showtime;
  }

  async updateShowtime(id, data) {
    return await Showtime.findByIdAndUpdate(id, data, { new: true });
  }

  async deleteShowtime(id) {
    return await Showtime.findByIdAndDelete(id);
  }

  async getShowtimesByMovie(movieId) {
    return await Showtime.find({ movie: movieId }).sort({ showDate: 1 });
  }

  async getAllShowtimes() {
    return await Showtime.find().populate("movie", "title posterUrl");
  }

  async getShowtime(id) {
    return await Showtime.findById(id).populate("movie");
  }
}

export default new ShowtimeService();
