import { useEffect, useState } from 'react';
import { LIVE_POLL_INTERVAL_MS } from '../constants/config';

/** Ticks on an interval so relative timestamps ("2m ago") stay fresh. */
export function useNow(intervalMs: number = LIVE_POLL_INTERVAL_MS): Date {
  const [now, setNow] = useState(() => new Date());

  useEffect(() => {
    const id = window.setInterval(() => setNow(new Date()), intervalMs);
    return () => window.clearInterval(id);
  }, [intervalMs]);

  return now;
}
