import React from 'react'

import './index.css'
import {BrowserRouter as Router} from 'react-router-dom';
import PublicRoutes from './routes/PublicRoutes';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { setNavigate } from '../src/hooks/navigateService';


const App = () => {
    const navigate = useNavigate();
      useEffect(() => {
    setNavigate(navigate);
  }, [navigate]);
  return (
  
        <PublicRoutes />

  )
}

export default App
