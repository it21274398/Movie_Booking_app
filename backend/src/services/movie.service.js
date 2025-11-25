import Movie from "../models/Movie.js";

class MovieService {
  async createMovie(data) {
    return await Movie.create(data);
  }

  async updateMovie(id, data) {
    return await Movie.findByIdAndUpdate(id, data, { new: true });
  }

  async deleteMovie(id) {
    return await Movie.findByIdAndDelete(id);
  }

  async getMovies() {
    return await Movie.find().sort({ createdAt: -1 });
  }

  async getMovieById(id) {
    return await Movie.findById(id);
  }
}

export default new MovieService();
