import axios from "axios";

const BASE_URL = "https://api.themoviedb.org/3";
const TOKEN =
  "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkOTYzMmFkMjlhNzBjYTIwZDFlMWE3NDEwYzJmYTNkYSIsIm5iZiI6MTc0NDkyOTk1Mi40MTgsInN1YiI6IjY4MDE4NGEwYjExM2ZmODcyM2Q5N2NjOCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.M7C-hBGk65s9T9TMKSvQ0q5FFRhPkH2foIbaXIEnFNU";

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    Authorization: TOKEN,
  },
});

export const searchMovies = async (query, page = 1) => {
  const response = await axiosInstance.get(
    "/search/movie",
    {
      params: {
        query,
        include_adult: false,
        language: "en-US",
        page,
      },
    }
  );
  return response.data.results;
};

export const getTrendingMovies = async () => {
  const response = await axiosInstance.get(
    "/trending/movie/day"
  );
  return response.data.results;
};

export const getMovieDetails = async (movieId) => {
  const response = await axiosInstance.get(
    `/movie/${movieId}`
  );
  return response.data;
};

export const getMovieCredits = async (movieId) => {
  const response = await axiosInstance.get(
    `/movie/${movieId}/credits`
  );
  return response.data.cast;
};

export const getMovieReviews = async (movieId) => {
  const response = await axiosInstance.get(
    `/movie/${movieId}/reviews`
  );
  return response.data.results;
};
