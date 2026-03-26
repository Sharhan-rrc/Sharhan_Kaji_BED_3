export interface Event {
  id?: string;
  name: string;
  date: string;
  capacity: number;
  registrationCount: number;
  status: 'active' | 'cancelled' | 'completed';
  category: 'conference' | 'workshop' | 'meetup' | 'seminar' | 'general';
  createdAt?: string;
  updatedAt?: string;
}

export type CreateEventInput = Omit<Event, 'id' | 'registrationCount'> & {
  registrationCount?: number;
};

export type UpdateEventInput = Partial<Omit<Event, 'id' | 'createdAt' | 'updatedAt'> >;