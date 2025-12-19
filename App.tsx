import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import InvitePage from './pages/InvitePage';
import AdminPage from './pages/AdminPage';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>

        {/* Small Invite (2 guests) */}
        <Route path="/invite" element={<InvitePage type="small" />} />

        {/* Family Invite (6 guests) */}
        <Route path="/invites" element={<InvitePage type="family" />} />

        {/* Admin */}
        <Route path="/admin" element={<AdminPage />} />

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/invite" replace />} />

      </Routes>
    </BrowserRouter>
  );
};

export default App;
