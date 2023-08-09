
useEffect(() => {
  getMovieById(id).then(movieData => {
    setMovie(movieData);
  });

  const favMoviesFromStorage = localStorage.getItem("favMovies");
  if (favMoviesFromStorage) {
    const favMovieIds = JSON.parse(favMoviesFromStorage);
    setIsFavourite(favMovieIds.includes(id));
  }
}, [id]);




useEffect(() => {
  getMovieById(id).then(movieData => {
    setMovie(movieData);
  });

  const favMoviesFromStorage = localStorage.getItem("favMovies");
  if (favMoviesFromStorage) {
    const favMovieIds = JSON.parse(favMoviesFromStorage);
    setIsFavourite(favMovieIds.includes(id));
  }
}, [id]);





import { styled } from "@mui/material/styles";
import { PlayArrow, Favorite } from "@mui/icons-material";
import { Box, Button, Grid, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import RequestApi from "../api/RequestApi";

const StyledFavoriteButton = styled(Button)({
  backgroundColor: "#F44336",
  color: "#fff",
  "&:hover": {
    backgroundColor: "#D32F2F",
  },
});

function IndividualMoviePage() {
  const { movieId } = useParams();
  const [movie, setMovie] = useState(null);
  const [isFavourite, setIsFavourite] = useState(false);

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const response = await fetch(`${RequestApi.ROOT_URL}/movie/${movieId}?api_key=${RequestApi.API_KEY}&language=en-US`);
        const data = await response.json();
        setMovie(data);
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchMovie();
  }, [movieId]);

  useEffect(() => {
    const favMoviesFromStorage = localStorage.getItem("favMovies");
    if (favMoviesFromStorage) {
      const favMovieIds = JSON.parse(favMoviesFromStorage);
      setIsFavourite(favMovieIds.includes(parseInt(movieId)));
    }
  }, [movieId]);

  const handleFavourite = () => {
    const favMoviesFromStorage = localStorage.getItem("favMovies");
    let favMovieIds = favMoviesFromStorage ? JSON.parse(favMoviesFromStorage) : [];
    if (!isFavourite) {
      favMovieIds.push(parseInt(movieId));
    } else {
      favMovieIds = favMovieIds.filter(id => id !== parseInt(movieId));
    }
    localStorage.setItem("favMovies", JSON.stringify(favMovieIds));
    setIsFavourite(!isFavourite);
  };

  return (
    <Box sx={{ p: 2 }}>
      {movie && (
        <>
          {/* Render your movie details here */}
          <Typography variant="h5" sx={{ mb: 1 }}>
            {movie.title}
          </Typography>
          <StyledFavoriteButton
            variant={isFavourite ? "contained" : "outlined"}
            onClick={handleFavourite}
            startIcon={<Favorite />}
          >
            {isFavourite ? "Unfavorite" : "Favorite"}
          </StyledFavoriteButton>
        </>
      )}
    </Box>
  );
}

export default IndividualMoviePage;








import { useEffect, useState } from "react";
import MovieElement from './MovieElement';
import RequestApi from "../api/RequestApi";

function MyFavouritesPage() {
  const [favMovies, setFavMovies] = useState([]);

  useEffect(() => {
    const fetchFavouriteMovies = async () => {
      const favMoviesFromStorage = localStorage.getItem("favMovies");
      if (favMoviesFromStorage) {
        const favMovieIds = JSON.parse(favMoviesFromStorage);
        const favMoviesData = [];
        for (const id of favMovieIds) {
          const response = await fetch(`${RequestApi.ROOT_URL}/movie/${id}?api_key=${RequestApi.API_KEY}&language=en-US`);
          const movieData = await response.json();
          favMoviesData.push(movieData);
        }
        setFavMovies(favMoviesData);
      }
    };

    fetchFavouriteMovies();
  }, []);

  if (favMovies.length === 0) return <p>No favourite movies yet.</p>;

  return (
    <div>
      {favMovies.map(movie => (
        <MovieElement key={movie.id} {...movie} />
      ))}
    </div>
  );
}

export default MyFavouritesPage;







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
      const favMovieIds = JSON.parse(favMoviesFromStorage);
      setIsFavourite(favMovieIds.includes(id));
    }
  }, [id]);

  const handleFavourite = () => {
    const favMoviesFromStorage = localStorage.getItem("favMovies");
    let favMovieIds = favMoviesFromStorage ? JSON.parse(favMoviesFromStorage) : [];
    if (!isFavourite) {
      favMovieIds.push(id);
    } else {
      favMovieIds = favMovieIds.filter(movieId => movieId !== id);
    }
    localStorage.setItem("favMovies", JSON.stringify(favMovieIds));
    setIsFavourite(!isFavourite);
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
            <StyledMoreInfoButton variant="contained" startIcon={<PlayArrow />}>
              More Info
            </StyledMoreInfoButton>
          </Link>
        </Grid>
      </Grid>
    </StyledMovieElement>
  );
}

export default MovieElement;







