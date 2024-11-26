import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';

import { useStateContext } from './contexts/ContextProvider';
import Dashboard from './pages/Dashboard';
import AuthLogin from './pages/AuthLogin';
import Structure from './components/New/Structure';
import Accounts from './pages/Accounts';
import ErrorNotFound from './pages/ErrorNotFound';
import Analytics from './pages/Analytics';
import ContentModeration from './pages/ContentModeration';
import ReportsFeedback from './pages/ReportsFeedback';
import Account from './pages/Account';
import Financials from './pages/Financials';
import PrivateRoute from './hooks/PrivateRoute';
import AccountSubscription from './pages/AccountSubscription';
import AuthSignup from './pages/AuthSignup';

const App = () => {
  const {
    setCurrentColor,
    setCurrentMode,
    currentMode,
  } = useStateContext();

  useEffect(() => {
    const currentThemeColor = localStorage.getItem('colorMode');
    const currentThemeMode = localStorage.getItem('themeMode');
    if (currentThemeColor && currentThemeMode) {
      setCurrentColor(currentThemeColor);
      setCurrentMode(currentThemeMode);
    }
  }, []);

  return (
    <div className={currentMode === 'Dark' ? 'dark' : ''}>
      <BrowserRouter>
        <Routes>

          <Route path="/login" element={(<AuthLogin />)} />
          <Route path="/signup/:userID" element={(<AuthSignup />)} />
          <Route path="/" element={(<Structure><PrivateRoute><Dashboard /></PrivateRoute></Structure>)} />
          <Route path="/analytics" element={(<Structure><PrivateRoute><Analytics /></PrivateRoute></Structure>)} />
          <Route path="/accounts" element={(<Structure><PrivateRoute><Accounts /></PrivateRoute></Structure>)} />
          <Route path="/accounts/:userID" element={(<Structure><PrivateRoute><Account /></PrivateRoute></Structure>)} />
          <Route path="/accounts/:userID/subscription" element={(<Structure><PrivateRoute><AccountSubscription /></PrivateRoute></Structure>)} />
          <Route path="/content-moderation" element={(<Structure><PrivateRoute><ContentModeration /></PrivateRoute></Structure>)} />
          <Route path="/reports-and-feedback" element={(<Structure><PrivateRoute><ReportsFeedback /></PrivateRoute></Structure>)} />
          <Route path="/financials" element={(<Structure><PrivateRoute><Financials /></PrivateRoute></Structure>)} />
          <Route path="*" element={(<ErrorNotFound />)} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
