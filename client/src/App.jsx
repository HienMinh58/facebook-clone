import React from 'react';
import { Route, Routes } from "react-router-dom";
import { Box } from '@mui/material';
import HomePage from './pages/HomePage';
import Authentication from './pages/Authentication';
import Register from './pages/Register';
import Navbar from "./components/Navbar";
import Profile from './pages/Profile';
function App() {
  return (
    <Box>
      <Navbar />
      <Routes>
        <Route path='/dashboard' element={<HomePage/>} />
        <Route path='/login' element={<Authentication/>} />
        <Route path="/register" element={<Register/>} />
        <Route path="/profile" element={<Profile/>} />
      </Routes>
    </Box>
  );
}

export default App
