import { HERO_CONTENT } from '../../../constants/siteContent';
import { Button } from '../../../components/common/Button';
import { LivePulse } from '../../../components/common/LivePulse';
import styles from './Hero.module.css';

export function Hero() {
  return (
    <section className={styles.hero}>
      <div className={`container ${styles.inner}`}>
        <div className={styles.eyebrow}>
          <LivePulse label={HERO_CONTENT.eyebrow} />
        </div>
        <h1 className={styles.headline}>{HERO_CONTENT.headline}</h1>
        <p className={styles.subheadline}>{HERO_CONTENT.subheadline}</p>
        <div className={styles.ctas}>
          <Button to={HERO_CONTENT.primaryCta.to} size="md">
            {HERO_CONTENT.primaryCta.label}
          </Button>
          <Button to={HERO_CONTENT.secondaryCta.to} variant="secondary" size="md">
            {HERO_CONTENT.secondaryCta.label}
          </Button>
        </div>
      </div>
    </section>
  );
}
