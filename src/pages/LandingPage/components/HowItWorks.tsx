import { HOW_IT_WORKS_STEPS } from '../../../constants/siteContent';
import styles from './HowItWorks.module.css';

export function HowItWorks() {
  return (
    <section className={styles.section}>
      <div className="container">
        <div className={styles.heading}>
          <h2 className={styles.title}>How it works</h2>
          <p className={styles.subtitle}>Three steps from front-desk scan to organizer insight.</p>
        </div>

        <div className={styles.grid}>
          {HOW_IT_WORKS_STEPS.map((item) => (
            <div key={item.step} className={styles.step}>
              <span className={styles.stepNumber}>{item.step}</span>
              <h3 className={styles.stepTitle}>{item.title}</h3>
              <p className={styles.stepDescription}>{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
