import React from 'react'
import { Box, Typography } from '@mui/material'
import LeftSidebar from '../components/Leftsidebar'
import RightSidebar from '../components/RightSidebar'
import MainContent from '../components/MainContent'
import { useUserStore } from '../store/user'

const HomePage = () => {
  const { currentUser, hasPermission } = useUserStore();

  return (
    <Box>
      {currentUser ? (
        <Box sx={{ display: 'flex', mt: '64px' }}>
          <LeftSidebar />
          <Box sx={{ flex: 1, maxWidth: '800px', mx: 'auto' }}>
            <MainContent hasPermission={hasPermission} />
          </Box>
          <RightSidebar />
        </Box>
      ) : (
        <Box sx={{ display: 'flex', mt: '64px', height: 'calc(100vh - 64px)', alignItems: 'center', justifyContent: 'center' }}>
          <Typography variant="h6" align="center">
            Vui lòng đăng nhập để xem nội dung
          </Typography>
        </Box>
      )}
    </Box>
  )
}

export default HomePage