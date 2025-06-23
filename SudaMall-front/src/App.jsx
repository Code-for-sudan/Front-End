import React from 'react'
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import './index.css'
import {BrowserRouter as Router} from 'react-router-dom';
import PublicRoutes from './routes/PublicRoutes';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { setNavigate } from './hooks/navigateService';
const queryClient = new QueryClient();

const App = () => {
    const navigate = useNavigate();
      useEffect(() => {
    setNavigate(navigate);
  }, [navigate]);
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <PublicRoutes />
      </Router>
    </QueryClientProvider>
  )
}

export default App
