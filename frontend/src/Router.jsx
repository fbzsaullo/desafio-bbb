import { Route, Routes, Navigate } from 'react-router-dom';

import ActivedContest from './pages/ActivedContest/ActivedContest';
import Voted from './pages/Voted/Voted';
import Login from './pages/Login/Login';
import Dashboard from './pages/Dashboard/Dashboard';

const isLoggedIn = () => {
  const token = localStorage.getItem('token');
  const tokenExpiresAt = localStorage.getItem('tokenExpiresAt');

  if (!token || !tokenExpiresAt) {
    return false;
  }

  const expiresAt = new Date(tokenExpiresAt);
  const now = new Date();

  if (now >= expiresAt) {
    localStorage.removeItem('token');
    localStorage.removeItem('tokenExpiresAt');
    return false;
  }

  return true;
};

export const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<ActivedContest />} />
      <Route path="/obrigado-por-votar" element={<Voted />} />
      <Route 
        path="/login" 
        element={isLoggedIn() ? <Navigate to="/dashboard" /> : <Login />} 
      />
      <Route 
        path="/dashboard" 
        element={isLoggedIn() ? <Dashboard /> : <Navigate to="/login" />} 
      />
    </Routes>
  );
}