import { Box } from '@mui/material'
import React from 'react'
import { usePostStore } from '../store/post'

const PostCard = ({post}) => {
  const { fetchPosts } = usePostStore();
  return (
    <Box sx={{ mt: 2 }}>
        
    </Box>
  )
}

export default PostCard
