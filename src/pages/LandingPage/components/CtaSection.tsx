import { CTA_CONTENT } from '../../../constants/siteContent';
import { Button } from '../../../components/common/Button';
import styles from './CtaSection.module.css';

export function CtaSection() {
  return (
    <section className={styles.section}>
      <div className={`container ${styles.inner}`}>
        <h2 className={styles.title}>{CTA_CONTENT.headline}</h2>
        <p className={styles.subtitle}>{CTA_CONTENT.subheadline}</p>
        <div className={styles.ctas}>
          <Button to={CTA_CONTENT.primaryCta.to} size="md">
            {CTA_CONTENT.primaryCta.label}
          </Button>
          <Button to={CTA_CONTENT.secondaryCta.to} variant="secondary" size="md">
            {CTA_CONTENT.secondaryCta.label}
          </Button>
        </div>
      </div>
    </section>
  );
}
