import React, { Suspense, lazy, useEffect, useRef } from 'react';
import { Route, Routes, useLocation } from "react-router-dom";
import { Box } from '@mui/material';
import Navbar from "./components/Navbar";
import Loading from './components/Loading';
import { LoadingProvider, useLoading } from './contexts/LoadingContext';

// Lazy load các page
const HomePage = lazy(() => import('./pages/HomePage'));
const Authentication = lazy(() => import('./pages/Authentication'));
const Register = lazy(() => import('./pages/Register'));
const Profile = lazy(() => import('./pages/Profile'));

function AppContent() {
  const location = useLocation();
  const { isLoading, setIsLoading } = useLoading();
  const prevLocation = useRef(location.pathname);

  // Hiệu ứng loading khi mount (bao gồm refresh trang)


  // Hiệu ứng loading khi chuyển route
  useEffect(() => {
    if (location.pathname !== prevLocation.current) {
      setIsLoading(true);
      const timer = setTimeout(() => {
        setIsLoading(false);
      }, 1000);

      prevLocation.current = location.pathname;

      return () => clearTimeout(timer);
    }
  }, [location.pathname, setIsLoading]);

  return (
    <Box>
      <Navbar />
      {isLoading ? (
        <Loading />
      ) : (
        <Suspense fallback={<Loading />}>
          <Routes>
            <Route path='/dashboard' element={<HomePage />} />
            <Route path='/login' element={<Authentication />} />
            <Route path="/register" element={<Register />} />
            <Route path="/profile" element={<Profile />} />
          </Routes>
        </Suspense>
      )}
    </Box>
  );
}

function App() {
  return (
    <LoadingProvider>
      <AppContent />
    </LoadingProvider>
  );
}

export default App;