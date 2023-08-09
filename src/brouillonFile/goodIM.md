// orgiginal

// import React, { useState, useEffect } from "react";
// import { useParams } from "react-router-dom";

// function IndividualMoviePage() {

//   const API_KEY = '2ae37d97dbcd92e86e4aec0cf4a0f1e0';
//   const [movieInfo, setMovieInfo] = useState(null);
//   const [isFavorited, setIsFavorited] = useState(false);
//   const [error, setError] = useState(null);
//   const { id } = useParams();

//   useEffect(() => {
//     const fetchMovie = async () => {
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
//       } catch (error) {
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
//     return <div>{error}</div>;
//   }

//   if (!movieInfo) {
//     return <div>Loading...</div>;
//   }

//   const imageUrl = movieInfo.poster_path
//     ? `https://image.tmdb.org/t/p/w500/${movieInfo.poster_path}`
//     : "https://via.placeholder.com/500x750";
//   const releaseYear = movieInfo.release_date
//     ? new Date(movieInfo.release_date).getFullYear()
//     : "";
//   const displayRating = movieInfo.vote_average ? `${movieInfo.vote_average * 10}%` : "";

//   return (
//     <div className="individual-movie-page">
//       <div className="movie-info">
//         <h1>{movieInfo.title}</h1>
//         <img src={imageUrl} alt={`${movieInfo.title} poster`} />
//         <div className="movie-details">
//           <span>{releaseYear}</span>
//           <span>{displayRating}</span>
//         </div>
//         <p>{movieInfo.overview}</p>
//         <button onClick={toggleFavorite}>
//           {isFavorited ? "Unfavourite" : "Favourite"}
//         </button>
//       </div>
//     </div>
//   );
// }

// export default IndividualMoviePage;









// test 1

// import React, { useState, useEffect } from "react";
// import { useParams } from "react-router-dom";
// import { Box, Button, Card, CardActions, CardContent, CardMedia, Typography } from '@mui/material';

// const IndividualMoviePage = () => {
//   const API_KEY = '2ae37d97dbcd92e86e4aec0cf4a0f1e0';
//   const [movieInfo, setMovieInfo] = useState(null);
//   const [isFavorited, setIsFavorited] = useState(false);
//   const [error, setError] = useState(null);
//   const { id } = useParams();

//   useEffect(() => {
//     const fetchMovie = async () => {
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
//       } catch (error) {
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
//     return <Typography variant="h6">{error}</Typography>;
//   }

//   if (!movieInfo) {
//     return <Typography variant="h6">Loading...</Typography>;
//   }

//   const imageUrl = movieInfo.poster_path
//     ? `https://image.tmdb.org/t/p/w500/${movieInfo.poster_path}`
//     : "https://via.placeholder.com/500x750";
//   const releaseYear = movieInfo.release_date
//     ? new Date(movieInfo.release_date).getFullYear()
//     : "";
//   const displayRating = movieInfo.vote_average ? `${movieInfo.vote_average * 10}%` : "";

//   return (
//     <Box sx={{ padding: 3 }}>
//       <Card sx={{ display: 'flex' }}>
//         <CardMedia
//           component="img"
//           sx={{ width: '30%', objectFit: 'cover' }}
//           image={imageUrl}
//           alt={`${movieInfo.title} poster`}
//         />
//         <Box sx={{ display: 'flex', flexDirection: 'column' }}>
//           <CardContent sx={{ flex: '1 0 auto' }}>
//             <Typography gutterBottom variant="h4" component="div">
//               {movieInfo.title}
//             </Typography>
//             <Typography variant="body2" color="text.secondary">
//               {releaseYear}
//             </Typography>
//             <Typography variant="body1" sx={{ marginTop: 2 }}>
//               {movieInfo.overview}              
//             </Typography>
//             <Typography variant="body2" sx={{ marginTop: 2 }}>
//               Rating: {displayRating}
//             </Typography>
//           </CardContent>
//           <CardActions>
//             <Button variant="contained" onClick={toggleFavorite}>
//               {isFavorited ? "Unfavourite" : "Favourite"}
//             </Button>
//           </CardActions>
//         </Box>
//       </Card>
//     </Box>
//   );
// };

// export default IndividualMoviePage;

