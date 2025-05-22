import theMovieDb from "themoviedb-javascript-library";

theMovieDb.common.api_key = process.env.REACT_APP_MOVIE_DB_API_KEY;
theMovieDb.common.base_uri = "https://api.themoviedb.org/3/";
theMovieDb.common.images_uri = "https://image.tmdb.org/t/p/";

export default theMovieDb;