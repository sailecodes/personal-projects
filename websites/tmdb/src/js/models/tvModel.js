/////////////////////////////////////////////////
///////// Fetches TV show genres

export const fetchTVSGenres = async function () {
  if (state.tvsGenresInfo.length !== 0) return;

  const response = await fetch(`${BASE_URL}/genre/tv/list?language=en`, OPTIONS);
  const { genres } = await response.json();

  state.tvsGenresInfo = genres;
};
