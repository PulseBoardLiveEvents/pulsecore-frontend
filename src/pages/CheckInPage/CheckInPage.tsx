import { useMemo, useState } from 'react';
import { TopBar } from '../../components/layout/TopBar';
import { Button } from '../../components/common/Button';
import { ErrorBanner } from '../../components/common/ErrorBanner';
import { ROUTES } from '../../constants/routes';
import { useLiveData } from '../../hooks/useLiveData';
import { useNow } from '../../hooks/useNow';
import type { AttendeeFilter } from '../../types';
import { AttendeeCard } from './components/AttendeeCard';
import { FilterChips } from './components/FilterChips';
import { RecentCheckInsPanel } from './components/RecentCheckInsPanel';
import { SearchBar } from './components/SearchBar';
import { WalkInForm } from './components/WalkInForm';
import styles from './CheckInPage.module.css';

export function CheckInPage() {
  const { attendees, sessions, error, checkInAttendee, undoCheckIn, addWalkIn } = useLiveData();
  const now = useNow();

  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState<AttendeeFilter>('all');
  const [scanMode, setScanMode] = useState(false);
  const [showWalkInForm, setShowWalkInForm] = useState(false);

  const visibleAttendees = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return attendees.filter((attendee) => {
      const matchesFilter =
        filter === 'all' ||
        (filter === 'vip' && attendee.vip) ||
        (filter === 'checked_in' && attendee.checkedIn) ||
        (filter === 'registered' && !attendee.checkedIn);

      if (!matchesFilter) return false;
      if (!normalizedQuery) return true;

      return (
        attendee.fullName.toLowerCase().includes(normalizedQuery) ||
        attendee.email.toLowerCase().includes(normalizedQuery) ||
        attendee.ticketId.toLowerCase().includes(normalizedQuery)
      );
    });
  }, [attendees, filter, query]);

  const recentCheckIns = useMemo(
    () =>
      attendees
        .filter((a) => a.checkedIn && a.checkInTime)
        .sort((a, b) => new Date(b.checkInTime!).getTime() - new Date(a.checkInTime!).getTime())
        .slice(0, 6),
    [attendees],
  );

  const checkedInCount = useMemo(() => attendees.filter((a) => a.checkedIn).length, [attendees]);

  return (
    <>
      <TopBar
        title="Check-in desk"
        subtitle="Scan a badge or search to check attendees in."
        crossLinkLabel="Organizer dashboard"
        crossLinkTo={ROUTES.dashboard}
      />

      <main className={`container ${styles.layout}`}>
        <div className={styles.main}>
          {error && <ErrorBanner message={error} />}

          <SearchBar
            query={query}
            onQueryChange={setQuery}
            scanMode={scanMode}
            onToggleScanMode={() => setScanMode((prev) => !prev)}
          />

          <div className={styles.toolbar}>
            <FilterChips active={filter} onChange={setFilter} />
            <Button variant="secondary" size="sm" onClick={() => setShowWalkInForm((prev) => !prev)}>
              {showWalkInForm ? 'Close walk-in form' : '+ Add walk-in'}
            </Button>
          </div>

          {showWalkInForm && (
            <WalkInForm
              sessions={sessions}
              onSubmit={async (input) => {
                await addWalkIn(input);
                setShowWalkInForm(false);
              }}
              onCancel={() => setShowWalkInForm(false)}
            />
          )}

          <div className={styles.list}>
            {visibleAttendees.length === 0 ? (
              <p className={styles.empty}>No attendees match this search.</p>
            ) : (
              visibleAttendees.map((attendee) => (
                <AttendeeCard key={attendee.id} attendee={attendee} onCheckIn={checkInAttendee} onUndo={undoCheckIn} />
              ))
            )}
          </div>
        </div>

        <aside className={styles.sidebar}>
          <RecentCheckInsPanel
            recentCheckIns={recentCheckIns}
            registeredCount={attendees.length}
            checkedInCount={checkedInCount}
            now={now}
          />
        </aside>
      </main>
    </>
  );
}
