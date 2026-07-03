import { useMemo } from 'react';
import { TopBar } from '../../components/layout/TopBar';
import { StatCard } from '../../components/common/StatCard';
import { ROUTES } from '../../constants/routes';
import { useLiveData } from '../../hooks/useLiveData';
import { useNow } from '../../hooks/useNow';
import { computeOverviewStats, getSessionsAtCapacity } from '../../utils/stats';
import { ActivityFeed } from './components/ActivityFeed';
import { AttendeeTable } from './components/AttendeeTable';
import { CapacityAlertBanner } from './components/CapacityAlertBanner';
import { SessionCapacityList } from './components/SessionCapacityList';
import { VipArrivalsList } from './components/VipArrivalsList';
import styles from './DashboardPage.module.css';

export function DashboardPage() {
  const { attendees, sessions, activity } = useLiveData();
  const now = useNow();

  const stats = useMemo(() => computeOverviewStats(attendees, sessions), [attendees, sessions]);
  const sessionsAtCapacity = useMemo(() => getSessionsAtCapacity(sessions), [sessions]);
  const vips = useMemo(() => attendees.filter((a) => a.vip), [attendees]);

  return (
    <>
      <TopBar
        title="Organizer dashboard"
        subtitle="Live attendee counts, session capacity, and VIP arrivals."
        crossLinkLabel="Check-in desk"
        crossLinkTo={ROUTES.checkIn}
      />

      <main className={`container ${styles.layout}`}>
        <CapacityAlertBanner sessionsAtCapacity={sessionsAtCapacity} />

        <div className={styles.statGrid}>
          <StatCard label="Registered" value={stats.registered} tint="primary" />
          <StatCard label="Checked in" value={stats.checkedIn} tint="success" />
          <StatCard label="Sessions at capacity" value={stats.sessionsAtCapacity} tint="warning" />
          <StatCard label="VIPs arrived" value={stats.vipsArrived} tint="vip" />
        </div>

        <div className={styles.mainGrid}>
          <SessionCapacityList sessions={sessions} />
          <VipArrivalsList vips={vips} />
          <ActivityFeed activity={activity} now={now} />
        </div>

        <AttendeeTable attendees={attendees} />
      </main>
    </>
  );
}
