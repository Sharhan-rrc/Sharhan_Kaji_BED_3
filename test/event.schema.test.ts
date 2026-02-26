import { createEventSchema, updateEventSchema } from '../src/api/v1/validation/event.schema';

describe('Event Validation Schema', () => {
  describe('createEventSchema', () => {
    it('should accept valid event creation data', () => {
      const validData = {
        name: 'Tech Conference 2025',
        date: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(), // always tomorrow
        capacity: 200,
        status: 'active',
        category: 'conference'
      };

      const { error } = createEventSchema.validate(validData);
      expect(error).toBeUndefined();
    });

    it('should reject event with missing required name field', () => {
      const invalidData = {
        date: '2025-12-25T09:00:00.000Z',
        capacity: 200
      };

      const { error } = createEventSchema.validate(invalidData);
      expect(error).toBeDefined();
      expect(error?.message).toContain('name');
    });

    it('should reject event with name shorter than 3 characters', () => {
      const invalidData = {
        name: 'AB',
        date: '2025-12-25T09:00:00.000Z',
        capacity: 200
      };

      const { error } = createEventSchema.validate(invalidData);
      expect(error).toBeDefined();
    });

    it('should reject event with capacity below minimum', () => {
      const invalidData = {
        name: 'Tech Conference',
        date: '2025-12-25T09:00:00.000Z',
        capacity: 4
      };
