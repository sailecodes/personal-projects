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
export const TOP_RATED_MOVIES_INTER_URL = "/discover/movie?include_adult=false&include_video=false&language=en-US"
  .concat("&primary_release_date.gte=2020-01-01&region=US&release_date.gte=2020-01-01&sort_by=vote_average.desc")
  .concat("&vote_average.gte=7.5&vote_count.gte=200&with_origin_country=US&with_original_language=en")
  .concat("&without_genres=10402%2C%2010749%2C%2016%2C%2036%2C%2099&");
export const MOST_POPULAR_MOVIES_INTER_URL = "/discover/movie?include_adult=false&include_video=false&language=en-US"
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

export const MOVIE_SPOTLIGHT_CONTENT = [
  {
    adult: false,
    backdrop_path: "/H6j5smdpRqP9a8UnhWp6zfl0SC.jpg",
    genre_ids: [28, 878, 12],
    id: 565770,
    original_language: "en",
    original_title: "Blue Beetle",
    overview:
      "Recent college grad Jaime Reyes returns home full of aspirations for his future, only to find that home is not quite as he left it. As he searches to find his purpose in the world, fate intervenes when Jaime unexpectedly finds himself in possession of an ancient relic of alien biotechnology: the Scarab.",
    popularity: 1314.664,
    poster_path: "/mXLOHHc1Zeuwsl4xYKjKh2280oL.jpg",
    release_date: "2023-08-16",
    title: "Blue Beetle",
    video: false,
    vote_average: 7.1,
    vote_count: 1299,
  },
  {
    adult: false,
    backdrop_path: "/ctMserH8g2SeOAnCw5gFjdQF8mo.jpg",
    genre_ids: [35, 12, 14],
    id: 346698,
    original_language: "en",
    original_title: "Barbie",
    overview:
      "Barbie and Ken are having the time of their lives in the colorful and seemingly perfect world of Barbie Land. However, when they get a chance to go to the real world, they soon discover the joys and perils of living among humans.",
    popularity: 819.756,
    poster_path: "/iuFNMS8U5cb6xfzi51Dbkovj7vM.jpg",
    release_date: "2023-07-19",
    title: "Barbie",
    video: false,
    vote_average: 7.2,
    vote_count: 5419,
  },
  {
    adult: false,
    backdrop_path: "/iIvQnZyzgx9TkbrOgcXx0p7aLiq.jpg",
    genre_ids: [27, 53],
    id: 1008042,
    original_language: "en",
    original_title: "Talk to Me",
    overview:
      "When a group of friends discover how to conjure spirits using an embalmed hand, they become hooked on the new thrill, until one of them goes too far and unleashes terrifying supernatural forces.",
    popularity: 1744.488,
    poster_path: "/kdPMUMJzyYAc4roD52qavX0nLIC.jpg",
    release_date: "2023-07-26",
    title: "Talk to Me",
    video: false,
    vote_average: 7.2,
    vote_count: 1418,
  },
];

export const SPOTLIGHT_CONTENT_NUM = 3;
export const SO_TITLE_MAX_WIDTH = 305;
export const SO_CLIPPED_TITLE_TRANS_DURATION_RATIO = 112; // TODO: Ratio should be changed so larger --> slower, smaller --> faster
export const SO_CLIPPED_TITLE_TRANS_DELAY_OFFSET = 2000;

/////////////////////////////////////////////////
///////// Tracks
/////////////////////////////////////////////////

export const TOP_TRACK_HEADING = "Top Rated";
export const MOST_POPULAR_MOVIE_GENRES = ["Adventure", "Action", "Drama", "Romance"];
export const MOST_POPULAR_TV_GENRES = [];

export const TRACK_CONTENT_BATCH_AMT = 4;
export const TRACK_CONTENT_TRANSLATEX_VAL = 522.5;
export const TRACK_CONTENT_FULL_TRANSLATEX_VAL = 2090;
export const TRACK_LEFT_INVIS_MIN_POS = -104.5;
export const TRACK_RIGHT_INVIS_MIN_POS = 522.5;
