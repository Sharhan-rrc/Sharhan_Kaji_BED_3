// src/api/v1/services/event.service.ts
import { FirestoreRepository } from '../repositories/firestore.repository';
import { Event, CreateEventInput, UpdateEventInput } from '../models/event.model';

export class EventService {
  static async createEvent(data: CreateEventInput): Promise<Event> {
    const registrationCount = data.registrationCount ?? 0;

    if (registrationCount > data.capacity) {
      throw new Error('Registration count cannot exceed event capacity');
    }

    const eventData: Omit<Event, 'id'> = {
      ...data,
      registrationCount
    };

    const id = await FirestoreRepository.create(eventData);
    return { id, ...eventData };
  }

  static async getAllEvents(): Promise<Event[]> {
    return await FirestoreRepository.getAll();
  }

  static async getEventById(id: string): Promise<Event | null> {
    return await FirestoreRepository.getById(id);
  }

  static async updateEvent(id: string, data: UpdateEventInput): Promise<Event> {
    const existing = await FirestoreRepository.getById(id);

    if (!existing) {
      throw new Error('Event not found');
    }

    if (
      data.registrationCount !== undefined &&
      data.registrationCount > (data.capacity ?? existing.capacity)
    ) {
      throw new Error('Registration count cannot exceed event capacity');
    }

    await FirestoreRepository.update(id, data);

    const updated = await FirestoreRepository.getById(id);
    return updated!;
  }

  static async deleteEvent(id: string): Promise<void> {
    const existing = await FirestoreRepository.getById(id);

    if (!existing) {
      throw new Error('Event not found');
    }

    await FirestoreRepository.delete(id);
  }
}
