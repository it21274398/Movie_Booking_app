import Joi from "joi";

export const movieSchema = Joi.object({
  title: Joi.string().required(),
  description: Joi.string().min(20).required(),
  genre: Joi.array().items(Joi.string()).required(),
  duration: Joi.number().required(),
  releaseDate: Joi.date().required(),
  posterUrl: Joi.string().required(),
  trailerUrl: Joi.string().allow(""),
  cast: Joi.array().items(Joi.string()).required(),

  status: Joi.string()
    .valid("now-showing", "coming-soon")
    .required(),
});
