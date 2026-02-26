// src/api/v1/repositories/firestore.repository.ts
import { db } from '../../../../config/firebaseConfig';
import { Event } from '../models/event.model';
import { COLLECTIONS } from '../../../constants/httpConstants';

export class FirestoreRepository {
  static async create(data: Omit<Event, 'id'>): Promise<string> {
    try {
      const docRef = await db.collection(COLLECTIONS.EVENTS).add({
        ...data,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      });
      return docRef.id;
    } catch (error: any) {
      throw new Error(`Failed to create event: ${error.message}`);
    }
  }

  static async getAll(): Promise<Event[]> {
    try {
      const snapshot = await db.collection(COLLECTIONS.EVENTS).get();
      const events: Event[] = [];

      snapshot.forEach((doc) => {
        events.push({
          id: doc.id,
          ...(doc.data() as Omit<Event, 'id'>)
        });
      });

      return events;
    } catch (error: any) {
      throw new Error(`Failed to fetch events: ${error.message}`);
    }
  }

  static async getById(id: string): Promise<Event | null> {
    try {
      const doc = await db.collection(COLLECTIONS.EVENTS).doc(id).get();

      if (!doc.exists) {
        return null;
      }

