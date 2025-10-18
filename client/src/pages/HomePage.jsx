import React from 'react'
import { Box } from '@mui/material'
import LeftSidebar from '../components/Leftsidebar'
import RightSidebar from '../components/RightSidebar'
import MainContent from '../components/MainContent'
const HomePage = () => {
  return (
    <div>
      <Box sx={{ display: 'flex', mt: '64px' }}>
        <LeftSidebar />
        <Box sx={{ flex: 1, maxWidth: '800px', mx: 'auto' }}>
          <MainContent />
        </Box>
        <RightSidebar />
      </Box>
    </div>
  )
}

export default HomePage
