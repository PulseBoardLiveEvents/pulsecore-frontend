export interface Attendee {
  id: number;
  fullName: string;
  email: string;
  ticketId: string;
  sessionId: number;
  sessionName: string;
  vip: boolean;
  checkedIn: boolean;
  checkInTime: string | null;
  registeredAt: string;
}

export interface Session {
  id: number;
  name: string;
  capacity: number;
  checkedIn: number;
}

export interface DashboardData {
  capacity: number;
  totalRegistered: number;
  totalCheckedIn: number;
  spotsRemaining: number;
  vipCount: number;
  vipCheckedInCount: number;
  recentCheckIns: Attendee[];
  sessions: Session[];
  capacityReached: boolean;
}

export type ActivityEventType = 'check_in' | 'vip_arrival' | 'capacity_alert';

export interface ActivityEvent {
  id: string;
  type: ActivityEventType;
  message: string;
  timestamp: string;
}

export type AttendeeFilter = 'all' | 'registered' | 'checked_in' | 'vip';

export interface WalkInInput {
  fullName: string;
  email: string;
  sessionId: number;
}
