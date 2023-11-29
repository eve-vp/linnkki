// dataBase.tsx
import axios from 'axios';
import { MovieResponse, MovieDetails } from './interfaces';


const MOVIE_DB_BASE_URL = 'https://api.themoviedb.org/3/discover/movie';
const MOVIE_DB_API_KEY = '480128c3202788f17d08d104b8f5c03c';

export const fetchMovies = async (page: number, selectedGenre: string, currentOrder: string) => {
  try {
    let url = `${MOVIE_DB_BASE_URL}?api_key=${MOVIE_DB_API_KEY}&language=en-US&include_adult=false&include_video=false&page=${page}&with_genres=${selectedGenre}`;

    if (currentOrder) {
      url += `&sort_by=${currentOrder}`;
    }

    const response = await axios.get<MovieResponse>(url);
    return {
      results: response.data.results,
      total_pages: response.data.total_pages,
    };
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
};

export const fetchMovieDetails = async (movieId: number) => {
  try {
    const response = await axios.get<MovieDetails>(`https://api.themoviedb.org/3/movie/${movieId}?api_key=${MOVIE_DB_API_KEY}&language=en-US`);
    return response.data;
  } catch (error) {
    if (error.response && error.response.status === 404) {
      // Handle 404 error (Movie not found)
      throw new Error('Movie not found');
    } else {
      // Handle other errors
      throw error;
    }
  }
};
