// filepath: /home/peter_s/CS3450Project/ems-frontend/ems-frontend/src/App.tsx
import * as React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Dashboard from './dashboard/Dashboard';
import Devices from './dashboard/components/Devices';
import Settings from './dashboard/components/Settings';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/devices" element={<Devices />} />
        <Route path="/settings" element={<Settings />} />
      </Routes>
    </Router>
  );
}