import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Favorite } from "@mui/icons-material";
import { Button, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import RequestApi from "../api/RequestApi";

const StyledFavoriteButton = styled(Button)({
  mr: 2,
  backgroundColor: "#F44336",
  color: "#fff",
  "&:hover": {
    backgroundColor: "#D32F2F",
  },
});

function IndividualMoviePage() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [isFavourite, setIsFavourite] = useState(false);

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const response = await fetch(`${RequestApi.ROOT_URL}/movie/${id}?api_key=${RequestApi.API_KEY}&language=en-US`);
        const data = await response.json();
        setMovie(data);
      } catch (error) {
        console.error('Error:', error);
      }

      const favMoviesFromStorage = localStorage.getItem("favMovies");
      if (favMoviesFromStorage) {
        const favMovieIds = JSON.parse(favMoviesFromStorage);
        setIsFavourite(favMovieIds.includes(parseInt(id)));
      }
    };

    fetchMovie();
  }, [id]);

  const handleFavourite = () => {
    const favMoviesFromStorage = localStorage.getItem("favMovies");
    let favMovieIds = favMoviesFromStorage ? JSON.parse(favMoviesFromStorage) : [];
    if (!isFavourite) {
      favMovieIds.push(parseInt(id));
    } else {
      favMovieIds = favMovieIds.filter(movieId => movieId !== parseInt(id));
    }
    localStorage.setItem("favMovies", JSON.stringify(favMovieIds));
    setIsFavourite(!isFavourite);
  };

  if (!movie) return null; // or some loading indicator

  return (
    <div>
      <Typography variant="h5">{movie.title}</Typography>
      {/* Render other movie details... */}
      <StyledFavoriteButton
        variant={isFavourite ? "contained" : "outlined"}
        onClick={handleFavourite}
        startIcon={<Favorite />}
      >
        {isFavourite ? "Unfavorite" : "Favorite"}
      </StyledFavoriteButton>
    </div>
  );
}

export default IndividualMoviePage;








         





import React, { useEffect, useState } from "react";
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
              <MovieElement
                title={movie.title}
                poster_path={movie.poster_path}
                overview={movie.overview}
                release_date={movie.release_date}
                rating={movie.vote_average * 10} // rating is out of 10, multiply by 10 to get percentage
                newRelease={selectedType === movieType.nowPlaying}
                comingSoon={selectedType === movieType.upcoming}
                id={movie.id}
              />
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
};
              
export default MovieList;



















I have four pages (homepage for the movieList, aboutpage, individualmoviepage, myfavouritespage): the homepage lists all movies, the individual movie page gives details for any movie, myfavouritespage lists all favourited movies, aboutpage gives information about the movieapp. When you click on the "Favorite" button on the main page, you want the movie to be added to the local storage. If the movie is already a favorite,  the button should be "unfavourite", and clicking the button should remove it from the favorites. Also, on the individual movie page, you want the button to display "Unfavorite" if the movie is already favorited.


Sure, here is how you can implement such functionality:

Firstly, make sure that the `localStorage` key is initialized when the app starts. You can do this in the main entry point of your application (usually `index.js` or `App.js`):

```jsx
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

// Initialize favMovies in localStorage if it does not exist
if (!localStorage.getItem("favMovies")) {
  localStorage.setItem("favMovies", JSON.stringify([]));
}

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
```

Then, you would use `localStorage` in your `MovieElement` component:

```jsx
function MovieElement(props) {
  // Other code...

  // Initialize isFavourite state based on localStorage
  const [isFavourite, setIsFavourite] = useState(() => {
    const favMovies = JSON.parse(localStorage.getItem("favMovies"));
    return favMovies.includes(id);
  });

  const handleFavourite = () => {
    const favMovies = JSON.parse(localStorage.getItem("favMovies"));
    if (isFavourite) {
      // If the movie is already a favourite, remove it from the array
      const index = favMovies.indexOf(id);
      if (index !== -1) {
        favMovies.splice(index, 1);
      }
    } else {
      // If the movie is not a favourite, add it to the array
      favMovies.push(id);
    }
    // Update localStorage
    localStorage.setItem("favMovies", JSON.stringify(favMovies));
    // Update state
    setIsFavourite(!isFavourite);
  };

  // Other code...
}
```

Finally, in your `IndividualMoviePage` component:

```jsx
function IndividualMoviePage() {
  // Other code...

  const [isFavourite, setIsFavourite] = useState(() => {
    const favMovies = JSON.parse(localStorage.getItem("favMovies"));
    return favMovies.includes(parseInt(id));
  });

  const handleFavourite = () => {
    const favMovies = JSON.parse(localStorage.getItem("favMovies"));
    if (isFavourite) {
      const index = favMovies.indexOf(parseInt(id));
      if (index !== -1) {
        favMovies.splice(index, 1);
      }
    } else {
      favMovies.push(parseInt(id));
    }
    localStorage.setItem("favMovies", JSON.stringify(favMovies));
    setIsFavourite(!isFavourite);
  };

  // Other code...
}
```

This should give you the functionality you want: the "Favorite" button in both `MovieElement` and `IndividualMoviePage` will add/remove movies to/from favourites, and display "Unfavorite" if the movie is already a favourite. Please remember to replace `// Other code...` with your own code.