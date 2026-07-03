import { HERO_STATS } from '../../../constants/siteContent';
import styles from './StatsStrip.module.css';

export function StatsStrip() {
  return (
    <section className={styles.section}>
      <div className={`container ${styles.grid}`}>
        {HERO_STATS.map((stat) => (
          <div key={stat.label} className={styles.stat}>
            <span className={styles.value}>{stat.value}</span>
            <span className={styles.label}>{stat.label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
