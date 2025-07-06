import React, { useEffect } from 'react';
import './index.css';
import MainRoutes from './routes/MainRoutes';
import { useNavigate } from 'react-router-dom';
import { setNavigate } from '../src/hooks/navigateService';

const App = () => {
  const navigate = useNavigate();

  useEffect(() => {
    setNavigate(navigate);
  }, [navigate]);

  return <MainRoutes />;
};

export default App;
// This file serves as the main entry point for the React application.
// It initializes the application, sets up navigation, and renders the main routes. 