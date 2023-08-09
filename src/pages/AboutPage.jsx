import React from 'react';
import { Box, Typography } from '@mui/material';
import tmdbLogo from '../assets/primaryfullblue.svg';
import Header from '../components/Header';
import Footer from '../components/Footer';


const styles = {
  root: {
    display: 'flex',
    minHeight: '100vh',
    flexDirection: 'column'
  },
  content: {
    flex: '1 0 auto'
  }
};

const AboutPage = () => {
  return (
    <Box sx={styles.root}>
      <Header />
      <Box sx={styles.content}>
        <Box sx={{ padding: 3 }}>
          <Typography variant="h4" gutterBottom>
            About This App
          </Typography>
          <Typography variant="body1" gutterBottom>
            This app allows you to browse popular movies, top-rated movies, and upcoming movies. You can also search for movies and view detailed information about each movie.
          </Typography>
          <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: 3 }}>
            <a href="https://www.themoviedb.org/about/logos-attribution">
              <img
                src={tmdbLogo}
                alt="TMDb Logo"
                style={{ minWidth: '200px' }}
              />
            </a>
          </Box>
          <Typography variant="body1">
            This product uses the TMDb API but is not endorsed or certified by TMDb.
          </Typography>
        </Box>
      </Box>
      <Footer />
    </Box>
  );
};

export default AboutPage;

