import { Link } from 'react-router-dom';
import { APP_NAME } from '../../constants/config';
import { ROUTES } from '../../constants/routes';
import { LivePulse } from '../common/LivePulse';
import styles from './TopBar.module.css';

interface TopBarProps {
  title: string;
  subtitle: string;
  crossLinkLabel: string;
  crossLinkTo: (typeof ROUTES)[keyof typeof ROUTES];
}

export function TopBar({ title, subtitle, crossLinkLabel, crossLinkTo }: TopBarProps) {
  return (
    <header className={styles.header}>
      <div className={`container ${styles.inner}`}>
        <div className={styles.titleBlock}>
          <Link to={ROUTES.landing} className={styles.brand}>
            <span className={styles.brandMark} />
            {APP_NAME}
          </Link>
          <span className={styles.divider} />
          <div>
            <h1 className={styles.title}>{title}</h1>
            <p className={styles.subtitle}>{subtitle}</p>
          </div>
        </div>

        <div className={styles.actions}>
          <LivePulse />
          <Link to={crossLinkTo} className={styles.crossLink}>
            {crossLinkLabel} →
          </Link>
        </div>
      </div>
    </header>
  );
}
