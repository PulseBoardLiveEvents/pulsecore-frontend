import { Card } from '../../../components/common/Card';
import { formatTimeAgo } from '../../../utils/formatters';
import type { ActivityEvent, ActivityEventType } from '../../../types';
import styles from './ActivityFeed.module.css';

const EVENT_DOT_CLASS: Record<ActivityEventType, string> = {
  check_in: 'success',
  vip_arrival: 'vip',
  capacity_alert: 'danger',
  walk_in: 'primary',
};

interface ActivityFeedProps {
  activity: ActivityEvent[];
  now: Date;
}

export function ActivityFeed({ activity, now }: ActivityFeedProps) {
  return (
    <Card padding="md">
      <h3 className={styles.title}>Live activity</h3>
      {activity.length === 0 ? (
        <p className={styles.empty}>No activity yet.</p>
      ) : (
        <ul className={styles.list}>
          {activity.map((event) => (
            <li key={event.id} className={styles.item}>
              <span className={`${styles.dot} ${styles[EVENT_DOT_CLASS[event.type]]}`} />
              <p className={styles.message}>{event.message}</p>
              <span className={styles.time}>{formatTimeAgo(event.timestamp, now)}</span>
            </li>
          ))}
        </ul>
      )}
    </Card>
  );
}
