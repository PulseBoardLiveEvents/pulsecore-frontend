import { Badge } from '../../../components/common/Badge';
import { Card } from '../../../components/common/Card';
import { ProgressBar } from '../../../components/common/ProgressBar';
import { getCapacityLevel, getSessionFillRatio } from '../../../utils/stats';
import type { Session } from '../../../types';
import styles from './SessionCapacityList.module.css';

interface SessionCapacityListProps {
  sessions: Session[];
}

export function SessionCapacityList({ sessions }: SessionCapacityListProps) {
  return (
    <Card padding="md">
      <h3 className={styles.title}>Session capacity</h3>
      <div className={styles.list}>
        {sessions.map((session) => {
          const level = getCapacityLevel(session);
          const ratio = getSessionFillRatio(session);

          return (
            <div key={session.id} className={styles.row}>
              <div className={styles.rowHeader}>
                <span className={styles.name}>{session.name}</span>
                <div className={styles.rowMeta}>
                  <span className={styles.count}>
                    {session.checkedIn}/{session.capacity}
                  </span>
                  {level === 'full' && <Badge tint="danger">Full</Badge>}
                  {level === 'warning' && <Badge tint="warning">Nearly full</Badge>}
                </div>
              </div>
              <ProgressBar ratio={ratio} level={level} />
            </div>
          );
        })}
      </div>
    </Card>
  );
}
