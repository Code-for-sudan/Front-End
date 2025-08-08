import React, { useEffect } from 'react';
import './index.css';
import MainRoutes from './routes/MainRoutes';
import { useNavigate } from 'react-router-dom';
import { setNavigate } from '../src/hooks/navigateService';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  const navigate = useNavigate();

  useEffect(() => {
    setNavigate(navigate);
  }, [navigate]);

  return <>
  <MainRoutes />
  
    <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={true}
        newestOnTop={true}
        closeButton={false}
        closeOnClick
        rtl
        pauseOnFocusLoss
        draggable
        pauseOnHover
        className={"p-5"}
      />
  </>;
};

export default App;
// This file serves as the main entry point for the React application.
// It initializes the application, sets up navigation, and renders the main routes. 