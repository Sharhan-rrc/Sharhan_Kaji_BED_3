// src/api/v1/middleware/validate.middleware.ts
import { Request, Response, NextFunction } from 'express';
import { ObjectSchema } from 'joi';
import { HTTP_STATUS } from '../../../constants/httpConstants';

export const validateRequest = (schema: ObjectSchema) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      const { error, value } = schema.validate(req.body, {
        abortEarly: false,
        stripUnknown: true
      });

      if (error) {
        const message = error.details.map(detail => detail.message).join(', ');
        return res.status(HTTP_STATUS.BAD_REQUEST).json({ message });
      }

      req.body = value;
      next();
    } catch (err: any) {
      res.status(HTTP_STATUS.BAD_REQUEST).json({ message: err.message });
    }
  };
};