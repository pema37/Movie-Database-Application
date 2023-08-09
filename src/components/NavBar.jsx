// import React, { useState } from 'react';
// import { NavLink } from 'react-router-dom';
// import { IconButton, Box, Menu, MenuItem, useMediaQuery, useTheme } from '@mui/material';
// import MenuIcon from '@mui/icons-material/Menu';

// const NavBar = () => {
//   const [anchorEl, setAnchorEl] = useState(null);
//   const theme = useTheme();
//   const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

//   function handleMenu(e) {
//     setAnchorEl(e.currentTarget);
//   }

//   function handleClose() {
//     setAnchorEl(null);
//   }

//   function blur(e) {
//     e.target.blur();
//   }

//   return (
//     isMobile ? (
//       <>
//         <IconButton edge="start" color="primary" aria-label="menu" onClick={handleMenu}>
//           <MenuIcon sx={{ color: 'white' }} />
//         </IconButton>
//         <Menu
//           anchorEl={anchorEl}
//           open={Boolean(anchorEl)}
//           onClose={handleClose}
//           PaperProps={{ sx: { backgroundColor: 'primary.main' } }}
//         >
//           <MenuItem onClick={handleClose} sx={{ color: 'white' }}>
//             <NavLink to="/" style={{ textDecoration: 'none', color: 'inherit' }} onClick={blur}>Home Page</NavLink>
//           </MenuItem>
//           <MenuItem onClick={handleClose} sx={{ color: 'white' }}>
//             <NavLink to="/about-page" style={{ textDecoration: 'none', color: 'inherit' }} onClick={blur}>About the app Page</NavLink>
//           </MenuItem>
//           <MenuItem onClick={handleClose} sx={{ color: 'white' }}>
//             <NavLink to="/my-favourites-page" style={{ textDecoration: 'none', color: 'inherit' }} onClick={blur}>My Favourites Page</NavLink>
//           </MenuItem>
//         </Menu>
//       </>
//       ) : (
//       <Box sx={{ display: 'flex', justifyContent: 'space-between', flexGrow: 1 }}>
//         <NavLink to="/" style={{ margin: '0 1rem', textDecoration: 'none', color: 'white', fontWeight: 'bold' }} onClick={blur}>Home Page</NavLink>
//         <NavLink to="/about-page" style={{ margin: '0 1rem', textDecoration: 'none', color: 'white', fontWeight: 'bold' }} onClick={blur}>About the app Page</NavLink>
//         <NavLink to="/my-favourites-page" style={{ margin: '0 1rem', textDecoration: 'none', color: 'white', fontWeight: 'bold' }} onClick={blur}>My Favourites Page</NavLink>
//       </Box>
//     )
//   );
// };

// export default NavBar;



import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { IconButton, Box, Menu, MenuItem, useMediaQuery, useTheme, InputBase } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';

const NavBar = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  function handleMenu(e) {
    setAnchorEl(e.currentTarget);
  }

  function handleClose() {
    setAnchorEl(null);
  }

  function blur(e) {
    e.target.blur();
  }

  return (
    isMobile ? (
      <>
        <IconButton edge="start" color="primary" aria-label="menu" onClick={handleMenu}>
          <MenuIcon sx={{ color: 'white' }} />
        </IconButton>
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleClose}
          PaperProps={{ sx: { backgroundColor: 'primary.main' } }}
        >
          <MenuItem onClick={handleClose} sx={{ color: 'white' }}>
            <NavLink to="/" style={{ textDecoration: 'none', color: 'inherit' }} onClick={blur}>Home Page</NavLink>
          </MenuItem>
          <MenuItem onClick={handleClose} sx={{ color: 'white' }}>
            <NavLink to="/about-page" style={{ textDecoration: 'none', color: 'inherit' }} onClick={blur}>About the app Page</NavLink>
          </MenuItem>
          <MenuItem onClick={handleClose} sx={{ color: 'white' }}>
            <NavLink to="/my-favourites-page" style={{ textDecoration: 'none', color: 'inherit' }} onClick={blur}>My Favourites Page</NavLink>
          </MenuItem>
        </Menu>
      </>
    ) : (
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexGrow: 1 }}>
        <NavLink to="/" style={{ margin: '0 1rem', textDecoration: 'none', color: 'white', fontWeight: 'bold' }} onClick={blur}>Home Page</NavLink>
        <NavLink to="/about-page" style={{ margin: '0 1rem', textDecoration: 'none', color: 'white', fontWeight: 'bold' }} onClick={blur}>About the app Page</NavLink>
        <NavLink to="/my-favourites-page" style={{ margin: '0 1rem', textDecoration: 'none', color: 'white', fontWeight: 'bold' }} onClick={blur}>My Favourites Page</NavLink>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <SearchIcon />
          <InputBase placeholder="Search…" inputProps={{ 'aria-label': 'search' }} />
        </Box>
      </Box>
    )
  );
};

export default NavBar;
