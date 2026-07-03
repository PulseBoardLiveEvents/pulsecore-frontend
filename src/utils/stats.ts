import { CAPACITY_FULL_THRESHOLD, CAPACITY_WARNING_THRESHOLD } from '../constants/config';
import type { Attendee, Session } from '../types';

export type CapacityLevel = 'normal' | 'warning' | 'full';

export function getSessionFillRatio(session: Session): number {
  if (session.capacity === 0) return 0;
  return session.checkedIn / session.capacity;
}

export function getCapacityLevel(session: Session): CapacityLevel {
  const ratio = getSessionFillRatio(session);
  if (ratio >= CAPACITY_FULL_THRESHOLD) return 'full';
  if (ratio >= CAPACITY_WARNING_THRESHOLD) return 'warning';
  return 'normal';
}

export function getSessionsAtCapacity(sessions: Session[]): Session[] {
  return sessions.filter((session) => getCapacityLevel(session) === 'full');
}

export interface OverviewStats {
  registered: number;
  checkedIn: number;
  sessionsAtCapacity: number;
  vipsArrived: number;
}

export function computeOverviewStats(attendees: Attendee[], sessions: Session[]): OverviewStats {
  return {
    registered: attendees.length,
    checkedIn: attendees.filter((a) => a.checkedIn).length,
    sessionsAtCapacity: getSessionsAtCapacity(sessions).length,
    vipsArrived: attendees.filter((a) => a.vip && a.checkedIn).length,
  };
}
