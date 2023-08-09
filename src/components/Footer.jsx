import React from "react";
import { Box, Container, Typography } from '@mui/material';

const Footer = () => {
  return (
    <Box sx={{ bgcolor: '#222', color: '#fff', py: 3 }}>
      <Container maxWidth="lg">
        <Typography variant="body1" align="center">
          © 2023 Movie App
        </Typography>
      </Container>
    </Box>
  );
};

export default Footer;

