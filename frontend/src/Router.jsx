import { Route, Routes } from 'react-router-dom';

import ActiveContest from './pages/ActiveContest/ActiveContest';

export const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<ActiveContest />} />
    </Routes>
  );
}