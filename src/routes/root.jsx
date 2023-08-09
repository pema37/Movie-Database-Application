import { createRoot } from 'react-dom/client';
import Header from "../components/Header";
import MovieList from "../components/MovieList";
import HomePage from '../pages/HomePage';
import { createBrowserRouter } from "react-router-dom";
import { RouterProvider } from "react-router-dom";

export default function Root(){

  return (
    <>
      <div>
        <div id="movieapp">
          {/* <h1>React Movie App</h1> */}
          <HomePage></HomePage>
        </div>
      </div>
    </>
  );
};

