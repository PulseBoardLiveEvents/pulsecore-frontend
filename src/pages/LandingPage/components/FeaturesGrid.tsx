import { FEATURES } from '../../../constants/siteContent';
import { Card } from '../../../components/common/Card';
import styles from './FeaturesGrid.module.css';

export function FeaturesGrid() {
  return (
    <section className={styles.section}>
      <div className="container">
        <div className={styles.heading}>
          <h2 className={styles.title}>Everything the front desk needs</h2>
          <p className={styles.subtitle}>Built for the chaos of doors opening, not a demo environment.</p>
        </div>

        <div className={styles.grid}>
          {FEATURES.map((feature) => (
            <Card key={feature.title} padding="lg" className={styles.card}>
              <span className={`${styles.tintDot} ${styles[feature.tint]}`} />
              <h3 className={styles.cardTitle}>{feature.title}</h3>
              <p className={styles.cardDescription}>{feature.description}</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
