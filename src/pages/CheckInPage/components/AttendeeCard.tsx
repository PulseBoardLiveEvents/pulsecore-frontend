import { Avatar } from '../../../components/common/Avatar';
import { tintFromKey } from '../../../utils/avatarTint';
import { Badge } from '../../../components/common/Badge';
import { Button } from '../../../components/common/Button';
import { Card } from '../../../components/common/Card';
import type { Attendee } from '../../../types';
import styles from './AttendeeCard.module.css';

interface AttendeeCardProps {
  attendee: Attendee;
  onCheckIn: (id: string) => void;
  onUndo: (id: string) => void;
}

export function AttendeeCard({ attendee, onCheckIn, onUndo }: AttendeeCardProps) {
  const isCheckedIn = attendee.status === 'checked_in';

  return (
    <Card padding="sm" className={styles.card}>
      <Avatar name={attendee.name} tint={tintFromKey(attendee.id)} />

      <div className={styles.info}>
        <div className={styles.nameRow}>
          <span className={styles.name}>{attendee.name}</span>
          {attendee.vip && <Badge tint="vip">VIP</Badge>}
        </div>
        <span className={styles.meta}>
          {attendee.email} · {attendee.ticketId} · {attendee.session}
        </span>
      </div>

      <div className={styles.statusColumn}>
        <Badge tint={isCheckedIn ? 'success' : 'neutral'} dot>
          {isCheckedIn ? 'Checked in' : 'Registered'}
        </Badge>
        {isCheckedIn ? (
          <Button variant="ghost" size="sm" onClick={() => onUndo(attendee.id)}>
            Undo
          </Button>
        ) : (
          <Button variant="primary" size="sm" onClick={() => onCheckIn(attendee.id)}>
            Check in
          </Button>
        )}
      </div>
    </Card>
  );
}
