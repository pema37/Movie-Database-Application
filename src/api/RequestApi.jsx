export const movieType = {
  popular: "popular",
  nowPlaying: "now_playing",
  upcoming: "upcoming",
  topRated: "top_rated"
};


const ROOT_URL = 'https://api.themoviedb.org/3/';

const API_KEY = '2ae37d97dbcd92e86e4aec0cf4a0f1e0';


const RequestApi = async (movieType) => {

  const final_url = `${ROOT_URL}/movie/${movieType}?api_key=${API_KEY}&language=en-US&page=1`;

  const response = await fetch ( `${final_url}` );

  const json = await response.json();

  return json;

};


export default RequestApi;














// import React from "react";
// import { Link } from "react-router-dom";

// export const movieType = {
//   popular: "popular",
//   nowPlaying: "now_playing",
//   upcoming: "upcoming",
//   topRated: "top_rated"
// };

// const ROOT_URL = 'https://api.themoviedb.org/3/';
// const API_KEY = '2ae37d97dbcd92e86e4aec0cf4a0f1e0';

// const RequestApi = async (movieType, id = "") => {
//   const final_url = `${ROOT_URL}/movie/${movieType}${id ? `/${id}` : ""}?api_key=${API_KEY}&language=en-US&page=1`;
//   const response = await fetch(final_url);
//   const json = await response.json();
//   return json;
// };

// export default RequestApi;






















// ASYNC ALTERNATIVE
// const fetchPosts = async () => {
//   const response = await fetch(`${ROOT_URL}/posts`);
//   const data = await response.json();
//   return data;
// };


// return json.results;


// baseUrl: 'https://api.themoviedb.org/3/',

// apiKey: '2ae37d97dbcd92e86e4aec0cf4a0f1e0',

// const ROOT_URL = `https://api.themoviedb.org/3/movie/{movieType}?api_key=${apiKey}&language=en-US&page=1`;


// ASYNC ALTERNATIVE
// const fetchPosts = async () => {
//   const response = await fetch(`${ROOT_URL}/posts`);
//   const data = await response.json();
//   return data;
// };



// POPULAR MOVIES REQUEST BELOW
// async function requestPopularMovies() {
  
//   const res = await fetch(
//     ` https://api.themoviedb.org/3/movie/popular?api_key=2ae37d97dbcd92e86e4aec0cf4a0f1e0&language=en-US&page=1 `
//   );

//   const json = await res.json();
//   return json;
// }


// TOP RATED MOVIES REQUEST BELOW
// async function requestTopRatedMovies() {
  
//   const res = await fetch(
//     ` https://api.themoviedb.org/3/movie/top_rated?api_key=2ae37d97dbcd92e86e4aec0cf4a0f1e0&language=en-US&page=1 `
//   );

//   const json = await res.json();
//   return json;
// }


// NOW PLAYING MOVIES REQUEST BELOW
// async function requestNowPlayingMovies() {
  
//   const res = await fetch(
//     ` https://api.themoviedb.org/3/movie/now_playing?api_key=2ae37d97dbcd92e86e4aec0cf4a0f1e0&language=en-US&page=1 `
//   );

//   const json = await res.json();
//   return json;

// }


// UPCOMING MOVIES REQUEST BELOW
// async function requestUpcomingMovies() {
  
//   const res = await fetch(
//     ` https://api.themoviedb.org/3/movie/upcoming?api_key=2ae37d97dbcd92e86e4aec0cf4a0f1e0&language=en-US&page=1 `
//   );

//   const json = await res.json();
//   return json;

// }



// this function is meant to request data from TheMovieDB API
// function RequestApi(movieType) {

//   if(movieType === "popular"){

//     return requestPopularMovies();

//   } else if (movieType === "nowPlaying") {
    
//     return requestNowPlayingMovies();

//   } else if (movieType === "upcoming") {
    
//     return requestUpcomingMovies();

//   } else if (movieType === "topRated") {

//     return requestTopRatedMovies();

//   } else {

//     return "indvalid";

//   }

// };

// export { RequestApi, requestPopularMovies, requestTopRatedMovies, requestNowPlayingMovies, requestUpcomingMovies };




/* ---------------------------------------------------------------
GET /movie/popular

Get a list of the current popular movies on TMDB. This list updates daily.

api_key: 2ae37d97dbcd92e86e4aec0cf4a0f1e0 ;

SEND REQUEST: https://api.themoviedb.org/3/movie/popular?api_key=2ae37d97dbcd92e86e4aec0cf4a0f1e0&language=en-US&page=1

--------------------------------------------------------------- */ 


/* ---------------------------------------------------------------
GET /movie/topRated

Get the top rated movies on TMDB.

api_key: 2ae37d97dbcd92e86e4aec0cf4a0f1e0 ;

SEND REQUEST: https://api.themoviedb.org/3/movie/top_rated?api_key=<<api_key>>&language=en-US&page=1 

--------------------------------------------------------------- */ 


/* ---------------------------------------------------------------
GET /movie/upcoming

Get a list of upcoming movies in theatres. This is a release type query that looks for all movies that have a release type of 2 or 3 within the specified date range.

You can optionally specify a region prameter which will narrow the search to only look for theatrical release dates within the specified country.

api_key: 2ae37d97dbcd92e86e4aec0cf4a0f1e0 ;

SEND REQUEST: https://api.themoviedb.org/3/movie/upcoming?api_key=<<api_key>>&language=en-US&page=1 

--------------------------------------------------------------- */ 



/* ---------------------------------------------------------------
GET /movie/now_playing

Get a list of movies in theatres. This is a release type query that looks for all movies that have a release type of 2 or 3 within the specified date range.

You can optionally specify a region prameter which will narrow the search to only look for theatrical release dates within the specified country.


api_key: 2ae37d97dbcd92e86e4aec0cf4a0f1e0 ;

SEND REQUEST: https://api.themoviedb.org/3/movie/now_playing?api_key=<<api_key>>&language=en-US&page=1

--------------------------------------------------------------- */ 



