import theMovieDb from "themoviedb-javascript-library";

theMovieDb.common.api_key = process.env.REACT_APP_MOVIE_DB_API_KEY;

export default theMovieDb;