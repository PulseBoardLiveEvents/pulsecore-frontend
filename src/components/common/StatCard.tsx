import type { ReactNode } from 'react';
import { Card } from './Card';
import styles from './StatCard.module.css';

export type StatTint = 'primary' | 'success' | 'warning' | 'vip';

interface StatCardProps {
  label: string;
  value: ReactNode;
  tint?: StatTint;
  icon?: ReactNode;
}

export function StatCard({ label, value, tint = 'primary', icon }: StatCardProps) {
  return (
    <Card padding="md" className={styles.card}>
      <div className={styles.row}>
        <span className={styles.label}>{label}</span>
        {icon && <span className={`${styles.iconWrap} ${styles[tint]}`}>{icon}</span>}
      </div>
      <span className={styles.value}>{value}</span>
    </Card>
  );
}
