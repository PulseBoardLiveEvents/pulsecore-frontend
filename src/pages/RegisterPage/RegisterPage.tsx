import { TopBar } from '../../components/layout/TopBar';
import { ErrorBanner } from '../../components/common/ErrorBanner';
import { ROUTES } from '../../constants/routes';
import { useLiveData } from '../../hooks/useLiveData';
import { RegisterForm } from './components/RegisterForm';
import styles from './RegisterPage.module.css';

export function RegisterPage() {
  const { sessions, error, registerAttendee } = useLiveData();

  return (
    <>
      <TopBar
        title="Register for a session"
        subtitle="Pre-register attendees ahead of the event — no check-in required yet."
        crossLinkLabel="Check-in desk"
        crossLinkTo={ROUTES.checkIn}
      />

      <main className={`container ${styles.layout}`}>
        {error && <ErrorBanner message={error} />}

        <RegisterForm
          sessions={sessions}
          onSubmit={async (input) => {
            const attendee = await registerAttendee(input);
            return { fullName: attendee.fullName, ticketId: attendee.ticketId, sessionName: attendee.sessionName };
          }}
        />
      </main>
    </>
  );
}
