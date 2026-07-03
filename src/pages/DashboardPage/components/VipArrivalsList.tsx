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
              <Avatar name={vip.name} tint={tintFromKey(vip.id)} />
              <div className={styles.info}>
                <span className={styles.name}>{vip.name}</span>
                <span className={styles.session}>{vip.session}</span>
              </div>
              <Badge tint={vip.status === 'checked_in' ? 'success' : 'neutral'}>
                {vip.status === 'checked_in' ? 'Arrived' : 'Expected'}
              </Badge>
            </li>
          ))}
        </ul>
      )}
    </Card>
  );
}
