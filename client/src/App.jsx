import React from 'react';
import { Route, Routes } from "react-router-dom";
import { Box } from '@mui/material';
import HomePage from './pages/HomePage';
import Navbar from "./components/Navbar";
function App() {
  return (
    <Box>
      <Navbar />
      <Routes>
        <Route path='/' element={<HomePage/>} />
      </Routes>
    </Box>
  );
}

export default App
