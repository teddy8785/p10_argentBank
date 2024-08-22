import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './styles/index.css';
import Index from './pages/Index';
import SignIn from './pages/SignIn';
import User from './pages/User';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/Index" />} />
        <Route path="/Index" element={<Index />} />
        <Route path="/SignIn" element={<SignIn />} />
        <Route path="/User" element={<User />} />
      </Routes>
    </Router>
  </React.StrictMode>
);