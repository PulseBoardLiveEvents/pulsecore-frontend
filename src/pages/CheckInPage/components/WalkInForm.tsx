import { useState, type FormEvent } from 'react';
import { Button } from '../../../components/common/Button';
import { Card } from '../../../components/common/Card';
import type { Session, WalkInInput } from '../../../types';
import styles from './WalkInForm.module.css';

interface WalkInFormProps {
  sessions: Session[];
  onSubmit: (input: WalkInInput) => Promise<void>;
  onCancel: () => void;
}

export function WalkInForm({ sessions, onSubmit, onCancel }: WalkInFormProps) {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [sessionId, setSessionId] = useState<number | ''>('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const effectiveSessionId = sessionId === '' ? sessions[0]?.id : sessionId;

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    if (!fullName.trim() || !email.trim() || !effectiveSessionId) return;

    setSubmitting(true);
    setError(null);
    try {
      await onSubmit({ fullName: fullName.trim(), email: email.trim(), sessionId: effectiveSessionId });
      setFullName('');
      setEmail('');
      setSessionId('');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong');
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <Card padding="md" className={styles.card}>
      <h3 className={styles.title}>Add walk-in</h3>
      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.field}>
          <label htmlFor="walkin-name">Full name</label>
          <input
            id="walkin-name"
            type="text"
            value={fullName}
            onChange={(event) => setFullName(event.target.value)}
            placeholder="Jordan Ellis"
            required
          />
        </div>

        <div className={styles.field}>
          <label htmlFor="walkin-email">Email</label>
          <input
            id="walkin-email"
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="jordan.ellis@example.com"
            required
          />
        </div>

        <div className={styles.field}>
          <label htmlFor="walkin-session">Session</label>
          <select
            id="walkin-session"
            value={effectiveSessionId ?? ''}
            onChange={(event) => setSessionId(Number(event.target.value))}
          >
            {sessions.map((session) => (
              <option key={session.id} value={session.id}>
                {session.name}
              </option>
            ))}
          </select>
        </div>

        {error && <p className={styles.error}>{error}</p>}

        <div className={styles.actions}>
          <Button type="button" variant="ghost" size="sm" onClick={onCancel} disabled={submitting}>
            Cancel
          </Button>
          <Button type="submit" variant="primary" size="sm" disabled={submitting}>
            {submitting ? 'Adding…' : 'Add and check in'}
          </Button>
        </div>
      </form>
    </Card>
  );
}
