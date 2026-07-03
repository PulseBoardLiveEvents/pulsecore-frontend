import { Link } from 'react-router-dom';
import { APP_NAME } from '../../constants/config';
import { NAV_LINKS } from '../../constants/siteContent';
import { ROUTES } from '../../constants/routes';
import { Button } from '../common/Button';
import { LivePulse } from '../common/LivePulse';
import styles from './NavBar.module.css';

export function NavBar() {
  return (
    <header className={styles.header}>
      <div className={`container ${styles.inner}`}>
        <Link to={ROUTES.landing} className={styles.brand}>
          <span className={styles.brandMark} />
          {APP_NAME}
        </Link>

        <nav className={styles.nav}>
          {NAV_LINKS.map((link) => (
            <Link key={link.to} to={link.to} className={styles.navLink}>
              {link.label}
            </Link>
          ))}
        </nav>

        <div className={styles.actions}>
          <LivePulse />
          <Button to={ROUTES.checkIn} size="sm">
            Open check-in
          </Button>
        </div>
      </div>
    </header>
  );
}
