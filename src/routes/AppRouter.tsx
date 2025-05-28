// src/routes/AppRouter.tsx
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import A from '../pages/A';
import A1 from '../pages/A1';
import A2 from '../pages/A2';
import A3 from '../pages/A3';
import B1 from '../pages/B1';
import B2 from '../pages/B2';
import C1 from '../pages/C1';

const AppRouter: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<A />} />
      <Route path="/A1" element={<A1 />} />
      <Route path="/A2" element={<A2 />} />
      <Route path="/A3" element={<A3 />} />
      <Route path="/B1" element={<B1 />} />
      <Route path="/B2" element={<B2 />} />
      <Route path="/C1" element={<C1 />} />
      {/* Bạn có thể thêm route 404 hoặc route khác ở đây */}
    </Routes>
  );
};

export default AppRouter;
