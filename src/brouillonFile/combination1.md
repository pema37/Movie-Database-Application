// not bad
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Box,
  CircularProgress,
  Grid,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import RequestApi, { movieType } from "../api/RequestApi";
import MovieElement from "./MovieElement";
import { styled as muiStyled } from "@mui/material/styles";

const MovieListContainer = muiStyled(Box)({
  padding: 3,
});

const HeaderContainer = muiStyled(Box)({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: "2rem",
});

const MovieTypeTitle = muiStyled(Typography)({
  textTransform: "uppercase",
});

const SelectContainer = muiStyled(Box)({
  width: "150px",
});

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
    <MovieListContainer>
      <HeaderContainer>
        <MovieTypeTitle variant="h3">
          {selectedType.replace(/-/g, " ").toUpperCase()} MOVIES
        </MovieTypeTitle>
        <SelectContainer>
          <Select value={selectedType} onChange={handleTypeChange} fullWidth>
            <MenuItem value={movieType.popular}>Popular</MenuItem>
            <MenuItem value={movieType.topRated}>Top Rated</MenuItem>
            <MenuItem value={movieType.nowPlaying}>Now Playing</MenuItem>
            <MenuItem value={movieType.upcoming}>Upcoming</MenuItem>
          </Select>
        </SelectContainer>
      </HeaderContainer>
      {loading && (
        <Box display="flex" justifyContent="center" mt={5}>
          <CircularProgress />
        </Box>
      )}
      {error && (
        <Typography variant="h6" color="error">
          {error}
        </Typography>
      )}

      {!loading && !error && (
        movieLists[selectedType].map((movie) => (
          <Grid item xs={12} sm={6} md={4} key={movie.id}>
            <Link to={`/movie/${movie.id}`}>
              <MovieElement
                title={movie.title}
                poster_path={movie.poster_path}
                overview={movie.overview}
                release_date={movie.release_date}
                rating={movie.vote_average * 10}
                id={movie.id}
              />
            </Link>
          </Grid>
        ))
      )}

    </MovieListContainer>
  );
};

export default MovieList;














// not bad
// import { styled } from "@mui/material/styles";
// import { PlayArrow, Favorite } from "@mui/icons-material";
// import { Box, Button, Grid, Typography } from "@mui/material";
// import { useEffect, useState } from "react";

// const StyledMovieElement = styled(Box)({
//   p: 2,
//   border: "1px solid #ccc",
//   borderRadius: 4,
//   transition: "transform 0.2s",
//   "&:hover": {
//     transform: "translateY(-2px)",
//     boxShadow: "0px 4px 8px rgba(38, 38, 38, 0.2)",
//   },
// });

// const StyledFavoriteButton = styled(Button)({
//   mr: 2,
//   backgroundColor: "#F44336",
//   color: "#fff",
//   "&:hover": {
//     backgroundColor: "#D32F2F",
//   },
// });

// const StyledMoreInfoButton = styled(Button)({
//   backgroundColor: "#3F51B5",
//   color: "#fff",
//   "&:hover": {
//     backgroundColor: "#303F9F",
//   },
// });

// const PosterImage = styled('img')({
//   width: 150,
//   marginRight: '2rem',
//   borderRadius: 4,
// });


// function MovieElement({ title, poster_path, overview, release_date, rating, id }) {
//   const [isFavourite, setIsFavourite] = useState(false);
//   const [favMovies, setFavMovies] = useState([]);

//   const imageUrl = poster_path ? `https://image.tmdb.org/t/p/w500/${poster_path}` : 'https://via.placeholder.com/500x750';
//   const releaseYear = release_date ? new Date(release_date).getFullYear() : '';
//   const displayRating = rating ? `${rating}%` : '';

//   useEffect(() => {
//     const favMoviesFromStorage = localStorage.getItem("favMovies");

//     if (favMoviesFromStorage) {
//       const parseFavouriteMovies = JSON.parse(favMoviesFromStorage);
//       setFavMovies(parseFavouriteMovies);

//       const movieIsFavorited = parseFavouriteMovies.find(favoriteId => favoriteId == id)
//       if (movieIsFavorited !== undefined) {
//         setIsFavourite(true);
//       }
//     }
//   }, []);

//   const handleFavourite = () => {
//     setIsFavourite(!isFavourite);

//     let updatedFavMovies;
//     if (!isFavourite) {
//       updatedFavMovies = [...favMovies, id]
//       setFavMovies([...favMovies, id]);
//     } else {
//       updatedFavMovies = favMovies.filter(movieId => movieId !== id);
//       setFavMovies(updatedFavMovies);
//     }
//     localStorage.setItem("favMovies", JSON.stringify(updatedFavMovies));
//   };

