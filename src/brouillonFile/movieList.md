

// mui test 2: Not a good sizing with movieElment test 1
// import { Box, FormControl, InputLabel, MenuItem, Select, Typography } from "@mui/material";
// import React, { useEffect, useState } from "react";
// import RequestApi, { movieType } from "../api/requestApi.jsx";
// import MovieElement from "./MovieElement.jsx";

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
//     <Box sx={{ maxWidth: "1200px", margin: "0 auto", p: 2 }}>
//       <FormControl sx={{ mb: 2 }}>
//         <InputLabel id="movie-type-label">Select a movie type:</InputLabel>
//         <Select
//           labelId="movie-type-label"
//           id="movie-type"
//           value={selectedType}
//           label="Select a movie type"
//           onChange={handleTypeChange}
//         >
//           <MenuItem value={movieType.popular}>Popular</MenuItem>
//           <MenuItem value={movieType.topRated}>Top Rated</MenuItem>
//           <MenuItem value={movieType.nowPlaying}>Now Playing</MenuItem>
//           <MenuItem value={movieType.upcoming}>Upcoming</MenuItem>
//         </Select>
//       </FormControl>

//       <Typography variant="h4" sx={{ mb: 2 }}>
//         {selectedType.charAt(0).toUpperCase() + selectedType.slice(1)} Movies
//       </Typography>

//       <Box sx={{ display: "flex", flexWrap: "wrap" }}>
//         {movieLists[selectedType] &&
//           movieLists[selectedType].map((movie) => (
//             <Box key={movie.id} sx={{ flexBasis: "25%", mb: 2, p: 1 }}>
//               <MovieElement
//                 title={movie.title}
//                 poster_path={movie.poster_path}
//                 overview={movie.overview}
//                 release_date={movie.release_date}
//                 rating={movie.vote_average * 10} // rating is out of 10, multiply by 10 to get percentage
//                 id={movie.id}
//               />
//             </Box>
//           ))}
//       </Box>

//       {errors && (
//         <Typography variant="body1" sx={{ color: "error.main", mt: 2 }}>
//           {errors}
//         </Typography>
//       )}
//     </Box>
//   );
// }

// export default MovieList;

























// MUI TEST 1: GOOD SIZING with movieElment test 1
// import { Box, FormControl, InputLabel, MenuItem, Select, Typography } from "@mui/material";
// import React, { useEffect, useState } from "react";
// import RequestApi, { movieType } from "../api/requestApi.jsx";
// import MovieElement from "./MovieElement.jsx";

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
//     <Box sx={{ maxWidth: "800px", margin: "0 auto", p: 2 }}>
//       <FormControl sx={{ mb: 2 }}>
//         <InputLabel id="movie-type-label">Select a movie type:</InputLabel>
//         <Select
//           labelId="movie-type-label"
//           id="movie-type"
//           value={selectedType}
//           label="Select a movie type"
//           onChange={handleTypeChange}
//         >
//           <MenuItem value={movieType.popular}>Popular</MenuItem>
//           <MenuItem value={movieType.topRated}>Top Rated</MenuItem>
//           <MenuItem value={movieType.nowPlaying}>Now Playing</MenuItem>
//           <MenuItem value={movieType.upcoming}>Upcoming</MenuItem>
//         </Select>
//       </FormControl>

//       <Typography variant="h4" sx={{ mb: 2 }}>
//         {selectedType.charAt(0).toUpperCase() + selectedType.slice(1)} Movies
//       </Typography>

//       <Box sx={{ display: "flex", flexWrap: "wrap" }}>
//         {movieLists[selectedType] &&
//           movieLists[selectedType].map((movie) => (
//             <Box key={movie.id} sx={{ flexBasis: "100%", mb: 2 }}>
//               <MovieElement
//                 title={movie.title}
//                 poster_path={movie.poster_path}
//                 overview={movie.overview}
//                 release_date={movie.release_date}
//                 rating={movie.vote_average * 10} // rating is out of 10, multiply by 10 to get percentage
//                 id={movie.id}
//               />
//             </Box>
//           ))}
//       </Box>

//       {errors && (
//         <Typography variant="body1" sx={{ color: "error.main", mt: 2 }}>
//           {errors}
//         </Typography>
//       )}
//     </Box>
//   );
// }

// export default MovieList;
















import { createRoot } from 'react-dom/client';
import React, { useState, useEffect } from 'react';
import RequestApi, { movieType } from '../api/requestApi.jsx';
import MovieElement from './MovieElement.jsx';
import "./styles/MovieList.css";

