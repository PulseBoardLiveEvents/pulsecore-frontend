import { ROUTES } from './routes';

export const HERO_CONTENT = {
  eyebrow: 'Live at every front desk',
  headline: "Real-time check-in for conferences that can't afford a slowdown.",
  subheadline:
    'Scan a badge and watch attendee counts, session capacity, and VIP arrivals update on the organizer dashboard in under a second — no refresh, no spreadsheets.',
  primaryCta: { label: 'Open check-in desk', to: ROUTES.checkIn },
  secondaryCta: { label: 'View live dashboard', to: ROUTES.dashboard },
};

export const HERO_STATS = [
  { label: 'Attendees tracked per event', value: '3,200+' },
  { label: 'Scan-to-dashboard latency', value: '<400ms' },
  { label: 'Concurrent sessions supported', value: '24' },
  { label: 'Capacity alerts delivered', value: '100%' },
];

export const HOW_IT_WORKS_STEPS = [
  {
    step: '01',
    title: 'Scan or search',
    description:
      'Front-desk staff scan a badge or search by name — works in any browser, no app install required.',
  },
  {
    step: '02',
    title: 'Instant confirmation',
    description:
      "An attendee's status flips to checked-in immediately and syncs to every connected screen at once.",
  },
  {
    step: '03',
    title: 'Dashboard reacts live',
    description:
      'Organizers watch counts, capacity bars, and VIP arrivals update automatically — no manual refresh.',
  },
];

export type FeatureTint = 'primary' | 'success' | 'warning' | 'danger' | 'vip';

export const FEATURES: Array<{ title: string; description: string; tint: FeatureTint }> = [
  {
    title: 'Live attendee counter',
    description: 'A running total of registered vs. checked-in guests, updated the moment a badge is scanned.',
    tint: 'primary',
  },
  {
    title: 'Session capacity alerts',
    description: 'Automatic warnings as a room fills up, with a hard alert the instant it hits capacity.',
    tint: 'warning',
  },
  {
    title: 'VIP arrival feed',
    description: 'A dedicated feed so organizers know the moment a VIP guest walks through the door.',
    tint: 'vip',
  },
  {
    title: 'Manual check-in fallback',
    description: 'Add a walk-in on the spot when a badge fails to scan or a guest never pre-registered.',
    tint: 'success',
  },
  {
    title: 'Not-registered handling',
    description: 'Flag unrecognized tickets immediately instead of waving them through the door.',
    tint: 'danger',
  },
  {
    title: 'Status sync everywhere',
    description: 'Every front-desk terminal and the organizer dashboard share one source of truth.',
    tint: 'primary',
  },
];

export const CTA_CONTENT = {
  headline: 'Ready to run check-in without the chaos?',
  subheadline: 'Spin up the front desk and the dashboard side by side — they stay in sync automatically.',
  primaryCta: { label: 'Open check-in desk', to: ROUTES.checkIn },
  secondaryCta: { label: 'View live dashboard', to: ROUTES.dashboard },
};

export const NAV_LINKS = [
  { label: 'Check-in desk', to: ROUTES.checkIn },
  { label: 'Dashboard', to: ROUTES.dashboard },
  { label: 'Register', to: ROUTES.register },
  { label: 'Create session', to: ROUTES.createEvent },
];

export const QUICK_ACTIONS = [
  {
    title: 'Create a new session',
    description: 'Spin up a new session with its own capacity so attendees have something to register for.',
    cta: { label: 'Create a session', to: ROUTES.createEvent },
  },
  {
    title: 'Register for a session',
    description: 'Pre-register an attendee ahead of the event — they can check in later at the front desk.',
    cta: { label: 'Register now', to: ROUTES.register },
  },
];

export const FOOTER_CONTENT = {
  tagline: 'Built for front desks that move fast.',
  year: new Date().getFullYear(),
};
