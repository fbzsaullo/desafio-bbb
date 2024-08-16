import { Route, Routes } from 'react-router-dom';

import ActivedContest from './pages/ActivedContest/ActivedContest';

import Voted from './pages/Voted/Voted';

export const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<ActivedContest />} />
      <Route path="/obrigado-por-votar" element={<Voted />} />
    </Routes>
  );
}