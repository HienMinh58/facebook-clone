import React from "react";
import { Box, List, ListItem, ListItemIcon, ListItemText, Avatar } from "@mui/material"
import HomeIcon from '@mui/icons-material/Home';
import OndemandVideoIcon from '@mui/icons-material/OndemandVideo';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import GroupIcon from '@mui/icons-material/Group';
function LeftSidebar() {
    return (
        <Box sx={{ width: 500, p: 2, position: 'fixed', top: '64px', left: 0}}>
            <List>
                <ListItem button sx={{ cursor: 'pointer' }}>
                    <ListItemIcon sx={{cursor: 'pointer'}}><Avatar alt="Profile" src="/path-to-your-profile-pic.jpg" /></ListItemIcon>
                    <ListItemText primary="Hiền Minh" /> 
                </ListItem>
                <ListItem button sx={{ cursor: 'pointer' }}>
                    <ListItemIcon sx={{ cursor: 'pointer' }}><OndemandVideoIcon sx={{color: '#0575E6', fontSize: '36px' }} /></ListItemIcon>
                    <ListItemText primary="Watch" />
                </ListItem>
                <ListItem button sx={{ cursor: 'pointer' }}>
                    <ListItemIcon sx={{ cursor: 'pointer' }}><BookmarkIcon sx={{ color: '#302b63', fontSize: '36px' }} /></ListItemIcon>
                    <ListItemText primary="Saved" />
                </ListItem>
                <ListItem button sx={{ cursor: 'pointer' }}>
                    <ListItemIcon sx={{ cursor: 'pointer' }}><GroupIcon sx={{ color: '#0575E6', fontSize: '36px'}} /></ListItemIcon>
                    <ListItemText primary="Friends" />
                </ListItem>
                <ListItem></ListItem>
                <ListItem></ListItem>
            </List>
        </Box>
    );
}

export default LeftSidebar