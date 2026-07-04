import { apiClient } from './client';
import type { Attendee, CreateSessionInput, RegisterInput, Session, WalkInInput } from '../types';

export const attendeesApi = {
  getAttendees: () => apiClient.get<Attendee[]>('/attendees'),
  getSessions: () => apiClient.get<Session[]>('/sessions'),
  checkIn: (id: number) => apiClient.post<Attendee>(`/attendees/${id}/checkin`),
  undoCheckIn: (id: number) => apiClient.post<Attendee>(`/attendees/${id}/undo-checkin`),
  addWalkIn: (input: WalkInInput) => apiClient.post<Attendee>('/attendees/walk-in', input),
  register: (input: RegisterInput) => apiClient.post<Attendee>('/attendees/register', input),
  createSession: (input: CreateSessionInput) => apiClient.post<Session>('/sessions', input),
};
