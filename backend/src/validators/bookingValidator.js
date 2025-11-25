import Joi from "joi";

export const bookingSchema = Joi.object({
  showtime: Joi.string().required(),
  seats: Joi.array().items(Joi.string()).min(1).required()
});
