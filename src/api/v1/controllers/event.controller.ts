import { Request, Response, NextFunction } from 'express';
import { EventService } from '../services/event.service';
import { successResponse } from '../models/response.model';


export class EventController {
  static async createEvent(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const event = await EventService.createEvent(req.body);
      res.status(201).json(successResponse('Event created', event));
    } catch (error) {
      next(error);
    }
  }

  static async getAllEvents(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const events = await EventService.getAllEvents();
      res.status(200).json(successResponse('Events retrieved', events));
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
        res.status(404).json({ message: 'Event not found' });
        return;
      }
      res.status(200).json(successResponse('Event retrieved', event));
    } catch (error) {
      next(error);
    }
  }