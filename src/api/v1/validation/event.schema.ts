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

  registrationCount: Joi.number()
    .integer()
    .min(0)
    .optional()
    .messages({
      'number.base': 'Validation error: "registrationCount" must be a number',
      'number.integer': 'Validation error: "registrationCount" must be an integer',
      'number.min': 'Validation error: "registrationCount" must be greater than or equal to 0'
    }),

      status: Joi.string()
    .valid('active', 'cancelled', 'completed')
    .default('active')
    .messages({
      'any.only': 'Validation error: "status" must be one of [active, cancelled, completed]'
    }),

  category: Joi.string()
    .valid('conference', 'workshop', 'meetup', 'seminar', 'general')
    .default('general')
    .messages({
      'any.only': 'Validation error: "category" must be one of [conference, workshop, meetup, seminar, general]'
    })
}).custom((value, helpers) => {
  if (value.registrationCount !== undefined && value.registrationCount > value.capacity) {
    return helpers.error('any.invalid');
  }
  return value;
}).messages({
  'any.invalid': 'Validation error: "registrationCount" cannot exceed capacity'
});

export const updateEventSchema: ObjectSchema = Joi.object({
  name: Joi.string()
    .min(3)
    .max(100)
    .optional(),

  date: Joi.string()
    .isoDate()
    .optional()
    .custom((value, helpers) => {
      if (value) {
        const eventDate = new Date(value);
        const now = new Date();
        if (eventDate <= now) {
          return helpers.error('any.invalid');
        }
      }
      return value;
    }),
  capacity: Joi.number()
    .integer()
    .min(5)
    .max(10000)
    .optional(),

  registrationCount: Joi.number()
    .integer()
    .min(0)
    .optional(),

  status: Joi.string()
    .valid('active', 'cancelled', 'completed')
    .optional(),

  category: Joi.string()
    .valid('conference', 'workshop', 'meetup', 'seminar', 'general')
    .optional()
}).custom((value, helpers) => {
  if (value.registrationCount !== undefined && value.capacity !== undefined) {
    if (value.registrationCount > value.capacity) {
      return helpers.error('any.invalid');
    }
  }
  return value;
}).messages({
  'any.invalid': 'Validation error: "registrationCount" must be less than or equal to ref:capacity'
});