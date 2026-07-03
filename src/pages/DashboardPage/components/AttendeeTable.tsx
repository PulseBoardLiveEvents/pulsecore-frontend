import { useMemo, useState } from 'react';
import { Badge } from '../../../components/common/Badge';
import { Card } from '../../../components/common/Card';
import type { Attendee } from '../../../types';
import styles from './AttendeeTable.module.css';

interface AttendeeTableProps {
  attendees: Attendee[];
}

export function AttendeeTable({ attendees }: AttendeeTableProps) {
  const [query, setQuery] = useState('');

  const filteredAttendees = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    if (!normalizedQuery) return attendees;

    return attendees.filter(
      (attendee) =>
        attendee.fullName.toLowerCase().includes(normalizedQuery) ||
        attendee.email.toLowerCase().includes(normalizedQuery) ||
        attendee.sessionName.toLowerCase().includes(normalizedQuery),
    );
  }, [attendees, query]);

  return (
    <Card padding="md">
      <div className={styles.header}>
        <h3 className={styles.title}>All attendees</h3>
        <input
          type="text"
          className={styles.search}
          placeholder="Filter by name, email, or session…"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
        />
      </div>

      <div className={styles.tableWrap}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Name</th>
              <th>Session</th>
              <th>Ticket</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {filteredAttendees.map((attendee) => (
              <tr key={attendee.id}>
                <td>
                  <div className={styles.nameCell}>
                    <span>{attendee.fullName}</span>
                    {attendee.vip && <Badge tint="vip">VIP</Badge>}
                  </div>
                  <span className={styles.email}>{attendee.email}</span>
                </td>
                <td>{attendee.sessionName}</td>
                <td className={styles.ticket}>{attendee.ticketId}</td>
                <td>
                  <Badge tint={attendee.checkedIn ? 'success' : 'neutral'} dot>
                    {attendee.checkedIn ? 'Checked in' : 'Registered'}
                  </Badge>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {filteredAttendees.length === 0 && <p className={styles.empty}>No attendees match this search.</p>}
      </div>
    </Card>
  );
}
