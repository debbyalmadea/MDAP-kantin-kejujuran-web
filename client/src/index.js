import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { AuthContextProvider } from './contexts/AuthContext';
import { BalanceContextProvider } from './contexts/BalanceContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <AuthContextProvider>
      <BalanceContextProvider>
        <App />
      </BalanceContextProvider>
    </AuthContextProvider>
  </BrowserRouter>
);