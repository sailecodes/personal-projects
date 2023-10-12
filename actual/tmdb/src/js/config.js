/////////////////////////////////////////////////
///////// API
/////////////////////////////////////////////////

export const API_KEY = "40d476b7bf5ff2313ce9a96c31065e66";
export const API_RAT = "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0MGQ0NzZiN2JmNWZmMjMxM2NlOWE5NmMzMTA2NWU2NiIsInN1YiI6"
  .concat("IjY1MTIyNTYzMjZkYWMxMDE0ZTIzMzM4OCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.ol_KoRpPN_9jMnm")
  .concat("WMVoAklqxoxIvq9uRoKatzqDiTXY");

/////////////////////////////////////////////////
///////// API-meta
/////////////////////////////////////////////////

export const OPTIONS = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${API_RAT}`,
  },
};

export const BASE_URL = "https://api.themoviedb.org/3";
export const BASE_URL_IMG = "https://image.tmdb.org/t/p";

export const MOVIE_GENRES_INTER_URL = "/genre/movie/list?language=en";
export const TOP_RATED_INTER_URL = "/discover/movie?include_adult=false&include_video=false&language=en-US"
  .concat("&primary_release_date.gte=2020-01-01&region=US&release_date.gte=2020-01-01&sort_by=vote_average.desc")
  .concat("&vote_average.gte=7.5&vote_count.gte=200&with_origin_country=US&with_original_language=en")
  .concat("&without_genres=10402%2C%2010749%2C%2016%2C%2036%2C%2099&");
export const MOST_POPULAR_INTER_URL = "/discover/movie?include_adult=false&include_video=false&language=en-US"
  .concat("&primary_release_date.gte=2020-01-01&region=US&release_date.gte=2020-01-01&sort_by=popularity.desc")
  .concat("&vote_average.gte=7&vote_count.gte=200&with_origin_country=US&with_original_language=en")
  .concat("&without_genres=10402%2C%2010749%2C%2016%2C%2036%2C%2099&");
export const MOVIE_BY_GENRE_INTER_URL = "/discover/movie?include_adult=false&include_video=false&language=en-US"
  .concat("&primary_release_date.gte=2020-01-01&region=US&release_date.gte=2020-01-01&sort_by=popularity.desc")
  .concat("&vote_average.gte=7&vote_count.gte=200&with_origin_country=US&with_original_language=en")
  .concat("&without_genres=10770&");

export const IMG_SIZE = "original";

/////////////////////////////////////////////////
///////// Spotlight
/////////////////////////////////////////////////

export const SPOTLIGHT_CONTENT_NUM = 3;
export const SO_TITLE_MAX_WIDTH = 305;
export const SO_CLIPPED_TITLE_TRANS_DURATION_RATIO = 112; // TODO: Ratio should be changed so larger --> slower, smaller --> faster
export const SO_CLIPPED_TITLE_TRANS_DELAY_OFFSET = 2000;

/////////////////////////////////////////////////
///////// Tracks
/////////////////////////////////////////////////

export const TOP_TRACK_HEADING = "Top Rated";
export const MOST_POPULAR_GENRES = ["Adventure", "Action", "Drama", "Romance"];
export const TRACK_CONTENT_BATCH_AMT = 4;
export const TRACK_CONTENT_TRANSLATEX_VAL = 522.5;
export const TRACK_CONTENT_FULL_TRANSLATEX_VAL = 2090;
export const TRACK_LEFT_INVIS_MIN_POS = -104.5;
export const TRACK_RIGHT_INVIS_MIN_POS = 522.5;
