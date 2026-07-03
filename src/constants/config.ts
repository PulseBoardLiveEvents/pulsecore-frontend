/**
 * Runtime configuration. Values can be overridden per-environment via
 * `.env` files (Vite exposes anything prefixed `VITE_`).
 */
export const APP_NAME = 'PulseBoard';

export const API_BASE_URL: string =
  import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:8080/api';

/** Serve the UI from bundled sample data instead of the live backend. */
export const USE_MOCK_DATA: boolean =
  (import.meta.env.VITE_USE_MOCK_DATA ?? 'true') !== 'false';

/** How often the dashboard/check-in views re-poll the backend, in ms. */
export const LIVE_POLL_INTERVAL_MS = 5000;

/** Fraction of capacity at which a session's progress bar turns amber. */
export const CAPACITY_WARNING_THRESHOLD = 0.85;

/** Fraction of capacity at which a session counts as "at capacity". */
export const CAPACITY_FULL_THRESHOLD = 1;