//   return (
//     <StyledMovieElement sx={{ p: 2 }}>
//       <Grid container spacing={2} sx={{ alignItems: "center" }}>
//         <Grid item xs={12} md={3}>
//           <PosterImage src={imageUrl} alt={`${title} poster`} />
//         </Grid>
//         <Grid item xs={12} md={9}>
//           <Typography variant="h5" sx={{ mb: 1 }}>
//             {title}
//           </Typography>
//           <Typography variant="body1" sx={{ mb: 1 }}>
//             {releaseYear} | {displayRating}
//           </Typography>
//           <StyledFavoriteButton
//             variant={isFavourite ? "contained" : "outlined"}
//             onClick={handleFavourite}
//             startIcon={<Favorite />}
//           >
//             {isFavourite ? "Unfavorite" : "Favorite"}
//           </StyledFavoriteButton>
//           <StyledMoreInfoButton variant="contained" startIcon={<PlayArrow />} sx={{ ml: 2 }}>
//             More Info
//           </StyledMoreInfoButton>
//           <Typography variant="body1" sx={{ my: 1 }}>
//             {overview && overview.length > 200 ? `${overview.slice(0, 100)}...` : overview}
//           </Typography>
//         </Grid>
//       </Grid>
//     </StyledMovieElement>
//   );
// }

// export default MovieElement;


// same as previous

// import { styled } from "@mui/material/styles";
// import { PlayArrow, Favorite } from "@mui/icons-material";
// import { Box, Button, Grid, Typography } from "@mui/material";
// import { useEffect, useState } from "react";

// const MovieElementContainer = styled(Box)({
//   padding: 2,
//   border: "1px solid #ccc",
//   borderRadius: 4,
//   transition: "transform 0.2s",
//   "&:hover": {
//     transform: "translateY(-2px)",
//     boxShadow: "0px 4px 8px rgba(38, 38, 38, 0.2)",
//   },
// });

// const FavoriteButton = styled(Button)({
//   marginRight: 2,
//   backgroundColor: "#F44336",
//   color: "#fff",
//   "&:hover": {
//     backgroundColor: "#D32F2F",
//   },
// });

// const MoreInfoButton = styled(Button)({
//   backgroundColor: "#3F51B5",
//   color: "#fff",
//   "&:hover": {
//     backgroundColor: "#303F9F",
//   },
// });

// const PosterImage = styled("img")({
//   width: 150,
//   marginRight: "2rem",
//   borderRadius: 4,
// });

// function MovieElement({ title, poster_path, overview, release_date, rating, id }) {
//   const [isFavourite, setIsFavourite] = useState(false);
//   const [favMovies, setFavMovies] = useState([]);

//   const imageUrl = poster_path ? `https://image.tmdb.org/t/p/w500/${poster_path}` : 'https://via.placeholder.com/500x750';
//   const releaseYear = release_date ? new Date(release_date).getFullYear() : '';
//   const displayRating = rating ? `${rating}%` : '';

//   useEffect(() => {
//     const favMoviesFromStorage = localStorage.getItem("favMovies");

//     if (favMoviesFromStorage) {
//       const parseFavouriteMovies = JSON.parse(favMoviesFromStorage);
//       setFavMovies(parseFavouriteMovies);

//       const movieIsFavorited = parseFavouriteMovies.find(favoriteId => favoriteId == id)
//       if (movieIsFavorited !== undefined) {
//         setIsFavourite(true);
//       }
//     }
//   }, []);

//   const handleFavourite = () => {
//     setIsFavourite(!isFavourite);

//     let updatedFavMovies;
//     if (!isFavourite) {
//       updatedFavMovies = [...favMovies, id]
//       setFavMovies([...favMovies, id]);
//     } else {
//       updatedFavMovies = favMovies.filter(movieId => movieId !== id);
//       setFavMovies(updatedFavMovies);
//     }
//     localStorage.setItem("favMovies", JSON.stringify(updatedFavMovies));
//   };

//   return (
//     <MovieElementContainer>
//       <Grid container spacing={2} alignItems="center">
//         <Grid item xs={12} md={3}>
//           <PosterImage src={imageUrl} alt={`${title} poster`} />
//         </Grid>
//         <Grid item xs={12} md={9}>
//           <Typography variant="h5" sx={{ mb: 1 }}>
//             {title}
//           </Typography>
//           <Typography variant="body1" sx={{ mb: 1 }}>
//             {releaseYear} | {displayRating}
//           </Typography>
//           <FavoriteButton
//             variant={isFavourite ? "contained" : "outlined"}
//             onClick={handleFavourite}
//             startIcon={<Favorite />}
//           >
//             {isFavourite ? "Unfavorite" : "Favorite"}
//           </FavoriteButton>
//           <MoreInfoButton variant="contained" startIcon={<PlayArrow />} sx={{ ml: 2 }}>
//             More Info
//           </MoreInfoButton>
//           <Typography variant="body1" sx={{ my: 1 }}>
//             {overview && overview.length > 200 ? `${overview.slice(0, 100)}...` : overview}
//           </Typography>
//         </Grid>
//       </Grid>
//     </MovieElementContainer>
//   );
// }

