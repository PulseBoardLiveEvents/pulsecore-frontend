import { createContext } from 'react';
import type { ActivityEvent, Attendee, Session, WalkInInput } from '../types';

export interface LiveDataContextValue {
  attendees: Attendee[];
  sessions: Session[];
  activity: ActivityEvent[];
  isLoading: boolean;
  error: string | null;
  checkInAttendee: (id: number) => void;
  undoCheckIn: (id: number) => void;
  addWalkIn: (input: WalkInInput) => Promise<void>;
}

export const LiveDataContext = createContext<LiveDataContextValue | undefined>(undefined);
