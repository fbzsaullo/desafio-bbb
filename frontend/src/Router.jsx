import { Route, Routes, Navigate } from 'react-router-dom';

import ActivedContest from './pages/ActivedContest/ActivedContest';
import Voted from './pages/Voted/Voted';
import Login from './pages/Login/Login';
import Dashboard from './pages/Dashboard/Dashboard';

const isLoggedIn = () => {
  return !!localStorage.getItem('apiKey').length === 32;
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
