// import React, { useState, useEffect } from "react";
// import { useParams } from "react-router-dom";
// import { Box, Button, CircularProgress, Typography } from '@mui/material';
// import Header from '../components/Header';
// import Footer from '../components/Footer';

// const IndividualMoviePage = () => {
//   const API_KEY = '2ae37d97dbcd92e86e4aec0cf4a0f1e0';
//   const [movieInfo, setMovieInfo] = useState(null);
//   const [isFavorited, setIsFavorited] = useState(false);
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

//   useEffect(() => {
//     // check if the movie is favorited and update state accordingly
//     const favMoviesFromStorage = localStorage.getItem("favMovies");
//     if (favMoviesFromStorage) {
//       const favMovies = JSON.parse(favMoviesFromStorage);
//       setIsFavorited(favMovies.includes(id));
//     }
//   }, [id]);

//   const toggleFavorite = () => {
//     const favMoviesFromStorage = localStorage.getItem("favMovies");
//     if (favMoviesFromStorage) {
//       const favMovies = JSON.parse(favMoviesFromStorage);
//       const newFavMovies = isFavorited
//         ? favMovies.filter((movieId) => movieId !== id)
//         : [...favMovies, id];
//       localStorage.setItem("favMovies", JSON.stringify(newFavMovies));
//       setIsFavorited(!isFavorited);
//     } else {
//       localStorage.setItem("favMovies", JSON.stringify([id]));
//       setIsFavorited(true);
//     }
//   };

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

//   const imageUrl = movieInfo.poster_path
//     ? `https://image.tmdb.org/t/p/w500/${movieInfo.poster_path}`
//     : "https://via.placeholder.com/500x750";

//   const releaseYear = movieInfo.release_date
//     ? new Date(movieInfo.release_date).getFullYear()
//     : "";
//   const displayRating = movieInfo.vote_average ? `${movieInfo.vote_average * 10}%` : "";

//   return (
//     <>
//       <Header />
//       <Box sx={{ padding: 3 }}>
//         <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 2 }}>
//           <Typography variant="h3">{movieInfo.title}</Typography>
//           <Button variant="outlined" onClick={toggleFavorite}>
//             {isFavorited ? "Unfavourite" : "Favourite"}
//           </Button>
//         </Box>
//         <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: 2 }}>
//           <Box sx={{ marginRight: 2 }}>
//             <img src={imageUrl} alt={movieInfo.title} />
//           </Box>
//           <Box sx={{ marginRight: 2 }}>
//             <Typography variant="body1" color="text.secondary">Rating:</Typography>
//             <Typography variant="h5">{displayRating}</Typography>
//           </Box>
//           <Box sx={{ marginRight: 2 }}>
//             <Typography variant="body1" color="text.secondary">Release Date:</Typography>
//             <Typography variant="h5">{releaseYear}</Typography>
//           </Box>
//           <Box sx={{ marginRight: 2 }}>
//             <Typography variant="body1" color="text.secondary">Runtime:</Typography>
//             <Typography variant="h5">{movieInfo.runtime} minutes</Typography>
//           </Box>
//           <Box sx={{ marginRight: 2 }}>
//             <Typography variant="body1" color="text.secondary">Genres:</Typography>
//             <Typography variant="h5">
//               {movieInfo.genres.map((genre) => genre.name).join(", ")}
//             </Typography>
//           </Box>
//         </Box>
//         <Box sx={{ marginBottom: 3 }}>
//           <Typography variant="body1" color="text.secondary" sx={{ marginBottom: 1 }}>Overview:</Typography>
//           <Typography variant="body1">{movieInfo.overview}</Typography>
//         </Box>
//         <Button
//           variant="contained"
//           color="primary"
//           href={`https://www.themoviedb.org/movie/${movieInfo.id}`}
//           target="_blank"
//           rel="noopener noreferrer"
//           sx={{ marginBottom: 3 }}
//         >
//           View on TMDb
//         </Button>
//         <Box>
//           {movieInfo.videos && movieInfo.videos.results && movieInfo.videos.results.length > 0 ? (
//             <iframe
//               width="560"
//               height="315"
//               src={`https://www.youtube.com/embed/${movieInfo.videos.results[0].key}`}
//               title={`${movieInfo.title} trailer`}
//               allowFullScreen
//             ></iframe>
//           ) : (
//             <Typography variant="body1">No video available</Typography>
//           )}
//         </Box>
//       </Box>
//       <Footer />
//     </>
//   );
// };

// export default IndividualMoviePage;





















// bon

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
    // check if the movie is favorited and update state accordingly
    const favMoviesFromStorage = localStorage.getItem("favMovies");
    if (favMoviesFromStorage) {
      const favMovies = JSON.parse(favMoviesFromStorage);
      setIsFavorited(favMovies.includes(id));
    }
  }, [id]);

  const toggleFavorite = () => {
    const favMoviesFromStorage = localStorage.getItem("favMovies");
    if (favMoviesFromStorage) {
      const favMovies = JSON.parse(favMoviesFromStorage);
      const newFavMovies = isFavorited
        ? favMovies.filter((movieId) => movieId !== id)
        : [...favMovies, id];
      localStorage.setItem("favMovies", JSON.stringify(newFavMovies));
      setIsFavorited(!isFavorited);
    } else {
      localStorage.setItem("favMovies", JSON.stringify([id]));
      setIsFavorited(true);
    }
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
