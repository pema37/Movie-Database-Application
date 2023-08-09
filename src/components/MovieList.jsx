import React, { useEffect, useState } from "react";
import { Box, CircularProgress, Grid, MenuItem, Select, Typography } from '@mui/material';
import RequestApi, { movieType } from '../api/RequestApi';
import MovieElement from './MovieElement';


const MovieList = () => {
  const [popularMovies, setPopularMovies] = useState([]);
  const [topRatedMovies, setTopRatedMovies] = useState([]);
  const [nowPlayingMovies, setNowPlayingMovies] = useState([]);
  const [upcomingMovies, setUpcomingMovies] = useState([]);
  const [selectedType, setSelectedType] = useState(movieType.popular);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMovies = async () => {
      setLoading(true);
      setError(null);
      try {
        const moviesData = await RequestApi(selectedType);
        switch (selectedType) {
          case movieType.popular:
            setPopularMovies(moviesData.results);
            break;
          case movieType.topRated:
            setTopRatedMovies(moviesData.results);
            break;
          case movieType.nowPlaying:
            setNowPlayingMovies(moviesData.results);
            break;
          case movieType.upcoming:
            setUpcomingMovies(moviesData.results);
            break;
          default:
            break;
        }
        setLoading(false);
      } catch (error) {
        setLoading(false);
        setError(error.message);
      }
    };

    fetchMovies();
  }, [selectedType]);

  const handleTypeChange = (event) => {
    setSelectedType(event.target.value);
  };

  const movieLists = {
    [movieType.popular]: popularMovies,
    [movieType.topRated]: topRatedMovies,
    [movieType.nowPlaying]: nowPlayingMovies,
    [movieType.upcoming]: upcomingMovies,
  };

  return (
    <Box sx={{ padding: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 2 }}>
        <Typography variant="h3" sx={{ textTransform: 'uppercase' }}>
          {selectedType.replace(/-/g, ' ').toUpperCase()} MOVIES
        </Typography>
        <Select value={selectedType} onChange={handleTypeChange} sx={{ width: '150px' }}>
          <MenuItem value={movieType.popular}>Popular</MenuItem>
          <MenuItem value={movieType.topRated}>Top Rated</MenuItem>
          <MenuItem value={movieType.nowPlaying}>Now Playing</MenuItem>
          <MenuItem value={movieType.upcoming}>Upcoming</MenuItem>
        </Select>
      </Box>
      {loading && <CircularProgress sx={{ margin: '0 auto' }} />}
      {error && <Typography variant="h6" color="error">{error}</Typography>}
      {!loading && !error && (
        <Grid container spacing={3}>
          {movieLists[selectedType].map((movie) => (
            <Grid item xs={12} sm={6} md={4} key={movie.id}>
              <MovieElement
                title={movie.title}
                poster_path={movie.poster_path}
                overview={movie.overview}
                release_date={movie.release_date}
                rating={movie.vote_average * 10} // rating is out of 10, multiply by 10 to get percentage
                newRelease={selectedType === movieType.nowPlaying}
                comingSoon={selectedType === movieType.upcoming}
                id={movie.id}
              />
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
};
              
export default MovieList;







