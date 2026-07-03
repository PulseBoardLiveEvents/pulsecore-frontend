import { createContext } from 'react';
import type { ActivityEvent, Attendee, Session, WalkInInput } from '../types';

export interface LiveDataContextValue {
  attendees: Attendee[];
  sessions: Session[];
  activity: ActivityEvent[];
  checkInAttendee: (id: string) => void;
  undoCheckIn: (id: string) => void;
  addWalkIn: (input: WalkInInput) => void;
}

export const LiveDataContext = createContext<LiveDataContextValue | undefined>(undefined);
