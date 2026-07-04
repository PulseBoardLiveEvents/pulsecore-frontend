import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { LiveDataProvider } from './context/LiveDataContext';
import { ROUTES } from './constants/routes';
import { LandingPage } from './pages/LandingPage/LandingPage';
import { CheckInPage } from './pages/CheckInPage/CheckInPage';
import { DashboardPage } from './pages/DashboardPage/DashboardPage';
import { RegisterPage } from './pages/RegisterPage/RegisterPage';
import { CreateEventPage } from './pages/CreateEventPage/CreateEventPage';

function App() {
  return (
    <BrowserRouter>
      <LiveDataProvider>
        <Routes>
          <Route path={ROUTES.landing} element={<LandingPage />} />
          <Route path={ROUTES.checkIn} element={<CheckInPage />} />
          <Route path={ROUTES.dashboard} element={<DashboardPage />} />
          <Route path={ROUTES.register} element={<RegisterPage />} />
          <Route path={ROUTES.createEvent} element={<CreateEventPage />} />
        </Routes>
      </LiveDataProvider>
    </BrowserRouter>
  );
}

export default App;
