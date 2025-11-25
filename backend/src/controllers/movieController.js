import movieService from "../services/movie.service.js";
import { movieSchema } from "../validators/movieValidator.js";

/* =========================================================
   CREATE MOVIE
========================================================= */
export const createMovie = async (req, res, next) => {
  try {
    const { error } = movieSchema.validate(req.body);
    if (error) throw new Error(error.details[0].message);

    const movie = await movieService.createMovie(req.body);

    res.status(201).json({
      success: true,
      message: "Movie created successfully",
      data: movie,
    });
  } catch (err) {
    next(err);
  }
};

/* =========================================================
   UPDATE MOVIE
========================================================= */
export const updateMovie = async (req, res, next) => {
  try {
    const movie = await movieService.updateMovie(req.params.id, req.body);

    res.json({
      success: true,
      message: "Movie updated successfully",
      data: movie,
    });
  } catch (err) {
    next(err);
  }
};

/* =========================================================
   DELETE MOVIE
========================================================= */
export const deleteMovie = async (req, res, next) => {
  try {
    await movieService.deleteMovie(req.params.id);

    res.json({
      success: true,
      message: "Movie deleted successfully",
    });
  } catch (err) {
    next(err);
  }
};

/* =========================================================
   GET ALL MOVIES
========================================================= */
export const getAllMovies = async (req, res, next) => {
  try {
    const movies = await movieService.getMovies();
    res.json(movies); // frontend expects PURE array, not {success, data}
  } catch (err) {
    next(err);
  }
};

/* =========================================================
   GET SINGLE MOVIE
========================================================= */
export const getMovie = async (req, res, next) => {
  try {
    const movie = await movieService.getMovieById(req.params.id);
    res.json(movie);
  } catch (err) {
    next(err);
  }
};

/* =========================================================
   UPLOAD POSTER (Multer)
========================================================= */
export const uploadPoster = (req, res) => {
  if (!req.file) {
    return res
      .status(400)
      .json({ success: false, message: "No file uploaded" });
  }

  const filePath = `${req.protocol}://${req.get("host")}/uploads/${
    req.file.filename
  }`;
  res.json({ success: true, filePath });
};
