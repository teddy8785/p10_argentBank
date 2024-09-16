import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './styles/index.css';
import Index from './pages/Index';
import SignIn from './pages/SignIn';
import User from './pages/User';
import ProtectedRoute from './components/ProtectedRoute'; 

// Redux
import { Provider } from "react-redux";
import store from './Store';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/" element={<Navigate to="/Index" />} />
          <Route path="/Index" element={<Index />} />
          <Route path="/SignIn" element={<SignIn />} />
          <Route path="/User" element={<ProtectedRoute><User /></ProtectedRoute>} />
        </Routes>
      </Router>
    </Provider>
  </React.StrictMode>
);