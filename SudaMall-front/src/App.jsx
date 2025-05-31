import React from 'react'
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import './index.css'
import {BrowserRouter as Router} from 'react-router-dom';
import PublicRoutes from './routes/PublicRoutes';

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <PublicRoutes />
      </Router>
    </QueryClientProvider>
  )
}

export default App