function MovieList() {
  const [popularMovies, setPopularMovies] = useState([]);
  const [topRatedMovies, setTopRatedMovies] = useState([]);
  const [nowPlayingMovies, setNowPlayingMovies] = useState([]);
  const [upcomingMovies, setUpcomingMovies] = useState([]);
  const [selectedType, setSelectedType] = useState(movieType.popular);
  const [errors, setErrors] = useState(null);

  useEffect(() => {
    const fetchMovies = async () => {
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
      } catch (error) {
        setErrors(error.message);
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
    <div className="bg-white">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
        <h2 className="text-2xl font-bold tracking-tight text-gray-900">{selectedType.charAt(0).toUpperCase() + selectedType.slice(1)} Movies</h2>

        <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
          {movieLists[selectedType] && movieLists[selectedType].map((movie) => (
            <div key={movie.id} className="group relative">
              <div className="min-h-80 aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
                <img src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} alt={`${movie.title} poster`} className="h-full w-full object-cover object-center lg:h-full lg:w-full" />
              </div>
              <div className="mt-4 flex justify-between">
                <div>
                  <h3 className="text-sm text-gray-700">
                    <a href="#">
                      <span aria-hidden="true" className="absolute inset-0"></span>
                      {movie.title}
                    </a>
                  </h3>
                  <p className="mt-1 text-sm text-gray-500">{new Date(movie.release_date).getFullYear()}</p>
                </div>
                <p className="text-sm font-medium text-gray-900">{movie.vote_average * 10}%</p>
              </div>
            </div>
          ))}
        </div>

        {errors && <div className="error">{errors}</div>}
      </div>
    </div>
  );
}

export default MovieList;





































<!-- good -->
import { createRoot } from 'react-dom/client';
import React, { useState, useEffect } from 'react';
import RequestApi, { movieType } from '../api/requestApi.jsx';
import MovieElement from './MovieElement.jsx';

function MovieList() {

  const [popularMovies, setPopularMovies] = useState([]);
  const [topRatedMovies, setTopRatedMovies] = useState([]);
  const [nowPlayingMovies, setNowPlayingMovies] = useState([]);
  const [upcomingMovies, setUpcomingMovies] = useState([]);
  const [errors, setErrors] = useState(null);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const popularMoviesData = await RequestApi(movieType.popular);
        setPopularMovies(popularMoviesData.results);
        const topRatedMoviesData = await RequestApi(movieType.topRated);
        setTopRatedMovies(topRatedMoviesData.results);
        const nowPlayingMoviesData = await RequestApi(movieType.nowPlaying);
        setNowPlayingMovies(nowPlayingMoviesData.results);
        const upcomingMoviesData = await RequestApi(movieType.upcoming);
        setUpcomingMovies(upcomingMoviesData.results);
      } catch (error) {
        setErrors(error.message);
      }
    };

    fetchMovies();
  }, []);

  return (
    <div>
      <h2>Popular Movies</h2>
      <div className="movies">
        {popularMovies && popularMovies.map((movie) => (
          <MovieElement
            key={movie.id}
            title={movie.title}
            poster_path={movie.poster_path}
            overview={movie.overview}
            release_date={movie.release_date}
            rating={movie.rating}
            id ={movie.id}
          />
        ))}
      </div>

      <h2>Top Rated Movies</h2>
      <div className="movies">
        {topRatedMovies && topRatedMovies.map((movie) => (
          <MovieElement
            key={movie.id}
            title={movie.title}
            poster_path={movie.poster_path}
            overview={movie.overview}
            release_date={movie.release_date}
            rating={movie.rating}
            id ={movie.id}
          />
        ))}
      </div>

      <h2>Now Playing Movies</h2>
      <div className="movies">
        {nowPlayingMovies && nowPlayingMovies.map((movie) => (
          <MovieElement
            key={movie.id}
            title={movie.title}
            poster_path={movie.poster_path}
            overview={movie.overview}
            release_date={movie.release_date}
            rating={movie.rating}
            id ={movie.id}
          />
        ))}
      </div>

      <h2>Upcoming Movies</h2>
      <div className="movies">
        {upcomingMovies && upcomingMovies.map((movie) => (
          <MovieElement
            key={movie.id}
            title={movie.title}
            poster_path={movie.poster_path}
            overview={movie.overview}
            release_date={movie.release_date}
            rating={movie.rating}
            id ={movie.id}
          />
        ))}
      </div>

      {errors && <div className="error">{errors}</div>}
    </div>
  );
}

export default MovieList;












to test for consistency 
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
                  comingSoon={selectedType ===
