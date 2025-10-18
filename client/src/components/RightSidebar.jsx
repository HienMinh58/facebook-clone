import React from 'react';
import { Box, List, ListItem, ListItemIcon, ListItemText, Typography, IconButton, Avatar } from '@mui/material';
import ContactsIcon from '@mui/icons-material/Contacts';
import AdIcon from '@mui/icons-material/Star';
import SearchIcon from '@mui/icons-material/Search';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import users from '../data/user.json';
const RightSidebar = () => {
  return (
    <Box sx={{ width: 400, p: 2, position: 'fixed', top: '100px', right: 0}}>
        <Box sx={{width: 300, display: 'flex', alignItems: 'center', borderRadius: 1, p: 2, mb: 2 }}>
            <Typography variant="body1" sx={{ flex: 1 }}>Contacts</Typography>
            <Box sx={{ display: 'flex', gap: 0.5 }}>
                <IconButton size="small"><SearchIcon /></IconButton>
                <IconButton size="small"><MoreHorizIcon /></IconButton>
            </Box>
        </Box>
        <List>
            {users.map((user, index) => (
            <ListItem button key={index}>
                <ListItemIcon>
                <Avatar src={user.pfp} />
                </ListItemIcon>
                <ListItemText primary={user.user_name} />
            </ListItem>
            ))}
        </List>
    </Box>
  )
}

export default RightSidebar
