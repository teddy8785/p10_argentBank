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
          <Route path="/" element={<Navigate to="/index" />} />
          <Route path="/index" element={<Index />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/user" element={<ProtectedRoute><User /></ProtectedRoute>} />
        </Routes>
      </Router>
    </Provider>
  </React.StrictMode>
);