import type { Session } from '../../../types';
import styles from './CapacityAlertBanner.module.css';

interface CapacityAlertBannerProps {
  sessionsAtCapacity: Session[];
}

export function CapacityAlertBanner({ sessionsAtCapacity }: CapacityAlertBannerProps) {
  if (sessionsAtCapacity.length === 0) return null;

  const names = sessionsAtCapacity.map((s) => s.name).join(', ');

  return (
    <div className={styles.banner} role="alert">
      <span className={styles.icon} aria-hidden="true">
        ⚠
      </span>
      <p className={styles.message}>
        <strong>{sessionsAtCapacity.length === 1 ? 'Session at capacity:' : 'Sessions at capacity:'}</strong> {names}
      </p>
    </div>
  );
}
