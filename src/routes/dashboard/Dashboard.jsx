import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import './dashboard.css';
import Header from '../../components/navigation/Header';
import SideBar from '../../components/navigation/SideBar';
import HomePage from './HomePage';
import Favorites from './Favorites';
import WatchLater from './WatchLater';

function Dashboard({ userUsername, setIsLoggedIn }) {
  return (
    <BrowserRouter>
      <div className="dashboard">
        {/* Header avec navigation */}
        <Header
          userUsername={userUsername}
          setIsLoggedIn={setIsLoggedIn}
        />

        <div className="dashboard-body">
          {/* SideBar */}
          <SideBar />

          {/* Contenu principal avec routes */}
          <div className="dashboard-content">
            <Routes>
              <Route path="/home" element={<HomePage />} />
              <Route path="/favorites" element={<Favorites />} />
              <Route path="/watchlater" element={<WatchLater />} />
              <Route path="*" element={<Navigate to="/home" />} />
            </Routes>
          </div>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default Dashboard;
