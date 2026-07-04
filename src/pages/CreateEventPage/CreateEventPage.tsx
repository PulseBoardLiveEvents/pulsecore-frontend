import { TopBar } from '../../components/layout/TopBar';
import { ErrorBanner } from '../../components/common/ErrorBanner';
import { ROUTES } from '../../constants/routes';
import { useLiveData } from '../../hooks/useLiveData';
import { CreateSessionForm } from './components/CreateSessionForm';
import styles from './CreateEventPage.module.css';

export function CreateEventPage() {
  const { error, createSession } = useLiveData();

  return (
    <>
      <TopBar
        title="Create a new session"
        subtitle="Spin up a new session for people to register and check in to."
        crossLinkLabel="Check-in desk"
        crossLinkTo={ROUTES.checkIn}
      />

      <main className={`container ${styles.layout}`}>
        {error && <ErrorBanner message={error} />}

        <CreateSessionForm onSubmit={(input) => createSession(input)} />
      </main>
    </>
  );
}
