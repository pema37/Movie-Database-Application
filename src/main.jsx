import { createRoot } from "react-dom";
import * as React from "react";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import Root from "./routes/root";
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import MyFavouritesPage from "./pages/MyFavouritesPage";
import IndividualMoviePage from "./pages/IndividualMoviePage";
import ErrorPage from "./pages/error-page";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
  },
  {
    // error-page, page not found
    path: "*",
    element: <Root />,
    errorElement: <ErrorPage />,
  },
  {
    /* About the Movie App Page */
    path: "/about-page",
    element: <AboutPage />,
  },
  {
    /*
      Individual Movie Page: Get the primary information about a movie.
      /movie/{movie_id}
    */
    path: "/movie/:id",
    element: <IndividualMoviePage />,
  },
  {
    /* My Favourites Page */
    path: "/my-favourites-page",
    element: <MyFavouritesPage />,
  },
],{basename: "/vite-movie-app"});

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router}>
      <Root />
    </RouterProvider>
  </React.StrictMode>
);




















// this is good
// import { createRooot } from 'react-dom/client';
// import * as React from "react";
// import * as ReactDOM from "react-dom/client";
// import {
//   createBrowserRouter,
//   RouterProvider,
// } from "react-router-dom";


// import Root from "./routes/root";


// import HomePage from "./pages/HomePage"
// import AboutPage from "./pages/AboutPage";
// import MyFavouritesPage from "./pages/MyFavouritesPage";
// import IndividualMoviePage from "./pages/IndividualMoviePage";
// import ErrorPage from "./pages/error-page";




// const router = createBrowserRouter([

//   {
//     path: "/",
//     element:<Root></Root>,
//   },


//   {
//     // error-page, page not found
//     path: "*",
//     element:<Root></Root>,
//     errorElement: <ErrorPage></ErrorPage>,
//   },


//   {
//     /* About the Movie App Page */
//     path: "/about-page",
//     element: <AboutPage></AboutPage>,
//   },


//   {
//     /*
//       Individual Movie Page: Get the primary information about a movie.
//       /movie/{movie_id}
//     */
//     path: "/movie:id",
//     element: <IndividualMoviePage></IndividualMoviePage>,
//   },
  

//   {
//     /* My Favourites Page */
//     path: "/my-favourites-page",
//     element: <MyFavouritesPage></MyFavouritesPage>,
//   }, 
  
// ]);



// ReactDOM.createRoot(document.getElementById("root")).render(
//   <React.StrictMode>
//     <RouterProvider router={router} />
//   </React.StrictMode>
// );





