/////////////////////////////////////////////////
///////// API

export const API_KEY = "40d476b7bf5ff2313ce9a96c31065e66";
export const API_RAT =
  "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0MGQ0NzZiN2JmNWZmMjMxM2NlOWE5NmMzMTA2NWU2NiIsInN1YiI6IjY1MTIyNTYzMjZkYWMxMDE0ZTIzMzM4OCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.ol_KoRpPN_9jMnmWMVoAklqxoxIvq9uRoKatzqDiTXY";

/////////////////////////////////////////////////
///////// API-meta

export const OPTIONS = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${API_RAT}`,
  },
};

export const BASE_URL = "https://api.themoviedb.org/3";
export const BASE_URL_IMG = "https://image.tmdb.org/t/p";

export const IMG_SIZE = "original";

/////////////////////////////////////////////////
///////// Model

export const POPULAR_MOVIE_SKIP_OFFSET = 9;

/////////////////////////////////////////////////
///////// Spotlight

export const SPOTLIGHT_CONTENT_NUM = 3;
export const SO_TITLE_MAX_WIDTH = 305;
export const SO_CTITLE_TRANS_DURATION_RATIO = 112; // TODO: Ratio should be changed so larger --> slower, smaller --> faster
export const SO_CTITLE_TRANS_DELAY_OFFSET = 2000;

/////////////////////////////////////////////////
///////// Tracks

export const TOP_TRACK_HEADING = "Top Rated";
export const MOST_POPULAR_GENRES = ["Adventure", "Action", "Drama", "Romance"];
export const TRACK_CONTENT_BATCH_AMT = 4;
export const TRACK_CONTENT_TRANSLATEX_VAL = 522.5;
export const TRACK_CONTENT_FULL_TRANSLATEX_VAL = 2090;
export const TRACK_LEFT_INVIS_MIN_POS = -104.5;
export const TRACK_RIGHT_INVIS_MIN_POS = 522.5;
