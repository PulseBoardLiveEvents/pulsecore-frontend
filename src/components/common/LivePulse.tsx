import styles from './LivePulse.module.css';

interface LivePulseProps {
  label?: string;
}

export function LivePulse({ label = 'Live' }: LivePulseProps) {
  return (
    <span className={styles.wrap}>
      <span className={styles.pulse} />
      {label}
    </span>
  );
}
