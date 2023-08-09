// original

// import { createRoot } from 'react-dom/client';
// import React, { useState, useEffect } from 'react';
// import RequestApi, { movieType } from "../api/RequestApi.jsx";
// import MovieElement from "./MovieElement.jsx";
// import "../styles/stylesComponents/movieList.css";


// function MovieList() {
//   const [popularMovies, setPopularMovies] = useState([]);
//   const [topRatedMovies, setTopRatedMovies] = useState([]);
//   const [nowPlayingMovies, setNowPlayingMovies] = useState([]);
//   const [upcomingMovies, setUpcomingMovies] = useState([]);
//   const [selectedType, setSelectedType] = useState(movieType.popular);
//   const [errors, setErrors] = useState(null);

//   useEffect(() => {
//     const fetchMovies = async () => {
//       try {
//         const moviesData = await RequestApi(selectedType);
//         switch (selectedType) {
//           case movieType.popular:
//             setPopularMovies(moviesData.results);
//             break;
//           case movieType.topRated:
//             setTopRatedMovies(moviesData.results);
//             break;
//           case movieType.nowPlaying:
//             setNowPlayingMovies(moviesData.results);
//             break;
//           case movieType.upcoming:
//             setUpcomingMovies(moviesData.results);
//             break;
//           default:
//             break;
//         }
//       } catch (error) {
//         setErrors(error.message);
//       }
//     };

//     fetchMovies();
//   }, [selectedType]);

//   const handleTypeChange = (event) => {
//     setSelectedType(event.target.value);
//   };

//   const movieLists = {
//     [movieType.popular]: popularMovies,
//     [movieType.topRated]: topRatedMovies,
//     [movieType.nowPlaying]: nowPlayingMovies,
//     [movieType.upcoming]: upcomingMovies,
//   };

//   return (
//     <div>
//       <form>
//         <label htmlFor="movie-type">Select a movie type:</label>
//         <select id="movie-type" value={selectedType} onChange={handleTypeChange}>
//           <option value={movieType.popular}>Popular</option>
//           <option value={movieType.topRated}>Top Rated</option>
//           <option value={movieType.nowPlaying}>Now Playing</option>
//           <option value={movieType.upcoming}>Upcoming</option>
//         </select>
//       </form>

//       <h2>{selectedType.charAt(0).toUpperCase() + selectedType.slice(1)} Movies</h2>
//       <div className="movies">
//         {movieLists[selectedType] && movieLists[selectedType].map((movie) => (
//           <div className="movie-card" key={movie.id} >
//             <MovieElement
//               title={movie.title}
//               poster_path={movie.poster_path}
//               overview={movie.overview}
//               release_date={movie.release_date}
//               rating={movie.vote_average * 10} // rating is out of 10, multiply by 10 to get percentage
//               id ={movie.id}
//             />
//           </div>
//         ))}
//       </div>

//       {errors && <div className="error">{errors}</div>}
//     </div>
//   );
// }

// export default MovieList;

















// test 1

// import { Box, CircularProgress, Grid, MenuItem, Select, Typography } from '@mui/material';
// import React, { useEffect, useState } from 'react';
// import { Link } from 'react-router-dom';
// import RequestApi, { movieType } from '../api/RequestApi';
// import MovieElement from './MovieElement';

// const MovieList = () => {
//   const [popularMovies, setPopularMovies] = useState([]);
//   const [topRatedMovies, setTopRatedMovies] = useState([]);
//   const [nowPlayingMovies, setNowPlayingMovies] = useState([]);
//   const [upcomingMovies, setUpcomingMovies] = useState([]);
//   const [selectedType, setSelectedType] = useState(movieType.popular);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchMovies = async () => {
//       setLoading(true);
//       setError(null);
//       try {
//         const moviesData = await RequestApi(selectedType);
//         switch (selectedType) {
//           case movieType.popular:
//             setPopularMovies(moviesData.results);
//             break;
//           case movieType.topRated:
//             setTopRatedMovies(moviesData.results);
//             break;
//           case movieType.nowPlaying:
//             setNowPlayingMovies(moviesData.results);
//             break;
//           case movieType.upcoming:
//             setUpcomingMovies(moviesData.results);
//             break;
//           default:
//             break;
//         }
//         setLoading(false);
//       } catch (error) {
//         setLoading(false);
//         setError(error.message);
//       }
//     };

//     fetchMovies();
//   }, [selectedType]);

//   const handleTypeChange = (event) => {
//     setSelectedType(event.target.value);
//   };

//   const movieLists = {
//     [movieType.popular]: popularMovies,
//     [movieType.topRated]: topRatedMovies,
//     [movieType.nowPlaying]: nowPlayingMovies,
//     [movieType.upcoming]: upcomingMovies,
//   };

//   return (
//     <Box sx={{ py: 3 }}>
//       <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
//         <Typography variant="h3" sx={{ textTransform: 'uppercase' }}>
//           {selectedType.replace(/-/g, ' ').toUpperCase()} MOVIES
//         </Typography>
//         <Select value={selectedType} onChange={handleTypeChange}>
//           <MenuItem value={movieType.popular}>Popular</MenuItem>
//           <MenuItem value={movieType.topRated}>Top Rated</MenuItem>
//           <MenuItem value={movieType.nowPlaying}>Now Playing</MenuItem>
//           <MenuItem value={movieType.upcoming}>Upcoming</MenuItem>
//         </Select>
//       </Box>
//       {loading && <CircularProgress />}
//       {error && <Typography variant="h6" color="error">{error}</Typography>}
//       {!loading && !error && (
//         <Grid container spacing={3}>
//           {movieLists[selectedType].map((movie) => (
//             <Grid item xs={12} sm={6} md={4} key={movie.id}>
//               <Link to={`/movie/${movie.id}`}>
//                 <MovieElement
//                   title={movie.title}
//                   poster_path={movie.poster_path}
//                   overview={movie.overview}
//                   release_date={movie.release_date}
//                   rating={movie.vote_average * 10} // rating is out of 10, multiply by 10 to get percentage
//                   newRelease={selectedType === movieType.nowPlaying}
//                   comingSoon={selectedType === movieType.upcoming}
//                 />
//               </Link>
//             </Grid>
//           ))}
//         </Grid>
//       )}
//     </Box>
//   );
// };

// export default MovieList;







