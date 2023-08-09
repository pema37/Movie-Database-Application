import { Container } from '@mui/material';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Header from './components/Header';
import MovieDetails from './components/MovieDetails';
import MovieList from './components/MovieList';

function App() {
  return (
    <Router>
      <Header />
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Switch>
          <Route path="/" exact>
            <MovieList />
          </Route>
          <Route path="/movie/:id">
            <MovieDetails />
          </Route>
        </Switch>
      </Container>
    </Router>
  );
}

export default App;




import { AppBar, Toolbar, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component={Link} to="/" sx={{ textDecoration: 'none', color: 'inherit' }}>
          MovieApp
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default Header;






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




// Replace this line:
// const imageUrl = movieInfo.poster_path
// ? `https://image.tmdb.org/t/p/w500/${movieInfo.poster_path}`
// : "https://via.placeholder.com/500x750";

// With this line:
<img src={movieInfo.poster_path ? `https://image.tmdb.org/t/p/w500/${movieInfo.poster_path}` : "https://via.placeholder.com/500x750"} alt={movieInfo.title} />







const IndividualMoviePage = () => {
  // ...

  const imageUrl = movieInfo.poster_path
    ? `https://image.tmdb.org/t/p/w500/${movieInfo.poster_path}`
    : "https://via.placeholder.com/500x750";

  return (
    <Box sx={{ padding: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 2 }}>
        <Typography variant="h3">{movieInfo.title}</Typography>
        <Button variant="outlined" onClick={toggleFavorite}>
          {isFavorited ? "Unfavourite" : "Favourite"}
        </Button>
      </Box>
      <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: 2 }}>
        <Box sx={{ marginRight: 2 }}>
          <img src={imageUrl} alt={movieInfo.title} />
        </Box>
        <Box sx={{ marginRight: 2 }}>
          <Typography variant="body1" color="text.secondary">Rating:</Typography>
          <Typography variant="h5">{displayRating}</Typography>
        </Box>
        {/* ... */}
      </Box>
      {/* ... */}
    </Box>
  );
};


const imageUrl = movieInfo.poster_path
? `https://image.tmdb.org/t/p/w500/${movieInfo.poster_path}`
: "https://via.placeholder.com/500x750";




<Box sx={{ display: 'flex', alignItems: 'center', marginBottom: 2 }}>
  <Box sx={{ marginRight: 2 }}>
    <img src={imageUrl} alt={movieInfo.title} />
  </Box>
  <Box sx={{ marginRight: 2 }}>
    <Typography variant="body1" color="text.secondary">Rating:</Typography>
    <Typography variant="h5">{displayRating}</Typography>
  </Box>
  {/* ... */}
</Box>


















To make the Header component appear on all pages of your app, you can place it in a higher-level component that wraps your entire app. This is often called a "wrapper" or "layout" component.

For example, you could create a component called `Layout` that renders the Header and any other components that should appear on every page. Then, in each individual page component, you can wrap the page content with the `Layout` component.

Here's an example of what the `Layout` component could look like:

```
import React from 'react';
import Header from './Header';

const Layout = ({ children }) => {
  return (
    <>
      <Header />
      {children}
    </>
  );
};

export default Layout;
```

In this example, the `Layout` component takes a `children` prop, which is the content that should appear below the header. The `Header` component is rendered first, followed by the `children`.

To use the `Layout` component in your app, you would wrap each page component with it, like this:

```
import React from 'react';
import Layout from './Layout';

const HomePage = () => {
  return (
    <Layout>
      <h1>Welcome to the home page!</h1>
      <p>This is some example content for the home page.</p>
    </Layout>
  );
};

export default HomePage;
```

By wrapping the `HomePage` component with the `Layout` component, the `Header` will appear on the home page as well as any other pages that use the `Layout` component.



















To make the header and footer appear in all pages, you can create a layout component that contains the header and footer, and wraps the content of each page.

Here's an example of how you could do it:

1. Create a new file `Layout.js`:

```
import React from 'react';
import Header from './Header';
import Footer from './Footer';

const Layout = ({ children }) => {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
};

export default Layout;
```

2. In each page component, import the Layout component and wrap the content with it:

```
import React from 'react';
import { Box } from '@mui/material';
import Layout from './Layout';

const HomePage = () => {
  return (
    <Layout>
      <Box sx={{ padding: 3 }}>
        <h1>Home Page</h1>
      </Box>
    </Layout>
  );
};

export default HomePage;
```

This way, the Header and Footer components will appear on every page, and the content of each page will be wrapped by the Layout component.













<!-- SNIPPET OVERVIEW -->

import React from 'react';

const Snippet = ({ content, length }) => {
  const snippet = content.substr(0, length) + '...';
  
  return (
    <div>
      {snippet}
    </div>
  );
};

export default Snippet;
