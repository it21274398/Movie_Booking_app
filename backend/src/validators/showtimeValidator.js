import Joi from "joi";

export const showtimeSchema = Joi.object({
  movie: Joi.string().required(),
  cinemaHall: Joi.string().required(),
  showDate: Joi.string().required(),
  showTime: Joi.string().required(),
  price: Joi.number().min(0).required(),

  rows: Joi.number().min(1).default(10),
  seatsPerRow: Joi.number().min(1).default(10),
});
