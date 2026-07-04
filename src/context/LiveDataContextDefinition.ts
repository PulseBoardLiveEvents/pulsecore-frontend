import { createContext } from 'react';
import type { ActivityEvent, Attendee, CreateSessionInput, RegisterInput, Session, WalkInInput } from '../types';

export interface LiveDataContextValue {
  attendees: Attendee[];
  sessions: Session[];
  activity: ActivityEvent[];
  isLoading: boolean;
  error: string | null;
  checkInAttendee: (id: number) => void;
  undoCheckIn: (id: number) => void;
  addWalkIn: (input: WalkInInput) => Promise<void>;
  registerAttendee: (input: RegisterInput) => Promise<Attendee>;
  createSession: (input: CreateSessionInput) => Promise<Session>;
}

export const LiveDataContext = createContext<LiveDataContextValue | undefined>(undefined);
