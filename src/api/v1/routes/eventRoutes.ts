// src/api/v1/routes/eventRoutes.ts
import { Router } from 'express';
import { EventController } from '../controllers/event.controller';
import { validateRequest } from '../middleware/validate.middleware';
import { createEventSchema, updateEventSchema } from '../validation/event.schema';

const router = Router();

/**
 * @openapi
 * /events:
 *   post:
 *     summary: Create a new event
 *     tags: [Events]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateEvent'
 *     responses:
 *       '201':
 *         description: Event created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/EventResponse'
 *       '400':
 *         description: Validation error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */

// POST /api/v1/events
router.post(
  '/events',
  validateRequest(createEventSchema),
  EventController.createEvent
);

/**
 * @openapi
 * /events:
 *   get:
 *     summary: Get all events
 *     tags: [Events]
 *     responses:
 *       '200':
 *         description: List of all events
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/EventListResponse'
 *       '500':
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */

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