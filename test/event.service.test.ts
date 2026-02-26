import { EventService } from '../src/api/v1/services/event.service';
import { FirestoreRepository } from '../src/api/v1/repositories/firestore.repository';

jest.mock('../src/api/v1/repositories/firestore.repository');

describe('Event Service', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('createEvent', () => {
    it('should create event successfully', async () => {
      const eventData = {
        name: 'Tech Conference',
        date: '2025-12-25T09:00:00.000Z',
        capacity: 200,
        status: 'active' as const,
        category: 'conference' as const,
        registrationCount: 50
      };

      (FirestoreRepository.create as jest.Mock).mockResolvedValue('evt_001');

      const result = await EventService.createEvent(eventData);

      expect(FirestoreRepository.create).toHaveBeenCalled();
      expect(result.id).toBe('evt_001');
      expect(result.registrationCount).toBe(50);
    });

    it('should throw error if registrationCount exceeds capacity', async () => {
      const eventData = {
        name: 'Tech Conference',
        date: '2025-12-25T09:00:00.000Z',
        capacity: 100,
        status: 'active' as const,
        category: 'conference' as const,
        registrationCount: 150
      };

      await expect(EventService.createEvent(eventData)).rejects.toThrow(
        'Registration count cannot exceed event capacity'
      );
    });
  });

  describe('getAllEvents', () => {
    it('should return all events', async () => {
      const mockEvents = [
        {
          id: 'evt_001',
          name: 'Conference',
          date: '2025-12-25T09:00:00.000Z',
          capacity: 200,
          registrationCount: 50,
          status: 'active' as const,
          category: 'conference' as const
        }
      ];

            (FirestoreRepository.getAll as jest.Mock).mockResolvedValue(mockEvents);

      const result = await EventService.getAllEvents();

      expect(result).toEqual(mockEvents);
    });
  });

  describe('getEventById', () => {
    it('should return event by ID', async () => {
      const mockEvent = {
        id: 'evt_001',
        name: 'Conference',
        date: '2025-12-25T09:00:00.000Z',
        capacity: 200,
        registrationCount: 50,
        status: 'active' as const,
        category: 'conference' as const
      };

      (FirestoreRepository.getById as jest.Mock).mockResolvedValue(mockEvent);

      const result = await EventService.getEventById('evt_001');

      expect(result).toEqual(mockEvent);
    });

    it('should return null if event not found', async () => {
      (FirestoreRepository.getById as jest.Mock).mockResolvedValue(null);

      const result = await EventService.getEventById('non_existent');

      expect(result).toBeNull();
    });
  });