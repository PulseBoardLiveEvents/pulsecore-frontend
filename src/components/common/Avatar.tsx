import { getInitials } from '../../utils/formatters';
import styles from './Avatar.module.css';

export type AvatarTint = 'primary' | 'success' | 'warning' | 'danger' | 'vip';

interface AvatarProps {
  name: string;
  tint?: AvatarTint;
}

export function Avatar({ name, tint = 'primary' }: AvatarProps) {
  return <span className={`${styles.avatar} ${styles[tint]}`}>{getInitials(name)}</span>;
}
