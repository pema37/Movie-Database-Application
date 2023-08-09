import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const IndividualMoviePage = () => {
  const [isFavourite, setIsFavourite] = useState(false);
  const { id } = useParams();

  // This useEffect runs when the component mounts and whenever 'id' changes
  useEffect(() => {
    const favMoviesFromStorage = localStorage.getItem("favMovies");
    if (favMoviesFromStorage) {
      const favMovieIds = JSON.parse(favMoviesFromStorage);
      setIsFavourite(favMovieIds.includes(Number(id))); // Ensure id is a number
    }
  }, [id]);

  const handleFavourite = () => {
    const favMoviesFromStorage = localStorage.getItem("favMovies");
    let favMovieIds = favMoviesFromStorage ? JSON.parse(favMoviesFromStorage) : [];
    if (!isFavourite) {
      favMovieIds.push(Number(id)); // Ensure id is a number
    } else {
      favMovieIds = favMovieIds.filter(movieId => movieId !== Number(id)); // Ensure id is a number
    }
    localStorage.setItem("favMovies", JSON.stringify(favMovieIds));
    setIsFavourite(!isFavourite);
  };

  return (
    <div>
      <h1>Movie Details Page</h1>
      <button onClick={handleFavourite}>
        {isFavourite ? "Unfavourite" : "Favourite"}
      </button>
      {/* Display rest of the movie details here */}
    </div>
  );
};

export default IndividualMoviePage;









function MyFavouritesPage() {
  const [favMovies, setFavMovies] = useState([]);

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

  useEffect(() => {
    fetchFavouriteMovies();
  }, [localStorage.getItem("favMovies")]);  // Run useEffect when favMovies in localStorage change

  if (favMovies.length === 0) return <p>No favourite movies yet.</p>;

  return (
    <div>
      {favMovies.map(movie => (
        <MovieElement key={movie.id} {...movie} />
      ))}
    </div>
  );
}



I have four pages (homepage for the movieList, aboutpage, individualmoviepage, myfavouritespage): the homepage lists all movies, the individual movie page gives details for any movie, myfavouritespage lists all favourited movies, aboutpage gives information about the movieapp. When you click on the "Favorite" button on the main page, you want the movie to be added to the local storage. If the movie is already a favorite,  the button should be "unfavourite", and clicking the button should remove it from the favorites. Also, on the individual movie page, you want the button to display "Unfavorite" if the movie is already favorited.
