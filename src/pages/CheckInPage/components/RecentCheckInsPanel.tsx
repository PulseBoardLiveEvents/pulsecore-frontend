import { Avatar } from '../../../components/common/Avatar';
import { tintFromKey } from '../../../utils/avatarTint';
import { Card } from '../../../components/common/Card';
import { formatTimeAgo } from '../../../utils/formatters';
import type { Attendee } from '../../../types';
import styles from './RecentCheckInsPanel.module.css';

interface RecentCheckInsPanelProps {
  recentCheckIns: Attendee[];
  registeredCount: number;
  checkedInCount: number;
  now: Date;
}

export function RecentCheckInsPanel({ recentCheckIns, registeredCount, checkedInCount, now }: RecentCheckInsPanelProps) {
  return (
    <div className={styles.column}>
      <Card padding="md">
        <h3 className={styles.title}>Today so far</h3>
        <div className={styles.summaryGrid}>
          <div>
            <span className={styles.summaryValue}>{checkedInCount}</span>
            <span className={styles.summaryLabel}>Checked in</span>
          </div>
          <div>
            <span className={styles.summaryValue}>{registeredCount}</span>
            <span className={styles.summaryLabel}>Total registered</span>
          </div>
        </div>
      </Card>

      <Card padding="md">
        <h3 className={styles.title}>Recent check-ins</h3>
        {recentCheckIns.length === 0 ? (
          <p className={styles.empty}>No check-ins yet.</p>
        ) : (
          <ul className={styles.list}>
            {recentCheckIns.map((attendee) => (
              <li key={attendee.id} className={styles.item}>
                <Avatar name={attendee.name} tint={tintFromKey(attendee.id)} />
                <div className={styles.itemInfo}>
                  <span className={styles.itemName}>{attendee.name}</span>
                  <span className={styles.itemMeta}>{attendee.session}</span>
                </div>
                <span className={styles.itemTime}>{attendee.checkedInAt ? formatTimeAgo(attendee.checkedInAt, now) : ''}</span>
              </li>
            ))}
          </ul>
        )}
      </Card>
    </div>
  );
}
