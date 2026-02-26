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

  date: Joi.string()
    .isoDate()
    .required()
    .custom((value, helpers) => {
      const eventDate = new Date(value);
      const now = new Date();
      if (eventDate <= now) {
        return helpers.error('any.invalid');
      }
      return value;
    })
    .messages({
      'any.required': 'Validation error: "date" is required',
      'string.isoDate': 'Validation error: "date" must be a valid ISO date',
      'any.invalid': 'Validation error: "date" must be greater than "now"'
    }),
    
  capacity: Joi.number()
    .integer()
    .min(5)
    .max(10000)
    .required()
    .messages({
      'any.required': 'Validation error: "capacity" is required',
      'number.base': 'Validation error: "capacity" must be a number',
      'number.integer': 'Validation error: "capacity" must be an integer',
      'number.min': 'Validation error: "capacity" must be greater than or equal to 5',
      'number.max': 'Validation error: "capacity" must be less than or equal to 10000'
    }),