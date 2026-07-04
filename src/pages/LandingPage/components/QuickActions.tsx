import { QUICK_ACTIONS } from '../../../constants/siteContent';
import { Button } from '../../../components/common/Button';
import { Card } from '../../../components/common/Card';
import styles from './QuickActions.module.css';

export function QuickActions() {
  return (
    <section className={styles.section}>
      <div className="container">
        <div className={styles.grid}>
          {QUICK_ACTIONS.map((action) => (
            <Card key={action.title} padding="lg" className={styles.card}>
              <h3 className={styles.cardTitle}>{action.title}</h3>
              <p className={styles.cardDescription}>{action.description}</p>
              <Button to={action.cta.to} size="sm">
                {action.cta.label}
              </Button>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
