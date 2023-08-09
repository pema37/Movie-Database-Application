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