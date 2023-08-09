import React from "react";
import { Box } from '@mui/material';
import MovieList from "../components/MovieList";
import Header from "../components/Header";
import Footer from "../components/Footer";

const HomePage = () => {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Header />
      <Box sx={{ flexGrow: 1, width: '100%', overflowX: 'hidden' }}>
        <MovieList />
      </Box>
      <Footer />
    </Box>
  );
};

export default HomePage;




























// import React from "react";
// import MovieList from "../components/MovieList";
// import Header from "../components/Header";
// import Footer from "../components/Footer";

// const HomePage = () => {
//   return (
//     <section className="all-movies">
//       <div className="all-category">
//         <Header />
//         <MovieList />
//         <Footer />
//       </div>
//     </section>
//   );
// };

// export default HomePage;











// import React from 'react';
// import { Box } from '@mui/material';
// import Layout from '../components/Layout';
// import MovieList from '../components/MovieList';

// const HomePage = () => {
//   return (
//     <Layout>
//       <Box sx={{ padding: 3 }}>
//         <h1>Home Page</h1>
//         <MovieList />
//       </Box>
//     </Layout>
//   );
// };

// export default HomePage;

























// not my taste, but good

// import React from "react";
// import MovieList from "../components/MovieList";
// import NavBar from "../components/NavBar";
// import { Box } from '@mui/material';

// const HomePage = () => {
//   return (
//     <Box sx={{ backgroundColor: '#f5f5f5', minHeight: '100vh', py: 3 }}>
//       <NavBar />
//       <Box sx={{ maxWidth: '1200px', margin: '0 auto' }}>
//         <MovieList />
//       </Box>
//     </Box>
//   );
// };

// export default HomePage;
