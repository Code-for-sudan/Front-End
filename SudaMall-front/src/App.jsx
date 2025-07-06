import React from 'react'

import './index.css'
import {BrowserRouter as Router} from 'react-router-dom';
import PublicRoutes from './routes/PublicRoutes';


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
