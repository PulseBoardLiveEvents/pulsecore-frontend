import { useCallback, useEffect, useMemo, useRef, useState, type ReactNode } from 'react';
import { attendeesApi } from '../api/attendeesApi';
import { LIVE_POLL_INTERVAL_MS } from '../constants/config';
import { getCapacityLevel } from '../utils/stats';
import { LiveDataContext, type LiveDataContextValue } from './LiveDataContextDefinition';
import type { ActivityEvent, Attendee, Session, WalkInInput } from '../types';

const MAX_ACTIVITY_EVENTS = 30;

/**
 * The backend has no activity-log endpoint, so "live activity" is derived
 * client-side by diffing consecutive polls: a newly-true `checkedIn` flag
 * becomes a check-in/VIP-arrival event, and a session crossing into "full"
 * becomes a capacity alert. This also means activity is only ever emitted
 * relative to what *this* browser has already fetched.
 */
function diffActivity(previousAttendees: Attendee[], nextAttendees: Attendee[], nextSessions: Session[]): ActivityEvent[] {
  const previousById = new Map(previousAttendees.map((attendee) => [attendee.id, attendee]));
  const events: ActivityEvent[] = [];

  for (const attendee of nextAttendees) {
    const before = previousById.get(attendee.id);
    const justCheckedIn = attendee.checkedIn && !before?.checkedIn;
    if (!justCheckedIn) continue;

    events.push({
      id: `evt-checkin-${attendee.id}-${attendee.checkInTime ?? Date.now()}`,
      type: attendee.vip ? 'vip_arrival' : 'check_in',
      message: attendee.vip
        ? `${attendee.fullName} (VIP) checked in to ${attendee.sessionName}`
        : `${attendee.fullName} checked in to ${attendee.sessionName}`,
      timestamp: attendee.checkInTime ?? new Date().toISOString(),
    });
  }

  for (const session of nextSessions) {
    const previousCheckedIn = previousAttendees.filter((a) => a.sessionId === session.id && a.checkedIn).length;
    const wasFull = previousCheckedIn >= session.capacity;
    const isFull = getCapacityLevel(session) === 'full';
    if (!wasFull && isFull) {
      events.push({
        id: `evt-capacity-${session.id}-${Date.now()}`,
        type: 'capacity_alert',
        message: `${session.name} reached capacity (${session.checkedIn}/${session.capacity})`,
        timestamp: new Date().toISOString(),
      });
    }
  }

  return events;
}

export function LiveDataProvider({ children }: { children: ReactNode }) {
  const [attendees, setAttendees] = useState<Attendee[]>([]);
  const [sessions, setSessions] = useState<Session[]>([]);
  const [activity, setActivity] = useState<ActivityEvent[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const attendeesRef = useRef<Attendee[]>([]);
  const hasLoadedOnceRef = useRef(false);

  const refresh = useCallback(async () => {
    try {
      const [nextAttendees, nextSessions] = await Promise.all([
        attendeesApi.getAttendees(),
        attendeesApi.getSessions(),
      ]);

      if (hasLoadedOnceRef.current) {
        const newEvents = diffActivity(attendeesRef.current, nextAttendees, nextSessions);
        if (newEvents.length > 0) {
          setActivity((prev) => [...newEvents.reverse(), ...prev].slice(0, MAX_ACTIVITY_EVENTS));
        }
      }
      hasLoadedOnceRef.current = true;

      attendeesRef.current = nextAttendees;
      setAttendees(nextAttendees);
      setSessions(nextSessions);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to reach the backend');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    refresh();
    const id = window.setInterval(refresh, LIVE_POLL_INTERVAL_MS);
    return () => window.clearInterval(id);
  }, [refresh]);

  const checkInAttendee = useCallback(
    (id: number) => {
      attendeesApi
        .checkIn(id)
        .then(refresh)
        .catch((err) => setError(err instanceof Error ? err.message : 'Failed to check in attendee'));
    },
    [refresh],
  );

  const undoCheckIn = useCallback(
    (id: number) => {
      attendeesApi
        .undoCheckIn(id)
        .then(refresh)
        .catch((err) => setError(err instanceof Error ? err.message : 'Failed to undo check-in'));
    },
    [refresh],
  );

  // Left uncaught (unlike checkIn/undoCheckIn above) so the walk-in form can
  // surface validation errors like "duplicate email" inline, next to the field.
  const addWalkIn = useCallback(
    async (input: WalkInInput) => {
      await attendeesApi.addWalkIn(input);
      await refresh();
    },
    [refresh],
  );

  const value = useMemo<LiveDataContextValue>(
    () => ({ attendees, sessions, activity, isLoading, error, checkInAttendee, undoCheckIn, addWalkIn }),
    [attendees, sessions, activity, isLoading, error, checkInAttendee, undoCheckIn, addWalkIn],
  );

  return <LiveDataContext.Provider value={value}>{children}</LiveDataContext.Provider>;
}
