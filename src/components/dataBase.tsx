// dataBase.tsx
import axios from 'axios';
import { MovieResponse } from './interfaces';

const MOVIE_DB_BASE_URL = 'https://api.themoviedb.org/3/discover/movie';
const MOVIE_DB_API_KEY = '480128c3202788f17d08d104b8f5c03c';

// dataBase.tsx
export const fetchMovies = async (options: {
  page: number;
  selectedGenre: string;
  currentOrder: string;
  orderTerm: string;
}) => {
  try {
    const { page, selectedGenre, currentOrder, orderTerm } = options;

    // Construct the URL for the API request
    let url = `${MOVIE_DB_BASE_URL}?api_key=${MOVIE_DB_API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${page}&with_genres=${selectedGenre}&certification_country=US&certification=G`;

    if (currentOrder) {
      url += `&sort_by=${currentOrder}`;
    }

    if (orderTerm) {
      url += `&sort_by=${orderTerm}`;
    }

    // Fetch data from TMDb API
    const response = await axios.get<MovieResponse>(url);

    // Extract relevant details and map to MovieDetails type
    const transformedResults = response.data.results.map((movie) => ({
      id: movie.id,
      title: movie.title,
      poster_path: movie.poster_path,
      release_date: movie.release_date,
      genres: movie.genres,
      vote_average: movie.vote_average,
      vote_count: movie.vote_count,
      poster: `https://image.tmdb.org/t/p/w500/${movie.poster_path}`, // Assuming poster_path is available
      overview: movie.overview,
    }));

    return {
      results: transformedResults,
      total_pages: response.data.total_pages,
    };
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
};

export const fetchGenres = async () => {
  try {
    const response = await axios.get(`https://api.themoviedb.org/3/genre/movie/list?api_key=${MOVIE_DB_API_KEY}`);
    return response.data.genres;
  } catch (error) {
    console.error('Error fetching genres:', error);
    throw error;
  }
}; 