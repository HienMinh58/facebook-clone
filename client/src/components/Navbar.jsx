import React from 'react'
import { AppBar, Toolbar, Typography, IconButton, Badge, Avatar, InputBase, Box} from "@mui/material"
import { styled } from '@mui/material/styles';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse } from '@fortawesome/free-solid-svg-icons';
import { faFacebook } from '@fortawesome/free-brands-svg-icons';
import SearchIcon from "@mui/icons-material/Search"
import HomeIcon from '@mui/icons-material/Home';
import PeopleIcon from '@mui/icons-material/People';
import NotificationsIcon from '@mui/icons-material/Notifications';
import MessageIcon from '@mui/icons-material/Message';
import MenuIcon from '@mui/icons-material/Menu';
import VideoLibraryIcon from '@mui/icons-material/VideoLibrary'; // Icon cho watch
import StoreIcon from '@mui/icons-material/Store'; // Icon cho marketplace
import GroupIcon from '@mui/icons-material/Group'; // Icon cho friends
import WidgetsIcon from '@mui/icons-material/Widgets';
import { Link } from 'react-router-dom';

const Search = styled('div')(({theme}) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: theme.palette.gray,
    width: '100%',
    marginLeft: 0,
    [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}));

function Navbar() {
  return (
    <AppBar position="fixed" color="default" elevation={1}>
      <Toolbar sx={{ justifyContent: 'space-between', height: '60px' }}>
        {/* Bên trái: Logo + Thanh tìm kiếm */}
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <IconButton edge="start" color="inherit" aria-label="logo">
            <FontAwesomeIcon icon={faFacebook} style={{ color: '#1877f2', fontSize: '40px' }} />
          </IconButton>

          <Box sx={{ ml: 2 }}>
            <Search>
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase
                placeholder="Tìm kiếm trên Facebook"
                inputProps={{ 'aria-label': 'search' }}
              />
            </Search>
          </Box>
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <IconButton >
            <FontAwesomeIcon icon={faHouse} />
          </IconButton>
          <IconButton>
            <VideoLibraryIcon />
          </IconButton>
          <IconButton >
            <StoreIcon />
          </IconButton>
          <IconButton >
            <GroupIcon />
          </IconButton>
        </Box>

        {/* Bên phải: Icon */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <IconButton color="inherit">
            <WidgetsIcon />
          </IconButton>
          <IconButton color="inherit">
            <Badge badgeContent={4} color="error">
              <NotificationsIcon />
            </Badge>
          </IconButton>
          <IconButton color="inherit">
            <MessageIcon />
          </IconButton>
          <IconButton color="inherit">
            <Avatar alt="Profile" src="/path-to-your-profile-pic.jpg" />
          </IconButton>
          <IconButton color="inherit">
            <MenuIcon />
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
}


export default Navbar;