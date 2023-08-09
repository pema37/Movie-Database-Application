
// test 1
// import React, { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// import "../styles/stylesComponents/movieElement.css";

// function MovieElement({ title, poster_path, overview, release_date, rating, id }) {

//   // favorite/unfavorite button
//   const [isFavourite, setIsFavourite] = useState(false);

//   const [favMovies, setFavMovies] = useState([]);


//   const imageUrl = poster_path ? `https://image.tmdb.org/t/p/w500/${poster_path}` : 'https://via.placeholder.com/500x750';

//   const releaseYear = release_date ? new Date(release_date).getFullYear() : '';

//   const displayRating = rating ? `${rating}%` : '';


//   // retrive favourite movies from local storage
//   useEffect( () => {
    
//     const favMoviesFromStorage = localStorage.getItem("favMovies");


//     if (favMoviesFromStorage) {

//       const parseFavouriteMovies = JSON.parse(favMoviesFromStorage);

//       setFavMovies(parseFavouriteMovies);

//       // favMovies = [64836,48347]
//       const movieIsFavorited = parseFavouriteMovies.find(favoriteId => favoriteId == id)


//       // check and see if favMovies, HAS the same ID in the array, as this MovieElement ID
//       // if it does, we change isFavorite to true
//       if (movieIsFavorited !== undefined) {

//        setIsFavourite(true);

//       }
//     }
//   }, []);



//   // update the list of favorite movies in state and local storage
//    const handleFavourite = () => {

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
//     <div className="movie-element">
//       <div className="movie-poster">
//         <img src={imageUrl} alt={`${title} poster`} />
//       </div>
//       <div className="basic_info">
//         <h3>{title}</h3>
//         <span>{releaseYear}</span>
//         <span>{displayRating}</span>
//         <button onClick={handleFavourite}>
//           {isFavourite ? "Unfavourite" : "Favourite"}
//         </button>
//       </div>
//       <div className="overview movie-summary">
//         <h4>Summary</h4>
//         <p>{overview}</p>
//         <Link to={`/movie/${id}`} className="individual-movie-page">
//           More Info
//         </Link>
//       </div>
//     </div>
//   );
// }

// export default MovieElement;























































to test for consistency


import { styled } from "@mui/material/styles";
import { PlayArrow, Favorite } from "@mui/icons-material";
import { Box, Button, Grid, Typography } from "@mui/material";
import { useState, useEffect } from "react";

const StyledMovieElement = styled(Box)({
  p: 2,
  border: "1px solid #ccc",
  borderRadius: 4,
  transition: "transform 0.2s",
  "&:hover": {
    transform: "translateY(-2px)",
    boxShadow: "0px 4px 8px rgba(38, 38, 38, 0.2)",
  },
});

const StyledFavoriteButton = styled(Button)({
  mr: 2,
  backgroundColor: "#F44336",
  color: "#fff",
  "&:hover": {
    backgroundColor: "#D32F2F",
  },
});

const StyledMoreInfoButton = styled(Button)({
  backgroundColor: "#3F51B5",
  color: "#fff",
  "&:hover": {
    backgroundColor: "#303F9F",
  },
});

function MovieElement({ title, poster_path, overview, release_date, rating, id }) {
  // favorite/unfavorite button
  const [isFavourite, setIsFavourite] = useState(false);
  const [favMovies, setFavMovies] = useState([]);

  const imageUrl = poster_path ? `https://image.tmdb.org/t/p/w500/${poster_path}` : 'https://via.placeholder.com/500x750';
  const releaseYear = release_date ? new Date(release_date).getFullYear() : '';
  const displayRating = rating ? `${rating}%` : '';

  // retrieve favorite movies from local storage
  useEffect(() => {
    const favMoviesFromStorage = localStorage.getItem("favMovies");

    if (favMoviesFromStorage) {
      const parseFavouriteMovies = JSON.parse(favMoviesFromStorage);
      setFavMovies(parseFavouriteMovies);

      // check and see if favMovies, HAS the same ID in the array, as this MovieElement ID
      // if it does, we change isFavorite to true
      const movieIsFavorited = parseFavouriteMovies.find(favoriteId => favoriteId == id)
      if (movieIsFavorited !== undefined) {
        setIsFavourite(true);
      }
    }
  }, []);

  // update the list of favorite movies in state and local storage
  const handleFavourite = () => {
    setIsFavourite(!isFavourite);

    let updatedFavMovies;
    if (!isFavourite) {
      updatedFavMovies = [...favMovies, id]
      setFavMovies([...favMovies, id]);
    } else {
      updatedFavMovies = favMovies.filter(movieId => movieId !== id);
      setFavMovies(updatedFavMovies);
    }
    localStorage.setItem("favMovies", JSON.stringify(updatedFavMovies));
  };

  return (
    <StyledMovieElement sx={{ p: 2 }}>
      <Grid container spacing={2} sx={{ alignItems: "center" }}>
        <Grid item xs={12} md={3}>
          <img src={imageUrl} alt={`${title} poster`} />
        </Grid>
        <Grid item xs={12} md={9}>
          <Typography variant="h5" sx={{ mb: 1 }}>
            {title}
          </Typography>
          <Typography variant="body1" sx={{ mb: 1 }}>
            {releaseYear} | {displayRating}
          </Typography>
          <StyledFavoriteButton
            variant={isFavourite ? "contained" : "outlined"}
            onClick={handleFavourite}
            startIcon={<Favorite />}
          >
            {isFavourite ? "Unfavorite" : "Favorite"}
          </StyledFavoriteButton>
          <StyledMoreInfoButton variant="contained" startIcon={<PlayArrow />}>
            More Info
          </StyledMoreInfoButton>
          <Typography variant="body1" sx={{ my: 1 }}>
            {overview}
          </Typography>
        </Grid>
      </Grid>
    </StyledMovieElement>
  );
}

export default MovieElement;






<!-- to test -->

import React from "react";
import { useState, useEffect } from "react";
import { styled as muiStyled } from '@mui/material/styles';
import { StyledMovieElement } from './MovieList';

const MovieElement = ({
  title,
  poster_path,
  overview,
  release_date,
  rating,
  newRelease,
  comingSoon,
  id,
}) => {
  return (
    <StyledMovieElement>
      <img src={`https://image.tmdb.org/t/p/w500${poster_path}`} alt={title} />
      <Box>
        <Typography variant="h6" component="h2">
          {title}
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ my: 2 }}>
          {overview}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
          Release Date: {release_date}
        </Typography>
        <RatingBox>
          <Typography variant="body2" color="text.secondary" sx={{ mr: 1 }}>
            {rating}%
          </Typography>
          <Rating value={rating} max={100} />
        </RatingBox>
        {newRelease && (
          <Typography
            variant="body2"
            color="secondary.main"
            sx={{ fontWeight: 'bold' }}
          >
            New Release
          </Typography>
        )}
        {comingSoon && (
          <Typography
            variant="body2"
            color="secondary.main"
            sx={{ fontWeight: 'bold' }}
          >
            Coming Soon
          </Typography>
        )}
      </Box>
    </StyledMovieElement>
  );
};

export default MovieElement;
