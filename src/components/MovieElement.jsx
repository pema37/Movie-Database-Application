import { styled } from "@mui/material/styles";
import { PlayArrow, Favorite } from "@mui/icons-material";
import { Box, Button, Grid, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

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


const StyledFavoriteButton = styled(Button)({
  mr: 2,
  padding: '4px 8px', 
  fontSize: '0.8rem', 
  backgroundColor: "#F44336",
  color: "#fff",
  "&:hover": {
    backgroundColor: "#D32F2F",
  },
});

const StyledMoreInfoButton = styled(Button)({
  padding: '4px 8px', 
  fontSize: '0.8rem', 
  backgroundColor: "#3F51B5",
  color: "#fff",
  "&:hover": {
    backgroundColor: "#303F9F",
  },
});



function MovieElement(props) {
  const { title, poster_path, overview, release_date, rating, id } = props;
  const [isFavourite, setIsFavourite] = useState(false);
  const [favMovies, setFavMovies] = useState([]);

  const imageUrl = poster_path ? `https://image.tmdb.org/t/p/w500/${poster_path}` : 'https://via.placeholder.com/500x750';
  const releaseYear = release_date ? new Date(release_date).getFullYear() : '';
  const displayRating = rating ? `${rating}%` : '';

  useEffect(() => {
    const favMoviesFromStorage = localStorage.getItem("favMovies");

    if (favMoviesFromStorage) {
      const parseFavouriteMovies = JSON.parse(favMoviesFromStorage);
      setFavMovies(parseFavouriteMovies);
      const movieIsFavorited = parseFavouriteMovies.find(movie => movie && movie.id === id);
      setIsFavourite(movieIsFavorited !== undefined);
    }
  }, [id]);

  const handleFavourite = () => {
    setIsFavourite(!isFavourite);
    let updatedFavMovies;
    if (!isFavourite) {
      updatedFavMovies = [...favMovies, props];
      setFavMovies(updatedFavMovies);
    } else {
      updatedFavMovies = favMovies.filter(movie => movie.id !== id);
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
          <Link to={`/movie/${id}`}>
            <StyledMoreInfoButton variant="contained" startIcon={<PlayArrow />} sx={{ ml: 2 }}>
              More Info
            </StyledMoreInfoButton>
          </Link>
          <Typography variant="body1" sx={{ my: 1 }}>
            {overview && overview.length > 200 ? `${overview.slice(0, 100)}...` : overview}
          </Typography>
        </Grid>
      </Grid>
    </StyledMovieElement>

  );
}

export default MovieElement;     














