import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
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
              <Link to={`/movie/${movie.id}`}>
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
              </Link>
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
};
              
export default MovieList;













<!-- 1 -->

import { styled } from "@mui/material/styles";
import { PlayArrow, Favorite } from "@mui/icons-material";
import { Box, Button, Grid, Typography } from "@mui/material";
import { useEffect, useState } from "react";

const MovieElementContainer = styled(Grid)({
  padding: "1rem",
  borderRadius: 4,
  boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
  transition: "transform 0.2s",
  "&:hover": {
    transform: "translateY(-2px)",
    boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)",
  },
});

const PosterImage = styled("img")({
  width: "100%",
  borderRadius: 4,
});

const Title = styled(Typography)({
  fontSize: "1.25rem",
  fontWeight: "bold",
});

const Subtitle = styled(Typography)({
  fontSize: "1rem",
});

const FavouriteButton = styled(Button)({
  backgroundColor: "#f44336",
  color: "#fff",
  borderRadius: 2,
  textTransform: "capitalize",
  "&:hover": {
    backgroundColor: "#d32f2f",
  },
});

const MoreInfoButton = styled(Button)({
  backgroundColor: "#3f51b5",
  color: "#fff",
  borderRadius: 2,
  textTransform: "capitalize",
  "&:hover": {
    backgroundColor: "#303f9f",
  },
});

function MovieElement({ title, poster_path, overview, release_date, rating, id }) {
  const [isFavourite, setIsFavourite] = useState(false);
  const [favMovies, setFavMovies] = useState([]);

  const imageUrl = poster_path ? `https://image.tmdb.org/t/p/w500/${poster_path}` : "https://via.placeholder.com/500x750";
  const releaseYear = release_date ? new Date(release_date).getFullYear() : "";
  const displayRating = rating ? `${rating}%` : "";

  useEffect(() => {
    const favMoviesFromStorage = localStorage.getItem("favMovies");

    if (favMoviesFromStorage) {
      const parseFavouriteMovies = JSON.parse(favMoviesFromStorage);
      setFavMovies(parseFavouriteMovies);

      const movieIsFavorited = parseFavouriteMovies.find((favoriteId) => favoriteId == id);
      if (movieIsFavorited !== undefined) {
        setIsFavourite(true);
      }
    }
  }, []);

  const handleFavourite = () => {
    setIsFavourite(!isFavourite);

    let updatedFavMovies;
    if (!isFavourite) {
      updatedFavMovies = [...favMovies, id];
      setFavMovies([...favMovies, id]);
    } else {
      updatedFavMovies = favMovies.filter((movieId) => movieId !== id);
      setFavMovies(updatedFavMovies);
    }
    localStorage.setItem("favMovies", JSON.stringify(updatedFavMovies));
  };

  return (
    <MovieElementContainer container spacing={2}>
      <Grid item xs={12} sm={4}>
        <PosterImage src={imageUrl} alt={`${title} poster`} />
      </Grid>
      <Grid item xs={12} sm={8}>
        <Title variant="h6">{title}</Title>
        <Subtitle variant="subtitle1">
          {releaseYear} | {displayRating}
        </Subtitle>
        <Typography variant="body2">{overview}</Typography>
        <Box sx={{ display: "flex", alignItems: "center", mt: 1 }}>
          <FavouriteButton variant="contained" onClick={handleFavourite}>
            {isFavourite ? "Remove from Favourites" : "Add to Favourites"}
            <Box sx={{ ml: 1 }}>
              <Favorite />
            </Box>
          </FavouriteButton>
          <Box sx={{ ml: 1 }}>
            <MoreInfoButton variant="contained">
              More Info
              <Box sx={{ ml: 1 }}>
                <PlayArrow />
              </Box>
            </MoreInfoButton>
          </Box>
        </Box>
      </Grid>
    </MovieElementContainer>
  );
}

export default MovieElement;
