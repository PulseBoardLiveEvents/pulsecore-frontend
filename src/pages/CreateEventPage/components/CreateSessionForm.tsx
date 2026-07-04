import { useState, type FormEvent } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../../../components/common/Button';
import { Card } from '../../../components/common/Card';
import { ROUTES } from '../../../constants/routes';
import type { CreateSessionInput } from '../../../types';
import styles from './CreateSessionForm.module.css';

interface CreateSessionFormProps {
  onSubmit: (input: CreateSessionInput) => Promise<{ name: string }>;
}

export function CreateSessionForm({ onSubmit }: CreateSessionFormProps) {
  const [name, setName] = useState('');
  const [capacity, setCapacity] = useState<number | ''>('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [confirmation, setConfirmation] = useState<{ name: string } | null>(null);

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    if (!name.trim() || !capacity || capacity < 1) return;

    setSubmitting(true);
    setError(null);
    try {
      const result = await onSubmit({ name: name.trim(), capacity });
      setConfirmation(result);
      setName('');
      setCapacity('');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong');
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <Card padding="lg" className={styles.card}>
      <h2 className={styles.title}>Create a new session</h2>
      <p className={styles.subtitle}>Add a session to the conference so attendees can register and check in to it.</p>

      {confirmation && (
        <div className={styles.confirmation} role="status">
          <strong>{confirmation.name}</strong> was created.{' '}
          <Link to={ROUTES.register} className={styles.confirmationLink}>
            Register someone for it →
          </Link>
        </div>
      )}

      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.field}>
          <label htmlFor="session-name">Session name</label>
          <input
            id="session-name"
            type="text"
            value={name}
            onChange={(event) => setName(event.target.value)}
            placeholder="Scaling Real-Time Systems"
            required
          />
        </div>

        <div className={styles.field}>
          <label htmlFor="session-capacity">Capacity</label>
          <input
            id="session-capacity"
            type="number"
            min={1}
            value={capacity}
            onChange={(event) => setCapacity(event.target.value === '' ? '' : Number(event.target.value))}
            placeholder="100"
            required
          />
        </div>

        {error && <p className={styles.error}>{error}</p>}

        <div className={styles.actions}>
          <Button type="submit" variant="primary" size="md" disabled={submitting}>
            {submitting ? 'Creating…' : 'Create session'}
          </Button>
        </div>
      </form>
    </Card>
  );
}
