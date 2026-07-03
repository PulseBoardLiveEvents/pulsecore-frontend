import type { CapacityLevel } from '../../utils/stats';
import styles from './ProgressBar.module.css';

interface ProgressBarProps {
  ratio: number;
  level: CapacityLevel;
}

export function ProgressBar({ ratio, level }: ProgressBarProps) {
  const percent = Math.min(100, Math.round(ratio * 100));
  return (
    <div className={styles.track} role="progressbar" aria-valuenow={percent} aria-valuemin={0} aria-valuemax={100}>
      <div className={`${styles.fill} ${styles[level]}`} style={{ width: `${percent}%` }} />
    </div>
  );
}
