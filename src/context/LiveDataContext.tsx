import { useCallback, useMemo, useState, type ReactNode } from 'react';
import { INITIAL_ACTIVITY, INITIAL_ATTENDEES, INITIAL_SESSIONS } from '../constants/mockData';
import { getCapacityLevel } from '../utils/stats';
import { LiveDataContext, type LiveDataContextValue } from './LiveDataContextDefinition';
import type { ActivityEvent, Attendee, Session, WalkInInput } from '../types';

function createActivityEvent(partial: Omit<ActivityEvent, 'id' | 'timestamp'>): ActivityEvent {
  return { ...partial, id: `act-${crypto.randomUUID()}`, timestamp: new Date().toISOString() };
}

export function LiveDataProvider({ children }: { children: ReactNode }) {
  const [attendees, setAttendees] = useState<Attendee[]>(INITIAL_ATTENDEES);
  const [sessions, setSessions] = useState<Session[]>(INITIAL_SESSIONS);
  const [activity, setActivity] = useState<ActivityEvent[]>(INITIAL_ACTIVITY);

  const checkInAttendee = useCallback((id: string) => {
    setAttendees((prev) => {
      const target = prev.find((a) => a.id === id);
      if (!target || target.status === 'checked_in') return prev;

      const timestamp = new Date().toISOString();
      const updated = prev.map((a) => (a.id === id ? { ...a, status: 'checked_in' as const, checkedInAt: timestamp } : a));

      setSessions((prevSessions) => {
        const nextSessions = prevSessions.map((s) =>
          s.name === target.session ? { ...s, checkedIn: s.checkedIn + 1 } : s,
        );

        const events: ActivityEvent[] = [];
        events.push(
          createActivityEvent({
            type: target.vip ? 'vip_arrival' : 'check_in',
            message: target.vip
              ? `${target.name} (VIP) checked in to ${target.session}`
              : `${target.name} checked in to ${target.session}`,
          }),
        );

        const affectedSession = nextSessions.find((s) => s.name === target.session);
        const previousSession = prevSessions.find((s) => s.name === target.session);
        if (affectedSession && previousSession && getCapacityLevel(previousSession) !== 'full' && getCapacityLevel(affectedSession) === 'full') {
          events.push(
            createActivityEvent({
              type: 'capacity_alert',
              message: `${affectedSession.name} reached capacity (${affectedSession.checkedIn}/${affectedSession.capacity})`,
            }),
          );
        }

        setActivity((prevActivity) => [...events.reverse(), ...prevActivity]);
        return nextSessions;
      });

      return updated;
    });
  }, []);

  const undoCheckIn = useCallback((id: string) => {
    setAttendees((prev) => {
      const target = prev.find((a) => a.id === id);
      if (!target || target.status !== 'checked_in') return prev;

      setSessions((prevSessions) =>
        prevSessions.map((s) => (s.name === target.session ? { ...s, checkedIn: Math.max(0, s.checkedIn - 1) } : s)),
      );

      return prev.map((a) => (a.id === id ? { ...a, status: 'registered' as const, checkedInAt: null } : a));
    });
  }, []);

  const addWalkIn = useCallback((input: WalkInInput) => {
    const newAttendee: Attendee = {
      id: `att-${crypto.randomUUID()}`,
      name: input.name,
      email: input.email,
      ticketId: `WLK-${Math.floor(1000 + Math.random() * 9000)}`,
      session: input.session,
      vip: false,
      status: 'checked_in',
      checkedInAt: new Date().toISOString(),
    };

    setAttendees((prev) => [newAttendee, ...prev]);
    setSessions((prev) => prev.map((s) => (s.name === input.session ? { ...s, checkedIn: s.checkedIn + 1 } : s)));
    setActivity((prev) => [
      createActivityEvent({ type: 'walk_in', message: `${newAttendee.name} added as a walk-in to ${input.session}` }),
      ...prev,
    ]);
  }, []);

  const value = useMemo<LiveDataContextValue>(
    () => ({ attendees, sessions, activity, checkInAttendee, undoCheckIn, addWalkIn }),
    [attendees, sessions, activity, checkInAttendee, undoCheckIn, addWalkIn],
  );

  return <LiveDataContext.Provider value={value}>{children}</LiveDataContext.Provider>;
}
