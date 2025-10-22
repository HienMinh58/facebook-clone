import React, { useState } from 'react'
import { AppBar, Toolbar, Typography, IconButton, Badge, Avatar, InputBase, Box, Button, Menu, MenuItem} from "@mui/material"
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
import { Link, useNavigate } from 'react-router-dom';
import api from '../api/api';
import { useUserStore } from '../store/user';


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
  const { currentUser, logoutUser } = useUserStore();
  const navigate = useNavigate();
  const isAuthenticated = !!currentUser;
  const [anchorEl, setAnchorEl] = useState(null); // Trạng thái cho menu
  const open = Boolean(anchorEl);

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget); // Mở menu tại vị trí nhấp
  };

  const handleMenuClose = () => {
    setAnchorEl(null); // Đóng menu
  };

  const handleLogout = () => {
    logoutUser(); // Gọi hàm đăng xuất từ store
    handleMenuClose(); // Đóng menu sau khi đăng xuất
    navigate('/');
  };
  return (
    <AppBar position="fixed" color="default" elevation={1}>
      <Toolbar sx={{ justifyContent: 'space-between', height: '60px' }}>
        {/* Bên trái: Logo + Thanh tìm kiếm */}
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <IconButton edge="start" color="inherit" aria-label="logo">
            <FontAwesomeIcon icon={faFacebook} style={{ color: '#1877f2', fontSize: '40px' }} />
          </IconButton>
          {isAuthenticated && (
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
          )}
        </Box>

        {isAuthenticated && (
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <IconButton>
              <FontAwesomeIcon icon={faHouse} />
            </IconButton>
            <IconButton>
              <VideoLibraryIcon />
            </IconButton>
            <IconButton>
              <StoreIcon />
            </IconButton>
            <IconButton>
              <GroupIcon />
            </IconButton>
          </Box>
        )}

        {/* Bên phải: Icon */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          {isAuthenticated ? (
            <>
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
              <IconButton color="inherit" onClick={handleMenuClick}>
                <MenuIcon />
              </IconButton>
              {/* Menu dropdown */}
              <Menu
                anchorEl={anchorEl}
                open={open}
                onClose={handleMenuClose}
                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                transformOrigin={{ vertical: 'top', horizontal: 'right' }}
              >
                <MenuItem component={Link} to="/profile" onClick={handleMenuClose}>
                  Trang cá nhân
                </MenuItem>
                <MenuItem component={Link} to="/settings" onClick={handleMenuClose}>
                  Cài đặt
                </MenuItem>
                <MenuItem onClick={handleLogout}>
                  Đăng xuất
                </MenuItem>
                {/* Thêm các tùy chọn khác nếu cần, ví dụ: Help, Feedback */}
              </Menu>
            </>
          ) : (
            <>
              <Button component={Link} to="/login" color="inherit">
                Đăng nhập
              </Button>
              <Button component={Link} to="/register" variant="contained" color="primary">
                Đăng ký
              </Button>
            </>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
}


export default Navbar;