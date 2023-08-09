import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Box, Button, CircularProgress, Grid, Typography } from '@mui/material';
import Header from '../components/Header';
import Footer from '../components/Footer';

const IndividualMoviePage = () => {
  const API_KEY = '2ae37d97dbcd92e86e4aec0cf4a0f1e0';
  const [movieInfo, setMovieInfo] = useState(null);
  const [isFavorited, setIsFavorited] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const fetchMovie = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}&language=en-US`
        );
        if (response.status === 200) {
          const data = await response.json();
          setMovieInfo(data);
        } else {
          setError("Error fetching movie data");
        }
        setLoading(false);
      } catch (error) {
        setLoading(false);
        setError(error.message);
      }
    };
    fetchMovie();
  }, [id, API_KEY]);


  useEffect(() => {
    const favMoviesFromStorage = localStorage.getItem("favMovies");
    const favMovies = favMoviesFromStorage ? JSON.parse(favMoviesFromStorage) : [];
    setIsFavorited(favMovies.some((movie) => movie.id == id));
  }, [id]);
  

  

  const toggleFavorite = () => {
    const favMoviesFromStorage = localStorage.getItem("favMovies");
    const favMovies = favMoviesFromStorage ? JSON.parse(favMoviesFromStorage) : [];
    if (isFavorited) {
      const newFavMovies = favMovies.filter((movie) => movie.id !== id);
      localStorage.setItem("favMovies", JSON.stringify(newFavMovies));
    } else {
      favMovies.push(movieInfo);  // movieInfo is the complete movie object
      localStorage.setItem("favMovies", JSON.stringify(favMovies));
    }
    setIsFavorited(!isFavorited);
  };
  

  if (error) {
    return (
      <Box sx={{ padding: 3 }}>
        <Typography variant="h6" color="error">{error}</Typography>
      </Box>
    );
  }

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', padding: 3 }}>
        <CircularProgress />
      </Box>
    );
  }

  const imageUrl = movieInfo.poster_path
    ? `https://image.tmdb.org/t/p/w500/${movieInfo.poster_path}`
    : "https://via.placeholder.com/500x750";

  const releaseYear = movieInfo.release_date
    ? new Date(movieInfo.release_date).getFullYear()
    : "";
  const displayRating = movieInfo.vote_average ? `${movieInfo.vote_average * 10}%` : "";

  return (
    <>
      <Header />
      <Box sx={{ padding: 3 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 2 }}>
          <Typography variant="h3">{movieInfo.title}</Typography>
          <Button variant="outlined" onClick={toggleFavorite}>
            {isFavorited ? "Unfavourite" : "Favourite"}
          </Button>
          </Box>
        <Grid container spacing={2}>
          <Grid item xs={12} md={4}>
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
              <img src={imageUrl} alt={movieInfo.title} style={{ maxWidth: '100%' }} />
            </Box>
          </Grid>
          <Grid item xs={12} md={8}>
            <Typography variant="h4" gutterBottom>Overview</Typography>
            <Typography variant="body1" gutterBottom>{movieInfo.overview}</Typography>
            <Typography variant="h4" gutterBottom>Details</Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
              <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: 1 }}>
                <Typography variant="subtitle1" sx={{ marginRight: 1 }}>Release Year:</Typography>
                <Typography variant="body1">{releaseYear}</Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: 1 }}>
                <Typography variant="subtitle1" sx={{ marginRight: 1 }}>Rating:</Typography>
                <Typography variant="body1">{displayRating}</Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Typography variant="subtitle1" sx={{ marginRight: 1 }}>Genres:</Typography>
                <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
                  {movieInfo.genres.map((genre) => (
                    <Box key={genre.id} sx={{ marginRight: 1, marginBottom: 1 }}>
                      <Button variant="outlined" size="small">{genre.name}</Button>
                    </Box>
                  ))}
                </Box>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Box>
      <Footer />
    </>
  );
};

export default IndividualMoviePage;










// import React, { useState, useEffect } from "react";
// import { useParams } from "react-router-dom";
// import { Box, Button, CircularProgress, Grid, Typography } from '@mui/material';
// import MovieElement from './MovieElement';

// const IndividualMoviePage = () => {
//   const API_KEY = '2ae37d97dbcd92e86e4aec0cf4a0f1e0';
//   const [movieInfo, setMovieInfo] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const { id } = useParams();

//   useEffect(() => {
//     const fetchMovie = async () => {
//       setLoading(true);
//       try {
//         const response = await fetch(
//           `https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}&language=en-US`
//         );
//         if (response.status === 200) {
//           const data = await response.json();
//           setMovieInfo(data);
//         } else {
//           setError("Error fetching movie data");
//         }
//         setLoading(false);
//       } catch (error) {
//         setLoading(false);
//         setError(error.message);
//       }
//     };
//     fetchMovie();
//   }, [id, API_KEY]);

//   if (error) {
//     return (
//       <Box sx={{ padding: 3 }}>
//         <Typography variant="h6" color="error">{error}</Typography>
//       </Box>
//     );
//   }

//   if (loading) {
//     return (
//       <Box sx={{ display: 'flex', justifyContent: 'center', padding: 3 }}>
//         <CircularProgress />
//       </Box>
//     );
//   }

//   return (
//     <Box sx={{ padding: 3 }}>
//       <MovieElement {...movieInfo} />
//     </Box>
//   );
// };

// export default IndividualMoviePage;
