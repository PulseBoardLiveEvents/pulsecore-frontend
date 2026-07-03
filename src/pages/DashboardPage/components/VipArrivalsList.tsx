import { Avatar } from '../../../components/common/Avatar';
import { tintFromKey } from '../../../utils/avatarTint';
import { Badge } from '../../../components/common/Badge';
import { Card } from '../../../components/common/Card';
import type { Attendee } from '../../../types';
import styles from './VipArrivalsList.module.css';

interface VipArrivalsListProps {
  vips: Attendee[];
}

export function VipArrivalsList({ vips }: VipArrivalsListProps) {
  return (
    <Card padding="md">
      <h3 className={styles.title}>VIP arrivals</h3>
      {vips.length === 0 ? (
        <p className={styles.empty}>No VIP guests registered.</p>
      ) : (
        <ul className={styles.list}>
          {vips.map((vip) => (
            <li key={vip.id} className={styles.item}>
              <Avatar name={vip.fullName} tint={tintFromKey(String(vip.id))} />
              <div className={styles.info}>
                <span className={styles.name}>{vip.fullName}</span>
                <span className={styles.session}>{vip.sessionName}</span>
              </div>
              <Badge tint={vip.checkedIn ? 'success' : 'neutral'}>{vip.checkedIn ? 'Arrived' : 'Expected'}</Badge>
            </li>
          ))}
        </ul>
      )}
    </Card>
  );
}
