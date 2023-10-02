/////////////////////////////////////////////////
///////// API-specific

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
export const BASE_URL_IMAGE = "https://image.tmdb.org/t/p";

export const IMG_SIZE = "original";

/////////////////////////////////////////////////
///////// Spotlight and overview

export const SO_TITLE_MAX_WIDTH = 305;
export const SO_CTITLE_TRANS_DURATION_RATIO = 112;
export const SO_CTITLE_TRANS_DELAY_OFFSET = 2000;
