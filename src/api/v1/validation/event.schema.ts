import Joi, { ObjectSchema } from 'joi';

export const createEventSchema: ObjectSchema = Joi.object({
  name: Joi.string()
    .min(3)
    .max(100)
    .required()
    .messages({
      'any.required': 'Validation error: "name" is required',
      'string.empty': 'Validation error: "name" cannot be empty',
      'string.min': 'Validation error: "name" length must be at least 3 characters long',
      'string.max': 'Validation error: "name" length must be less than or equal to 100 characters'
    }),

