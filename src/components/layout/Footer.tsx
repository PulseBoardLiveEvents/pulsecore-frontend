import { APP_NAME } from '../../constants/config';
import { FOOTER_CONTENT, NAV_LINKS } from '../../constants/siteContent';
import { Link } from 'react-router-dom';
import { ROUTES } from '../../constants/routes';
import styles from './Footer.module.css';

export function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.inner}`}>
        <div>
          <Link to={ROUTES.landing} className={styles.brand}>
            <span className={styles.brandMark} />
            {APP_NAME}
          </Link>
          <p className={styles.tagline}>{FOOTER_CONTENT.tagline}</p>
        </div>

        <nav className={styles.links}>
          {NAV_LINKS.map((link) => (
            <Link key={link.to} to={link.to} className={styles.link}>
              {link.label}
            </Link>
          ))}
        </nav>

        <p className={styles.copyright}>
          © {FOOTER_CONTENT.year} {APP_NAME}. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
