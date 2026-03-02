// src/api/v1/routes/eventRoutes.ts
import { Router } from 'express';
import { EventController } from '../controllers/event.controller';
import { validateRequest } from '../middleware/validate.middleware';
import { createEventSchema, updateEventSchema } from '../validation/event.schema';

const router = Router();

// POST /api/v1/events
router.post(
  '/events',
  validateRequest(createEventSchema),
  EventController.createEvent
);

// GET /api/v1/events
router.get('/events', EventController.getAllEvents);

// GET /api/v1/events/:id
router.get('/events/:id', EventController.getEventById);

// PUT /api/v1/events/:id
router.put(
  '/events/:id',
  validateRequest(updateEventSchema),
  EventController.updateEvent
);

// DELETE /api/v1/events/:id
router.delete('/events/:id', EventController.deleteEvent);

export default router;