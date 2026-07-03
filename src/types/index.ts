export type AttendeeStatus = 'registered' | 'checked_in';

export interface Attendee {
  id: string;
  name: string;
  email: string;
  ticketId: string;
  session: string;
  vip: boolean;
  status: AttendeeStatus;
  checkedInAt: string | null;
}

export interface Session {
  id: string;
  name: string;
  capacity: number;
  checkedIn: number;
}

export type ActivityEventType = 'check_in' | 'vip_arrival' | 'capacity_alert' | 'walk_in';

export interface ActivityEvent {
  id: string;
  type: ActivityEventType;
  message: string;
  timestamp: string;
}

export type AttendeeFilter = 'all' | 'registered' | 'checked_in' | 'vip';

export interface WalkInInput {
  name: string;
  email: string;
  session: string;
}