// export default MovieElement;










// import { styled } from "@mui/material/styles";
// import { PlayArrow, Favorite } from "@mui/icons-material";
// import { Box, Button, Grid, Typography } from "@mui/material";
// import { useEffect, useState } from "react";

// const MovieElementContainer = styled(Box)({
//   display: "flex",
//   alignItems: "center",
//   padding: "1rem",
//   borderRadius: 4,
//   boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
//   transition: "transform 0.2s",
//   "&:hover": {
//     transform: "translateY(-2px)",
//     boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)",
//   },
// });

// const PosterImage = styled("img")({
//   width: 120,
//   marginRight: "1.5rem",
//   borderRadius: 4,
// });

// const Title = styled(Typography)({
//   fontSize: "1.25rem",
//   fontWeight: "bold",
// });

// const Subtitle = styled(Typography)({
//   fontSize: "1rem",
// });

// const FavouriteButton = styled(Button)({
//   backgroundColor: "#f44336",
//   color: "#fff",
//   borderRadius: 2,
//   textTransform: "capitalize",
//   "&:hover": {
//     backgroundColor: "#d32f2f",
//   },
// });

// const MoreInfoButton = styled(Button)({
//   backgroundColor: "#3f51b5",
//   color: "#fff",
//   borderRadius: 2,
//   textTransform: "capitalize",
//   "&:hover": {
//     backgroundColor: "#303f9f",
//   },
// });

// function MovieElement({ title, poster_path, overview, release_date, rating, id }) {
//   const [isFavourite, setIsFavourite] = useState(false);
//   const [favMovies, setFavMovies] = useState([]);

//   const imageUrl = poster_path ? `https://image.tmdb.org/t/p/w500/${poster_path}` : "https://via.placeholder.com/500x750";
//   const releaseYear = release_date ? new Date(release_date).getFullYear() : "";
//   const displayRating = rating ? `${rating}%` : "";

//   useEffect(() => {
//     const favMoviesFromStorage = localStorage.getItem("favMovies");

//     if (favMoviesFromStorage) {
//       const parseFavouriteMovies = JSON.parse(favMoviesFromStorage);
//       setFavMovies(parseFavouriteMovies);

//       const movieIsFavorited = parseFavouriteMovies.find((favoriteId) => favoriteId == id);
//       if (movieIsFavorited !== undefined) {
//         setIsFavourite(true);
//       }
//     }
//   }, []);

//   const handleFavourite = () => {
//     setIsFavourite(!isFavourite);

//     let updatedFavMovies;
//     if (!isFavourite) {
//       updatedFavMovies = [...favMovies, id];
//       setFavMovies([...favMovies, id]);
//     } else {
//       updatedFavMovies = favMovies.filter((movieId) => movieId !== id);
//       setFavMovies(updatedFavMovies);
//     }
//     localStorage.setItem("favMovies", JSON.stringify(updatedFavMovies));
//   };

//   return (
//     <MovieElementContainer>
//       <PosterImage src={imageUrl} alt={`${title} poster`} />
//       <Box flexGrow={1}>
//         <Title variant="h6">{title}</Title>
//         <Subtitle variant="subtitle1">
//           {releaseYear} | {displayRating}
//         </Subtitle>
//         <Typography variant="body2" sx={{ mt: 1, mb: 2 }}>{overview && overview.length > 200 ? `${overview.slice(0, 200)}...` : overview}</Typography>
//         <Box display="flex" alignItems="center">
//           <FavouriteButton variant={isFavourite ? "contained" : "outlined"} onClick={handleFavourite} startIcon={<Favorite />}>
//             {isFavourite ? "Unfavorite" : "Favorite"}
//           </FavouriteButton>
//           <MoreInfoButton variant="contained" startIcon={<PlayArrow />} sx={{ ml: 1 }}>
//             More Info
//           </MoreInfoButton>
//         </Box>
//       </Box>
//     </MovieElementContainer>
//   );
// }

// export default MovieElement;






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
      <Grid item xs={12} sm={3}>
        <PosterImage src={imageUrl} alt={`${title} poster`} />
      </Grid>
      <Grid item xs={12} sm={9}>
        <Title variant="h6">{title}</Title>
        <Subtitle variant="subtitle1">
          {releaseYear} | {displayRating}
        </Subtitle>
        <Typography variant="body2">{overview}</Typography>
        <Box sx={{ mt: 2 }}>
          <FavouriteButton variant="contained" startIcon={<Favorite />} onClick={handleFavourite}>
            {isFavourite ? "Remove from Favorites" : "Add to Favorites"}
          </FavouriteButton>
          <MoreInfoButton variant="contained" startIcon={<PlayArrow />} sx={{ ml: 2 }}>
            More Info
          </MoreInfoButton>
        </Box>
      </Grid>
    </MovieElementContainer>
  );
}

export default MovieElement;









<!-- to test -->

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
