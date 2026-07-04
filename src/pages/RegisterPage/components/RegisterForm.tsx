import { useState, type FormEvent } from 'react';
import { Button } from '../../../components/common/Button';
import { Card } from '../../../components/common/Card';
import type { RegisterInput, Session } from '../../../types';
import styles from './RegisterForm.module.css';

interface RegisterFormProps {
  sessions: Session[];
  onSubmit: (input: RegisterInput) => Promise<{ fullName: string; ticketId: string; sessionName: string }>;
}

export function RegisterForm({ sessions, onSubmit }: RegisterFormProps) {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [sessionId, setSessionId] = useState<number | ''>('');
  const [vip, setVip] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [confirmation, setConfirmation] = useState<{ fullName: string; ticketId: string; sessionName: string } | null>(
    null,
  );

  const effectiveSessionId = sessionId === '' ? sessions[0]?.id : sessionId;

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    if (!fullName.trim() || !email.trim() || !effectiveSessionId) return;

    setSubmitting(true);
    setError(null);
    try {
      const result = await onSubmit({
        fullName: fullName.trim(),
        email: email.trim(),
        sessionId: effectiveSessionId,
        vip,
      });
      setConfirmation(result);
      setFullName('');
      setEmail('');
      setSessionId('');
      setVip(false);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong');
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <Card padding="lg" className={styles.card}>
      <h2 className={styles.title}>Register for the conference</h2>
      <p className={styles.subtitle}>Reserve a spot ahead of time — you can check in later at the front desk.</p>

      {confirmation && (
        <div className={styles.confirmation} role="status">
          <strong>{confirmation.fullName}</strong> is registered for {confirmation.sessionName}. Ticket ID:{' '}
          <span className={styles.ticketId}>{confirmation.ticketId}</span>
        </div>
      )}

      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.field}>
          <label htmlFor="register-name">Full name</label>
          <input
            id="register-name"
            type="text"
            value={fullName}
            onChange={(event) => setFullName(event.target.value)}
            placeholder="Jordan Ellis"
            required
          />
        </div>

        <div className={styles.field}>
          <label htmlFor="register-email">Email</label>
          <input
            id="register-email"
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="jordan.ellis@example.com"
            required
          />
        </div>

        <div className={styles.field}>
          <label htmlFor="register-session">Session</label>
          <select
            id="register-session"
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

        <label className={styles.checkboxField}>
          <input type="checkbox" checked={vip} onChange={(event) => setVip(event.target.checked)} />
          VIP guest
        </label>

        {error && <p className={styles.error}>{error}</p>}

        <div className={styles.actions}>
          <Button type="submit" variant="primary" size="md" disabled={submitting || sessions.length === 0}>
            {submitting ? 'Registering…' : 'Register'}
          </Button>
        </div>

        {sessions.length === 0 && <p className={styles.error}>No sessions exist yet — create one first.</p>}
      </form>
    </Card>
  );
}
