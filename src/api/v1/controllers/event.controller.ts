// src/api/v1/controllers/event.controller.ts
import { Request, Response, NextFunction } from 'express';
import { EventService } from '../services/event.service';
import { successResponse } from '../models/response.model';
import { HTTP_STATUS } from '../../../constants/httpConstants';

export class EventController {
  static async createEvent(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const event = await EventService.createEvent(req.body);
      res.status(HTTP_STATUS.CREATED).json(successResponse('Event created', event));
    } catch (error) {
      next(error);
    }
  }

  static async getAllEvents(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const events = await EventService.getAllEvents();
      res.status(HTTP_STATUS.OK).json(successResponse('Events retrieved', events));
    } catch (error) {
      next(error);
    }
  }

  static async getEventById(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { id } = req.params;
      const eventId = Array.isArray(id) ? id[0] : id;
      const event = await EventService.getEventById(eventId);

      if (!event) {
        res.status(HTTP_STATUS.NOT_FOUND).json({ message: 'Event not found' });
        return;
      }

      res.status(HTTP_STATUS.OK).json(successResponse('Event retrieved', event));
    } catch (error) {
      next(error);
    }
  }

  static async updateEvent(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { id } = req.params;
      const eventId = Array.isArray(id) ? id[0] : id;
      const event = await EventService.updateEvent(eventId, req.body);

      res.status(HTTP_STATUS.OK).json(successResponse('Event updated', event));
    } catch (error: any) {
      if (error.message === 'Event not found') {
        res.status(HTTP_STATUS.NOT_FOUND).json({ message: 'Event not found' });
      } else {
        next(error);
      }
    }
  }

  static async deleteEvent(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { id } = req.params;
      const eventId = Array.isArray(id) ? id[0] : id;

      await EventService.deleteEvent(eventId);

      res.status(HTTP_STATUS.OK).json(successResponse('Event deleted'));
    } catch (error: any) {
      if (error.message === 'Event not found') {
        res.status(HTTP_STATUS.NOT_FOUND).json({ message: 'Event not found' });
      } else {
        next(error);
      }
    }
  }
}