/**
 * Runtime configuration. Values can be overridden per-environment via
 * `.env` files (Vite exposes anything prefixed `VITE_`).
 */
export const APP_NAME = 'PulseBoard';

/** Base URL of the Spring Boot API (see pulseboard-backend). */
export const API_BASE_URL: string =
  import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:8080/api';

/** How often the dashboard/check-in views re-poll the backend, in ms. */
export const LIVE_POLL_INTERVAL_MS = 5000;

/** Fraction of capacity at which a session's progress bar turns amber. */
export const CAPACITY_WARNING_THRESHOLD = 0.85;

/** Fraction of capacity at which a session counts as "at capacity". */
export const CAPACITY_FULL_THRESHOLD = 1;
