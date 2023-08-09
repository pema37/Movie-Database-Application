import React from 'react';
import { Link } from 'react-router-dom';
import { Box, AppBar, Toolbar, Typography } from '@mui/material';
import logo from '../assets/vite.svg';
import NavBar from './NavBar';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

const Header = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <AppBar position="static" color="primary">
      <Toolbar>
        <Box sx={{ flexGrow: 1 }}>
          <Link to="/" style={{ textDecoration: 'none' }}>
            <img src={logo} alt="app logo" style={{ height: isMobile ? '40px' : '50px', marginRight: '10px' }} />
            <Typography variant="h6" component="span" sx={{ color: 'white' }}>
              Movie App
            </Typography>
          </Link>
        </Box>
        <NavBar />
      </Toolbar>
    </AppBar>
  );
};

export default Header;
