import { useState, type FormEvent } from 'react';
import { Button } from '../../../components/common/Button';
import { Card } from '../../../components/common/Card';
import { SESSION_NAMES } from '../../../constants/mockData';
import type { WalkInInput } from '../../../types';
import styles from './WalkInForm.module.css';

interface WalkInFormProps {
  onSubmit: (input: WalkInInput) => void;
  onCancel: () => void;
}

export function WalkInForm({ onSubmit, onCancel }: WalkInFormProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [session, setSession] = useState<string>(SESSION_NAMES[0]);

  function handleSubmit(event: FormEvent) {
    event.preventDefault();
    if (!name.trim() || !email.trim()) return;
    onSubmit({ name: name.trim(), email: email.trim(), session });
    setName('');
    setEmail('');
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
            value={name}
            onChange={(event) => setName(event.target.value)}
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
          <select id="walkin-session" value={session} onChange={(event) => setSession(event.target.value)}>
            {SESSION_NAMES.map((sessionName) => (
              <option key={sessionName} value={sessionName}>
                {sessionName}
              </option>
            ))}
          </select>
        </div>

        <div className={styles.actions}>
          <Button variant="ghost" size="sm" onClick={onCancel}>
            Cancel
          </Button>
          <Button type="submit" variant="primary" size="sm">
            Add and check in
          </Button>
        </div>
      </form>
    </Card>
  );
}
