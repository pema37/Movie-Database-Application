export const movieType = {
  popular: "popular",
  nowPlaying: "now_playing",
  upcoming: "upcoming",
  topRated: "top_rated"
};

const ROOT_URL = 'https://api.themoviedb.org/3/';

const API_KEY = '2ae37d97dbcd92e86e4aec0cf4a0f1e0';

const final_url = `${ROOT_URL}/movie/${movieType}?api_key=${API_KEY}&language=en-US&page=1`;


