import type { Attendee, Session, ActivityEvent } from '../types';

/**
 * Sample dataset used while `USE_MOCK_DATA` is enabled (see `config.ts`),
 * so the UI is fully interactive before the backend is wired up.
 */
export const SESSION_NAMES = [
  'Opening Keynote',
  'Scaling Real-Time Systems',
  'Design Systems at Scale',
  'Workshop: API Security',
] as const;

export const INITIAL_SESSIONS: Session[] = [
  { id: 'sess-1', name: 'Opening Keynote', capacity: 400, checkedIn: 362 },
  { id: 'sess-2', name: 'Scaling Real-Time Systems', capacity: 120, checkedIn: 120 },
  { id: 'sess-3', name: 'Design Systems at Scale', capacity: 150, checkedIn: 96 },
  { id: 'sess-4', name: 'Workshop: API Security', capacity: 60, checkedIn: 41 },
];

export const INITIAL_ATTENDEES: Attendee[] = [
  { id: 'att-1', name: 'Ava Whitfield', email: 'ava.whitfield@lumen.io', ticketId: 'TCK-10234', session: 'Opening Keynote', vip: true, status: 'checked_in', checkedInAt: '2026-07-03T08:12:00Z' },
  { id: 'att-2', name: 'Marcus Chen', email: 'marcus.chen@northbridge.com', ticketId: 'TCK-10235', session: 'Scaling Real-Time Systems', vip: false, status: 'checked_in', checkedInAt: '2026-07-03T08:18:00Z' },
  { id: 'att-3', name: 'Priya Natarajan', email: 'priya.n@fernwood.dev', ticketId: 'TCK-10236', session: 'Design Systems at Scale', vip: true, status: 'checked_in', checkedInAt: '2026-07-03T08:21:00Z' },
  { id: 'att-4', name: 'Diego Alvarez', email: 'diego.alvarez@basalt.co', ticketId: 'TCK-10237', session: 'Workshop: API Security', vip: false, status: 'registered', checkedInAt: null },
  { id: 'att-5', name: 'Nora Kimura', email: 'nora.kimura@haven.io', ticketId: 'TCK-10238', session: 'Opening Keynote', vip: false, status: 'registered', checkedInAt: null },
  { id: 'att-6', name: 'Liam O’Rourke', email: 'liam.orourke@driftlab.com', ticketId: 'TCK-10239', session: 'Scaling Real-Time Systems', vip: false, status: 'checked_in', checkedInAt: '2026-07-03T08:29:00Z' },
  { id: 'att-7', name: 'Sofia Reyes', email: 'sofia.reyes@candor.ai', ticketId: 'TCK-10240', session: 'Design Systems at Scale', vip: false, status: 'registered', checkedInAt: null },
  { id: 'att-8', name: 'Ethan Blackwood', email: 'ethan.b@ironclad.dev', ticketId: 'TCK-10241', session: 'Opening Keynote', vip: true, status: 'checked_in', checkedInAt: '2026-07-03T08:33:00Z' },
  { id: 'att-9', name: 'Ines Moreau', email: 'ines.moreau@parlance.io', ticketId: 'TCK-10242', session: 'Workshop: API Security', vip: false, status: 'registered', checkedInAt: null },
  { id: 'att-10', name: 'Tobias Lindgren', email: 'tobias.l@nordwave.se', ticketId: 'TCK-10243', session: 'Scaling Real-Time Systems', vip: false, status: 'checked_in', checkedInAt: '2026-07-03T08:41:00Z' },
  { id: 'att-11', name: 'Grace Odongo', email: 'grace.odongo@baobab.tech', ticketId: 'TCK-10244', session: 'Opening Keynote', vip: false, status: 'registered', checkedInAt: null },
  { id: 'att-12', name: 'Felix Bauer', email: 'felix.bauer@sturmwerk.de', ticketId: 'TCK-10245', session: 'Design Systems at Scale', vip: false, status: 'checked_in', checkedInAt: '2026-07-03T08:47:00Z' },
];

export const INITIAL_ACTIVITY: ActivityEvent[] = [
  { id: 'act-1', type: 'vip_arrival', message: 'Ethan Blackwood (VIP) checked in to Opening Keynote', timestamp: '2026-07-03T08:33:00Z' },
  { id: 'act-2', type: 'check_in', message: 'Tobias Lindgren checked in to Scaling Real-Time Systems', timestamp: '2026-07-03T08:41:00Z' },
  { id: 'act-3', type: 'capacity_alert', message: 'Scaling Real-Time Systems reached capacity (120/120)', timestamp: '2026-07-03T08:41:30Z' },
  { id: 'act-4', type: 'check_in', message: 'Felix Bauer checked in to Design Systems at Scale', timestamp: '2026-07-03T08:47:00Z' },
];
