import React from 'react'
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import './index.css'
import {BrowserRouter as Router, Routes} from 'react-router-dom';
import MainRoutes from './routes/MainRoutes';

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <MainRoutes />
      </Router>
    </QueryClientProvider>
  )
}

export default App
