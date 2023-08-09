import React, { useState, useEffect } from 'react';
import { Box, Grid, Typography } from '@mui/material';
import MovieElement from "../components/MovieElement";
import Header from "../components/Header";
import RequestApi from "../api/RequestApi";

const MyFavouritesPage = () => {

  const [favMovies, setFavMovies] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [movieData, setMovieData] = useState(null);

  useEffect(() => {
    try {
      const favMoviesFromStorage = localStorage.getItem('favMovies');
      if (favMoviesFromStorage) {
        setFavMovies(JSON.parse(favMoviesFromStorage));
      }
    } catch (error) {
      setError("Error retrieving favourite movies.");
    }
  }, []);

  useEffect(() => {
    const fetchData = async (movieId) => {
      try {
        setLoading(true);
        const response = await fetch(`${RequestApi.ROOT_URL}/movie/${movieId}?api_key=${RequestApi.API_KEY}&language=en-US`);
        if (response.ok) {
          const movieData = await response.json();
          setMovieData(movieData);
        } else {
          setError("Error fetching movie data.");
        }
      } catch (error) {
        console.error(error);
        setError("Error fetching movie data.");
      } finally {
        setLoading(false);
      }
    };
    
    if (movieData && movieData.id) {
      fetchData(movieData.id.toString());
    }
  }, [movieData]);

  const hasFavMovies = favMovies.length > 0;
  console.log(favMovies)

  return (
    <>
      <Header />
      <Box sx={{ padding: 3 }}>
        <Typography variant="h4" sx={{ textTransform: 'uppercase', marginBottom: '2rem' }}>
          My Favourite Movies
        </Typography>
        {error && <Typography variant="body1">{error}</Typography>}
        {loading ? (
          <Typography variant="body1">
            Loading movie data...
          </Typography>
        ) : hasFavMovies ? (
          <Grid container spacing={2}>
            {favMovies && favMovies.map((movie) => (
              movie && (
                <Grid item xs={12} sm={6} md={4} key={movie.id}>
                    <MovieElement
                      key={movie.id}
                      id={movie.id}
                      title={movie.title}
                      poster_path={movie.poster_path}
                      overview={movie.overview}
                      release_date={movie.release_date}
                      rating={movie.rating}
                    />
                </Grid>
              )
            ))}
          </Grid>
        ) : (
          <Typography variant="body1">
            Sorry, you have no favourited movies. Return to the home page to add a favourite movie.
          </Typography>
        )}
      </Box>
    </>
  );
};

export default MyFavouritesPage;














// import React, { useState, useEffect } from 'react';
// import MovieElement from "../components/MovieElement";
// import RequestApi from "../api/RequestApi";

// function MyFavouritesPage() {
//   const [favMovies, setFavMovies] = useState([]);

//   const fetchFavouriteMovies = async (favMovieIds) => {
//     const favMoviesData = [];
//     for (const id of favMovieIds) {
//       const response = await fetch(`${RequestApi.ROOT_URL}/movie/${id}?api_key=${RequestApi.API_KEY}&language=en-US`);
//       const movieData = await response.json();
//       favMoviesData.push(movieData);
//     }
//     setFavMovies(favMoviesData);
//   };

//   useEffect(() => {
//     const favMoviesFromStorage = localStorage.getItem("favMovies");
//     if (favMoviesFromStorage) {
//       const favMovieIds = JSON.parse(favMoviesFromStorage);
//       fetchFavouriteMovies(favMovieIds);
//     }
//   }, []);  // On mount, read favorite movie IDs from localStorage and fetch their data

//   if (favMovies.length === 0) return <p>No favourite movies yet.</p>;

//   return (
//     <div>
//       {favMovies.map(movie => (
//         <MovieElement key={movie.id} {...movie} />
//       ))}
//     </div>
//   );
// }

// export default MyFavouritesPage;
