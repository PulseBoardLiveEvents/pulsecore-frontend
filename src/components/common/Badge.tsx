import type { ReactNode } from 'react';
import styles from './Badge.module.css';

export type BadgeTint = 'primary' | 'success' | 'warning' | 'danger' | 'vip' | 'neutral';

interface BadgeProps {
  tint?: BadgeTint;
  children: ReactNode;
  dot?: boolean;
}

export function Badge({ tint = 'neutral', children, dot = false }: BadgeProps) {
  return (
    <span className={`${styles.badge} ${styles[tint]}`}>
      {dot && <span className={styles.dot} />}
      {children}
    </span>
  );
}
