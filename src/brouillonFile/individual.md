import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { makeStyles } from "@mui/styles";
import { Card, CardContent, CardMedia, Typography, Button } from "@mui/material";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
  },
  card: {
    display: "flex",
    maxWidth: "800px",
    margin: "auto",
    padding: theme.spacing(3),
    [theme.breakpoints.down("sm")]: {
      flexDirection: "column",
      padding: theme.spacing(2),
    },
  },
  media: {
    width: "250px",
    height: "375px",
    [theme.breakpoints.down("sm")]: {
      width: "100%",
      height: "auto",
    },
  },
  content: {
    flex: "1 0 auto",
    paddingLeft: theme.spacing(3),
    [theme.breakpoints.down("sm")]: {
      padding: 0,
    },
  },
  button: {
    marginTop: theme.spacing(2),
  },
}));

function IndividualMoviePage() {
  const classes = useStyles();
  const API_KEY = "2ae37d97dbcd92e86e4aec0cf4a0f1e0";
  const [movieInfo, setMovieInfo] = useState(null);
  const [isFavorited, setIsFavorited] = useState(false);
  const [error, setError] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const fetchMovie = async () => {
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
      } catch (error) {
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
    return <div>{error}</div>;
  }

  if (!movieInfo) {
    return <div>Loading...</div>;
  }

  const imageUrl = movieInfo.poster_path
    ? `https://image.tmdb.org/t/p/w500/${movieInfo.poster_path}`
    : "https://via.placeholder.com/500x750";
  const releaseYear = movieInfo.release_date
    ? new Date
