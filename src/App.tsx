import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { LiveDataProvider } from './context/LiveDataContext';
import { ROUTES } from './constants/routes';
import { LandingPage } from './pages/LandingPage/LandingPage';
import { CheckInPage } from './pages/CheckInPage/CheckInPage';
import { DashboardPage } from './pages/DashboardPage/DashboardPage';

function App() {
  return (
    <BrowserRouter>
      <LiveDataProvider>
        <Routes>
          <Route path={ROUTES.landing} element={<LandingPage />} />
          <Route path={ROUTES.checkIn} element={<CheckInPage />} />
          <Route path={ROUTES.dashboard} element={<DashboardPage />} />
        </Routes>
      </LiveDataProvider>
    </BrowserRouter>
  );
}

export default App;
